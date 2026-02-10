import { Image } from "@shopify/hydrogen"
import { Link } from 'react-router';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function Blogs({ blog }) {
    function PrevArrow({ onClick }) {
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
    function NextArrow({ onClick }) {
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
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 3000,
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />,
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 2 } },
            { breakpoint: 640, settings: { slidesToShow: 1 } },
        ],
    };

    return (
        <>
            <div>
                <h1>Getting blog data</h1>
                <Slider {...settings}>
                    {blog.map((article, index) => {
                        return (
                            <Link to={`/blogs/${article.blogHandle}/${article.handle}`}>
                                <div className="card p-2 ankittttttt" key={index}>
                                    <figure className="h-100"><img className="h-full" src={article.image.src} alt={article.title} /></figure>
                                    <div className="card-body pt-5">
                                        <h2 className="card-title mb-2.5">{article.title}</h2>
                                        <p className="mb-4">{article.content.split(' ').slice(0, 30).join(' ')}...</p>
                                    </div>
                                </div>
                            </Link>
                        )
                    })}
                </Slider>
            </div>
        </>
    )
}