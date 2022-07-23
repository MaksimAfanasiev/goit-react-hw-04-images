import { Component } from "react";
import css from "./Modal.module.css"
import PropTypes from "prop-types"

export class Modal extends Component {

    static propTypes = {
        image:PropTypes.object,
        closeImage:PropTypes.func,
    }

    componentDidMount() {
        window.addEventListener("keydown", this.onEscClick)

    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.onEscClick);
    }

    onEscClick = (e) => {
        if (e.code === 'Escape') this.props.closeImage();
    }

    onOverlayClick = (e) => {
        if (e.target.nodeName !== "IMG") {
            window.removeEventListener('keydown', this.onEscClick);
            this.props.closeImage()
        }
    }

    render() {
        const { largeImageURL, tags } = this.props.image;
        return(
            <div className={css.Overlay} onClick={this.onOverlayClick}>
                <div className={css.Modal}>
                    <img src={largeImageURL} alt={tags} />
                </div>
            </div>
        )
    }
}