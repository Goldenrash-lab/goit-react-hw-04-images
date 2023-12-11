import React from 'react';
import { GalleryItem, ItemImage } from './ImageGalleryItem.styled';
export const ImageGalleryItem = ({ largeImageURL, webformatURL, openModal }) => {
  const handleClick = e => {
    openModal(largeImageURL);
  };

  return (
    <GalleryItem onClick={handleClick}>
      <ItemImage src={webformatURL} alt="#" />
    </GalleryItem>
  );
};
