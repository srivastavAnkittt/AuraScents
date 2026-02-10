// import React from "react"
import { Image } from '@shopify/hydrogen';
import { Suspense } from 'react';
import { Await } from 'react-router';
import { ProductItem } from '~/components/ProductItem';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


export default function RecommendedProduct({ recommendedProducts }) {
  return (
    <>
      <section>
        <h2 className="text-2xl font-bold mb-4">Recommended Products</h2>
        <Suspense fallback={<div>Loading...</div>}>
          <Await resolve={recommendedProducts}>

            {(data) => (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {data.nodes.map((product) => (
                  <ProductItem key={product.id} product={product} />
                ))}
              </div>
            )}

          </Await>
        </Suspense>
      </section>
    </>
  )
}   