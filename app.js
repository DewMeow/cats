const breedSelect = document.querySelector(".breed-select");
const catInfo = document.querySelector(".cat-info");
const loader = document.querySelector(".loader");
const errorBlock = document.querySelector(".error");

function populateBreedsSelect(breeds) {
  breeds.forEach((breed) => {
    const option = document.createElement("option");
    option.value = breed.id;
    option.textContent = breed.name;
    breedSelect.appendChild(option);
  });
}

function displayCatInfo(cat) {
  const catImage = cat.url;
  const breedName = cat.breeds[0].name;
  const description = cat.breeds[0].description;
  const temperament = cat.breeds[0].temperament;

  const imgElement = document.querySelector(".cat-image");
  imgElement.src = catImage;

  const breedNameElement = document.querySelector(".cat-name");
  breedNameElement.textContent = breedName;

  const descriptionElement = document.querySelector(".cat-description");
  descriptionElement.textContent = `Description: ${description}`;

  const temperamentElement = document.querySelector(".cat-temperament");
  temperamentElement.textContent = `Temperament: ${temperament}`;

  catInfo.style.display = "block";
}

breedSelect.addEventListener("change", async () => {
  const breedId = breedSelect.value;
  loader.style.display = "block";
  catInfo.style.display = "none";
  errorBlock.style.display = "none";

  try {
    const catData = await fetchCatByBreed(breedId);
    displayCatInfo(catData);
  } catch (error) {
    console.error(error);
    errorBlock.textContent =
      "Failed to fetch cat information. Please try again.";
    errorBlock.style.display = "block";
  } finally {
    loader.style.display = "none";
  }
});

window.addEventListener("load", async () => {
  loader.style.display = "block";
  try {
    const breeds = await fetchBreeds();
    populateBreedsSelect(breeds);
  } catch (error) {
    console.error(error);
    errorBlock.textContent = "Failed to fetch cat breeds. Please try again.";
    errorBlock.style.display = "block";
  } finally {
    loader.style.display = "none";
  }
});
