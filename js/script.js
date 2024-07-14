//TMDB
const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const API_URL = `${BASE_URL}/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}`;

const IMG_URL = "https://image.tmdb.org/t/p/w500";

async function getMovies(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    showMovies(data.results);
  } catch (error) {
    console.log(error);
  }
}

getMovies(API_URL);

function showMovies(data) {
  const movies = document.getElementById("main");
  movies.innerHTML = "";

  data.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;

    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `
        <img src="${IMG_URL + poster_path}" alt="${title}">
        <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getClassByRate(
              vote_average
            )}">${vote_average.toFixed(1)}</span>  
        </div>  
        <div class="overview">
            <h3>Overview</h3>
            ${overview} 
        </div>
    `;
    movies.appendChild(movieEl);
  });
}

function getClassByRate(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

const form = document.getElementById("form");
const search = document.getElementById("search");
console.log(search.value);
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = search.value;
  if (searchTerm) {
    getMovies(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${searchTerm}`
    );
  } else {
    getMovies(API_URL);
  }
});
