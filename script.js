<<<<<<< HEAD
const whiteFaces = ["1", "3", "1", "3", "2", "4"];
const purpleFaces = ["1", "2", "1", "2", "3", "⭐️"];
const cardFiles = [
  "01-Horse",
  "02-Bloody Trophy",
  "03-Shield",
  "04-Bow",
  "05-Hatchet",
  "06-Talisman",
  "07-Food",
  "08-Rosary",
  "09-Holy Water",
  "10-Lockpick",
  "101-Scalemail",
  "102-Camel",
  "103-Boat",
  "104-Scimitar",
  "105-Gunpowder Keg",
  "106-Hamsa",
  "107-Assassins Dagger",
  "108-Carpet",
  "109-Lamp",
  "11-Herbs",
  "110-Drawing",
  "111-Oriflamme",
  "112-Figure of Asclepius",
  "113-Figure of Mars",
  "114-Figure of Mercury",
  "115-Figure of Neptune",
  "116-Figure of Pluto",
  "117-Figure of Venus",
  "118-Figure of Vulcan",
  "119-Map",
  "12-Medicine",
  "120-Clay Tablet",
  "121-Cogwheel",
  "122-Stone Scarb",
  "123-Stone Cat",
  "124-Stone Owl",
  "125-Lion",
  "126-Roc",
  "127-Giant Scorpion",
  "128-Crown Jewels",
  "129-Astrolabe",
  "13-Alcohol",
  "130-Tifnagh Ring",
  "131-Wooden Chest",
  "132-Casket",
  "14-Sword",
  "15-Torch",
  "16-Trap",
  "17-Rope",
  "18-Poison",
  "19-Legal Document",
  "20-Spade",
  "201-Leeches",
  "202-Fishsing Rod",
  "203-Pike",
  "204-Anchor",
  "205-Jesters Hat",
  "206-Templar Sword",
  "207-Crystal of Echoes",
  "208-Nightingale",
  "209-Oars",
  "21-Doctors Mask",
  "210-Flying Fish",
  "211-Lionfish",
  "212-Willow Seeds",
  "213-Straw Doll",
  "214-Cat",
  "215-Counting Board",
  "216-Magnifying Glass",
  "217-Hourglass",
  "218-Quill and Ink",
  "219-Tongs",
  "22-Votive Candle",
  "220-Hand of Saint",
  "221-Ear of Saint",
  "222-Finger of Saint",
  "223-Eye of Saint",
  "224-Bible",
  "225-Cherubs Head",
  "226-Granite Wing",
  "227-Halo of Dawn",
  "228-Halo of Dusk",
  "229-Trumpet of Dawn",
  "23-Dice",
  "230-Trumpet of Dusk",
  "231-Boar",
  "232-Tainted Skull",
  "233-Vile Blood",
  "234-Darkhammer",
  "235-Lughs Tounge",
  "236-Black Chain",
  "237-Cult Ring",
  "24-Parchments",
  "25-Silver Dagger",
  "26-Dog",
  "27-Crossbow",
  "28-Will-o-Wisp",
  "29-Wolf Den Trophy",
  "30-Crucifix",
  "301-Red Ribbon",
  "302-Mead",
  "303-Breadcrumbs",
  "304-Charred Feather",
  "305-Golden Apple",
  "306-Hagstone",
  "307-Sunflowers",
  "308-Summer Wreath",
  "309-Nightshade",
  "31-Flute",
  "310-Confusing Map",
  "311-Puzzling Map",
  "312-Baffling Map",
  "313-Perplexing Map",
  "314-Mark of the Sun",
  "315-Mark of the Thunder",
  "316-Mark of the Moon",
  "317-Bronze Sword",
  "318-Broom",
  "319-Flint Arrows",
  "32-Ornamented Key",
  "320-Golden Knife",
  "321-Cauldron",
  "322-Toad",
  "323-Rooster",
  "324-Serpent",
  "325-Savage Soul",
  "326-Binding Chain",
  "327-Iron Tooth",
  "328-Evil Eye",
  "329-Shard of Will",
  "33-Chalice",
  "330-Enchanted Mortar",
  "331-Drum",
  "332-Fireflies",
  "34-Lantern",
  "35-Innocent Blood",
  "36-Corrupted Paw",
  "37-Obsidian Knife",
  "38-Occult Folio",
  "39-Horned Mask",
  "40-Hand Mirror",
  "41-Silver Spear",
  "42-Censer",
  "43-Stallion",
  "44-Signet Ring",
  "45-Sheep",
  "46-Chainmail",
  "47-Toolbox",
  "48-Devils Horn",
  "49-Divine Sword",
  "50-Lyre",
  "51-Harvest Wreath",
  "52-Copper Sickle",
  "53-Stone Idol",
  "54-Magic Flower",
  "55-Flail",
  "56-Garotte",
  "57-Tarot Card-Popess",
  "58-Tarot Card-Fool",
  "59-Tarot Card-Death",
  "60-Tarot Card-World",
  "61-Tarot Card-Judgement",
  "62-Tarot Card-Moon",
  "63-Ladder",
  "64-Ashes of Saint",
  "65-Crosier",
  "66-Crow",
  "67-Bell",
  "68-Salt",
  "69-Sacred Banner",
  "70-Heart of Saint",
  "71-Skull of Saint",
  "72-Net",
  "73-Heart of the Swarm",
  "74-Reapers Blade",
  "75-Blessed Soul",
  "76-Cursed Soul",
];

