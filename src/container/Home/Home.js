import React from "react";
import { Header, Movie } from "../../components"

import "./Home.css"

class Home extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <section className="movie-home-content">
                    <Movie />
                </section>
            </div>
        );
    }
}

export default Home;