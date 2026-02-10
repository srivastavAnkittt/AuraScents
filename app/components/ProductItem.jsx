import { Link } from 'react-router';
import { Image, Money, CartForm } from '@shopify/hydrogen';
import { useVariantUrl } from '~/lib/variants';
import { AddToCartButton } from './AddToCartButton';

/**
 * @param {{
 *   product:
 *     | CollectionItemFragment
 *     | ProductItemFragment
 *     | RecommendedProductFragment;
 *   loading?: 'eager' | 'lazy';
 * }}
 */
export function ProductItem({ product, loading }) {
  const variantUrl = useVariantUrl(product.handle);
  const image = product.featuredImage;
  return (
    <div className="card group sm:max-w-sm">
      <figure>
        <Link
          className="product-item"
          key={product.id}
          prefetch="intent"
          to={variantUrl}
        >
        {image && (
          <Image
            alt={image.altText || product.title}
            aspectRatio="1/1"
            data={image}
            loading={loading}
            sizes="(min-width: 45em) 400px, 100vw"
            className='transition-transform'
          />
        )}
        </Link>
      </figure>
      <div className="card-body">
        <h5 className="card-title mb-2.5">{product.title}</h5>
        <p className="mb-6"><Money data={product.priceRange.minVariantPrice} /></p>
        <div class="card-actions">
          <CartForm route="/cart" action={CartForm.ACTIONS.LinesAdd} inputs={{
            lines: [{ merchandiseId: product.variants.nodes[0]?.id, quantity: 1 }]
          }}>
            <button type="submit" className='bg-black w-full text-white p-2'>Add to Cart</button>
          </CartForm>
        </div>
      </div>
    </div>
  );
}

/** @typedef {import('storefrontapi.generated').ProductItemFragment} ProductItemFragment */
/** @typedef {import('storefrontapi.generated').CollectionItemFragment} CollectionItemFragment */
/** @typedef {import('storefrontapi.generated').RecommendedProductFragment} RecommendedProductFragment */