document.addEventListener("DOMContentLoaded", () => {
  const imageList = ["blank.png", "int.png", "dex.png", "str.png"];

  const imageElements = document.querySelectorAll(".cycle-image");

  imageElements.forEach((imgEl) => {
    let currentIndex = 0;

    imgEl.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % imageList.length;
      imgEl.src = imageList[currentIndex];
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  // Example: dice faces are named wd1.png through wd6.png and pd1.png through pd6.png
  const whiteFaces = [
    "wd1.png",
    "wd2.png",
    "wd3.png",
    "wd1.png",
    "wd3.png",
    "wd4.png",
  ];
  const purpleFaces = [
    "pd1.png",
    "pd2.png",
    "pd3.png",
    "pd1.png",
    "pd2.png",
    "pd4.png",
  ];

  const getRandomFace = (faces) => {
    const index = Math.floor(Math.random() * faces.length);
    return faces[index];
  };

  const rollDice = () => {
    const whiteDice = ["white-die1", "white-die2"];
    const purpleDice = [];

    document.querySelectorAll(".purple-die").forEach((img) => {
      const checkbox = img
        .closest(".die-block")
        ?.querySelector("input[type='checkbox']");
      if (checkbox?.checked) {
        purpleDice.push(img.id);
      }
    });

    const allDice = [...whiteDice, ...purpleDice];
    let count = 0;
    const totalFrames = 20;
    const interval = 100;

    const animation = setInterval(() => {
      allDice.forEach((id) => {
        const die = document.getElementById(id);
        const faces = id.includes("white") ? whiteFaces : purpleFaces;
        die.src = `dice/${getRandomFace(faces)}`;
      });
      count++;
      if (count >= totalFrames) {
        clearInterval(animation);
        // Optional: final result
        whiteDice.forEach((id) => {
          document.getElementById(id).src = `dice/${getRandomFace(whiteFaces)}`;
        });
        purpleDice.forEach((id) => {
          document.getElementById(id).src = `dice/${getRandomFace(
            purpleFaces
          )}`;
        });
      }
    }, interval);
  };

  // Add your event listener to the roll button
  document.querySelector("button").addEventListener("click", rollDice);
});

function selectOption(option) {
  localStorage.setItem("userSelection", option);
  document.getElementById("popup").style.display = "none";
  document.getElementById("userChoiceDisplay").textContent = option;
}

function openPopup() {
  document.getElementById("popup").style.display = "flex";
}

// On load, check if there's a saved selection
window.onload = function () {
  const saved = localStorage.getItem("userSelection");
  if (saved) {
    document.getElementById("userChoiceDisplay").textContent = saved;
  } else {
    openPopup();
  }
};
function showCard(button) {
  const box = button.parentElement;
  const input = box.querySelector("input");
  const display = box.querySelector(".card-display");
  const number = input.value.trim();
  const match = cardFiles.find((name) => name.startsWith(number + "-"));

  if (match) {
    display.innerHTML = `<img src="cards/items/${match}.gif" alt="Card ${number}">`;
  } else {
    display.innerHTML = `<p>No card found for #${number}</p>`;
  }
}
=======
const whiteFaces = ["1", "3", "1", "3", "2", "4"];
const purpleFaces = ["1", "2", "1", "2", "3", "⭐️"];

document.addEventListener("DOMContentLoaded", () => {
  const imageList = ["blank.png", "int.png", "dex.png", "str.png"];

  const imageElements = document.querySelectorAll(".cycle-image");

  imageElements.forEach((imgEl) => {
    let currentIndex = 0;

    imgEl.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % imageList.length;
      imgEl.src = imageList[currentIndex];
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  // Example: dice faces are named wd1.png through wd6.png and pd1.png through pd6.png
  const whiteFaces = ["wd1.png", "wd2.png", "wd3.png", "wd1.png", "wd3.png", "wd4.png"];
  const purpleFaces = ["pd1.png", "pd2.png", "pd3.png", "pd1.png", "pd2.png", "pd4.png"];

  const getRandomFace = (faces) => {
    const index = Math.floor(Math.random() * faces.length);
    return faces[index];
  };

  const rollDice = () => {
    const whiteDice = ["white-die1", "white-die2"];
    const purpleDice = [];

    document.querySelectorAll('.purple-die').forEach(img => {
      const checkbox = img.closest(".die-block")?.querySelector("input[type='checkbox']");
      if (checkbox?.checked) {
        purpleDice.push(img.id);
      }
    });

    const allDice = [...whiteDice, ...purpleDice];
    let count = 0;
    const totalFrames = 20;
    const interval = 100;

    const animation = setInterval(() => {
      allDice.forEach(id => {
        const die = document.getElementById(id);
        const faces = id.includes("white") ? whiteFaces : purpleFaces;
        die.src = `dice/${getRandomFace(faces)}`;
      });
      count++;
      if (count >= totalFrames) {
        clearInterval(animation);
        // Optional: final result
        whiteDice.forEach(id => {
          document.getElementById(id).src = `dice/${getRandomFace(whiteFaces)}`;
        });
        purpleDice.forEach(id => {
          document.getElementById(id).src = `dice/${getRandomFace(purpleFaces)}`;
        });
      }
    }, interval);
  };

  // Add your event listener to the roll button
  document.querySelector("button").addEventListener("click", rollDice);
});

>>>>>>> ba2d2acc1a4ae9e469b33682d7381d7225be2b2e
