//This tutorial is the basis for most of the sliuder-logic:
//https://www.youtube.com/watch?v=KcdBOoK3Pfw


import { Component, Host, Prop, h } from '@stencil/core';
let imageElements:Array<HTMLImageElement>=[];
let slider:HTMLDivElement;

let currentImageNumber:number=2;
let sliderSize:number;

let autoplay:boolean=false;

//variables for responsiveness
let resized:boolean=false;
let transitionActive:boolean=false;
window.addEventListener('resize', ()=>{
  resized=true;
  adjustSliderSize()});
@Component({
  tag: 'image-slider',
  styleUrl: 'image-slider.css',
  shadow: true,
})
export class ImageSlider {
  @Prop() sources: string;

  @Prop() autoplay?: string;

  constructor() {
    //process input information and store sources in array
    const imageReferences:string[] = this.sources.split(";");
    for (let link of imageReferences) {
      const currentImage:HTMLImageElement = new Image(); 
      currentImage.src=link;
      currentImage.classList.add("slideshow-image");
      imageElements.push(currentImage);

      if(this.autoplay==="true") {
        autoplay=true;
      }
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

  slider=document.querySelector("image-slider").shadowRoot.querySelector("#slider");

  sliderSize=slider.clientWidth;
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

  if (autoplay) {
  setInterval(()=>{changeSlide("+")},3000);
  slider.addEventListener("transitionend", ()=>{
    checkEndReached();
    transitionActive=false;
    adjustSliderSize();
  })
  } 
  },0)

}


function changeSlide(index:string) {
transitionActive=true;
slider.style.transition = "transform 2s ease-in-out";
let factor:number=1;
  switch (index) {
    case "+":
      factor=(-currentImageNumber)
      currentImageNumber++;
      break;
    case "-":
      factor=(-currentImageNumber)+2;
      currentImageNumber--;
      break;
    default:
      break;
  }
  slider.style.transform = "translateX("+ sliderSize*factor+"px)";
  
}


function checkEndReached() {

  if (currentImageNumber>imageElements.length+1) {


    slider.style.transition= "none";
    slider.style.transform = "translateX("+ (-sliderSize)+"px)";
    currentImageNumber=2;
} else if (currentImageNumber===1){
  slider.style.transition= "none";
  slider.style.transform = "translateX("+ (-sliderSize*imageElements.length)+"px)";
  currentImageNumber=imageElements.length+1;
}
}


function adjustSliderSize() {

  if(!transitionActive&&resized) {
    //quick transition to smoothly fix position
  slider.style.transition = "transform 0.2s";
  sliderSize=slider.clientWidth;
  console.log(currentImageNumber);
  slider.style.transform = "translateX("+ (-sliderSize*(currentImageNumber-1))+"px)";
  console.log("resized");
  resized=false;
  }
}