import { dataLibrary } from "./lib.js";

const cardFiles = dataLibrary.items;

document.addEventListener("DOMContentLoaded", () => {
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
        die.src = `UI/dice/${getRandomFace(faces)}`;
      });
      count++;
      if (count >= totalFrames) {
        clearInterval(animation);
        // Optional: final result
        whiteDice.forEach((id) => {
          document.getElementById(id).src = `UI/dice/${getRandomFace(
            whiteFaces
          )}`;
        });
        purpleDice.forEach((id) => {
          document.getElementById(id).src = `UI/dice/${getRandomFace(
            purpleFaces
          )}`;
        });
      }
    }, interval);
  };

  // Add your event listener to the roll button
  document.getElementById("rollDiceBtn")?.addEventListener("click", rollDice);
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
