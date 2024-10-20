const items = document.querySelectorAll(".game__items_item");
const backpack = document.querySelector(".game__backpack");
const message = document.querySelector(".game__message");
const restartButton = document.querySelector(".game__restart-button");
const progressDisplay = document.querySelector(".game__progress");
const itemsContainer = document.querySelector(".game__items");
const popup = document.querySelector(".game__popup");
const blicks = document.querySelectorAll(".game__blick");

let collectedCount = 0;

const updateProgress = () => {
  document.querySelector(".game__progress_number").textContent = `${collectedCount}/5`;
};

const showElementsWithDelay = (elements, displayStyle, delay = 100, className) => {
  elements.forEach((element, index) => {
    setTimeout(() => {
      element.style.display = displayStyle;
      if (className) {
        element.classList.add(className);
      }
    }, index * delay);
  });
};

const handleItemClick = (item) => {
  if (!item.classList.contains("game__items_item--collected")) {
    item.classList.add("game__items_item--collected");
    collectedCount++;
    updateProgress();
    if (collectedCount === 5) endGame();
  }
};

const endGame = () => {
  backpack.classList.add("game__backpack--complete");
  message.classList.add("game__message--active");
  restartButton.classList.add("game__restart-button--active");

  itemsContainer.style.display = "none";
  progressDisplay.style.display = "none";
  popup.style.display = "none";
  showElementsWithDelay(blicks, "none");
};

const restartGame = () => {
  collectedCount = 0;
  backpack.classList.remove("game__backpack--complete");
  message.classList.remove("game__message--active");
  restartButton.classList.remove("game__restart-button--active");

  items.forEach((item) => item.classList.remove("game__items_item--collected"));
  updateProgress();

  itemsContainer.style.display = "flex";
  progressDisplay.style.display = "flex";
  popup.style.display = "block";

  showElementsWithDelay(blicks, "block", 300);
};

const showGameElements = () => {
  setTimeout(() => {
    document.querySelector(".game").classList.add("game--visible");
    backpack.classList.add("game__backpack--visible");

    setTimeout(() => {
      itemsContainer.classList.add("game__items--visible");
      itemsContainer.style.display = "flex";
      popup.style.display = "block";
      showElementsWithDelay(items, "block", 100, "game__items_item--visible");
      showElementsWithDelay(blicks, "block", 300);
    }, 2000);
  }, 200);
};

window.onload = showGameElements;

items.forEach((item) => item.addEventListener("click", () => handleItemClick(item)));
restartButton.addEventListener("click", restartGame);

updateProgress();
