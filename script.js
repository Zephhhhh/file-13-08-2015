let currentLevel = 1;
let gameData = [];

// Load from localStorage if player already started
if (localStorage.getItem("currentLevel")) {
    currentLevel = parseInt(localStorage.getItem("currentLevel"));
}

// Load levels from JSON
fetch("gameData.json")
  .then(response => response.json())
  .then(data => {
    gameData = data.levels;
    showClue();
  })
  .catch(err => console.error("Error loading game data:", err));

// Show clue for current level
function showClue() {
  const clueElement = document.getElementById("clue");
  const levelData = gameData.find(l => l.level === currentLevel);

  if (!levelData) {
    window.location.href = "final.html"; // Go to final page
    return;
  }

  clueElement.textContent = `Level ${currentLevel}: ${levelData.clue}`;
}

// Check password
function submitPassword() {
  const passwordInput = document.getElementById("password").value.trim();
  const levelData = gameData.find(l => l.level === currentLevel);

  if (!levelData) return;

  if (passwordInput.toLowerCase() === levelData.password.toLowerCase()) {
    currentLevel++;
    localStorage.setItem("currentLevel", currentLevel);
    if (currentLevel > gameData.length) {
      window.location.href = "final.html"; // Game complete
    } else {
      showClue();
      document.getElementById("password").value = "";
    }
  } else {
    alert("ACESS DENIED.");
  }
}
