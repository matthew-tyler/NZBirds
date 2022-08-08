"use strict";

const birdDataURL = "data/nzbird.json";
const cardGrid = document.getElementById("grid");

fetch(birdDataURL)
  .then((response) => response.json())
  .then((data) => createBirds(data))
  .catch((error) => console.error(error));

function createBirds(birdArray) {
  for (const bird of birdArray) {
    let status = bird.status.split(" ");

    const birdCard = ` <article class="bird-card">
    <section class="bird-image-container">
      <img
        class="bird-image"
        src=${bird.photo.source}
        alt="picture of a ${bird.primary_name}"
      />
      <span class="bird-title"
        ><h2>${bird.primary_name}</h2>
        <p class="credit">${bird.photo.credit}</p>
      </span>
      <div class="danger-indicator hideobject ${
        status[status.length - 1]
      }"></div>
    </section>
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
  }
}

const searchButton = document.getElementById("search-button");
const searchArea = document.getElementById("search-area");

searchButton.addEventListener("click", function () {
  searchArea.classList.toggle("hide");
  searchArea.classList.toggle("animate");
});
