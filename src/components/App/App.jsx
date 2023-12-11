import React, { useEffect, useState } from 'react';
import { AppWrapper } from './App.styled';
import { SearchBar } from 'components/SearchBar/SearchBar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Button } from 'components/Button/Button';
import { Notify } from 'notiflix';
import { Modal } from 'components/Modal/Modal';
import { getImages } from 'services/api';
import { Loader } from 'components/Loader/Loader';

export const App = () => {
  const [images, setImages] = useState(null);
  const [page, setPage] = useState(1);
  const [isSearch, setIsSearch] = useState(false);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [url, setUrl] = useState('');

  const getSearch = query => {
    setIsSearch(true);
    setPage(1);
    setSearch(query);
  };

  const getPage = () => {
    setPage(prev => prev + 1);
  };

  useEffect(() => {
    async function loadImages() {
      setLoading(true);
      const { hits } = await getImages(search, page);
      setImages(prev => (page > 1 ? [...prev, ...hits] : hits));
      setLoading(false);
    }
    if (search) {
      loadImages();
    }
    // if (page > 1) {
    //   loadImages();
    // }
    if (search === '' && isSearch) {
      Notify.warning('Please entered a text');
    }
  }, [search, page, isSearch]);

  const onWindowCloseModal = e => {
    if (e.code === 'Escape') {
      closeModal();
      window.removeEventListener('keydown', onWindowCloseModal);
    }
  };

  const openModal = url => {
    setUrl(url);
    setModal(true);
    window.addEventListener('keydown', onWindowCloseModal);
  };

  const closeModal = () => {
    setModal(false);
  };

  let loadBtn = false;
  if (images && isSearch && images.length >= 12) {
    loadBtn = true;
  }
  return (
    <AppWrapper>
      {modal && <Modal url={url} close={closeModal} />}
      <SearchBar getSearch={getSearch}></SearchBar>

      {images && (
        <ImageGallery>
          {images.length > 0
            ? images.map(el => (
                <ImageGalleryItem
                  openModal={openModal}
                  key={el.id + el.webformatURL}
                  webformatURL={el.webformatURL}
                  largeImageURL={el.largeImageURL}
                />
              ))
            : Notify.warning('Not found!')}
        </ImageGallery>
      )}
      {loading && <Loader></Loader>}
      {loadBtn && <Button getPage={getPage} />}
    </AppWrapper>
  );
};
