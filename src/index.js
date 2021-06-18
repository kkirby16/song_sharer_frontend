document.addEventListener("DOMContentLoaded", () => {
  getSongs();
});

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

//.catch() is going to be the way we can do something if there is an error/show something to the user.
