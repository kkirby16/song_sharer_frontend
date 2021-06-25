document.addEventListener("DOMContentLoaded", () => {
  getSongs();

  const createSongForm = document.getElementById("create-song-form");

  createSongForm.addEventListener("submit", (e) => createFormHandler(e)); //when add an event listener, first step should be to console log to confirm that the event was hooked up properly
}); //after this form is submitted it is calling a form handler.

function getSongs() {
  fetch("http://localhost:3000/api/v1/songs")
    .then((response) => response.json()) //fetch returns a promise and in that promise there is a response that we can take out and then parse to json.
    .then((songs) => {
      songs.data.forEach((song) => {
        //debugger;
        let newSong = new Song(song, song.attributes); //here we can and should pass our constructor 2 arguments: one, just the song or just the song data, and two, the attributes of that song
        //creating new instances of song class here.
        document.querySelector("#song-container").innerHTML +=
          newSong.renderSongCard();
      });
    }); // then here we can get access to that json data.
}

function getGenres() {
  genresContainer.innerHTML = "";

  fetch("http://localhost:3000/api/v1/genres")
    .then((response) => response.json()) //fetch returns a promise and in that promise there is a response that we can take out and then parse to json.
    .then((genres) => {
      genres.data.forEach((genre) => {
        let newGenre = new Genre(genre, genre.attributes);
        document.querySelector("#genre-container").innerHTML +=
          newGenre.renderGenre();
      });
    }); // then here we can get access to that json data.
}

function createFormHandler(e) {
  e.preventDefault();
  const nameInput = document.querySelector("#input-name").value;
  const artistInput = document.querySelector("#input-artist").value;
  const albumInput = document.querySelector("#input-album").value;
  const songUrlInput = document.querySelector("#input-song-url").value;
  const submittedByInput = document.querySelector("#input-submitted-by").value;
  const genreId = parseInt(document.querySelector("#genres").value);
  postFetch(
    nameInput,
    artistInput,
    albumInput,
    songUrlInput,
    submittedByInput,
    genreId
  );

  //we should get the values of our form inputs before we make the post request
}

//.catch() is going to be the way we can do something if there is an error/show something to the user.

//we really use dataset to kind of put data on top of html elements and be able to access that using our query selector.

function postFetch(name, artist, album, song_url, submitted_by, genre_id) {
  const bodyData = { name, artist, album, song_url, submitted_by, genre_id }; //building body object outside of the fetch.
  fetch("http://localhost:3000/api/v1/songs", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bodyData),
    //here we are creating this object that we will send to our database based on attributes our api wants to create a new song
    //this will send back the data to my api.
    //we are also stringifying this json data in order to send it.
    //the keys in our body data have to be exactly what they are like in the database.
  })
    .then((response) => response.json())
    .then((song) => {
      const songData = song.data;

      let newSong = new Song(songData, songData.attributes);

      document.querySelector("#song-container").innerHTML +=
        newSong.renderSongCard();
    });
}

let genresContainer = document.querySelector("#genre-container");
let genresButton = document.querySelector("#see-genres-button");

genresButton.addEventListener("click", () => {
  showGenres = !showGenres;
  if (showGenres === true) {
    genresContainer.style =
      "display:inline-block; float:left; overflow:scroll; width: 36%; height: 310px; overflow-x: hidden";
    getGenres();
  } else {
    genresContainer.style.display = "none";
  }

  genresButton.innerText = buttonStates[genresButton.innerText];
});

let showGenres = false;

let buttonStates = {
  "See all genres and their descriptions":
    "Hide the genres and their descriptions",
  "Hide the genres and their descriptions":
    "See all genres and their descriptions",
};
