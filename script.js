const whiteFaces = ["1", "3", "1", "3", "2", "4"];
const purpleFaces = ["1", "2", "1", "2", "3", "⭐️"];

function getRandomFace(faces) {
  const index = Math.floor(Math.random() * faces.length);
  return faces[index];
}

function rollDice() {
  const purpleCheckboxes = document.querySelectorAll(
    '.die-block input[type="checkbox"]'
  );

  const whiteDice = ["white-die1", "white-die2"];
  const purpleDice = [];

  purpleCheckboxes.forEach((cb) => {
    if (cb.checked) {
      purpleDice.push(`purple-die${cb.value}`);
    }
  });

  const allDice = [...whiteDice, ...purpleDice];

  let count = 0;
  const totalFrames = 20; // 2 seconds @ 100ms per frame
  const interval = 100;

  const animation = setInterval(() => {
    allDice.forEach((id) => {
      const die = document.getElementById(id);
      const faces = id.includes("white") ? whiteFaces : purpleFaces;
      die.textContent = getRandomFace(faces);
    });
    count++;
    if (count >= totalFrames) {
      clearInterval(animation);
      // Final result
      whiteDice.forEach((id) => {
        document.getElementById(id).textContent = getRandomFace(whiteFaces);
      });
      purpleDice.forEach((id) => {
        document.getElementById(id).textContent = getRandomFace(purpleFaces);
      });
    }
  }, interval);
}

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
