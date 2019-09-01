import React from "react";
import { connect } from 'react-redux';
import { Header, Movie, Pagination, SearchInput } from "../../components"

import { getMovies, searchMovies } from "../../duck/movies"
import { getGenres } from "../../duck/genres"

import "./Home.css"

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            moviesPage: [],
            moviesApi: [],
            resultsTotal: 10000,
            pagesTotal: 500,
            chunkSize: 4,
            searchValue: "",
            moviesSearchApi: {}
        }
        const { getGenres } = this.props;
        const { getMovies } = this.props;

        getGenres();
        getMovies(1).then(() => {
            const { movies } = this.props.movies;

            const moviesPage = this.chunk(movies.results, 5);

            this.setState({ resultsTotal: movies.total_results, pagesTotal: movies.total_pages, moviesPage: moviesPage[0], chunkSize: moviesPage.length })
        });
    }

    onChangePage(value) {
        const { searchValue } = this.state;

        if (!searchValue) {
            this.getMoviesApi(value);
        } else {
            this.paginationSearch(value);
        }
    }

    onConfigPages(currentPage) {
        const { pagesTotal, chunkSize } = this.state;

        const matiz = [[], [], []];

        const arrayPages = [];
        const arrayApi = [];
        const arrayIndex = [];

        let count = 0;
        let apiCount = 1;

        for (let index = 0; index < pagesTotal * chunkSize; index++) {
            arrayPages.push(index + 1);

            count++;

            if (count === chunkSize + 1) {
                apiCount++;
                count = 0;
            } else {
                arrayApi.push(apiCount);
                arrayIndex.push(count - 1);
            }
        }

        matiz[0] = arrayPages;
        matiz[1] = arrayApi;
        matiz[2] = arrayIndex;

        const page = matiz[0].find((value) => value === currentPage);
        const index = matiz[0].findIndex((value) => value === currentPage);

        return {
            page,
            api: matiz[1][index],
            index: matiz[2][index]
        }
    }

    paginationSearch(currentPage) {
        const { searchMovies } = this.props;
        const { searchValue } = this.state;

        const objectConfigPage = this.onConfigPages(currentPage);

        searchMovies(searchValue, objectConfigPage.api).then(() => {
            const { moviesSearch } = this.props.movies;

            const moviesPage = this.chunk(moviesSearch.results, 5);

            this.setState({
                moviesPage: moviesPage[objectConfigPage.index],
                resultsTotal: moviesSearch.total_results,
                pagesTotal: moviesSearch.total_pages,
                chunkSize: moviesPage.length,
                moviesSearchApi: moviesSearch.results,
            });
        });

    }

    getMoviesApi(currentPage) {
        const { getMovies } = this.props;

        const objectConfigPage = this.onConfigPages(currentPage);

        getMovies(objectConfigPage.api).then(() => {
            const { movies } = this.props.movies;

            const moviesPage = this.chunk(movies.results, 5);

            this.setState({ moviesPage: moviesPage[objectConfigPage.index] });
        });
    }


    chunk(array, size) {
        const chunkArray = [];
        for (let i = 0; i < Math.ceil(array.length / size); i++) {
            chunkArray.push(array.slice(i * size, i * size + size));
        }
        return chunkArray;
    }

    multipleFive(value) {
        let number = value;

        while (number % 5 !== 0) {
            number = number + 1;
        }

        return number;
    }

    onChange(event) {
        const { searchMovies, getMovies } = this.props;


        this.setState({ searchValue: event.target.value })

        if (event.target.value) {
            searchMovies(event.target.value).then(() => {
                const { moviesSearch } = this.props.movies;

                const moviesPage = this.chunk(moviesSearch.results, 5);

                this.setState({
                    resultsTotal: moviesSearch.total_results,
                    pagesTotal: moviesSearch.total_pages,
                    moviesPage: moviesPage[0],
                    chunkSize: moviesPage.length,
                    moviesSearchApi: moviesSearch.results,
                })
            });
        } else {
            getMovies(1).then(() => {
                const { movies } = this.props.movies;

                const moviesPage = this.chunk(movies.results, 5);

                this.setState({
                    resultsTotal: movies.total_results,
                    pagesTotal: movies.total_pages,
                    moviesPage: moviesPage[0],
                    chunkSize: moviesPage.length
                })
            });
        }

    };

    render() {
        const { moviesPage, pagesTotal, chunkSize } = this.state;
        const { genres } = this.props.genres;
        const isSuccessMovies = this.props.movies.isSuccess;
        const isSuccessGenres = this.props.genres.isSuccess;
        const isFetchMovies = this.props.movies.isFetch;
        const isFetchGenres = this.props.genres.isFetch;

        return (
            <div>
                <Header />
                <section className="movie-home-content">
                    <SearchInput onChange={this.onChange.bind(this)} />
                    {(isSuccessMovies && isSuccessGenres) ?
                        (
                            moviesPage.map((value, index) => {
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
                            !isFetchMovies && !isFetchGenres && !isSuccessMovies && !isFetchGenres ? <h1>Erro ao buscar filmes</h1> : undefined
                        )}
                    {isSuccessMovies && isSuccessGenres ? (<Pagination size={pagesTotal * chunkSize} onChangePage={(value) => this.onChangePage(value)} />) : undefined}
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
)(Home);