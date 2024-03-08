let gameSeq = [];
let userSeq = [];
let started = false;
let level = 0;
let btns = ["one", "two", "three", "four"];
let h3 = document.querySelector("h3");
let highscore = 0;

function btnFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 500);
}

function userFlash(btn) {
  btn.classList.add("userFlash");
  setTimeout(function () {
    btn.classList.remove("userFlash");
  }, 200);
}

function levelUp() {
  userSeq = [];
  level++; //level updated to next one
  h3.innerText = `Level ${level}`;

  //Choose a random button and flash that button
  let ranIdx = Math.floor(Math.random() * 4);
  let ranBut = btns[ranIdx];
  let btn = document.querySelector(`.${ranBut}`);
  // above 2 lines can be combined as document.querySelector(`.${btns[ranIdx]}`)
  gameSeq.push(ranBut);

  setTimeout(btnFlash(btn), 2000);
}

//Adding functionality to start game when clicked anywhere or pressed any button

window.addEventListener("click", function (e) {
  if (started == false && e.target.nodeName != "DIV") {
    console.log("Game Started");
    started = true;
    levelUp();
  }
});
window.addEventListener("keypress", function (e) {
  if (started == false) {
    console.log("Game Started");
    started = true;
    levelUp();
  }
});

function checkAns(idx) {
  console.log(`curr level is`, level);
  if (userSeq[idx] == gameSeq[idx]) {
    if (userSeq.length == gameSeq.length) {
      setTimeout(levelUp, 500);
    }
  } else {
    let score = level - 1;
    if (score > highscore) {
      highscore = score;
    }
    h3.innerHTML = `Game is Over.Your Score was <b>${score}</b> <br>Highscore is <b>${highscore}</b> <br> press any key or click anywhere to play again`;
    let count = 1;
    const zomzam = setInterval(function () {
      if (count == 3) {
        clearInterval(zomzam);
      }
      count = count + 1;
      document.querySelector("body").style.backgroundColor = "red";
      setTimeout(function () {
        document.querySelector("body").style.backgroundColor = "white";
      }, 100);
    }, 250);
    reset();
  }
}

function btnPress() {
  if (started == true) {
    console.log("button was pressed");
    let btn = this;
    console.dir(this.classList[1]);
    userSeq.push(this.id);
    userFlash(btn);
    checkAns(userSeq.length - 1);
  }
}
let AllBtns = document.querySelectorAll(".buton");
for (butt of AllBtns) {
  butt.addEventListener("click", btnPress);
}

function reset() {
  started = false;
  userSeq = [];
  gameSeq = [];
  level = 0;
}
