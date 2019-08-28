import React from "react";
import PropTypes from "prop-types";
import './Header.css';

class Header extends React.Component {
    render() {
        const { title } = this.props;

        return (
            <header className="movies-header">
                <h1 className="movies-header-title">{title}</h1>
            </header>
        );
    }
}

Header.propTypes = {
    title: PropTypes.string
}

Header.defaultProps = {
    title: "Movies"
}

export default Header;