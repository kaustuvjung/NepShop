import React, { useEffect, useState } from 'react';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import { sliderData } from './SLiderData';
import { useNavigate } from 'react-router-dom';
import "./Slider.scss"
const Slider = () => {
    const navigate = useNavigate();
    const [currentSlide, setCurrentSlide] = useState(0);
    const slideLength = sliderData.length;
    const autoScroll = true;
    let slideInterval;
    const intervalTime=  50000;
    const nextSlide = () => { 
        setCurrentSlide(currentSlide === slideLength -1 ? 0 :  currentSlide +1);
     
    };

    const prevSlide = () => {  
        setCurrentSlide(currentSlide === 0 ? slideLength -1 : currentSlide -1 );

    };
    useEffect(() => {
        setCurrentSlide(0);
    }, [])

    useEffect(() => {
        if (autoScroll)  {
            const auto = () => {
                slideInterval = setInterval(nextSlide, 50000);
            }
            auto();
        }  
        return () => clearInterval(slideInterval);      
    }, [currentSlide, intervalTime, autoScroll ]);
    

    return (
        <div className="w-full h-90vh relative overflow-hidden bg-dark ">
          
            <div className="slider" >

            <AiOutlineArrowLeft className="arrow prev" onClick={prevSlide} />
            <AiOutlineArrowRight className="arrow next" onClick={nextSlide} />
                </div>

            {sliderData.map((slide, index) => {
                const { image, heading, desc } = slide;

               return (
                   <div key={index} className={index === currentSlide ? "slide current" : "slide"} >
                    {index === currentSlide && (
                      <>
                      <img src={image} alt="slide" />
                         <div className="content">
                         <span className="span1"></span>
                         <span className="span2"></span>
                         <span className="span3"></span>
                         <span className="span4"></span>
                         <h2>{heading}</h2>
                         <p>{desc}</p>
                          <hr />
                          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
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

