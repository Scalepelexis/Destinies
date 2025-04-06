import { dataLibrary } from "./lib.js";

// Use dice face values from dataLibrary
const whiteFaces = dataLibrary.whiteFaces.map((v) => `wd${v}.png`);
const purpleFaces = dataLibrary.purpleFaces.map((v) => {
  if (v === "⭐️") return "pd4.png";
  return `pd${v}.png`;
});

const cardFiles = dataLibrary.items;

// Set option for campaign
const label = document.getElementById("userChoiceDisplay");
if (label) {
  label.textContent = option;
}

// Utility function to get random die face
const getRandomFace = (faces) => {
  const index = Math.floor(Math.random() * faces.length);
  return faces[index];
};

// Roll selected dice
const rollDice = () => {
  const whiteDice = ["white-die1", "white-die2"];
  const purpleDice = Array.from(document.querySelectorAll(".purple-die"))
    .filter(
      (img) =>
        img.closest(".die-block")?.querySelector("input[type='checkbox']")
          ?.checked
    )
    .map((img) => img.id);

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
    }
  }, interval);
};

// Increment/Decrement tracker inputs
const setupNumberControls = () => {
  document.querySelectorAll(".custom-number-input").forEach((container) => {
    const input = container.querySelector('input[type="number"]');
    const increment = container.querySelector(".increment");
    const decrement = container.querySelector(".decrement");

    increment.addEventListener("click", () => input.stepUp());
    decrement.addEventListener("click", () => input.stepDown());
  });
};

// Card image viewer
const showCard = (button) => {
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
};

const updateCharacterCard = (campaign) => {
  const container = document.getElementById("characterCardContainer");
  if (container) {
    container.innerHTML = `<img src="cards/Character/${campaign}/character.gif" alt="${campaign} Character">`;
  }
};

// Campaign selection
const selectOption = (option) => {
  localStorage.setItem("userSelection", option);

  const label = document.getElementById("userChoiceDisplay");
  if (label) label.textContent = option;

  updateCharacterCard(option); // (still shows the default one)
  populateCharacterDropdown(option); // <-- Add this line

  // Highlight selected
  document.querySelectorAll(".campaign-btn").forEach((btn) => {
    btn.classList.remove("selected");
    const img = btn.querySelector("img");
    if (img?.alt === option) {
      btn.classList.add("selected");
    }
  });
};

// Character Select Dropdown
const populateCharacterDropdown = (campaign) => {
  const characters = dataLibrary[campaign];
  const container = document.getElementById("characterDropdownContainer");
  const dropdown = document.getElementById("characterSelect");

  if (!characters || !container || !dropdown) return;

  dropdown.innerHTML = `<option value="">-- Select a character --</option>`;

  characters.forEach((name) => {
    const option = document.createElement("option");
    option.value = name;
    option.textContent = name.replace(/_/g, " ");
    dropdown.appendChild(option);
  });

  container.style.display = "block";
};

// DOMContentLoaded init
window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("rollDiceBtn")?.addEventListener("click", rollDice);
  setupNumberControls();

  const saved = localStorage.getItem("userSelection");
  if (saved) {
    selectOption(saved); // this handles both display and highlight now
  }

  document.querySelectorAll(".card-box button").forEach((btn) => {
    btn.addEventListener("click", () => showCard(btn));
  });

  document
    .getElementById("characterSelect")
    ?.addEventListener("change", (e) => {
      const character = e.target.value;
      const campaign =
        document.getElementById("userChoiceDisplay")?.textContent;

      if (character) {
        const container = document.getElementById("characterCardContainer");
        container.innerHTML = `<img src="cards/Character/${campaign}/${character}.gif" alt="${character}">`;
      }
    });
});

// Export to global (for inline HTML use if needed)
window.selectOption = selectOption;
window.showCard = showCard;
