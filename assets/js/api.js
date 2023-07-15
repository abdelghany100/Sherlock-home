"use strict";

const api_key = "be2698c68324531b8c01977102c5ea5e";
const imageBaseURL = "https://image.tmdb.org/t/p/";

const fetchDataFromServer = function (url, callback, optionalParam) {
  fetch(url)
    .then((reponse) => reponse.json())
    .then((data) => callback(data, optionalParam));
};

export { imageBaseURL, api_key, fetchDataFromServer };
