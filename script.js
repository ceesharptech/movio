const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1OWZjZTE3Y2UwZjU2NmEyNDI3ODU3OWY1MjAwMTFlNSIsIm5iZiI6MTcyNDE4NTg3MC45ODQ4OTMsInN1YiI6IjY2YzRmYmU0ZThiYmQ4YTk0Y2YyODNkMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xs5eXhOp763gxYXcCkJ7j_8w01Ypwe46KaexQggXMl4",
  },
};

const inputField = document.querySelector(".movie-input");
const resultSection = document.querySelector(".result-section");
const resultPrefix = document.querySelector(".result-prefix");

resultPrefix.style.display = "none";

inputField.addEventListener("keydown", function (event) {
  if (event.key === "Enter" || event.keyCode === 13) {
    // Prevent the default action (if needed)
    event.preventDefault();

    resultSection.innerHTML = "";

    fetch(
      `https://api.themoviedb.org/3/search/movie?query=${inputField.value}&include_adult=false&language=en-US&page=1`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        resultPrefix.style.display = "block";
        if (response.results.length === 0) {
          resultPrefix.textContent = "Oops, no results found";
        } else {
          console.log(response);
          resultPrefix.innerHTML = `Results For <span>"${inputField.value}"</span>`;
          const filteredResults = response.results.filter(
            (result) =>
              result.poster_path !== null && result.original_language === "en"
          );
          filteredResults.forEach((result) => {
            const div = document.createElement("div");
            div.classList.add("movie-card");
            const markup = `
            <img src="https://image.tmdb.org/t/p/w500${
              result.poster_path
            }" alt="">
            <span class="movie-name"><a href=https://www.imdb.com/find/?q=${
              result.original_title.includes(" ")
                ? result.original_title.replace(/ /g, "%20")
                : result.original_title
            } target="_blank">${result.original_title}</a></span>
            <div class="movie-info">
                <p class="genre">${result.vote_average}</p>
                <span class="duration">${result.release_date}</span>
            </div>
            `;
            div.innerHTML = markup;
            resultSection.appendChild(div);
          });
        }
      })
      .catch((err) => console.error(err));
  }
});
