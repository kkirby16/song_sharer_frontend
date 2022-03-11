document.addEventListener("DOMContentLoaded", () => {
  getSongs();
  const createSongForm = document.getElementById("create-song-form");

  createSongForm.addEventListener("submit", (e) => createFormHandler(e)); //when add an event listener, first step should be to console log to confirm that the event was hooked up properly
  handleLikes();
}); //after this form is submitted it is calling a form handler.

function getSongs() {
  return fetch("https://infinite-shore-27478.herokuapp.com/api/v1/songs")
    .then((response) => response.json()) //fetch returns a promise and in that promise there is a response that we can take out and then parse to json.
    .then((songs) => {
      songs.data.forEach((song) => {
        let newSong = new Song(song, song.attributes); //here we can and should pass our constructor 2 arguments: one, just the song or just the song data, and two, the attributes of that song
        //creating new instances of song class here.
        let songsContainer = (document.querySelector(
          "#song-container"
        ).innerHTML += newSong.renderSongCard());
      });
      handleLikes();
    });
}

function getGenres() {
  genresContainer.innerHTML = "";
  fetch("https://infinite-shore-27478.herokuapp.com/api/v1/genres")
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
    nameInput, //we should get the values of our form inputs before we make the post request
    artistInput,
    albumInput,
    songUrlInput,
    submittedByInput,
    genreId
  );
}

//we really use dataset to kind of put data on top of html elements and be able to access that using our query selector.

function postFetch(name, artist, album, song_url, submitted_by, genre_id) {
  const bodyData = { name, artist, album, song_url, submitted_by, genre_id }; //building body object outside of the fetch.
  fetch("https://infinite-shore-27478.herokuapp.com/api/v1/songs", {
    method: "POST",
    mode: "no-cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(bodyData), //stringifying this json data in order to send it.
    //here we are creating this object that we will send to our database based on attributes our api wants to create a new song
    //this will send back the data to my api.
    //the keys in our body data have to be exactly what they are like in the database.
  })
    .then((response) => response.json())
    .then((song) => {
      let newSong = new Song(song, song.data.attributes);
      let songsContainer = document.querySelector("#song-container");
      let songsContainerTitle = document.querySelector("#song-container-title");
      songsContainer.innerHTML =
        newSong.renderSongCard() + songsContainer.innerHTML;
      handleLikes();
    });
}

let genresContainer = document.querySelector("#genre-container");
let genresButton = document.querySelector("#see-genres-button");
let showGenres = false;

let buttonStates = {
  "See all genres and their descriptions":
    "Hide the genres and their descriptions",
  "Hide the genres and their descriptions":
    "See all genres and their descriptions",
};

genresButton.addEventListener("click", () => {
  showGenres = !showGenres;
  if (showGenres === true) {
    genresContainer.style =
      "display:inline-block; float:left; overflow:scroll; width: 36%; height: 21.528vw; overflow-x: hidden";
    getGenres();
  } else {
    genresContainer.style.display = "none";
  }
  genresButton.innerText = buttonStates[genresButton.innerText];
});

function handleLikes() {
  let likeButtons = document.getElementsByClassName("like-button");

  let likeButtonStates = {
    "Like ": "Unlike ",
    "Unlike ": "Like ",
  };

  [...likeButtons].forEach((likeButton) => {
    likeButton.addEventListener("click", () => {
      if (likeButton.id === "unliked") {
        likeButton.id = "liked";
        likeButton.innerHTML = "Unlike ";
        let songDataId = likeButton.getAttribute("data-id");

        addLikeToSong(likeButton, songDataId);
      } else if (likeButton.id === "liked") {
        likeButton.id = "unliked";
        likeButton.innerHTML = "Like ";

        let songDataId = likeButton.getAttribute("data-id");
        console.log("what is the disliked liked button?", likeButton);
        removeLikeFromSong(likeButton, songDataId);
      }
    });
  });
}

function addLikeToSong(likeButton, song_id) {
  let likedSong = Song.all.find((song) => song.id === song_id);
  let likesForSong = likedSong.likes.length;
  fetch("https://infinite-shore-27478.herokuapp.com/api/v1/likes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ song_id: song_id }),
  })
    .then((response) => console.log("what is this response?", response))
    .then((like) => {
      likesForSong += 1;
      let likedSongOnDom = document.querySelector(`[data-id="${song_id}"]`);
      likedSongOnDom.getElementsByTagName(
        "h4"
      )[5].innerText = `Likes: ${likesForSong}`;
    });
}

function removeLikeFromSong(likeButton, song_id) {
  let unlikedSong = Song.all.find((song) => song.id === song_id);
  console.log("what am I getting?", unlikedSong.likes);
  let likesForSong = unlikedSong.likes.length;
  console.log("new - what is unliked song's likes?", unlikedSong.likes);
  let like_id = unlikedSong.likes[unlikedSong.likes.length - 1].id;
  console.log("what is likes for song", likesForSong.likes);
  removeLikeFetch(like_id, song_id, likesForSong);
}

function removeLikeFetch(like_id, song_id, likesForSong) {
  fetch(`https://infinite-shore-27478.herokuapp.com/api/v1/likes/${like_id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  })
    .then((response) =>
      console.log("what is response when clicking unlike?", response)
    )
    .then((unlikedLike) => {
      console.log("what is this new console log?", unlikedLike);
      let unlikedSongOnDom = document.querySelector(`[data-id="${song_id}"]`);
      unlikedSongOnDom.getElementsByTagName(
        "h4"
      )[5].innerText = `Likes: ${likesForSong}`;
    });
}
