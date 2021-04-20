//This tutorial is the basis for most of the sliuder-logic:
//https://www.youtube.com/watch?v=KcdBOoK3Pfw
//Ich habe das Tutorial nur bis Minute 9:02 angesehen 


import { Component, Host, Prop, h } from '@stencil/core';
let imageElements:Array<HTMLImageElement>=[];
let sliderFrame:HTMLDivElement;
let slider:HTMLDivElement;

let currentImageNumber:number=2;
let sliderSize:number;
@Component({
  tag: 'image-slider',
  styleUrl: 'image-slider.css',
  shadow: true,
})
export class ImageSlider {
  @Prop() sources: string;

  constructor() {
    //process input information and store sources in array
    const imageReferences:string[] = this.sources.split(";");
    for (let link of imageReferences) {
      const currentImage:HTMLImageElement = new Image(); 
      currentImage.src=link;
      currentImage.classList.add("slideshow-image");
      imageElements.push(currentImage);
    }
  }
  render() {
    return (
      <Host>
        <div id="slider-frame">
        <div id="slider">
        </div>
        </div>
        <slot></slot>
        {addImages()}
      </Host>
    );

  }
} 

function addImages() {

  setTimeout(()=>{

  sliderFrame=document.querySelector("image-slider").shadowRoot.querySelector("#slider-frame");
  slider=document.querySelector("image-slider").shadowRoot.querySelector("#slider");

  sliderSize=sliderFrame.clientWidth;
  //add last image to start and first image to end to enable smooth transition
  //.cloneNode(true) is necessary because the elements won't get appended multiple times otherwise
  slider.appendChild(imageElements[imageElements.length-1]);
  
  //append images to slider
  for (let image of imageElements) {    
    slider.appendChild(image.cloneNode(true));
  }
  slider.appendChild(imageElements[0]).cloneNode(true);
  //move slider to hide last image appended to start for smooth transition
  slider.style.transform = "translateX("+ (-sliderSize) +"px)";
  slider.style.transition= "transform 2s";
  setInterval(()=>{changeSlide()},5000);
  },0)
}


function changeSlide() {
  slider.style.transform = "translateX("+ (-sliderSize*currentImageNumber) +"px)";
  currentImageNumber++;
}