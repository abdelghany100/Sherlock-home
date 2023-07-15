/**
 * Add event on multiple elements
 */
const addEventOnElements = function (elements, eventType, callback) {
  for (const elem of elements) {
    elem.addEventListener(eventType, callback);
  }
};

/**
 * Toggle search box in mopile search || small screen
 */
const searchBox = document.querySelector("[search-box]");
const searchTogglers = document.querySelectorAll("[search-toggler]");
addEventOnElements(searchTogglers, "click", function () {
  searchBox.classList.toggle("active");
});

/**
 * store move in local storage
 */

const getMovieDetail = function (movieID) {
  window.localStorage.setItem("movieID", String(movieID));
};

const getMovieList = function (urlParam, genreName) {
  window.localStorage.setItem("urlParam", urlParam);
  window.localStorage.setItem("genreName", genreName);
};
