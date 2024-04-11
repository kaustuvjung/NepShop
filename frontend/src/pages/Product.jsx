import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useParams } from 'react-router-dom';
import BreadCrum from '../component/breadCrums/BreadCrum';
import ProductDisplay from '../component/Product/producDisplay/ProductDisplay';
import DescriptionBox from '../component/description/DescriptionBox';
import RelatedProduct from '../component/Product/relatedProduct/RelatedProduct';

const Product = () => {
  const {all_product} = useContext(ShopContext);
  const {productId} = useParams();
  const product = all_product.find((e) => e.id === Number(productId));

  return (
    <div className="flex flex-col max-w-full overflow-x-hidden">
      <BreadCrum product = {product} />
      <ProductDisplay product = {product} />
      <DescriptionBox />
      <RelatedProduct />
    </div>

  )
}

export default Product