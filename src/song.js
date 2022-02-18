class Song {
  constructor(song, songAttributes) {
    console.log("what are song attributes?", songAttributes.likes.length);
    this.id = song.id;
    this.name = songAttributes.name; //the attributes can be called off of the songAttributes variable
    this.artist = songAttributes.artist;
    this.album = songAttributes.album;
    this.song_url = songAttributes.song_url;
    this.submitted_by = songAttributes.submitted_by;
    this.genre = songAttributes.genre; //in our constructor, we're also giving the songs the nested genre object
    this.likes = songAttributes.likes;
    Song.all.push(this); //with each new instance, I'll be pushing this which represents the current instance that was created into Song.all
    //Song.all is a good name that developers have decided to use when talking about an array of something.
  }

  renderSongCard() {
    console.log("what is this.likes?", this.likes.count);
    return `
              <div data-id=${this.id} class="song-position">
              <h3 id="song-name">Name:  ${this.name} </h3>
                <h4 id="song-info">Artist:  ${this.artist} </h4>
                <h4 id="song-info">Album:  ${this.album}</h4>
                <h4 id="song-info">Song Url:  ${this.song_url}</h4>
                <h4 id="song-info">Genre:  ${this.genre.name} </h4>
                <h4 id="song-info">Submitted By:  ${this.submitted_by}</h4>
                <h4 id="song-info" className="song-likes">Likes: ${this.likes.length}</h4>
                <button data-id=${this.id} id="unliked" class="like-button">Like </button>
                <hr class="song-divider">
              </div>
              <br>
            `;
  }
}

Song.all = []; //this array is in the global scope and needs to be in the global scope outside of the song class so it can even know about the song class.

console.log(Song.all);
//constructor will give us all of our attributes so we can use copies or prototypes of our song object.

//why we want a song class: if we wanted to have an edit button to be able to render an edit form and edit songs we would need to know what song/object we were clicking on. without data ids and without some kind of oojs class that is encapsulating all this data you'd have to find that object and then update it, whereas in oojs I can have an array of javascript instances and use that instead to find this specific instance and update it.

//if we didn't have data-ids on our divs it would be very cumbersome to know which song we clicked for when we clicked a song's edit button.
//to get rid of that issue, we can use object orientation where our objects can store all the data about a particular song in one spot.
