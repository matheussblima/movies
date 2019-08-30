import React from "react";
import { connect } from 'react-redux';
import { Header, Movie } from "../../components"

import { getMovies } from "../../duck/movies"
import { getGenres } from "../../duck/genres"

import "./Home.css"

class Home extends React.Component {
    componentWillMount() {
        const { getMovies, getGenres } = this.props;
        getMovies();
        getGenres();
    }

    render() {
        const { movies } = this.props.movies;
        const { genres } = this.props.genres;
        const isSuccessMovies = this.props.movies.isSuccess;
        const isSuccessGenres = this.props.genres.isSuccess;


        return (
            <div>
                <Header />
                <section className="movie-home-content">
                    {isSuccessMovies && isSuccessGenres ?
                        (
                            movies.results.map((value, index) => {
                                const genreMovies = [];

                                genres.genres.forEach((elementGenre) => {
                                    value.genre_ids.forEach(elementGenreMovies => {
                                        if (elementGenreMovies === elementGenre.id) {
                                            genreMovies.push(elementGenre.name);
                                        }
                                        return;
                                    });
                                    return;
                                })

                                return (
                                    <div key={index} className="movie-home-list">
                                        <Movie
                                            title={value.title}
                                            description={value.overview}
                                            average={(value.vote_average * 10).toString()}
                                            image={`http://image.tmdb.org/t/p/w500/${value.poster_path}`}
                                            genre={genreMovies}
                                        />
                                    </div>
                                );
                            })
                        ) :
                        (
                            <h1>Erro ao buscar filmes</h1>
                        )}
                </section>
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
    getMovies: () => dispatch(getMovies()),
    getGenres: () => dispatch(getGenres())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);