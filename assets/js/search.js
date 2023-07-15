"use strict";

import { api_key, fetchDataFromServer } from "./api.js";
import { creatMovieCard } from "./movie-card.js";

export function search() {
  const searchWarapper = document.querySelector("[search-wrapper]");
  const searchField = document.querySelector("[search-field]");
  const searchResultMovie = document.createElement("div");

  searchResultMovie.classList.add("search-modal");

  document.querySelector("main").appendChild(searchResultMovie);

  let searchTimeout;

  searchField.addEventListener("input", function () {
    if (!searchField.value.trim()) {
      searchResultMovie.classList.remove("active");
      searchWarapper.classList.remove("searching");
      clearTimeout(searchTimeout);
      return;
    }

    searchWarapper.classList.add("searching");
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(function () {
      fetchDataFromServer(
        `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${searchField.value}&page=1&include_adult=false`,
        function ({ results: movieList }) {
          searchWarapper.classList.remove("searching");
          searchResultMovie.classList.add("active");
          searchResultMovie.innerHTML = `
                    <p class="label">Results for</p>
                    <h1 class="heading">${searchField.value}</h1>
                    <div class="movie-list">
                      <div class="grid-list"></div>
                    </div>
                `;

          for (const movie of movieList) {
            const movieCard = creatMovieCard(movie);
            searchResultMovie
              .querySelector(".grid-list")
              .appendChild(movieCard);
          }
        }
      );
    }, 500);
  });
}
