
import React, { useEffect, useState } from 'react';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import { sliderData } from './SLiderData';
import { useNavigate } from 'react-router-dom';

const Slider = () => {
    const navigate = useNavigate();
    const [currentSlide, setCurrentSlide] = useState(0);
    const slideLength = sliderData.length;
    const autoScroll = true;
    let slideInterval;
    const intervalTime = 50000;

    const nextSlide = () => { 
        setCurrentSlide(currentSlide === slideLength - 1 ? 0 : currentSlide + 1);
    };

    const prevSlide = () => {  
        setCurrentSlide(currentSlide === 0 ? slideLength - 1 : currentSlide - 1);
    };

    useEffect(() => {
        setCurrentSlide(0);
    }, []);

    useEffect(() => {
        if (autoScroll) {
            const auto = () => {
                slideInterval = setInterval(nextSlide, 50000);
            };
            auto();
        }  
        return () => clearInterval(slideInterval);      
    }, [currentSlide, intervalTime, autoScroll]);
    
    return (
        <div className="w-full h-90vh relative overflow-hidden bg-dark ">
            

                <AiOutlineArrowLeft className="arrow prev absolute top-1/2 left-0 transform -translate-y-1/2" onClick={prevSlide} />
                <AiOutlineArrowRight className="arrow next absolute top-1/2 right-0 transform -translate-y-1/2" onClick={nextSlide} />

            {sliderData.map((slide, index) => {
                const { image, heading, desc } = slide;
                return (

                    <div key={index} className={index === currentSlide ? "slide current" : "slide"}>
                        {index === currentSlide && (
                            <>
                                <img src={image} alt="slide" />
                                <div className="content relative text-center top-23rem left-1/2 opacity-0 w-1/2 transform -translate-x-1/2 bg-black bg-opacity-40 p-12 box-border overflow-hidden shadow-2xl">
                                    <span className="span1 absolute top-0 left-0 w-full h-full bg-blue-500"></span>
                                    <span className="span2 absolute bottom-0 right-0 w-full h-full bg-blue-500"></span>
                                    <span className="span3 absolute top-0 left-0 w-full h-full bg-blue-500"></span>
                                    <span className="span4 absolute bottom-0 right-0 w-full h-full bg-blue-500"></span>
                                    <h2 className="text-white text-4xl mb-6">{heading}</h2>
                                    <p className="text-white mb-6">{desc}</p>
                                    <hr className="border-white w-1/2 mb-6" />
                                    <button className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                        Shop Now
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default Slider;
