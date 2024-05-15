const headers = new Headers({
  "Content-Type": "application/json",
  "x-api-key":
    "live_xwiSk5ZLPzvbNaunWi9IqMiRHp5Ce3Zy8vYVBEkFaDVUBIrvfBxCLQahGngD6e1B",
});

const requestOptions = {
  method: "GET",
  headers: headers,
  redirect: "follow",
};

const fetchBreeds = async () => {
  try {
    const response = await fetch(
      "https://api.thecatapi.com/v1/breeds",
      requestOptions
    );
    const data = await response.json();
    return data.map((breed) => ({ id: breed.id, name: breed.name }));
  } catch (error) {
    console.error("Error fetching breeds:", error);
    throw error;
  }
};

const fetchCatByBreed = async (breedId) => {
  try {
    const response = await fetch(
      `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`,
      requestOptions
    );
    const data = await response.json();
    return data[0];
  } catch (error) {
    console.error("Error fetching cat by breed:", error);
    throw error;
  }
};
