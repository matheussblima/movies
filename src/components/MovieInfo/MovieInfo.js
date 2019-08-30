import React from "react";
import PropTypes from "prop-types";
import "./MovieInfo.css";

class MovieInfo extends React.Component {
    render() {
        const { average, image, title, genre, description } = this.props;

        return (
            <div>
                <div className="movies-movieinfo-container">
                    <div className="movies-movieinfo-container-image">
                        <img className="movies-movieinfo-image" alt="banner-movie" src={image}></img>
                    </div>
                    <div className="movies-movieinfo-container-content">
                        <header className="movies-movieinfo-header">
                            <h2 className="movies-movieinfo-title">{title}</h2>
                            <div className="movies-movieinfo-header-circle">
                                <span className="movies-movieinfo-title-average">{`${average}%`}</span>
                            </div>
                        </header>
                        <section className="movies-movieinfo-section">
                            <p>
                                <img className="movies-movieinfo-image-mobile" alt="banner-movie" src={image}></img>
                                {description}
                            </p>
                            <div>
                                <div className="movies-movieinfo-genre-movie-container">
                                    {genre.map((value, index) => <span key={index} className="movies-movieinfo-genre-movie">{value}</span>)}
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        );
    }
}

MovieInfo.propTypes = {
    title: PropTypes.string,
    average: PropTypes.string,
    genre: PropTypes.array,
    image: PropTypes.string,
    description: PropTypes.string,
}

MovieInfo.defaultProps = {
    title: "Titulo",
    average: "70",
    genre: ["Ação", "Drama", "Terror"],
    image: "https://pbs.twimg.com/media/DIExZZJWsAAQ0Cj.jpg",
    description: "Thor: Ragnarok is a 2017 American superhero film based on the Marvel Comics character Thor, produced by Marvel Studios and distributed by Walt Disney Studios Motion Pictures. It is the sequel to 2011's Thor and 2013's Thor: The Dark World, and the seventeenth film in the Marvel Cinematic Universe (MCU). The film is directed by Taika Waititi from a screenplay by"
}

export default MovieInfo;
