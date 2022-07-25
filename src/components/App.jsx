import { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { TailSpin } from 'react-loader-spinner'
import { Modal } from "./Modal/Modal";
import css from "./App.module.css"

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [modalImage, setModalImage] = useState(null);

  useEffect(() => {
    if (searchQuery === "") {
      return;
    }else {
      fetchData(searchQuery, page).then(images => setImages((state) => [...state, ...images]))
      }
  }, [searchQuery, page]);

  function getQuery(query) {
    setImages([]);
    setSearchQuery(query);
    setPage(1);
  }

  async function fetchData (query, page) {
    const KEY = "27715674-92925a6f691a5283ca5f8bc26";
    const URL = `https://pixabay.com/api/?q=${query}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`;
    
    setIsLoading(true);
    const response = await fetch(URL);
    const data = await response.json();

    const images = data.hits.map(({id, webformatURL, largeImageURL, tags}) => {
        return {id, webformatURL, largeImageURL, tags}
      }
    )

    setIsLoading(false);
    return images;
  }

  function openModal(img) {
    setModalImage(img);
  }

  return (
    <div className={css.App}>
      <Searchbar onSubmit={getQuery} />

      <ImageGallery images={images} openImage={openModal} />

      {isLoading && <TailSpin height="80" width="80" color='grey' ariaLabel='loading' />}

      {images.length > 0 && <Button onClick={() => setPage(page => page + 1)} />}

      {modalImage && <Modal image={modalImage} closeImage={() => setModalImage(null)} />}
    </div>
  )
}