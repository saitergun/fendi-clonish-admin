import React from 'react';
import { Link } from 'react-router-dom';
import numeral from 'numeral';

const picturesRenderer = (images) => {
  return (
    <div className="flex items-center -space-x-0.5">
      {images.map((image) => {
        return (
          <img
            key={image.id}
            className="w-6 h-6 rounded-full ring-1 ring-light-gray-4 ring-offset-1 ring-offset-white"
            src={`${process.env.REACT_APP_API_URL}${image.formats.thumbnail.url}`}
            alt={image.caption}
          />
        );
      })}
    </div>
  );
};

const nameRenderer = (name, product) => (
  <Link className="font-600 hover:underline hover:text-link" to={`/products/${product.id}`}>{name}</Link>
);

export default [
  // {
  //   key: 'images',
  //   title: 'PICTURES',
  //   renderProp: 'images',
  //   render: picturesRenderer,
  // },
  {
    key: 'code',
    title: 'Code',
    renderProp: 'code',
  },
  {
    key: 'title',
    title: 'Title',
    renderProp: 'title',
  },
  {
    key: 'name',
    title: 'Name',
    renderProp: 'name',
    // render: nameRenderer,
  },
  {
    key: 'category',
    title: 'Category',
    renderProp: 'category.name_full',
  },
  {
    key: 'price',
    title: 'Price',
    renderProp: 'price',
    alignment: 'end',
    render: (price) => `TRY ${numeral(price).format('0,0.00')}`,
  },
];
