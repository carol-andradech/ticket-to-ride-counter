const players = {};
const pointsMap = {
  "+1": 1,
  "+2": 2,
  "+3": 4,
  "+4": 7,
  "+5": 10,
  "+6": 15,
  "+8": 21,
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

    const addedPointsList = playerData.addedPoints
      .map(
        (label, index) =>
          `<span 
        class="added-point" 
        onclick="removePoint('${color}', ${index})">${label}</span>`
      )
      .join(", ");

    scoreCard.innerHTML = `
      <h3>
        <span class="color-box" style="background-color: ${color.toLowerCase()}"></span>
        ${color}
        <button class="remove-btn" onclick="removePlayer('${color}')">x</button>
      </h3>
      <p> <span id="score-${color}" class="score-text">${
      playerData.score
    }</span></p>
      <p class="added-points">Adicionado: ${addedPointsList || "Nenhum"}</p>
      <div class="score-buttons">
        ${Object.entries(pointsMap)
          .map(
            ([label, points]) =>
              `<button onclick="updateScore('${color}', '${label}')">🚂 ${label}</button>`
          )
          .join("")}
      </div>
    `;

    scoreSection.appendChild(scoreCard);
  }
}

function removePoint(color, index) {
  if (players[color]) {
    const label = players[color].addedPoints[index];
    const points = pointsMap[label];
    players[color].score -= points; // Subtraia os pontos
    players[color].addedPoints.splice(index, 1); // Remova o ponto da lista
    renderPlayers(); // Re-renderize os jogadores
  }
}

function removePlayer(color) {
  const scoreCard = document.querySelector(
    `.score-card.${color.toLowerCase()}`
  );
  if (scoreCard) {
    scoreCard.classList.add("clicked");
  }

  if (players[color]) {
    delete players[color];
  }
  setTimeout(renderPlayers, 500); // Aguarda para ver o efeito visual
}

function resetScores() {
  for (const color in players) {
    delete players[color];
  }
  renderPlayers();
}
