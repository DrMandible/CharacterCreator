/*
  TODO:
  1.
*/

import { DW_BASIC_MOVES } from "./dwBasicMoves";
import { getNetworkConnections } from "./charNetworkConnections";
// import * as allPlaybookMoves from "./data/playbookMoves";

let dwAbilities = [
  "Strength",
  "Dexterity",
  "Constitution",
  "Intelligence",
  "Wisdom",
  "Charisma"
];

let persAbilities = ["Intellect", "Creativity"];
let persAspects = ["Curiosity", "Discipline", "Humor", "Trust", "Stability"];

let spirAbilities = ["Resolve", "Judgment"];
let spirAspects = ["Love", "Honesty", "Loyalty", "Piety", "Individualism"];

let showStatsOptions = {
  "Dungeon World": dwAbilities,
  Personality: persAbilities,
  Spiritual: spirAbilities
};

export const Character = () => {
  let name = "Fallon";
  let playbook = "Barbarian";
  let lineage = "Midlander";

  let options = {
    statLists: [dwAbilities]
  };

  let stats = {};

  const getStats = () => {
    for (let statList of options.statLists) {
      for (let stat of statList) {
        stats[stat] = 10;
      }
    }
  };

  getStats();
  // for (let abil of dwAbilities) {
  //   stats[abil] = 10;
  // }
  // for (let abil of [...persAbilities, ...spirAbilities]) {
  //   stats[abil] = 10;
  // }
  // for (let aspect of [...persAspects, ...spirAspects]) {
  //   stats[aspect] = 10;
  // }

  let journalEntries = [];

  let rolls = [];
  let challenges = [];

  let dwBasicMoves = DW_BASIC_MOVES;
  let playerMoves = [];

  // let getPlaybookMoves = () => allPlaybookMoves[playbook];
  let connections = getNetworkConnections(name);
  let image = connections.get(name).image;
  // console.log(name, connections);

  // console.log(connections);
  return {
    name,
    image,
    playbook,
    lineage,
    stats,
    dwBasicMoves,
    challenges,
    connections,
    journalEntries
  };
};
