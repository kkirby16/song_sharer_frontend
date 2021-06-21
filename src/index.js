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
        const songMarkup = `
          <div data-id=${song.id}>
            <h2>${song.attributes.name}</h2>
            <h3>${song.attributes.artist}</h3>
            <h3>${song.attributes.album}</h3>
            <h4>${song.attributes.song_url}</h4>
            <p>${song.attributes.submitted_by}</p>

            <button data-id=${song.id}>Edit</button>
          </div>
          <br><br>
        `;
        document.querySelector("#song-container").innerHTML += songMarkup;
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
  })
    .then((response) => response.json())
    .then((song) => {
      const songData = song.data.attributes;
      const songMarkup = `
      <div data-id=${song.id}>
      <h2>${songData.name}</h2>
      <h3>${songData.artist}</h3>
      <h3>${songData.album}</h3>
      <h4>${songData.song_url}</h4>
      <h4>${songData.submitted_by}</h4>
      <button data-id=${songData.id}>Edit</button>
      </div>
      <br><br>`;

      document.querySelector("#song-container").innerHTML += songMarkup;
    });
}
