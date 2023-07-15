"use strict";

import { api_key, fetchDataFromServer } from "./api.js";

export function sidebar() {
  const genreList = {};
  fetchDataFromServer(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}`,
    function ({ genres }) {
      // Loop through the genres and add them to the genreList object
      for (const { id, name } of genres) {
        genreList[id] = name;
      }

      // Call genreLink function to add genre links to the sidebar
      genreLink();
    }
  );

  const sidebarInner = document.createElement("div");
  sidebarInner.classList.add("sidebar-inner");

  sidebarInner.innerHTML = `
        <div class="sidebar-list">
            <p class="title">Genre</p>
        </div>

        <div class="sidebar-list">
            <p class="title">Language</p>
            <a href="./movie-list.html" menu-close class="sidebar-link" onclick='getMovieList("with_original_language=en", "English")'>English</a>
            <a href="./movie-list.html" menu-close class="sidebar-link" onclick='getMovieList("with_original_language=ar", "Arabic")'>Arabic</a>
            <a href="./movie-list.html" menu-close class="sidebar-link" onclick='getMovieList("with_original_language=hi", "Hindi")'>Hindi</a>
        </div>

        <div class="sidebar-footer">
            <p class="copyright">
                <span>Abdelghany 2023</span> <br> <a href="https://abdelghany100.github.io/portofolio-1/">contact Me</a>
            </p>
            <img src="./assets/images/logo2.png" width="130" height="17" alt="the movie database logo">
        </div>
    `;

  const genreLink = function () {
    // Loop through the genreList object and create links for each genre
    for (const [genreID, genreName] of Object.entries(genreList)) {
      const link = document.createElement("a");

      link.classList.add("sidebar-link");
      link.setAttribute("href", "./movie-list.html");
      link.setAttribute("menu-close", "");
      link.setAttribute(
        "onclick",
        `getMovieList("with_genres=${genreID}","${genreName}")`
      );

      link.textContent = genreName;

      // Add the link to the Genre section of the sidebar
      sidebarInner.querySelectorAll(".sidebar-list")[0].appendChild(link);
    }

    const sidebar = document.querySelector("[sidebar]");
    toggleSidebar(sidebar);
  };

  const toggleSidebar = function (sidebar) {
    const sidebarBtn = document.querySelector("[menu-btn]");
    const sidebarTogglers = document.querySelectorAll("[menu-toggler]");

    const sidebarClose = document.querySelectorAll("[menu-close]");
    const overlay = document.querySelector("[overlay]");

    addEventOnElements(sidebarTogglers, "click", function () {
      sidebar.classList.toggle("active");
      sidebarBtn.classList.toggle("active");
      overlay.classList.toggle("active");
    });

    addEventOnElements(sidebarClose, "click", function () {
      sidebar.classList.remove("active");
      sidebarBtn.classList.remove("active");
      overlay.classList.remove("active");
    });
  };

  const addEventOnElements = function (elements, eventType, handler) {
    for (let element of elements) {
      element.addEventListener(eventType, handler);
    }
  };

  const sidebar = document.querySelector("[sidebar]");
  sidebar.appendChild(sidebarInner);
}
