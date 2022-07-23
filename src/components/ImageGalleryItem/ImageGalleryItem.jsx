import css from "./ImageGalleryItem.module.css"
import PropTypes from "prop-types"

export const ImageGalleryItem = ({ image, openImage }) => {
    return (
        <li className={css.ImageGalleryItem}>
            <img className={css.ImageGalleryItemImage} src={image.webformatURL} alt={image.tags} onClick={() => openImage(image)} />
        </li>
    )
}

ImageGalleryItem.propTypes = {
    image: PropTypes.object.isRequired,
    openImage: PropTypes.func,
}