import { Component } from "react";
import css from "./Searchbar.module.css"
import PropTypes from "prop-types"

export class Searchbar extends Component {

    static propTypes= {
        onSubmit: PropTypes.func,
    }

    state = {
        query: "",
    }

    onInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value })
    }

    onFormSubmit = (e) => {
        e.preventDefault();
        this.props.onSubmit(this.state.query)
        this.setState({query: ""})
    }

    render() {
        return (
            <header className={css.Searchbar}>
                <form className={css.SearchForm} onSubmit={this.onFormSubmit}>
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
                        value={this.state.query}
                        onChange={this.onInputChange}
                    />
                </form>
            </header>
        )
    }
}