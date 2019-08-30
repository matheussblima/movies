import React from "react";
import "./MovieInfo.css"

class MovieInfo extends React.Component {
    render() {
        const gerer = ["Ação", "Drama", "Terror"];

        return (
            <div>
                <div className="movies-movieinfo-container">
                    <div className="movies-movieinfo-container-image">
                        <img className="movies-movieinfo-image" alt="banner-movie" src="https://pbs.twimg.com/media/DIExZZJWsAAQ0Cj.jpg"></img>
                    </div>
                    <div className="movies-movieinfo-container-content">
                        <header className="movies-movieinfo-header">
                            <h2 className="movies-movieinfo-title">Thor: Ragnarok</h2>
                            <div className="movies-movieinfo-header-circle">
                                <span className="movies-movieinfo-title-average">70%</span>
                            </div>
                        </header>
                        <section className="movies-movieinfo-section">
                            <p>
                                <img className="movies-movieinfo-image-mobile" alt="banner-movie" src="https://pbs.twimg.com/media/DIExZZJWsAAQ0Cj.jpg"></img>
                                Thor: Ragnarok is a 2017 American superhero film based on the Marvel Comics
                                character Thor, produced by Marvel Studios and distributed by Walt Disney
                                Studios Motion Pictures. It is the sequel to 2011's Thor and 2013's Thor:
                                The Dark World, and the seventeenth film in the Marvel Cinematic Universe
                                (MCU). The film is directed by Taika Waititi from a screenplay by
                                Eric Pearson and the writing team of Craig Kyle and Christopher Yost,
                                and stars Chris Hemsworth as Thor alongside Tom Hiddleston, Cate Blanchett,
                                Idris Elba, Jeff Goldblum, Tessa Thompson, Karl Urban, Mark Ruffalo, and Anthony Hopkins.
                                In Thor: Ragnarok, Thor must escape the alien planet Sakaar in time to save Asgard from Hela
                                and the impending Ragnarök.
                            </p>
                            <div>
                                <div className="movies-movieinfo-genre-movie-container">
                                    {gerer.map((value, index) => <span key={index} className="movies-movieinfo-genre-movie">{value}</span>)}
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        );
    }
}

export default MovieInfo;
