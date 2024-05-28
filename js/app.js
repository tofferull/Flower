const flowers = ["🌼", "🌸", "🌸", "💮", "🌹", "🌷"];
const hearts =  ['💕', '❤️', '💗', '💖'];

function createElement(i, j, flower) {
  let margin = j * (Math.random() + 0.5);
  let top = -1 + i;
  if (flower)
    createFlower(margin, top);
  else
    createGrass(margin, top);
}

function createGrass(margin, top) {
  let grass = document.createElement("div");
  grass.style.marginLeft = margin + "%";
  grass.style.marginTop = top + Math.random() + "%";
  grass.classList.add("grass");
  grass.classList.add("plant");
  document.querySelector(".ground").appendChild(grass);

  createShadow(grass, 9, 35);
}

function createFlower(margin, top) {
  let stem = document.createElement("div");
  let rand = Math.random();
  stem.style.marginLeft = margin + "%";
  stem.style.marginTop = top + Math.random() + "%";
  stem.style.transform = `scale(${rand < 0.5 ? rand + 0.4 : rand + 0.3})`;
  stem.classList.add("stem");
  stem.classList.add("plant");
  document.querySelector(".ground").appendChild(stem);

  let flower = document.createElement("div");
  flower.classList.add("flower");
  stem.appendChild(flower);

  createShadow(stem, 8, 50);
}

function createShadow(div, x, y) {
  let shadow = document.createElement("div");
  shadow.style.height = div.offsetHeight + 8 + "px";
  shadow.style.width = div.offsetWidth + 10 + "px";
  shadow.style.transformOrigin = `${x}px ${y}px`
  shadow.style.transform = `rotate(${calculateDegree(div) + 90}deg)`;
  shadow.classList.add("shadow");
  div.appendChild(shadow);
}

function calculateDegree(div) {

  const getOffset = (el) => {
    const rect = el.getBoundingClientRect();
    return {
      x: rect.left + window.scrollX + rect.width / 2,
      y: rect.top + window.scrollY + rect.height / 2,
    };
  }
  const sun = getOffset(document.querySelector(".star"));
  const plant = getOffset(div);

  return Math.atan((sun.y - plant.y) / (sun.x - plant.x)) * 180 / Math.PI;
}

const star = document.querySelector(".star");
const sky = document.querySelector(".sky");
const clouds = ["c1", "c2", "c3", "c4", "c5"].map(ele => document.querySelector(`.${ele}`));

let skyWidth = sky.getBoundingClientRect().width;
let skyHeight = sky.getBoundingClientRect().height;
let random = Math.random() * 20;
let starCount = random < 25 ? random + 25 :  random;

function updateShadow() {
  let plants = document.querySelectorAll(".plant");
  plants.forEach((plant) => {
    let shadow = plant.lastChild;
    shadow.style.transform = `rotate(${calculateDegree(plant) + 180}deg)`;
    console.log("finished");
  })
}

for (let i = 0; i < 14; i+=2) {
  for (let j = 0; j < 100; j++) {
    createElement(i, j, Math.random() < 0.75);
  }
}

function generateStars() {
  let star = document.createElement("div");
  let randomW = Math.random() * skyWidth;
  let randomH = Math.random() * skyHeight - 300;
  star.style.left = `${randomW}px`;
  star.style.top = `${randomH}px`;
  star.classList.add("bling");
  star.classList.add("night");
  sky.appendChild(star);
}

for (let i = 0; i < starCount; i++) {
  generateStars();
}
const stars = document.querySelectorAll(".bling");

star.addEventListener("click", () => {
  if(star.classList.contains("moon")) {
    star.classList.remove("moon");
    sky.classList.remove("dark");
    stars.forEach((star) => {
      star.classList.add("night");
      star.classList.remove("day");
    })
    clouds.forEach((cloud) => {
      cloud.classList.remove("night");
      cloud.classList.add("day");
    })
  } else {
    star.classList.add("moon");
    sky.classList.add("dark");
    stars.forEach((star) => {
      star.classList.add("day");
      star.classList.remove("night");
    })
    clouds.forEach((cloud) => {
      cloud.classList.add("night");
      cloud.classList.remove("day");
    });
  }
  updateShadow();
})

function generateEmoji(emoji) {
  let plants = document.querySelectorAll(".plant");
  for (let i = 0; i < 100; i+=2) {
      let plant = plants[i];
      let generate = document.createElement("div");
      let random = Math.floor(Math.random() * emoji.length);
      generate.innerHTML = emoji[random];
      generate.classList.add("emoji");
      plant.append(generate);
      setTimeout(() => {
        plant.removeChild(plant.lastChild);
      }, 5000);
  }
}

clouds.forEach((cloud) => {
  cloud.addEventListener("click", () => {
    generateEmoji(flowers);
  })
})

document.querySelectorAll(".bling").forEach((star) => {
  star.addEventListener("click", () => {
    generateEmoji(hearts);
  })
})
