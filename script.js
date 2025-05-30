// Game State Variables
let ballCount = 0;
let currentOverScore = 0;
let currentScore = 0;
let totalScore = 0;
let wickets = 0;
let currentOver = 1;
let teamScores = [[], []];
let currentTeam = 1;

// Function to Add Ball
function addBall(type) {
  if (wickets < 10 && ballCount < 6) {
    const deliveryContainer = document.getElementById("delivery-container");
    const delivery = document.createElement("div");
    delivery.classList.add("delivery");
    delivery.innerText = type === "dot" ? "." : type;
    deliveryContainer.appendChild(delivery);
    ballCount++;

    if (type !== "dot") {
      if (type !== "out") {
        currentOverScore += parseInt(type);
        currentScore += parseInt(type);
      } else {
        wickets++;
        if (wickets === 10) {
          endOver();
          return;
        }
      }
    }

    if (ballCount === 6) {
      endOver();
    }

    displayLiveScore();
  }
}

// Function to Handle Extra Balls
function addExtraBall(type) {
  if (wickets < 10) {
    const deliveryContainer = document.getElementById("delivery-container");
    const delivery = document.createElement("div");
    delivery.classList.add("delivery");
    delivery.innerText = type === "wide" ? "WD1" : "NB1";
    currentOverScore += 1;
    currentScore += 1;
    deliveryContainer.appendChild(delivery);
    displayLiveScore();
  }
}

// Display Current Score
function displayLiveScore() {
  const liveScoreElement = document.getElementById("live-score");
  liveScoreElement.innerText = `Current Score: ${currentScore} Runs, Wickets: ${wickets}`;
}

// End Over Handling (Deletes Previous Over Data)
function endOver() {
  teamScores[currentTeam - 1].push(currentOverScore);
  totalScore += currentOverScore;

  const totalScoreDisplay = document.getElementById("total-score-summary");
  const overScoreElement = document.createElement("div");
  overScoreElement.innerText = `Team ${currentTeam}, Over ${currentOver}: ${currentOverScore} runs`;
  totalScoreDisplay.appendChild(overScoreElement);

  currentOver++;
  ballCount = 0;
  currentOverScore = 0;

  const teamScoreDisplay = document.getElementById("team-score");
  teamScoreDisplay.innerText = `Team ${currentTeam} Total Score: ${totalScore} runs, Wickets: ${wickets}`;

  if (currentOver > 20 || wickets === 10) {
    endInnings();
  } else {
    resetOverData();
  }
}

// Reset Over Data
function resetOverData() {
  const deliveryContainer = document.getElementById("delivery-container");
  deliveryContainer.innerHTML = ""; // Clears previous over balls
}

// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("btn-run-1").onclick = () => addBall("1");
  document.getElementById("btn-run-2").onclick = () => addBall("2");
  document.getElementById("btn-run-3").onclick = () => addBall("3");
  document.getElementById("btn-run-4").onclick = () => addBall("4");
  document.getElementById("btn-run-5").onclick = () => addBall("5");
  document.getElementById("btn-run-6").onclick = () => addBall("6");
  document.getElementById("btn-dot-ball").onclick = () => addBall("dot");
  document.getElementById("btn-wicket").onclick = () => addBall("out");
  document.getElementById("btn-wide-ball").onclick = () => addExtraBall("wide");
  document.getElementById("btn-no-ball").onclick = () => addExtraBall("no");
});
