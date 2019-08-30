import React from "react";
import PropTypes from "prop-types";
import './Pagination.css';

class Pagination extends React.Component {

    onClickPage(i) {
        console.log('====================================');
        console.log(i);
        console.log('====================================');
    }

    onClickArrowRight() {

    }

    renderPage(size, page) {
        let pagesNumber = [];

        for (let i = 1; i <= 5; i++) {
            pagesNumber.push(
                <button href="#" key={i} className={`${page === i ? "movies-pagination-page-circle-selected" : "movies-pagination-page-circle-noSelected"}`}>
                    <span onClick={() => this.onClickPage(i)} className={`${page === i ? "movies-pagination-page-selected" : "movies-pagination-page-noSelected"} movies-pagination-page`}>
                        {i}
                    </span>
                </button>
            );
        }

        return pagesNumber;

    }

    render() {
        const { title } = this.props;

        const size = 500;
        const page = 1;

        return (
            <div className="movies-pagination-container">
                <button className="movies-pagination-arrow">&laquo;</button>
                {this.renderPage(size, page)}
                <button className="movies-pagination-arrow" onClick={() => this.onClickArrowRight()}>&raquo;</button>
            </div>
        );
    }
}

Pagination.propTypes = {
    title: PropTypes.string
}

Pagination.defaultProps = {
    title: "Movies"
}

export default Pagination;