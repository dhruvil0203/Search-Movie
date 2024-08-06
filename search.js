let APIKEY = "7ba27cb3";
let searchInput = document.getElementById("searchinput");
let searchbtn = document.getElementById("searchbtn");

const getData = async (movie) => {
  try {
    let fetchdata = await fetch(
      `https://www.omdbapi.com/?apikey=${APIKEY}&t=${encodeURIComponent(movie)}`
    );
    let JsonDataName = await fetchdata.json();

    console.log(JsonDataName);

    document.querySelector(".card").innerHTML = "";
    searchInput.value = "";

    if (JsonDataName.Response === "True") {
      let div = document.createElement("div");
      div.classList.add("movieCard");
      div.innerHTML = `
        <img src="${JsonDataName.Poster}" alt="${JsonDataName.Title} Poster">
        <div class="cardText">
          <h1>${JsonDataName.Title}</h1>
          <p class='rating'>Rating: <span>${
            JsonDataName.Ratings[0]?.Value || "N/A"
          }</span></p>
          <a href="#">${JsonDataName.Genre}</a>
          <p>Released Date: <span>${JsonDataName.Released}</span></p>
          <p>Country: <span>${JsonDataName.Country}</span></p>
          <p>Duration: <span>${JsonDataName.Runtime}</span></p>
          <p>Description: <span>${JsonDataName.Plot}</span></p>
        </div>`;
      document.querySelector(".card").appendChild(div);
    } else {
      document.querySelector(".card").innerHTML =
        "<h1>Enter Valid Movie Name</h1>";
    }
  } catch (error) {
    document.querySelector(".card").innerHTML =
      "<h1>Error fetching data. Please try again later.</h1>";
  }
};

searchbtn.addEventListener("click", function () {
  let moviename = searchInput.value;
  if (moviename !== "") {
    getData(moviename);
  } else {
    document.querySelector(".card").innerHTML =
      "<h1>Please Enter Movie Name</h1>";
  }
});
