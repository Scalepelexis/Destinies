import { dataLibrary } from "./lib.js";

// Map item numbers to names
const itemNameMap = {};
dataLibrary.items.forEach((file) => {
  const [num, ...nameParts] = file.split("-");
  itemNameMap[num] = nameParts.join("-"); // handles hyphenated names
});

// Use dice face values from dataLibrary
const whiteFaces = dataLibrary.whiteFaces.map((v) => `wd${v}.png`);
const purpleFaces = dataLibrary.purpleFaces.map((v) => {
  if (v === "⭐️") return "pd4.png";
  return `pd${v}.png`;
});

const cardFiles = dataLibrary.items;

// Shop menu
const shopIcon = document.getElementById("shopMenuIcon");
const shopSidebar = document.getElementById("shopSidebar");

const toggleShop = () => {
  shopSidebar.classList.toggle("open");
};

shopIcon.addEventListener("click", toggleShop);

let inventory = [];

function addCardToInventory(cardImage) {
  if (inventory.length >= 7) return;

  const container = document.getElementById("inventoryCards");

  const cardWrapper = document.createElement("div");
  cardWrapper.className = "card-wrapper";

  const img = document.createElement("img");
  img.src = `${cardImage}.gif`;
  img.className = "card-img";
  img.alt = "Card";

  const removeBtn = document.createElement("button");
  removeBtn.className = "remove-card-btn";
  removeBtn.innerHTML = "✖";
  removeBtn.title = "Remove card";

  removeBtn.addEventListener("click", () => {
    container.removeChild(cardWrapper);
    inventory = inventory.filter((img) => img !== cardImage);
  });

  cardWrapper.appendChild(removeBtn);
  cardWrapper.appendChild(img);
  container.appendChild(cardWrapper);

  inventory.push(cardImage);
}

function addCardToShop(cardImage) {
  const shopContainer = document.getElementById("shopCardContainer");
  const card = document.createElement("div");
  card.className = "card-slot";
  card.style.backgroundImage = `url(${cardImage})`;

  shopContainer.appendChild(card);
}

function handleAddCard() {
  const input = document.getElementById("cardNumberInput");
  const number = parseInt(input.value, 10);

  if (isNaN(number) || number < 1) return;

  const prefix = number < 10 ? `0${number}` : `${number}`;
  const match = cardFiles.find((file) => file.startsWith(`${prefix}-`));

  if (match) {
    const baseName = match.replace(/\.gif$/i, "");
    addCardToInventory(`cards/items/${baseName}`);
    console.log("Trying to load:", `cards/items/${match}`);
  } else {
    alert(`No card found for number ${number}`);
  }
}

function toggleFolder(folderId) {
  const content = document.getElementById(folderId);
  content.classList.toggle("open");
}

// Toggle chip selection on click
document.querySelectorAll(".chip").forEach((chip) => {
  chip.addEventListener("click", () => {
    chip.classList.toggle("selected");
  });
});

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
    const display = container.querySelector(".display-value");
    const increment = container.querySelector(".increment");
    const decrement = container.querySelector(".decrement");

    increment.addEventListener("click", () => {
      let current = parseInt(display.textContent, 10);

      // Cap at 3 if this is the refreshValue element
      if (display.id === "refreshValue") {
        if (current < 3) {
          display.textContent = current + 1;
        }
      } else {
        display.textContent = current + 1;
      }
    });

    decrement.addEventListener("click", () => {
      let current = parseInt(display.textContent, 10);
      if (current > 0) {
        display.textContent = current - 1;
      }
    });
  });
};

const updateCharacterCard = (campaign) => {
  const container = document.getElementById("characterCardContainer");
  if (container) {
    container.innerHTML = `
      <div class="character-card-pair">
        <img 
          src="cards/Character/${campaign}/character.gif" 
          alt="${campaign} Character Front"
        />
        <img 
          src="cards/Character/${campaign}/back/character_back.gif" 
          alt="${campaign} Character Back"
        />
      </div>
    `;
  }
};

