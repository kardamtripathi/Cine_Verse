import React, { Component } from 'react'
// import {movies} from './getMovies'
import axios from 'axios'
export default class Movies extends Component {
    constructor(){
        super();
        this.state = {
            hover: '',
            parr: [1],
            currPage: 1,
            movies: [],
            favorites: []
        }
    }
    async componentDidMount(){
        const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=5540e483a20e0b20354dabc2d66a31c9&language=en-US&page=${this.state.currPage}`);
        let data = res.data;
        // console.log(data);
        this.setState({
            movies: [...data.results]
        })
        this.handleFavoritesState = () => {
            let oldData = JSON.parse(localStorage.getItem("moviesList") || "[]")
            let temp = oldData.map((movie) => movie.id);
            this.setState({
                favorites: [...temp]
            })
        }
    }
    changeMovies = async () => {
        const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=5540e483a20e0b20354dabc2d66a31c9&language=en-US&page=${this.state.currPage}`);
        let data = res.data;
        // console.log(data);
        this.setState({
            movies: [...data.results]
        })
    }
    handleLeft = () => {
        if(this.state.currPage != 1)
        {
            this.setState({
                currPage: this.state.currPage - 1
            }, this.changeMovies)
        }
    }
    handleRight = () => {
        let tempArr = []
        for(let i = 1; i <= this.state.parr.length + 1; i++)
        {
            tempArr.push(i);
        } 
        this.setState({
            parr:[...tempArr],
            currPage: this.state.currPage + 1
        }, this.changeMovies)
    }
    handleClick = (value) => {
        if(value != this.state.currPage)
        {
            this.setState({
                currPage: value
            }, this.changeMovies)
        }
    }
    handleFavorites = (movie) => {
        let oldData = JSON.parse(localStorage.getItem('moviesList') || "[]");
        if(this.state.favorites.includes(movie.id)){
            oldData = oldData.filter((mov) => mov.id != movie.id)
        }
        else{
            oldData.push(movie)
        }
        localStorage.setItem("moviesList", JSON.stringify(oldData))
        console.log(oldData)
        this.handleFavoritesState();
    }
    render() {
    // let movie = movies.results
    return (
      <>
        {
            this.state.movies.length == 0 ? 
            <div className="spinner-border text-primary" role="status">
            <span className="sr-only"></span>
            </div> :
            <div>
                <h3 className='text-center'><strong>Trending</strong></h3>
                <div className='movies-list'>
                    {
                        this.state.movies.map((movieObj) => (
                            <div className="card movies-card" onMouseEnter={() => this.setState({hover: movieObj.id})} onMouseLeave={() => this.setState({hover: ''})}>
                                <img className="card-img-top movies-img" src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} alt={movieObj.title}/>
                                {/* <div className="card-body"> */}
                                <h5 className="card-title movies-title">{movieObj.original_title}</h5>
                                {/* <p className="card-text movies-text">{movieObj.overview}</p> */}
                                <div className='button-wrapper'>
                                {
                                    this.state.hover == movieObj.id && 
                                    <a href="#" className="btn btn-primary movies-button" onClick={() => this.handleFavorites(movieObj)}>{this.state.favorites.includes(movieObj.id) ? "Remove from Favorites" : "Add to Favorites"}</a>
                                }
                                </div>
                                {/* </div> */}
                            </div>
                        ))
                    }
                </div>
                <div className='pageNavigation'>
                    <nav aria-label="Page navigation example">
                    <ul class="pagination">
                        <li class="page-item"><a class="page-link" href="#" onClick={this.handleLeft}>Previous</a></li>
                        {
                            this.state.parr.map((value) => (
                                <li class="page-item"><a class="page-link" onClick={() => this.handleClick(value)}>{value}</a></li>
                            ))
                        }
                        <li class="page-item"><a class="page-link" href="#" onClick={this.handleRight}>Next</a></li>
                    </ul>
                    </nav>
                </div>
            </div>
        }
      </>
    )
  }
}
