import React from "react";
import { connect } from 'react-redux';
import { Header } from "../../components";

import { getDetailsMovies, getVideoMovies } from "../../duck/movies"
import { getGenres } from "../../duck/genres"

import "./MovieDetails.css"

class MovieDetails extends React.Component {
    constructor(props) {
        super(props);

        this.props.getDetailsMovies(this.props.match.params.id);
        this.props.getVideoMovies(this.props.match.params.id);
        this.props.getGenres();
    }

    renderVideo() {
        const { moviesVideo } = this.props.movies;

        if (moviesVideo.results.length > 0) {
            return (
                <iframe title="video" style={{ marginTop: 32 }} width="100%" height="700"
                    src={`https://www.youtube.com/embed/${moviesVideo.results[0].key}`}>
                </iframe>
            );
        }
        return undefined;
    }

    render() {
        const { moviesDetails } = this.props.movies;
        const { genres } = this.props.genres;
        const isSuccessMovies = this.props.movies.isSuccess;
        const isSuccessGenres = this.props.genres.isSuccess;

        const genreMovies = [];
        const average = 80;

        if (isSuccessGenres && isSuccessMovies && moviesDetails) {
            genres.genres.forEach((elementGenre) => {
                moviesDetails.genres.forEach(elementGenreMovies => {
                    if (elementGenreMovies.id === elementGenre.id) {
                        genreMovies.push(elementGenre.name);
                    }
                    return;
                });
                return;
            })
        }

        return (
            <div>
                <Header />
                {(isSuccessMovies && isSuccessGenres && moviesDetails) ? (
                    <section className="movie-details-content">
                        <div className="movie-details-info-header">
                            <h1 className="movie-details-info-header-title">{moviesDetails.title}</h1>
                        </div>
                        <div className="movie-details-info-container">
                            <div style={{ display: "flex", flexDirection: "row" }}>
                                <div>
                                    <div className="movie-details-info-content">
                                        <h2 className="movie-details-info-container-title">Sinopse</h2>
                                        <p>
                                            <img className="movies-details-image-mobile" alt="banner-movie" src={`http://image.tmdb.org/t/p/w500/${moviesDetails.poster_path}`}></img>
                                            {moviesDetails.overview}
                                        </p>
                                    </div>
                                    <div className="movie-details-info-content">
                                        <h2 className="movie-details-info-container-title">Informações</h2>
                                        <div className="movie-details-info-container-details">
                                            <div className="movie-details-info-content-details">
                                                <span className="movie-details-info-content-details-title">Situação</span><br />
                                                <span className="movie-details-info-content-details-text">{moviesDetails.status}</span>
                                            </div>
                                            <div className="movie-details-info-content-details">
                                                <span className="movie-details-info-content-details-title">Idioma</span><br />
                                                <span className="movie-details-info-content-details-text">{moviesDetails.original_language}</span>
                                            </div>
                                            <div className="movie-details-info-content-details">
                                                <span className="movie-details-info-content-details-title">Duração</span><br />
                                                <span className="movie-details-info-content-details-text">{moviesDetails.runtime}</span>
                                            </div>
                                            <div className="movie-details-info-content-details">
                                                <span className="movie-details-info-content-details-title">Orçamento</span><br />
                                                <span className="movie-details-info-content-details-text">{moviesDetails.budget}</span>
                                            </div>
                                            <div className="movie-details-info-content-details">
                                                <span className="movie-details-info-content-details-title">Receira</span><br />
                                                <span className="movie-details-info-content-details-text">{moviesDetails.revenue}</span>
                                            </div>
                                            <div className="movie-details-info-content-details">
                                                <span className="movie-details-info-content-details-title">Lucro</span><br />
                                                <span className="movie-details-info-content-details-text">{+moviesDetails.revenue - +moviesDetails.budget}</span>
                                            </div>
                                        </div>
                                        <div className="movies-movieinfo-genre-movie-container">
                                            {genreMovies.map((value, index) => <span key={index} className="movies-movieinfo-genre-movie">{value}</span>)}
                                        </div>
                                        <div className="movies-details-circle-container">
                                            <div className="movies-details-circle">
                                                <span className="movies-details-title-average">{`${average}%`}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="movies-details-container-image">
                                    <img className="movies-details-image" alt="banner-movie" src={`http://image.tmdb.org/t/p/w500/${moviesDetails.poster_path}`}></img>
                                </div>
                            </div>
                        </div>
                        {this.renderVideo()}
                    </section>
                ) : (undefined)}
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        ...state
    }
};

const mapDispatchToProps = dispatch => ({
    getDetailsMovies: (id) => dispatch(getDetailsMovies(id)),
    getGenres: () => dispatch(getGenres()),
    getVideoMovies: (id) => dispatch(getVideoMovies(id))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MovieDetails);