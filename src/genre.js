class Genre {
  constructor(genre, genreAttributes) {
    this.id = genre.id;
    this.name = genreAttributes.name;
    this.description = genreAttributes.description;
    Genre.all.push(this);
  }

  renderGenre() {
    return `
      <div data-id=${this.id}>
        <h4>Genre Name: ${this.name}</h4>
        <h5>Genre Description: ${this.description}</h5>
      </div>
    `;
  }
}

Genre.all = [];
