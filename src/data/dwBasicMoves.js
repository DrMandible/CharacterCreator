export const DW_BASIC_MOVES = {
  "Hack and Slash": {
    moveName: "Hack and Slash",
    trigger: "When you attack an enemy in melee",
    roll: true,
    modifier: "STR",
    failDescription: "",
    swcDescription:
      "Deal your damage to the enemy and the enemy makes an attack against you.",
    successDescription:
      "Deal your damage to the enemy and avoid their attack. At your option, you may choose to do +1d6 damage but expose yourself to the enemy’s attack.",
    description:
      "Hack and slash is for attacking a prepared enemy plain and simple. If the enemy isn’t prepared for your attack—if they don’t know you’re there or they’re restrained and helpless—then that’s not hack and slash. You just deal your damage or murder them outright, depending on the situation. Nasty stuff. The enemy’s counterattack can be any GM move made directly with that creature. A goblin might just attack you back, or they might jam a poisoned needle into your veins. Life’s tough, isn’t it? Note that an “attack” is some action that a player undertakes that has a chance of causing physical harm to someone else. Attacking a dragon with inch-thick metal scales full of magical energy using a typical sword is like swinging a meat cleaver at a tank: it just isn’t going to cause any harm, so hack and slash doesn’t apply. Note that circumstances can change that: if you’re in a position to stab the dragon on its soft underbelly (good luck with getting there) it could hurt, so it’s an attack. If the action that triggers the move could reasonably hurt multiple targets roll once and apply damage to each target (they each get their armor). Some attacks may have additional effects depending on the triggering action, the circumstances, or the weapons involved. An attack could also knock someone down, restrain them, or leave a big bloody splatter.",
    type: "Core",
    source: "Basic"
  },
  Volley: {
    moveName: "Volley",
    trigger: "When you take aim and shoot at an enemy at range",
    roll: true,
    modifier: "DEX",
    failDescription: "",
    swcDescription:
      "Choose one (whichever you choose you deal your damage):?*?You have to move to get the shot placing you in danger as described by the GM?*?You have to take what you can get: -1d6 damage?*?You have to take several shots, reducing your ammo by one",
    successDescription: "You have a clear shot—deal your damage",
    description:
      "Volley covers the entire act of drawing, aiming, and firing a ranged weapon or throwing a thrown weapon. The advantage to using a ranged weapon over melee is that the attacker is less likely to be attacked back. Of course they do have to worry about ammunition and getting a clear shot though.\nOn a 7–9, read “danger” broadly. It can be bad footing or ending in the path of a sword or maybe just giving up your sweet sniper nest to your enemies. Whatever it is, it’s impending and it’s always something that causes the GM to say “What do you do?” Quite often, the danger will be something that will then require you to dedicate yourself to avoiding it or force you to defy danger.\nIf you’re throwing something that doesn’t have ammo (maybe you’ve got a move that makes your shield throwable) you can’t choose to mark off ammo. Choose from the other two options instead.",
    type: "Core",
    source: "Basic"
  },
  "Defy Danger": {
    moveName: `Defy Danger`,
    trigger: `When you act despite an imminent threat or suffer a calamity, say how you deal with it`,
    roll: true,
    modifier: `ANY`,
    failDescription: ``,
    swcDescription: `You stumble, hesitate, or flinch: the GM will offer you a worse outcome, hard bargain, or ugly choice.`,
    successDescription: `You do what you set out to, the threat doesn’t come to bear.`,
    description: `If you do it
    ?*?by powering through, +Str
    ?*?by getting out of the way or acting fast, +Dex
    ?*?by enduring, +Con
    ?*?with quick thinking, +Int
    ?*?through mental fortitude, +Wis
    ?*?using charm and social grace, +Cha
    
    You defy danger when you do something in the face of impending peril. This may seem like a catch-all. It is! Defy danger is for those times when it seems like you clearly should be rolling but no other move applies.

Defy danger also applies when you make another move despite danger not covered by that move. For example, hack and slash assumes that’s you’re trading blows in battle—you don’t need to defy danger because of the monster you’re fighting unless there’s some specific danger that wouldn’t be part of your normal attack. On the other hand, if you’re trying to hack and slash while spikes shoot from hidden traps in the walls, those spikes are a whole different danger.

Danger, here, is anything that requires resilience, concentration, or poise. This move will usually be called for by the GM. She’ll tell you what the danger is as you make the move. Something like “You’ll have to defy danger first. The danger is the steep and icy floor you’re running across. If you can keep your footing, you can make it to the door before the necromancer’s magic gets you.”

Which stat applies depends on what action you take and your action has to trigger the move. That means you can’t defy danger from a steep and icy floor with a charming smile just so you can use Cha, since charmingly smiling at the icy floor does nothing to it. On the other hand, making a huge leap over the ice would be Str, placing your feet carefully would be Dex, and so on. Make the move to get the results.`,
    type: `Core`,
    source: `Basic`
  },
  Defend: {
    moveName: `Defend`,
    trigger: `When you stand in defense of a person, item, or location under attack`,
    roll: true,
    modifier: `ANY`,
    failDescription: ``,
    swcDescription: `Hold 1`,
    successDescription: `Hold 3`,
    description: `As long as you stand in defense, when you or the thing you defend is attacked you may spend hold, 1 for 1, to choose an option:

    Redirect an attack from the thing you defend to yourself
    ?*?Halve the attack’s effect or damage
    ?*?Open up the attacker to an ally giving that ally +1 forward against the attacker
    ?*?Deal damage to the attacker equal to your level`,
    type: `Core`,
    source: `Basic`
  },
  "Spout Lore": {
    moveName: `Spout Lore`,
    trigger: `When you consult your accumulated knowledge about something`,
    roll: true,
    modifier: `INT`,
    failDescription: ``,
    swcDescription: `The GM will only tell you something interesting—it’s on you to make it useful. The GM might ask you “How do you know this?” Tell them the truth, now.`,
    successDescription: `The GM will tell you something interesting and useful about the subject relevant to your situation.`,
    description: `You spout lore any time you want to search your memory for knowledge or facts about something. You take a moment to ponder the things you know about the Orcish Tribes or the Tower of Ul’dammar and then reveal that knowledge.

    The knowledge you get is like consulting a bestiary, travel guide, or library. You get facts about the subject matter. On a 10+ the GM will show you how those facts can be immediately useful, on a 7–9 they’re just facts.
    
    On a miss the GM’s move will often involve the time you take thinking. Maybe you miss that goblin moving around behind you, or the tripwire across the hallway. It’s also a great chance to reveal an unwelcome truth.`,
    type: `Core`,
    source: `Basic`
  },
  "Discern Realities": {
    moveName: `Discern Realities`,
    trigger: `When you closely study a situation or person`,
    roll: true,
    modifier: `WIS`,
    failDescription: ``,
    swcDescription: `Ask 1 question from the list.`,
    successDescription: `Ask the GM 3 questions from the list.

    ?*?What happened here recently?
    ?*?What is about to happen?
    ?*?What should I be on the lookout for?
    ?*?What here is useful or valuable to me?
    ?*?Who’s really in control here?
    ?*?What here is not what it appears to be?`,
    description: `Take +1 forward when acting on the answers. 

    To discern realities you must closely observe your target. That usually means interacting with it or watching someone else do the same. You can’t just stick your head in the doorway and discern realities about a room. You’re not merely scanning for clues—you have to look under and around things, tap the walls, and check for weird dust patterns on the bookshelves. That sort of thing.

    Discerning realities isn’t just about noticing a detail, it’s about figuring out the bigger picture. The GM always describes what the player characters experience honestly, so during a fight the GM will say that the kobold mage stays at the other end of the hall. Discerning realities could reveal the reason behind that: the kobold’s motions reveal that he’s actually pulling energy from the room behind him, he can’t come any closer.
    
    Just like spout lore, the answers you get are always honest ones. Even if the GM has to figure it out on the spot. Once they answer, it’s set in stone. You’ll want to discern realities to find the truth behind illusions—magical or otherwise.
    
    Unless a move says otherwise players can only ask questions from the list. If a player asks a question not on the list the GM can tell them to try again or answer a question from the list that seems equivalent.
    
    Of course, some questions might have a negative answer, that’s fine. If there really, honestly is nothing useful or valuable here, the GM will answer that question with “Nothing, sorry.”`,
    type: `Core`,
    source: `Basic`
  },
  Parley: {
    moveName: `Parley`,
    trigger: `When you have leverage on a GM Character and manipulate them`,
    roll: true,
    modifier: `CHA`,
    failDescription: ``,
    swcDescription: `They will do what you ask, but need some concrete assurance of your promise, right now.`,
    successDescription: `They do what you ask if you first promise what they ask of you.`,
    description: `Leverage is something they need or want.
    
    Parley covers a lot of ground including old standbys like intimidation and diplomacy. You know you’re using parley when you’re trying to get someone to do something for you by holding a promise or threat over them. Your leverage can be nasty or nice, the tone doesn’t matter.

    Merely asking someone politely isn’t parleying. That’s just talking. You say, “Can I have that magic sword?” and Sir Telric says, “Hell no, this is my blade, my father forged it and my mother enchanted it” and that’s that. To parley, you have to have leverage. Leverage is anything that could lure the target of your parley to do something for you. Maybe it’s something they want or something they don’t want you to do. Like a sack of gold. Or punching them in the face. What counts as leverage depends on the people involved and the request being made. Threaten a lone goblin with death and you have leverage. Threaten a goblin backed up by his gang with death and he might think he’s better off in a fight.

    On a 7+ they ask you for something related to whatever leverage you have. If your leverage is that you’re standing before them sharpening your knife and insinuating about how much you’d like to shank them with it they might ask you to let them go. If your leverage is your position in court above them they might ask for a favor.

    Whatever they ask for, on a 10+, you just have to promise it clearly and unambiguously. On a 7–9, that’s not enough: you also have to give them some assurance, right now, before they do what you want. If you promise that you’ll ensure their safety from the wolves if they do what you want and you roll a 7–9 they won’t do their part until you bring a fresh wolf pelt to prove you can do it, for example. It’s worth noting that you don’t actually have to keep your promise. Whether you’ll follow up or not, well, that’s up to you. Of course breaking promises leads to problems. People don’t take kindly to oath-breakers and aren’t likely to deal with them in the future.

    In some cases when you state what you want you may include a possible promise for the creature to make, as in “flee and I’ll let you live.” It’s up to the target of the parley if that’s the promise they want or if they have something else in mind. They can say “yes, let me live and I’ll go” (with assurances, if you rolled a 7–9) or “promise me you won’t follow me.”`,
    type: `Core`,
    source: `Basic`
  },
  "Aid or Interfere": {
    moveName: `Aid or Interfere`,
    trigger: `When you help or hinder someone you have a bond with`,
    roll: true,
    modifier: `CHA`,
    failDescription: ``,
    swcDescription: `You also expose yourself to danger, retribution, or cost.`,
    successDescription: `They take +1 or -2, your choice.`,
    description: `Leverage is something they need or want.
    
    Parley covers a lot of ground including old standbys like intimidation and diplomacy. You know you’re using parley when you’re trying to get someone to do something for you by holding a promise or threat over them. Your leverage can be nasty or nice, the tone doesn’t matter.

    Merely asking someone politely isn’t parleying. That’s just talking. You say, “Can I have that magic sword?” and Sir Telric says, “Hell no, this is my blade, my father forged it and my mother enchanted it” and that’s that. To parley, you have to have leverage. Leverage is anything that could lure the target of your parley to do something for you. Maybe it’s something they want or something they don’t want you to do. Like a sack of gold. Or punching them in the face. What counts as leverage depends on the people involved and the request being made. Threaten a lone goblin with death and you have leverage. Threaten a goblin backed up by his gang with death and he might think he’s better off in a fight.

    On a 7+ they ask you for something related to whatever leverage you have. If your leverage is that you’re standing before them sharpening your knife and insinuating about how much you’d like to shank them with it they might ask you to let them go. If your leverage is your position in court above them they might ask for a favor.

    Whatever they ask for, on a 10+, you just have to promise it clearly and unambiguously. On a 7–9, that’s not enough: you also have to give them some assurance, right now, before they do what you want. If you promise that you’ll ensure their safety from the wolves if they do what you want and you roll a 7–9 they won’t do their part until you bring a fresh wolf pelt to prove you can do it, for example. It’s worth noting that you don’t actually have to keep your promise. Whether you’ll follow up or not, well, that’s up to you. Of course breaking promises leads to problems. People don’t take kindly to oath-breakers and aren’t likely to deal with them in the future.

    In some cases when you state what you want you may include a possible promise for the creature to make, as in “flee and I’ll let you live.” It’s up to the target of the parley if that’s the promise they want or if they have something else in mind. They can say “yes, let me live and I’ll go” (with assurances, if you rolled a 7–9) or “promise me you won’t follow me.”`,
    type: `Core`,
    source: `Basic`
  }
};
