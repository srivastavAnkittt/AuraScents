import {Link} from 'react-router';
import {Image} from '@shopify/hydrogen';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function HomeBannerSlider({banners, collections}) {
  if (!banners || banners.length === 0) return null;
  function PrevArrow({onClick}) {
  return (
    <button
      onClick={onClick}
      className="absolute left-4 top-1/2 -translate-y-1/2 
                 bg-[#9b9696] text-white w-10 h-10 rounded-full cursor-pointer
                 flex items-center justify-center z-1"
    >
      ‹
    </button>
  );
}
function NextArrow({onClick}) {
  return (
    <button
      onClick={onClick}
      className="absolute right-4 top-1/2 -translate-y-1/2 
                 bg-[#9b9696] text-white w-10 h-10 rounded-full cursor-pointer
                 flex items-center justify-center z-1"
    >
      ›
    </button>
  );
}
   const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  return (
    <section>
      <div className='bannerslider'>
        <Slider {...settings}>
        {banners.map((banner, i) => {
          const collection = collections?.[i];
          const url = collection
            ? `/collections/${collection.handle}`
            : null;

          return (
            <div key={i} className="rounded overflow-hidden">
              {url ? (
                <Link to={url}>
                  <Image
                    data={banner}
                    sizes="100vw"
                    className="rounded cursor-pointer"
                  />
                </Link>
              ) : (
                <Image
                  data={banner}
                  sizes="100vw"
                  className="rounded"
                />
              )}
            </div>
          );
        })}
      </Slider>
      </div>
    </section>
  );
}
