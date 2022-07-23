import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { TailSpin } from 'react-loader-spinner'
import { Modal } from "./Modal/Modal";
import css from "./App.module.css"

export class App extends Component {

  state = {
    searchQuery: "",
    images: [],
    page: 1,
    isLoading: false,
    modalImage: null,
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.fetchData().then(images => this.setState({images}))
    }

    if (prevState.searchQuery === this.state.searchQuery && prevState.page !== this.state.page) {
      this.fetchData().then(images => this.setState((state) => ({images: [...state.images, ...images]})))
    }
  }

  getQuery = (query) => { 
    this.setState({
      searchQuery: query,
      page:1});
  }

  fetchData = async() => {
    const KEY = "27715674-92925a6f691a5283ca5f8bc26";
    const query = this.state.searchQuery;
    const page = this.state.page;
    const URL = `https://pixabay.com/api/?q=${query}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`;
    

    this.setState({isLoading: true})
    const response = await fetch(URL);
    const data = await response.json();

    const images = data.hits.map(({id, webformatURL, largeImageURL, tags}) => {
        return {id, webformatURL, largeImageURL, tags}
      }
    )

    this.setState({isLoading: false})
    return images;
  }

  onLoadMoreClick = () => {
    this.setState((prevState) => ({page: prevState.page + 1}))
  }

  openModal = (img) => {
    this.setState({modalImage: img})
  }

  closeModal = () => {
    this.setState({modalImage: null})
  }

  render() {
    const { images, isLoading, modalImage } = this.state;

    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.getQuery} />

        <ImageGallery images={images} openImage={this.openModal} />

        {isLoading && <TailSpin height="80" width="80" color='grey' ariaLabel='loading' />}

        {images.length > 0 && <Button onClick={this.onLoadMoreClick} />}

        {modalImage && <Modal image={modalImage} closeImage={this.closeModal} />}
      </div>
    )
  }
};
