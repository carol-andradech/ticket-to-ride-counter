// Full set of connections with distances (train pieces)
const connections = {
  London: {
    Dieppe: { distance: 2, color: "neutral" },
    Amsterdam: { distance: 2, color: "neutral"},
    Edinburch: { distance: 4, color: "black or orange" },
  },
  Edinburch: {
    London: { distance: 4, , color: "black or orange" },
  },
  Amsterdam: {
    London: { distance: 2, color:"neutral"},
    Bruxelles: { distance: 1, color: "black" },
    Essen: { distance: 3, color: "yellow" },
    Frankfurt: { distance: 2, color: "white" },
  },
  Brest: {
    Dieppe: { distance: 2, color:"orange" },
    Paris: { distance: 3, color: "black" },
    Pamplona: { distance: 4, color: "pink" },
  },
  Dieppe: {
    Brest:  { distance: 2, color:"orange" },
    London: { distance: 2, color: "neutral"},
    Bruxelles: { distance: 2, color: "green" },
    Paris: { distance: 1, color: "pink" },
  },
  Paris: {
    Dieppe: { distance: 1, color:"pink" },
    Brest: { distance: 3, color: "black" },
    Bruxelles: { distance: 2, color: "green" },
    Frankfurt: { distance: 3, color: "white or orange" },
    Pamplona: { distance: 4, color: "blue or green" },
  },
  Pamplona: {
    Madrid: { distance: 3, color: "black or white" },
    Barcelona: { distance: 2, color: "neutral"},
    Marcille: { distance: 4, color: "red" },
    Paris: { distance: 4, color: "blue or green" },
    Brest: { distance: 4, color: "pink" },
  },
  Madrid: {
    Pamplona: { distance: 3, color: "black or white" },
    Lisboa: { distance: 3, color: "pink" },
    Barcelona: { distance: 2, color: "yellow" },
  },
  Vienna: {
    Munich: { distance: 4 },
    Budapest: { distance: 3 },
    Prague: { distance: 4 },
    Zagreb: { distance: 3 },
  },
  Budapest: {
    Vienna: { distance: 3 },
    Zagreb: { distance: 4 },
  },
  Prague: {
    Vienna: { distance: 4 },
    Zagreb: { distance: 3 },
  },
  Zagreb: {
    Vienna: { distance: 3 },
    Budapest: { distance: 4 },
    Prague: { distance: 3 },
  },
};

// Populate city dropdowns
const startCitySelect = document.getElementById("start");
const endCitySelect = document.getElementById("end");
const cities = Object.keys(connections);

cities.forEach((city) => {
  let option = document.createElement("option");
  option.value = city;
  option.textContent = city;
  startCitySelect.appendChild(option);
  endCitySelect.appendChild(option.cloneNode(true));
});

// Function to find all possible routes
function findRoutes() {
  const startCity = startCitySelect.value;
  const endCity = endCitySelect.value;

  if (startCity === endCity) {
    alert("Start and end city cannot be the same!");
    return;
  }

  const routes = findPossibleRoutes(startCity, endCity);
  displayRoutes(routes);
}

// Function to find possible routes (including indirect connections)
function findPossibleRoutes(start, end) {
  let visited = new Set();
  let paths = [];

  function dfs(currentCity, path, distance) {
    if (currentCity === end) {
      paths.push({ route: path, distance });
      return;
    }

    visited.add(currentCity);

    for (const [neighbor, connection] of Object.entries(
      connections[currentCity]
    )) {
      if (!visited.has(neighbor)) {
        dfs(neighbor, [...path, neighbor], distance + connection.distance);
      }
    }

    visited.delete(currentCity);
  }

  dfs(start, [start], 0);

  // Sort routes by distance
  paths.sort((a, b) => a.distance - b.distance);

  return paths.slice(0, 3); // Get the top 3 shortest routes
}

// Function to display routes
function displayRoutes(routes) {
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "";

  if (routes.length === 0) {
    resultDiv.textContent = "No routes found!";
    return;
  }

  routes.forEach((route, index) => {
    const routeDiv = document.createElement("div");
    routeDiv.classList.add("route");
    routeDiv.innerHTML = `
      <div class="route-title">Route #${index + 1} (Distance: ${
      route.distance
    } pieces)</div>
      ${route.route.join(" -> ")}
    `;
    resultDiv.appendChild(routeDiv);
  });
}
