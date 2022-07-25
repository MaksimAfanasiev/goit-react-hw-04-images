import { useState } from "react";
import css from "./Searchbar.module.css"
import PropTypes from "prop-types"

export const Searchbar = ({onSubmit}) => {
    const [query, setQuery] = useState('');

    function onInputChange(e) {
        const { value } = e.target;
        setQuery(value);
    }

    function onFormSubmit(e) {
        e.preventDefault();
        onSubmit(query);
        setQuery('');
    }

    return (
        <header className={css.Searchbar}>
            <form className={css.SearchForm} onSubmit={onFormSubmit}>
                <button type="submit" className={css.SearchFormButton}>
                <span className={css.SearchFormButtonLabel}>Search</span>
                </button>

                <input
                    name="query"
                    className={css.SearchFormInput}
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    value={query}
                    onChange={onInputChange}
                />
            </form>
        </header>
    )
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}