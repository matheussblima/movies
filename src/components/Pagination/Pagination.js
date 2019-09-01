import React from "react";
import PropTypes from "prop-types";
import './Pagination.css';
import paginationControl from "./paginationControl";

class Pagination extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            currentPage: 1,
        }
    }


    onClickPage(currentPage) {
        const { onChangePage } = this.props;
        this.setState({ currentPage });
        onChangePage(currentPage)
    }

    onClickArrowLeft() {
        const { onChangePage } = this.props;
        if (this.state.currentPage > 1) {
            this.setState({ currentPage: this.state.currentPage - 1 });
            onChangePage(this.state.currentPage - 1)
        }
    }

    onClickArrowRight() {
        const { onChangePage } = this.props;
        if (this.state.currentPage < this.props.size) {
            this.setState({ currentPage: this.state.currentPage + 1 });
            onChangePage(this.state.currentPage + 1)
        }
    }

    renderPage(currentPage, size) {

        const pagination = paginationControl(size, currentPage, 0, 5);

        const pagesNumber = pagination.pages.map((value, i) => {
            return (
                <button href="#" key={i} className={`${currentPage === value ? "movies-pagination-page-circle-selected" : "movies-pagination-page-circle-noSelected"} movies-pagination-page-circle`}>
                    <span onClick={() => this.onClickPage(value)} className={`${currentPage === value ? "movies-pagination-page-selected" : "movies-pagination-page-noSelected"} movies-pagination-page`}>
                        {value}
                    </span>
                </button>
            );
        })

        return pagesNumber;

    }

    render() {
        const { currentPage } = this.state;
        const { size } = this.props;


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
    onChangePage: PropTypes.func
}

Pagination.defaultProps = {
    size: 500,
    onChangePage: () => { }
}

export default Pagination;