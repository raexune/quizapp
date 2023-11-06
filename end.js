const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalScore = document.getElementById("finalScore");

const mostRecentScore = localStorage.getItem("mostRecentScore");

const highScore = JSON.parse(localStorage.getItem("highScore")) || [];
console.log(highScore);

finalScore.innerText = mostRecentScore;

username.addEventListener("keyup", () => {
  saveScoreBtn.disabled = !username.value;
});

saveHighScore = (e) => {
  console.log("Save has been clicked.");
  e.preventDefault();

  const score = {
    score: mostRecentScore,
    name: username.value
  };

  highScore.push(score);
  highScore.sort((a, b) => b.score - a.score);
  highScore.splice(5);

  localStorage.setItem("highScore", JSON.stringify(highScore));
  window.location.assign("./highscore.html");

  console.log(highScore);
};
