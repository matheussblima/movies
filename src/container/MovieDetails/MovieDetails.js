import React from "react";
import { connect } from 'react-redux';
import { Header } from "../../components"

import { getMovies, searchMovies } from "../../duck/movies"
import { getGenres } from "../../duck/genres"

import "./MovieDetails.css"

class MovieDetails extends React.Component {

    render() {

        return (
            <div>
                <Header />
                <section className="movie-home-content">

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
    getMovies: (page) => dispatch(getMovies(page)),
    searchMovies: (query, page) => dispatch(searchMovies(query, page)),
    getGenres: () => dispatch(getGenres())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MovieDetails);