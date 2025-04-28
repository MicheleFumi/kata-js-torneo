const fighters = [
  {
    name: "Freezer",
    power: 8000,
  },
  {
    name: "Vegeta",
    power: 8500,
  },
  {
    name: "Crilin",
    power: 500,
  },
  {
    name: "Mr Satan",
    power: 50,
  },
  {
    name: "Junior",
    power: 6000,
  },
  {
    name: "Goku",
    power: 9001,
  },
  {
    name: "Tensing",
    power: 450,
  },
  {
    name: "Videl",
    power: 300,
  },
  {
    name: "Bulma",
    power: 20,
  },
  {
    name: "C-18",
    power: 7800,
  },
  {
    name: "Gohan",
    power: 8900,
  },
  {
    name: "Trunks",
    power: 1250,
  },
];

const weapons = [
  {
    name: "Ventaglio della Musa",
    power: 15,
  },
  {
    name: "Scouter",
    power: 30,
  },
  {
    name: "Bastone Roshi",
    power: 60,
  },
  {
    name: "Fagioli Magici",
    power: 70,
  },
  {
    name: "Katana di Yajirobei",
    power: 85,
  },
  {
    name: "Spada del Dragone Azzurro",
    power: 115,
  },
  {
    name: "Armatura Saiyan",
    power: 145,
  },
  {
    name: "Cannone da braccio",
    power: 170,
  },
  {
    name: "Nuvola d'oro",
    power: 200,
  },
  {
    name: "Bastone Nyoi",
    power: 220,
  },
  {
    name: "Spada Z",
    power: 235,
  },
  {
    name: "Orecchini Potara",
    power: 250,
  },
];

/* assegnazione arma */

let weaponsArray = [...weapons];
let armoredFighters = fighters.map((fighter) => {
  let randomWeapon = weapons[Math.floor(Math.random() * weapons.length)];
  weaponsArray = weaponsArray.filter((weapon) => {
    weapon.name != randomWeapon.name;
  });
  return { ...fighter, weapon: randomWeapon };
});
console.log("assegnazione arma", armoredFighters);

/* allenamento */

const training = armoredFighters.map((fighter) => {
  let fighterLevel = fighter.power + fighter.weapon.power;
  const multiplier = Math.floor(Math.random() * 100) + 1;
  const probabilityOfMulti = Math.random().toFixed();

  if (probabilityOfMulti == 1) {
    let levelMultiplied = fighterLevel * multiplier;
    return { ...fighter, totalLevel: levelMultiplied };
  } else {
    return { ...fighter, totalLevel: fighterLevel };
  }
});
console.log("sessione allenamento", training);

/* qualificazioni */
const qualificationPassed = training.filter(
  (fighter) => fighter.totalLevel >= 2000
);
const firstDraftWinners = [];

let filteredQualification = [...qualificationPassed];
if (qualificationPassed.length % 2 !== 0) {
  /* const robot = { name: "Robot", power: 4000 };
  qualificationPassed.push(robot); */
  const fortunello = qualificationPassed[qualificationPassed.length - 1];
  filteredQualification = filteredQualification.filter(
    (fighter) => fighter != fortunello
  );
}

console.log("giocatori qualificati", qualificationPassed);

/* inizio torneo */
function fight(fighters) {
  let nextTurn = [];

  const losers = [];
  for (let i = 0; i < fighters.length; i += 2) {
    const firstFighter = fighters[i];
    const secondFighter = fighters[i + 1];
    if (firstFighter.totalLevel >= secondFighter.totalLevel) {
      nextTurn.push(firstFighter);
      losers.push(secondFighter);
    } else {
      nextTurn.push(secondFighter);
      losers.push(firstFighter);
    }
  }
  if (nextTurn.length % 2 !== 0 && nextTurn.length > 1) {
    nextTurn.push(losers[Math.floor(Math.random() * losers.length)]);
  }

  return nextTurn;
}
const primoTurno = fight(filteredQualification);
console.log("primo turno", primoTurno);

/* inizio torneo */

const secondoTurno = fight(primoTurno);

console.log("secondo turno", secondoTurno);

/* FINALEEE */

const finale = fight(secondoTurno);

console.log("finale", finale);