// Campaign selection
const selectOption = (option) => {
  localStorage.setItem("userSelection", option);

  // Set option for campaign
  const label = document.getElementById("userChoiceDisplay");
  if (label) {
    label.textContent = option;
  }

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

  document
    .getElementById("characterSelect")
    ?.addEventListener("change", (e) => {
      const character = e.target.value;
      const campaign =
        document.getElementById("userChoiceDisplay")?.textContent;

      if (character) {
        const container = document.getElementById("characterCardContainer");
        container.innerHTML = `
        <div class="character-card-pair">
          <img 
            src="cards/Character/${campaign}/${character}.gif" 
            alt="${character} Front"
          />
          <img 
            src="cards/Character/${campaign}/back/${character}_back.gif" 
            alt="${character} Back"
          />
        </div>
        `;
      }
    });

  document
    .getElementById("addCardBtn")
    ?.addEventListener("click", handleAddCard);

  // Trade stack logic
  const tradeStackNameInput = document.getElementById("tradeStackNameInput");
  const submitTradeStackBtn = document.getElementById("submitTradeStack");
  const tradeInput = document.getElementById("tradeInput");
  const allTradeStacks = document.getElementById("allTradeStacks");
  const tradePreview = document.getElementById("tradePreview");

  createTradeStackBtn.addEventListener("click", () => {
    const inputContainer = document.getElementById("tradeStackInputContainer");
    inputContainer.classList.remove("hidden");
    inputContainer.classList.add("visible");
  });

  // Put this near the top if not already:
let currentPreview = null;

// Handler for creating a trader stack
submitTradeStackBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  e.preventDefault();

  const name = tradeStackNameInput.value.trim();
  const rawInput = tradeInput.value;
  const numbers = rawInput.split(",").map((n) => n.trim().padStart(2, "0"));

  if (!name || numbers.length === 0) return;

  const container = document.createElement("div");
  container.className = "ts-container";
  container.setAttribute("data-stack-name", name);

  // Create the trader name header
  const header = document.createElement("div");
  header.className = "ts-header";
  header.textContent = name;

  // Toggle open/close items
  header.addEventListener("click", () => {
    list.style.display = list.style.display === "none" ? "block" : "none";
  });

  // Create the item list
  const list = document.createElement("ul");
  list.className = "ts-list";
  list.style.display = "none";

  numbers.forEach((num) => {
    const itemName = itemNameMap[num];
    if (!itemName) return;

    const li = document.createElement("li");
    li.className = "ts-list-item";

    const nameSpan = document.createElement("span");
    nameSpan.className = "ts-name";
    nameSpan.textContent = itemName.replace(/_/g, " ");

    // Click to preview item (mobile friendly)
    nameSpan.addEventListener("click", () => {
      if (currentPreview === nameSpan.textContent) {
        tradePreview.innerHTML = "";
        currentPreview = null;
      } else {
        tradePreview.innerHTML = `
          <img 
            src="cards/items/${num}-${itemName}.gif" 
            alt="${itemName}" 
            class="card-img"
          />
        `;
        currentPreview = nameSpan.textContent;
      }
    });

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "✖";
    removeBtn.title = "Remove item";
    removeBtn.className = "trade-remove-btn";
    removeBtn.addEventListener("click", () => {
      li.remove();
      tradePreview.innerHTML = "";
    });

    li.appendChild(nameSpan);
    li.appendChild(removeBtn);
    list.appendChild(li);
  });

  // Add "Add Item" and "Delete Stack" buttons
  const controlRow = document.createElement("div");
  controlRow.className = "mt-1 mb-2";

  const addItemBtn = document.createElement("button");
  addItemBtn.textContent = "Add Item";
  addItemBtn.addEventListener("click", () => {
    const itemNum = prompt("Enter item number (e.g. 15):");
    if (!itemNum) return;

    const num = itemNum.trim().padStart(2, "0");
    const itemName = itemNameMap[num];
    if (!itemName) {
      alert("Invalid item number.");
      return;
    }

    const li = document.createElement("li");
    li.className = "ts-list-item";

    const nameSpan = document.createElement("span");
    nameSpan.className = "ts-name";
    nameSpan.textContent = itemName.replace(/_/g, " ");

    nameSpan.addEventListener("click", () => {
      if (currentPreview === nameSpan.textContent) {
        tradePreview.innerHTML = "";
        currentPreview = null;
      } else {
        tradePreview.innerHTML = `
          <img 
            src="cards/items/${num}-${itemName}.gif" 
            alt="${itemName}" 
            class="card-img"
          />
        `;
        currentPreview = nameSpan.textContent;
      }
    });

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "✖";
    removeBtn.title = "Remove item";
    removeBtn.className = "trade-remove-btn";
    removeBtn.addEventListener("click", () => {
      li.remove();
      tradePreview.innerHTML = "";
    });

    li.appendChild(nameSpan);
    li.appendChild(removeBtn);
    list.appendChild(li);
  });

  const deleteStackBtn = document.createElement("button");
  deleteStackBtn.textContent = "Delete Stack";
  deleteStackBtn.addEventListener("click", () => {
    if (confirm(`Delete trader stack "${name}"?`)) {
      container.remove();
      tradePreview.innerHTML = "";
    }
  });

  controlRow.appendChild(addItemBtn);
  controlRow.appendChild(deleteStackBtn);

  // Build the container
  container.appendChild(header);
  container.appendChild(list);
  container.appendChild(controlRow);
  allTradeStacks.appendChild(container);

  // Reset input
  tradeStackNameInput.value = "";
  tradeInput.value = "";

  const inputContainer = document.getElementById("tradeStackInputContainer");
  inputContainer.classList.remove("visible");
  inputContainer.classList.add("hidden");
});

 

  const characterNameInput = document.getElementById("characterNameInput");
  const addCharacterCardBtn = document.getElementById("addCharacterCardBtn");
  const characterCardList = document.getElementById("characterCardList");
  const characterCardPreview = document.getElementById("characterCardPreview");

  addCharacterCardBtn.addEventListener("click", () => {
    const name = characterNameInput.value.trim().replace(/\s+/g, "_");
    const campaign = localStorage.getItem("userSelection");

    if (!name || !campaign || !dataLibrary[campaign]) {
      alert("No campaign or name specified.");
      return;
    }

    const validNames = dataLibrary[campaign];
    const match = validNames.find(
      (entry) => entry.toLowerCase() === name.toLowerCase()
    );

    if (!match) {
      alert("Character not found in selected campaign.");
      return;
    }

    const li = document.createElement("li");
    li.style.cursor = "pointer";
    li.style.padding = "4px";
    li.textContent = match.replace(/_/g, " ");

    li.addEventListener("mouseenter", () => {
      characterCardPreview.innerHTML = `
      <img 
        src="cards/Character/${campaign}/${match}.gif"
        alt="${match}"
        class="card-img"
      />
    `;
    });

    li.addEventListener("mouseleave", () => {
      characterCardPreview.innerHTML = "";
    });

    characterCardList.appendChild(li);
    characterNameInput.value = "";
  });
});

// Export to global (for inline HTML use if needed)
window.selectOption = selectOption;
window.addCardToShop = addCardToShop;
window.addCardToInventory = addCardToInventory;
window.toggleShop = toggleShop;
window.handleAddCard = handleAddCard;
window.toggleFolder = toggleFolder;
