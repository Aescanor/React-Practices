import { useEffect, useState } from 'react';
import './Slider.css';
import sliderData from '../../data/sliderData';
import leftChevron from '../../assets/left-arrow.svg';
import rightChevron from '../../assets/right-arrow.svg';

export default function Slider() { 
    // 1 is the initial value of the slider
  const [sliderIndex, setSliderIndex] = useState(1); 

  // this function will be called when the user clicks on the left chevron
  const handlePreviousClick = () => {
      // if the slider is at the first image, it will go to the last image
    setSliderIndex((prevIndex) => (prevIndex === 1 ? sliderData.length : prevIndex - 1)); 
  };

  // this function will be called when the user clicks on the right chevron
  const handleNextClick = () => {
    // if the slider is at the last image, it will go to the first image
    setSliderIndex((prevIndex) => (prevIndex === sliderData.length ? 1 : prevIndex + 1)); 
  };


  useEffect(() => {  // this useEffect will be called when the sliderIndex changes

    const interval = setInterval(() => { // this setInterval will be called every 5 seconds
      setSliderIndex((prevIndex) => (prevIndex === sliderData.length ? 1 : prevIndex + 1)); 
      // if the slider is at the last image, it will go to the first image
    }, 5000);

    // this will clear the interval when the component unmounts
    return () => clearInterval(interval);


    // this useEffect will be called when the sliderIndex changes
  }, [sliderIndex]); 

  return (
    <>
      <p className="index-info">
        {sliderIndex} / {sliderData.length}
      </p>
      <div className="slider">
        <p className="image-info">
          {sliderData.find(obj => obj.id === sliderIndex).description}
        </p>
        <img
          src={`/images/img-${sliderIndex}.jpg`}
          alt="estate's rooms"
          className="slider-img"
        />
        <button
          onClick={handlePreviousClick}
          className="navigation-button prev-button"
        >
          <img src={leftChevron} alt="" srcset="previous image" />
        </button>
        <button
          onClick={handleNextClick}
          className="navigation-button next-button"
        >
          <img src={rightChevron} alt="" srcset="next image" />
        </button>
      </div>
    </>
  );
}
