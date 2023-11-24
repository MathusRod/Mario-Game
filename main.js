const mario = document.querySelector(".mario");
const pipe = document.querySelector(".pipe");
const cloud = document.querySelector(".cloud");
const score = document.querySelector(".score");
const scoreText = document.createElement("h1");
const borda = document.querySelector(".borda");
let points = 0;

scoreText.classList.add("score-text");
document.addEventListener("keydown", (k) => {
  if (k.key == " ") {
    mario.classList.add("jump");
  }
  setTimeout(() => {
    mario.classList.remove("jump");
  }, 1000);
});

const pipe_pos = {
  x: 1920,
};
const pipe_vel = {
  x: 0,
};
let bonus = 1;
function toWalk() {
  pipe_pos.x -= pipe_vel.x;
  pipe.style.left = pipe_pos.x + "px";
  if (pipe_pos.x < -pipe.clientWidth) {
    pipe_pos.x = 1920;
    pipe_vel.x= 0;
    points+=1;
    scoreText.innerText = `Score: ${points}`;
    score.appendChild(scoreText);
  }

  checkCollisions()
}
const contador = setInterval(()=>{
  if (points === 2 || points === 4 || points === 6 || points === 21 || points === 26 || points === 31) {
    bonus+=0.2;
  }
},3000)

const pipeAnimation = setInterval(() => {
  pipe_vel.x = 35*bonus;
  toWalk();
  
}, 50);
function checkCollisions() {
  const pipePosition = pipe.offsetLeft;
  const marioPosition = +window
    .getComputedStyle(mario)
    .bottom.replace("px", " ");
  if (collision(pipe, mario)) {
    pipe.style.animation = "none";
    pipe.style.left = `${pipePosition}px`;

    mario.style.animation = "none";
    mario.style.bottom = `${marioPosition}px`;
    mario.src = "./images/game-over.png";
    mario.style.width = "80px";
    mario.style.marginLeft = "45px";

    cloud.style.animation = "none";
    clearInterval(pipeAnimation )
    clearInterval(contador);
  }
}

function collision($div1, $div2) {
  var x1 = $div1.getBoundingClientRect().left;
  var y1 = $div1.getBoundingClientRect().top;
  var h1 = $div1.clientHeight;
  var w1 = $div1.clientWidth;
  var b1 = y1 + h1;
  var r1 = x1 + w1;

  var x2 = $div2.getBoundingClientRect().left;
  var y2 = $div2.getBoundingClientRect().top;
  var h2 = $div2.clientHeight;
  var w2 = $div2.clientWidth;
  var b2 = y2 + h2;
  var r2 = x2 + w2;

  if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
  return true;
}
// const loop = setInterval(() => {
//   const pipePosition = pipe.offsetLeft;
//   const marioPosition = +window
//     .getComputedStyle(mario)
//     .bottom.replace("px", " ");
//   if (pipePosition <= 120 && marioPosition < 172) {
//     isGameActive = false;
//     pipe.style.animation = "none";
//     pipe.style.left = `${pipePosition}px`;

//     mario.style.animation = "none";
//     mario.style.bottom = `${marioPosition}px`;
//     mario.src = "./images/game-over.png";
//     mario.style.width = "80px";
//     mario.style.marginLeft = "45px";

//     cloud.style.animation = "none";

//     clearInterval(contador);
//   }
// }, 10);

// const contador = setInterval(() => {
//   const pipePosition = pipe.offsetLeft;
//   const marioPosition = +window
//     .getComputedStyle(mario)
//     .bottom.replace("px", " ");
//   if (pipePosition <= 0 && marioPosition > 0) {
//     points += 1;
//   }

// }, 1500);
