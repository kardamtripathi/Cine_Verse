import React, { Component } from 'react'
import { movies } from './getMovies'
export default class Favorites extends Component {
    constructor() {
        super();
        this.state = {
            genres: [],
            currGenre: 'All Genres',
            movies: [],
            currText: "",
            limit: 5,
            currPage: 1
        }
    }
    componentDidMount() {
        let data = JSON.parse(localStorage.getItem("moviesList") || "[]")
        let genreids = {
            28: "Action", 12: "Adventure", 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History',
            27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western'
        };
        let temp = [];
        data.forEach((movieObj) => {
            if (!temp.includes(genreids[movieObj.genre_ids[0]])) {
                temp.push(genreids[movieObj.genre_ids[0]])
            }
        })
        temp.unshift("All Genres");
        this.setState({
            genres: [...temp],
            movies: [...data]
        })
    }
    handleGenreChange = (genre) => {
        this.setState({
            currGenre: genre
        }, () => {
            let updatedFilterArr = this.state.movies;

            if (this.state.currText !== '') {
                updatedFilterArr = updatedFilterArr.filter((movieObj) => {
                    let title = movieObj.original_title.toLowerCase();
                    return title.includes(this.state.currText.toLowerCase());
                });
            }

            if (genre !== "All Genres") {
                updatedFilterArr = updatedFilterArr.filter((movieObj) => genre[movieObj.genre_ids[0]] == genre);
            }

            this.setState({
                filterArr: updatedFilterArr
            });
        })
    }
    sortPopularityDesc = () => {
        let temp = this.state.movies;
        temp.sort(function (objA, objB) {
            return objB.popularity - objA.popularity
        })
        this.setState({
            movies: [...temp]
        })
    }
    sortPopularityAsce = () => {
        let temp = this.state.movies;
        temp.sort(function (objA, objB) {
            return objA.popularity - objB.popularity
        })
        this.setState({
            movies: [...temp]
        })
    }
    sortRatingDesc = () => {
        let temp = this.state.movies;
        temp.sort(function (objA, objB) {
            return objB.vote_average - objA.vote_average
        })
        this.setState({
            movies: [...temp]
        })
    }
    sortRatingAsce = () => {
        let temp = this.state.movies;
        temp.sort(function (objA, objB) {
            return objA.vote_average - objB.vote_average
        })
        this.setState({
            movies: [...temp]
        })
    }
    handlePageChange = (page) => {
        this.setState({
            currPage: page
        })
    }
    handleDelete = (id) => {
        let newArr = [];
        newArr = this.state.movies.filter((movieObj) => movieObj.id != id)
        this.setState({
            movies: [...newArr]
        })
        localStorage.setItem("moviesList", JSON.stringify(newArr))
    }
    render() {
        let genreids = {
            28: "Action", 12: "Adventure", 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History',
            27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western'
        };
        let filterArr = [];
        if (this.state.currText == '') {
            filterArr = this.state.movies
        }
        else {
            filterArr = this.state.movies.filter((movieObj) => {
                let title = movieObj.original_title.toLowerCase();
                return title.includes(this.state.currText.toLowerCase())
            })
        }
        if (this.state.currGenre != "All Genres") {
            filterArr = this.state.movies.filter((movieObj) => genreids[movieObj.genre_ids[0]] == this.state.currGenre)
        }
        let pages;
        let pageArr = [];
        if(this.state.limit != 0)
        {
            pages = Math.ceil(filterArr.length / this.state.limit);
            for (let i = 1; i <= pages; i++)
                pageArr.push(i)
            let startIdx = (this.state.currPage - 1) * this.state.limit;
            let endIdx = startIdx + this.state.limit;
            filterArr = filterArr.slice(startIdx, endIdx);
        }
        return (
            <div>
                <>
                    {
                            <div className='main'>
                                <div className='row'>
                                    <div className='col-lg-3 col-sm-12'>
                                        <ul class="list-group favorites-genres">
                                            {
                                                this.state.genres.map((genre) => (
                                                    this.state.currGenre == genre ?
                                                        <li className='list-group-item' style={{ background: '#3f51b5', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>{genre}</li> :
                                                        <li className='list-group-item' style={{ background: 'white', color: '#3f51b5', cursor: 'pointer' }} onClick={() => this.handleGenreChange(genre)}>{genre}</li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                    <div className='col-lg-9 favorites-table col-sm-12'>
                                        <div className='row'>
                                            <input type='text' className='input-group-text col' placeholder='Search' value={this.state.currText} onChange={(e) => this.setState({ currText: e.target.value })} />
                                            <input type='number' className='input-group-text col' placeholder='Rows Count' value={this.state.limit} onChange={(e) => this.setState({ limit: e.target.value })} />
                                        </div>
                                        <div className='row'>
                                            <table class="table">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Poster</th>
                                                        <th scope="col">Title</th>
                                                        <th scope="col">Genre</th>
                                                        <th scope="col"><i class="fa-solid fa-sort-up" onClick={this.sortPopularityDesc}></i>Popularity<i class="fa-solid fa-sort-down" onClick={this.sortPopularityAsce}></i></th>
                                                        <th scope="col"><i class="fa-solid fa-sort-up" onClick={this.sortRatingDesc}></i>Rating<i class="fa-solid fa-sort-down" onClick={this.sortRatingAsce}></i></th>
                                                        <th scope="col"></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        filterArr.length == 0 ? <div style={{ display: "flex", justifyContent: "center" }}><h2>No Favorites Added</h2></div> :
                                                        filterArr.map((movieObj) => (
                                                            <tr>
                                                                <td><img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} alt={movieObj.title} style={{ width: "5rem" }} /></td>
                                                                <td>{movieObj.original_title}</td>
                                                                <td>{genreids[movieObj.genre_ids[0]]}</td>
                                                                <td>{movieObj.popularity}</td>
                                                                <td>{movieObj.vote_average}</td>
                                                                <td><button type="button" class="btn btn-danger" onClick={() => this.handleDelete(movieObj.id)}>Delete</button></td>
                                                            </tr>
                                                        ))
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                        <nav aria-label="Page navigation example">
                                            <ul class="pagination">
                                                {
                                                    pageArr.map((page) => (
                                                        <li class="page-item" style={{cursor:"pointer"}}><a class="page-link" onClick={() => this.handlePageChange(page)}>{page}</a></li>
                                                    ))
                                                }
                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                    }
                </>
            </div>
        )
    }
}
