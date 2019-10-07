const puppeteer = require("puppeteer");
const gameUrl = "https://trick-or-treat.netlify.com";

const roundUp = number => Math.ceil(number / 10) * 10;

/**
 * @param {int} goalIndex
 * @param {int} initialPosition
 * @param {Puppeter Page} page
 * @returns {int} the new player index
 */
async function moveTo(goalIndex, initialPosition, page) {
  let playerPosition = initialPosition;

  while (playerPosition != goalIndex) {
    /* Round up numbers so we can easily determine if it is on different row
     * ie 45 -> 50, 54 -> 60. Now we know its on a different row as opposed to 9 difference
     * So it does not think difference of 9 is 9 horizontal moves
     */
    const roundedDifference = roundUp(goalIndex) - roundUp(playerPosition);

    /** Move values
     * UP (reduce currentIndex by 10)
     * RIGHT (increase currentIndex by 1)
     * LEFT (reduce currentIndex by 1)
     * DOWN (increase currentIndex by 10)
     *
     * These values determine the flow logic below
     */

    if (roundedDifference >= 10) {
      console.log("Moving Down");
      await page.keyboard.press("ArrowDown");
      playerPosition = playerPosition + 10;

      continue;
    } else if (roundedDifference <= -10) {
      await page.keyboard.press("ArrowUp");
      console.log("Moving Up");
      playerPosition = playerPosition - 10;

      continue;
    }

    // We do not need to change rows, get the difference and move horizontally accordingly
    const difference = goalIndex - playerPosition;

    if (difference > 0) {
      await page.keyboard.press("ArrowRight");
      playerPosition = playerPosition + 1;
      console.log("Moving Right");

      continue;
    } else if (difference < 0) {
      await page.keyboard.press("ArrowLeft");
      playerPosition = playerPosition - 1;
      console.log("Moving Left");

      continue;
    }
  }

  return playerPosition;
}

/**
 * @param {int} currentPositon
 * @param {int[]} candyPositions
 * @returns {int} the closest candy index to the player
 */
function getClosestCandy(currentPositon, candyPositions) {
  let closest;
  // Arbritary high number for a default
  let lowestMoves = 999;

  candyPositions.forEach(candy => {
    /* Round up numbers so we can easily determine if it is on different row
     * ie 45 -> 50, 54 -> 60. Now we know its on a different row as opposed to 9 difference
     * So it does not think difference of 9 is 9 horizontal moves
     */

    const difference = roundUp(candy) - roundUp(currentPositon);

    // See how many rows we need to traverse
    const numberOfRowChanges = Math.floor(Math.abs(difference) / 10);
    // Get the absolute value of number of horizontal moves
    const numberOfHorizontalMoves = Math.abs(
      Math.abs(candy - currentPositon) - numberOfRowChanges * 10
    );

    const numberOfMoves = numberOfHorizontalMoves + numberOfRowChanges;

    if (numberOfMoves < lowestMoves) {
      lowestMoves = numberOfMoves;
      closest = candy;
    }
  });

  return closest;
}

let browser;

(async function() {
  browser = await puppeteer.launch();

  // Treat last argument to the process as the URL
  const argumentsUrl = [...process.argv].pop();

  // If arguments url contains http(s) then use it, otherwise use hosted url
  const actualUrl = argumentsUrl.includes("http") ? argumentsUrl : gameUrl;

  const page = await browser.newPage();

  console.log(`Opening game at: ${actualUrl}`);

  await page.goto(actualUrl);

  const parsedBoard = (await page.evaluate(() =>
    [...document.querySelectorAll(".board-cell")].map(el => el.classList)
  )).map(classes => Object.values(classes));

  let spriteIndexes = [];
  let initialPlayerPosition;

  parsedBoard.forEach((square, index) => {
    if (square.some(el => el.includes("has-sprite"))) {
      spriteIndexes = [...spriteIndexes, index + 1];
    }
    if (square.some(el => el.includes("has-user"))) {
      initialPlayerPosition = index + 1;
    }
  });

  let playerPosition = initialPlayerPosition;

  // Go over every index of candies and determine the closest one
  const movePath = spriteIndexes.map(() => {
    const closestIndex = getClosestCandy(playerPosition, spriteIndexes);

    // Treat closest as new player index so we can determine subsequent closest candies
    playerPosition = closestIndex;

    // Remove the closest index as we treat it as gotten
    spriteIndexes = spriteIndexes.filter(index => index !== closestIndex);

    return closestIndex;
  });

  playerPosition = initialPlayerPosition;

  // Go over every move and complete game
  for (index of movePath) {
    playerPosition = await moveTo(index, playerPosition, page);
  }

  await page.screenshot({ path: "completed-game.png" });

  await browser.close();
})();

process.on("unhandledRejection", async error => {
  console.error("Encountered following unhandled Error", error);
  console.error("Exiting");

  if (browser) {
    await browser.close();
  }

  process.exit(1);
});
