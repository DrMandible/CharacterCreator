/*
  TODO: Refactor to Fetch from Server/DB to enable process below:
  1.
    User A sends party invite to User B; or
    User B requests party invite
  2. 
    Database updates PARTY_INDEX from ; and 
    ADD:
      DATA: See THIMS_NETWORK_CONNECTIONS 
      TO: Every character.connections dictionary in PARTY
  3. getNetworkConnections() fetch NETWORK_CONNECTIONS from server

*/

import names from "./names.json";

import IMG_1 from "../assets/portraits/tile014.png";
import IMG_2 from "../assets/portraits/tile081.png";
import IMG_3 from "../assets/portraits/tile127.png";
import IMG_4 from "../assets/portraits/tile133.png";
import IMG_5 from "../assets/portraits/tile157.png";
import IMG_6 from "../assets/portraits/tile209.png";
import IMG_7 from "../assets/portraits/tile006.png";
import IMG_8 from "../assets/portraits/tile101.png";
import IMG_9 from "../assets/portraits/tile162.png";

const PORTRAITS = [
  IMG_1,
  IMG_2,
  IMG_3,
  IMG_4,
  IMG_5,
  IMG_6,
  IMG_7,
  IMG_8,
  IMG_9
];

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

var randomProperty = function (obj) {
  var keys = Object.keys(obj);
  return obj[keys[(keys.length * Math.random()) << 0]];
};

const getRandomName = () => {
  let nameList = randomProperty(randomProperty(names)).split(", ");
  let name = nameList[getRandomInt(nameList.length)];
  return name;
};

let portraitMap = new Map();

export const getRandomPortrait = (name) => {
  if (portraitMap.has(name)) {
    return portraitMap.get(name);
  }

  portraitMap.set(name, PORTRAITS[getRandomInt(PORTRAITS.length)]);
  return portraitMap.get(name);
};

// TODO: Generate PARTY_INDEX from NETWORK_CONNECTIONS.connectionType === "Party"
// TEMP: Static PARTY_INDEX
const PARTY_INDEX = [
  "Geterex",
  "Fallon",
  "Heidelburg",
  "Jodr",
  "Dejma",
  "Thim"
];

const NODE_CONN_TYPES = [
  "Party",
  "Mount",
  "Animal Companion",
  "Familiar",
  "Ally",
  "Enemy",
  "Patron",
  "Lover",
  "Spouse",
  "Master",
  "Apprentice",
  "Servant",
  "Bodyguard",
  "Tribe",
  "Wizard",
  "Sibling",
  "Shogun",
  "Rival",
  "Priest",
  "Spiritual Guide"
];

class Connection {
  constructor(
    sourceName,
    connectionType,
    connectionText,
    category,
    sourceUserID,
    name,
    image,
    connections
  ) {
    this.name = name;
    this.sourceName = sourceName;
    this.connectionType = connectionType;
    this.category = category;
    this.user = sourceUserID;
    this.image = image !== "" ? image : getRandomPortrait(name);
    this.connections = connections;
    this.connectionText = this.handleConnectionText(
      connectionText,
      name,
      sourceName
    );
    this.edges = [];
    this.hasBond = connectionText !== "";
  }

  handleConnectionText(connectionText, name, sourceName) {
    if (name === sourceName) {
      return "Your character";
    }

    if (connectionText !== "") {
      return connectionText;
    } else {
      return `${getRandomBond(name, sourceName)}`;
    }
  }

  setNode(newNode) {
    this.node = newNode;
  }

  addEdge(newEdge) {
    for (let existingEdge of this.edges) {
      if (existingEdge.id === newEdge.id) {
        return this.edges;
      }
    }

    this.edges.push(newEdge);
    return this.edges;
  }
}

const SAMPLE_BONDS = [
  "%% is puny and foolish, but amuses me.",
  "%%'s ways are strange and confusing.",
  "%% is always getting into trouble - I must protect them from themselves.",
  "%% shares my hunger for glory; the earth will tremble at our passing!",
  "This is not my first adventure with %%.",
  "I sang songs of %% long before I ever met them inperson.",
  "%% is often the butt of my jokes.",
  "I am writing a ballad about the adventures of %%.",
  "%% trusted me with a secret.",
  "%% does not trust me, and for a good reason.",
  "%% has insulted my deity; I do not trust them.",
  "%% is a good and faithful person; I trust them implicitly.",
  "%% is in constant danger, I will keep them safe.",
  "I am working on converting %% to my faith.",
  "%% smells more like prey than a hunter.",
  "The spirits spoke to me of a great danger that follows %%.",
  "I have showed %% a secret rite of the Land.",
  "%% has tasted my blood and I theirs. We are bound by it.",
  "%% owes me their life, whether they admit it or not.",
  "I have sworn to protect %%.",
  "I worry about the ability of %% to survive in the dungeon.",
  "%% is soft, but I will make them hard like me."
];

let usedBonds = [];
// let bondmap = new Map();

const getRandomBond = (targetName, sourceName) => {
  // if (bondmap.has(sourceName)) {
  //   if (bondmap.get(sourceName).has(targetName)) {
  //     return bondmap.get(sourceName).get(targetName);
  //   }
  // } else {
  //   bondmap.set(sourceName, new Map());
  // }
  let bond;

  bond = SAMPLE_BONDS[getRandomInt(SAMPLE_BONDS.length)];
  const changeBond = () => {
    bond = SAMPLE_BONDS[getRandomInt(SAMPLE_BONDS.length)];
  };

  for (let i = 0; i < 100; i++) {
    if (usedBonds.includes(bond)) {
      changeBond();
    } else {
      usedBonds.push(bond);
      continue;
    }
  }

  bond = `"${bond.replace("%%", targetName)}"`;
  // bondmap.get(sourceName).set(targetName, bond);

  return bond;
};

const generatePartyConnections = (sourceName, party) => {
  let newConnections = new Map();

  for (let pm of party) {
    if (pm !== sourceName) {
      let newConnection = new Connection(
        sourceName,
        "Party",
        `${getRandomBond(pm, sourceName)}`,
        "Player Character",
        "",
        pm,
        "",
        new Map()
      );
      newConnections.set(pm, newConnection);
    }
  }
  return newConnections;
};

const generateRandomNpcConnections = (originName) => {
  let newConnections = new Map();
  for (const connectionType of NODE_CONN_TYPES) {
    if (connectionType === "Party") continue;
    if (Math.random() < 0.1) {
      const connectionName = getRandomName();
      let newConnection = new Connection(
        originName,
        connectionType,
        "",
        "Non-Player Character",
        "",
        connectionName,
        "",
        new Map()
      );
      newConnections.set(connectionName, newConnection);
    }
  }
  return newConnections;
};

export const getNetworkConnections = (
  charName,
  party,
  connections = new Map()
) => {
  // TODO: FETCH from SERVER;
  // TEMP: Randomly Generating CONNECTIONS
  for (let partyMemberName of party) {
    const PARTY_CONNECTIONS = generatePartyConnections(partyMemberName, party);
    const NPC_CONNECTIONS = generateRandomNpcConnections(partyMemberName);
    const CONNECTIONS = new Map([...PARTY_CONNECTIONS, ...NPC_CONNECTIONS]);

    let newPartyMember = new Connection(
      charName,
      "Party",
      "",
      "Player Character",
      "userName",
      partyMemberName,
      "",
      CONNECTIONS
    );
    connections.set(partyMemberName, newPartyMember);
  }
  return connections;
};
