dogBar = document.getElementById("dog-bar");
dogSummaryContainer = document.getElementById("dog-summary-container");

window.addEventListener("DOMContentLoaded", event => {
  //   console.log("Dog");
  fetch("http://localhost:3000/pups/")
    .then(resp => resp.json())
    .then(data => postDogs(data));
});

function postDogs(data) {
  dogBar = document.getElementById("dog-bar");
  data.forEach(function(dog) {
    const newDog = document.createElement("span");
    newDog.innerHTML = `${dog.name}`;
    newDog.id = `${dog.id}`;
    newDog.addEventListener("click", onDogClick);
    dogBar.appendChild(newDog);
  });
}

function onDogClick(e) {
  e.preventDefault();
  //   console.log(e.target);
  fetch(`http://localhost:3000/pups/${e.target.id}`)
    .then(resp => resp.json())
    .then(data => showAdditionalInfo(data));
  //   dogSummaryContainer.innerHTML = `
  //     <img src=${e.target.image}></img>
  //   `;
}

function showAdditionalInfo(dog) {
  dogSummaryContainer = document.getElementById("dog-summary-container");
  console.log(dog);
  dogSummaryContainer.innerHTML = "";

  const dogName = document.createElement("h2");
  dogName.innerText = dog.name;

  const dogImg = document.createElement("img");
  dogImg.src = dog.image;

  const goodButton = document.createElement("button");
  goodButton.innerText = dog.isGoodDog ? "Good Dog" : "Bad Dog";

  dogSummaryContainer.append(dogName, dogImg, goodButton);
}
