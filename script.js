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

