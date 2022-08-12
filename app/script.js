"use strict";

const birdDataURL = "data/nzbird.json";
const cardGrid = document.getElementById("grid");

const cardArray = [];

fetch(birdDataURL)
  .then((response) => response.json())
  .then((data) => createBirds(data))
  .catch((error) => console.error(error));

function createBirds(birdArray) {
  for (const bird of birdArray) {
    const status = bird.status.split(" ");

    const birdID = bird.scientific_name.replaceAll(" ", "");

    const birdCard = ` <article class="bird-card" id="${birdID}">
    <div class="bird-image-container">
      <img
        class="bird-image"
        src=${bird.photo.source}
        alt="picture of a ${bird.primary_name}"
      />
      <div class="bird-title"> <h2>${bird.primary_name}</h2>
        <p class="credit">${bird.photo.credit}</p>
      </div>
      <div role="img" alt="Conservation Status: ${
        bird.status
      }" class="danger-indicator ${status[status.length - 1]}"></div>
      <span class="gradient"></span>
    </div>
    <section class="bird-details-container">
      <h3 class="english-name">${bird.english_name}</h3>
      <dl>
        <dt>Scientific Name</dt>
        <dd>${bird.scientific_name}</dd>
        <dt>Family</dt>
        <dd>${bird.family}</dd>
        <dt>Order</dt>
        <dd>${bird.order}</dd>
        <dt>Status</dt>
        <dd>${bird.status}</dd>
        <dt>length</dt>
        <dd>${bird.size.length.value} ${bird.size.length.units} </dd>
        <dt>Weight</dt>
        <dd>${bird.size.weight.value} ${bird.size.weight.units}</dd>
      </dl>
    </section>
  </article>
`;

    cardGrid.insertAdjacentHTML("beforeend", birdCard);

    bird.element = document.getElementById(`${birdID}`);
    cardArray.push(bird);
  }
}

const searchButton = document.getElementById("search-button");
const searchArea = document.getElementById("search-area");

searchButton.addEventListener("click", function () {
  searchArea.classList.toggle("hide");
  searchArea.classList.toggle("animate");
});

const searchTextField = document.getElementById("searchbar");
const statusFilter = document.getElementById("conservation-status");
const sortByFilter = document.getElementById("sort-by");

const filterButton = document.getElementById("filter-button");

const gridArea = document.getElementById("grid");

filterButton.addEventListener("click", function () {
  for (const birdCard of cardArray) {
    const searchTextEqual = Object.values(birdCard).some((value) =>
      value
        .toString()
        .normalize("NFKC")
        .toLowerCase()
        .includes(searchTextField.value.normalize("NFKC").toLowerCase())
    );

    const statusEqual =
      statusFilter.value === "All" || birdCard.status === statusFilter.value;

    birdCard.element.classList.toggle(
      "hideImportant",
      !searchTextEqual || !statusEqual
    );
  }



  switch (sortByFilter.value) {
    case "none":
      gridArea.append(...[...cardArray].map((element) => element.element));
      break;
    case "lightestToHeaviest":
      gridArea.append(
        ...[...cardArray]
          .sort((a, b) => a.size.weight.value - b.size.weight.value)
          .map((element) => element.element)
      );
      break;

    case "heaviestToLightest":
      gridArea.append(
        ...[...cardArray]
          .sort((a, b) => b.size.weight.value - a.size.weight.value)
          .map((element) => element.element)
      );
      break;

    case "longestToShortest":
      gridArea.append(
        ...[...cardArray]
          .sort((a, b) => b.size.length.value - a.size.length.value)
          .map((element) => element.element)
      );
      break;

    case "shortestToLongest":
      gridArea.append(
        ...[...cardArray]
          .sort((a, b) => a.size.length.value - b.size.length.value)
          .map((element) => element.element)
      );
      break;
  }
});


const body = document.querySelector("body");
body.addEventListener("mousedown",function(){

 body.classList.toggle("cursorOveride",true);

})


body.addEventListener("mouseup",function(){

  body.classList.toggle("cursorOveride",false);
 
 })