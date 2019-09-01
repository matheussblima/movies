import React from "react";
import './SearchInput.css';

class SearchInput extends React.Component {
    render() {
        return (
            <input
                {...this.props}
                type="text"
                placeholder="Busque um filme por nome, ano ou gênero"
                className="movies-search-input"
            />
        );
    }
}

export default SearchInput;