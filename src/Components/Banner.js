import React, { Component } from 'react'
import axios from 'axios'
export default class Banner extends Component {
  constructor() {
    super();
    this.state = {
      movie: null,
      loading: true,
    };
  }

  async componentDidMount() {
    try {
      const res = await axios.get(
        'https://api.themoviedb.org/3/movie/popular?api_key=5540e483a20e0b20354dabc2d66a31c9&language=en-US&page=1'
      );
      const data = res.data.results[0]; // Get the first movie from the API
      this.setState({
        movie: data,
        loading: false,
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      this.setState({ loading: false });
    }
  }

  render() {
    const { movie, loading } = this.state;

    return (
      <div>
        {loading ? (
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only"></span>
          </div>
        ) : (
          <div className="card banner-card">
            <img
              className="card-img-top banner-img"
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              alt={movie.title}
            />
            <h1 className="card-title banner-title">{movie.original_title}</h1>
            <p className="card-text banner-text">{movie.overview}</p>
          </div>
        )}
      </div>
    );
  }
}

