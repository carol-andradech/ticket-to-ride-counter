const players = {};
const pointsMap = {
  "+1": 1,
  "+2": 2,
  "+3": 4,
  "+4": 7,
  "+5": 10,
  "+6": 15,
  "+7": 18,
};

function togglePlayer(color) {
  if (players[color]) {
    delete players[color];
  } else {
    players[color] = {
      score: 0,
      addedPoints: [],
    };
  }
  renderPlayers();
}

function updateScore(color, label) {
  if (players[color] !== undefined) {
    const points = pointsMap[label];
    players[color].score += points;
    players[color].addedPoints.push(label);
    renderPlayers();
  }
}

function renderPlayers() {
  const scoreSection = document.getElementById("scoreSection");
  scoreSection.innerHTML = "";

  for (const [color, playerData] of Object.entries(players)) {
    const scoreCard = document.createElement("div");
    scoreCard.className = `score-card ${color.toLowerCase()}`;

    const addedPoints = playerData.addedPoints.length
      ? `<p>Adicionado: ${playerData.addedPoints.join(", ")}</p>`
      : "";

    scoreCard.innerHTML = `
      <h3>
        <span class="color-box" style="background-color: ${color.toLowerCase()}"></span>
        ${color}
        <button class="remove-btn" onclick="removePlayer('${color}')">x</button>
      </h3>
      <p>Pontuação: <span id="score-${color}">${playerData.score}</span></p>
      ${addedPoints}
      <div class="score-buttons">
        ${Object.entries(pointsMap)
          .map(
            ([label, points]) =>
              `<button onclick="updateScore('${color}', '${label}')">${label}</button>`
          )
          .join("")}
      </div>
    `;

    scoreSection.appendChild(scoreCard);
  }
}

function removePlayer(color) {
  if (players[color]) {
    delete players[color];
  }
  renderPlayers();
}

function resetScores() {
  for (const color in players) {
    delete players[color];
  }
  renderPlayers();
}
