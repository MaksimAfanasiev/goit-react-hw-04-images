import { useEffect } from "react";
import css from "./Modal.module.css"
import PropTypes from "prop-types"

export const Modal = ({ image, closeImage }) => {

    useEffect(() => {

        function onEscClick(e) {
            if (e.code === 'Escape') closeImage();
        };

        window.addEventListener("keydown", onEscClick);

        return () => {
            window.removeEventListener('keydown', onEscClick);
        }
    }, [closeImage])
    
    function onOverlayClick(e) {
        if (e.target.nodeName !== "IMG") {
            closeImage()
        }
    }

    const { largeImageURL, tags } = image;
    return(
        <div className={css.Overlay} onClick={onOverlayClick}>
            <div className={css.Modal}>
                <img src={largeImageURL} alt={tags} />
            </div>
        </div>
    )
}

Modal.propTypes = {
    image:PropTypes.object.isRequired,
    closeImage:PropTypes.func.isRequired,
}