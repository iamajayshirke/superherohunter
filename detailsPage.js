// Details Page
// Fetching Hero Details By Particular Id

fetch(
  `https://gateway.marvel.com:443/v1/public/characters/${localStorage.getItem(
    "id"
  )}?ts=1&apikey=5903c31f8fd15bc15a1c1c13369d0bbe&hash=d582d640bee27cb28d3d5fd309ee18a7`
)
  .then((response) => response.json())
  .then((data) => {
    if (data.data) {
      // Adding Hero Image To Page
      document
        .getElementById("img")
        .setAttribute(
          "src",
          `${
            data.data.results[0].thumbnail.path +
            "." +
            data.data.results[0].thumbnail.extension
          }`
        );
      // Adding Hero Name To Page
      document.getElementById(
        "name"
      ).innerHTML = `${data.data.results[0].name}`;

      // Adding Comics Available Count
      document
        .getElementById("comics")
        .append(`${data.data.results[0].comics.available}`);

      // Adding Event Available Count
      document
        .getElementById("events")
        .append(`${data.data.results[0].events.available}`);

      // // Adding Series Available Count
      document
        .getElementById("series")
        .append(`${data.data.results[0].series.available}`);

      // // Adding Stories Available Count
      document
        .getElementById("stories")
        .append(`${data.data.results[0].stories.available}`);
    }
  });
