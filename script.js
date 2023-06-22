const gameContainer = document.getElementById("game");
let count = 0;
let card1 = null;
let card2 = null;
let card1Check = null;
let card2Check = null;
const matched = [];
let score = 0;
let scoreText = "Score: 0";
let bestScore = 0;
let bestScoreText = "Best Score: 0";

let savedBestScore = Number(localStorage.getItem("savedHighScore"))

if (savedBestScore > bestScore)
{
  bestScore = savedBestScore;
  bestScoreText = "Best Score: " + bestScore;
  document.getElementById("highScore").innerText = bestScoreText;
}
const startButton = document.createElement("button")
startButton.id = ("startButton");
startButton.innerText = "Start game!";
startButton.addEventListener("click", handleStartClick);
gameContainer.append(startButton);

function handleStartClick(event)
{
  const removeStartButtom = document.getElementById("startButton");
  removeStartButtom.remove();
  const COLORS = [];
  const randCardNum = Math.floor(Math.random() * 4 + 2);
  const numOfCards = randCardNum;
  for (let i = 0; i < numOfCards; i++){
    let randColor = Math.floor(Math.random()*16777215).toString(16);
    const temp = "#" + randColor;
    COLORS.push(temp, temp);
  }
  // here is a helper function to shuffle an array
  // it returns the same array with values shuffled
  // it is based on an algorithm called Fisher Yates if you want ot research more
  function shuffle(array) {
    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
      // Pick a random index
      let index = Math.floor(Math.random() * counter);

      // Decrease counter by 1
      counter--;

      // And swap the last element with it
      let temp = array[counter];
      array[counter] = array[index];
      array[index] = temp;
    }

    return array;
  }

  let shuffledColors = shuffle(COLORS);

  // this function loops over the array of colors
  // it creates a new div and gives it a class with the value of the color
  // it also adds an event listener for a click for each card
  function createDivsForColors(colorArray) {
    for (let color of colorArray) {
      // create a new div
      const newDiv = document.createElement("div");

      // give it a class attribute for the value we are looping over
      newDiv.classList.add(color);
      // call a function handleCardClick when a div is clicked on
      if (count < 2)
      {
        newDiv.addEventListener("click", handleCardClick);
      }

      // append the div to the element with an id of game
      gameContainer.append(newDiv);
    }
  }

  // TODO: Implement this function!
  function handleCardClick(event) {
    // you can use event.target to see which element was clicked
    if (count === 0)
    {
      card1 = event.target;
      if (matched.includes(card1))
      {
        return;
      }
      event.target.style.backgroundColor = event.target.className;
      event.target.style.backgroundImage = "none";
      card1Check = event.target.className;
      count++;
    }
    else if (count === 1)
    {
      card2 = event.target;
      if (matched.includes(card2))
      {
        return;
      }
      event.target.style.backgroundColor = event.target.className;
      event.target.style.backgroundImage = "none";
      card2Check = event.target.className;
      count++;
    }
    if (count === 2)
    {
      if (card1 === card2)
      {
        count = 1;
      }
      else
      {
        if (card1Check === card2Check)
        {
          matched.push(card1, card2);
          score++;
          scoreText = "Score: " + score;
          document.getElementById("scoreBoard").innerText = scoreText;
          if (matched.length === ((numOfCards) * 2))
          {
            if (bestScore == 0)
            {
              bestScore = score;
              bestScoreText = "Best Score: " + bestScore;
              document.getElementById("highScore").innerText = bestScoreText;
              localStorage.setItem("savedHighScore", bestScore.toString())
            }
            else if (score < bestScore)
            {
              bestScore = score;
              bestScoreText = "Best Score: " + bestScore;
              document.getElementById("highScore").innerText = bestScoreText;
              localStorage.setItem("savedHighScore", bestScore.toString())
            }
            const resetButton = document.createElement("button")
            resetButton.id = ("resetButton");
            resetButton.innerText = "Reset game!";
            resetButton.addEventListener("click", handleResetClick);
            gameContainer.append(resetButton);
            
            function handleResetClick(event)
            {
              location.reload()
            }
          }
          count = 0;
        }
        else
        {
          setTimeout(function()
          {
            card1.style.backgroundImage = "url(https://cdn.create.vista.com/api/media/small/538876518/stock-photo-bandana-shawl-tablecloth-fabric-print)"
            card2.style.backgroundImage = "url(https://cdn.create.vista.com/api/media/small/538876518/stock-photo-bandana-shawl-tablecloth-fabric-print)"
            count = 0
          }, 1000)
          score++;
          scoreText = "Score: " + score;
          document.getElementById("scoreBoard").innerText = scoreText;
        }
      }
    }
  }
  // when the DOM loads
  createDivsForColors(shuffledColors);
}

