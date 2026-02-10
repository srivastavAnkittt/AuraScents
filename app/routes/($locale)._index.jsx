import { useLoaderData, Link, Await } from 'react-router';
import { Image } from '@shopify/hydrogen';
import HomeBannerSlider from '~/components/HomePageBanner';
import { ssrImportMetaKey } from 'vite/module-runner';
import RecommendedProduct from '~/components/RecommendedProduct';
import Blogs from '~/components/Blogs';
import { HOME_PAGE_METAOBJECT_QUERY } from '~/lib/queries/homepagebanner';
import { BLOGS_QUERY } from '~/lib/queries/blogquery';
import { RECOMMENDED_PRODUCTS_QUERY } from '~/lib/queries/recommended';


export const meta = () => [{ title: 'Hydrogen | Home' }];

export async function loader({ context }) {
  const [metaobjectData, blogData, recommendedProductsData] =
    await Promise.all([
      context.storefront.query(HOME_PAGE_METAOBJECT_QUERY),
      context.storefront.query(BLOGS_QUERY),
      context.storefront.query(RECOMMENDED_PRODUCTS_QUERY).catch(() => null),
    ]);

  const metaobjects = metaobjectData.metaobjects?.nodes;
  const banners = [];
  const collections = [];

  metaobjects.forEach((item) => {

    item.fields.forEach((field) => {
      if (field.key === 'image') {
        field.references.nodes.forEach((node) => {
          if (node?.image) {
            banners.push(node.image);
          }
        });
      }

      if (field.key === 'collection') {
        field.references.nodes.forEach((node) => {
          if (node?.handle) {
            collections.push(node);
          }
        });
      }

    });
  });
  const blogs = [];
  blogData.blogs.nodes.forEach((blog) => {
    blog.articles.nodes.forEach((article) => {
      blogs.push({
        ...article,
        blogHandle: blog.handle,
      });
    });
  });
  return {
    banners,
    collections,
    blogs,
    recommendedProducts: recommendedProductsData?.products,
  };
}

export default function Homepage() {
  const { banners, collections, blogs, recommendedProducts } = useLoaderData();
  return (
    <div className="home p-4 space-y-12">
      <HomeBannerSlider
        banners={banners}
        collections={collections}
      />
      <RecommendedProduct recommendedProducts={recommendedProducts} />
      <Blogs blog={blogs} />
    </div>
  );
}