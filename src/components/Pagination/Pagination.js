import React from "react";
import PropTypes from "prop-types";
import './Pagination.css';
import paginationControl from "./paginationControl";

class Pagination extends React.Component {
    constructor(props) {
        super(props)

        this.onClickPage = this.onClickPage.bind(this)
    }


    onClickPage(currentPage) {
        const { onChangePage } = this.props;
        onChangePage(currentPage)
    }

    onClickArrowLeft() {
        const { onChangePage, currentPage } = this.props;
        if (currentPage > 1) {
            onChangePage(currentPage - 1)
        }
    }

    onClickArrowRight() {
        const { onChangePage, currentPage } = this.props;
        if (currentPage < this.props.size) {
            onChangePage(currentPage + 1)
        }
    }

    renderPage(currentPage, size) {

        const pagination = paginationControl(size, currentPage, 0, 5);

        const pagesNumber = pagination.pages.map((value, i) => {
            return (
                <button onClick={(event) => {
                    event.stopPropagation();
                    this.onClickPage(value);
                }} key={i} className={`${currentPage === value ? "movies-pagination-page-circle-selected" : "movies-pagination-page-circle-noSelected"} movies-pagination-page-circle`}>
                    <span className={`${currentPage === value ? "movies-pagination-page-selected" : "movies-pagination-page-noSelected"} movies-pagination-page`}>
                        {value}
                    </span>
                </button>
            );
        })

        return pagesNumber;

    }

    render() {
        const { size, currentPage } = this.props;

        return (
            <div className="movies-pagination-container">
                <button className="movies-pagination-arrow" onClick={() => this.onClickArrowLeft(currentPage)}>&laquo;</button>
                {this.renderPage(currentPage, size)}
                <button className="movies-pagination-arrow" onClick={() => this.onClickArrowRight(currentPage)}>&raquo;</button>
            </div>
        );
    }
}

Pagination.propTypes = {
    size: PropTypes.number,
    onChangePage: PropTypes.func,
    currentPage: PropTypes.number,
}

Pagination.defaultProps = {
    size: 500,
    onChangePage: () => { },
    currentPage: 1
}

export default Pagination;