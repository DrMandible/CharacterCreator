/*
  TODO:
  1.
*/

import { DW_BASIC_MOVES } from './dwBasicMoves';
import { getNetworkConnections } from './charNetworkConnections';
// import * as allPlaybookMoves from "./data/playbookMoves";

let dwAbilities = [
  'Strength',
  'Dexterity',
  'Constitution',
  'Intelligence',
  'Wisdom',
  'Charisma'
];

let persAbilities = ['Intellect', 'Creativity'];
let persAspects = ['Curiosity', 'Discipline', 'Humor', 'Trust', 'Stability'];

let spirAbilities = ['Resolve', 'Judgment'];
let spirAspects = ['Love', 'Honesty', 'Loyalty', 'Piety', 'Individualism'];

export const Character = () => {
  let name = 'Fallon';
  let playbook = 'Barbarian';
  let lineage = 'Midlander';
  let stats = {};
  for (let abil of dwAbilities) {
    stats[abil] = 10;
  }
  for (let abil of [...persAbilities, ...spirAbilities]) {
    stats[abil] = 10;
  }
  for (let aspect of [...persAspects, ...spirAspects]) {
    stats[aspect] = 10;
  }

  let rolls = [];
  let challenges = [];

  let dwBasicMoves = DW_BASIC_MOVES;
  let playerMoves = [];

  // let getPlaybookMoves = () => allPlaybookMoves[playbook];
  let connections = getNetworkConnections(name);
  let image = connections.get(name).image;
  // console.log(name, connections);

  const getFstats = () => {
    let fstats = {
      'Dungeon World': {
        abilities: {}
      },
      Personality: {
        abilities: {},
        aspects: {}
      },
      Spirit: {
        abilities: {},
        aspects: {}
      }
    };
    for (let ability of persAbilities) {
      fstats.Personality.abilities[ability] = stats[ability];
    }
    for (let ability of persAspects) {
      fstats.Personality.aspects[ability] = stats[ability];
    }
    for (let ability of spirAbilities) {
      fstats.Spirit.abilities[ability] = stats[ability];
    }
    for (let ability of spirAspects) {
      fstats.Spirit.aspects[ability] = stats[ability];
    }
    return fstats;
  };
  // console.log(connections);
  return {
    name,
    image,
    playbook,
    lineage,
    stats,
    dwBasicMoves,
    challenges,
    getFstats,
    connections
  };
};
