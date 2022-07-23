import { ImageGalleryItem } from "../ImageGalleryItem/ImageGalleryItem"
import css from "./ImageGallery.module.css"
import PropTypes from "prop-types"

export const ImageGallery = ({images, openImage}) => {
    return (
        images.length > 0 && (<ul className={css.ImageGallery}>
            {images.map(image => <ImageGalleryItem key={image.id} image={image} openImage={openImage} />)}
        </ul>)
    )
}

ImageGallery.propTypes = {
    images: PropTypes.arrayOf(PropTypes.object).isRequired,
    openImage: PropTypes.func.isRequired,
}