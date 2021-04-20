//This tutorial is the basis for most of the sliuder-logic:
//https://www.youtube.com/watch?v=KcdBOoK3Pfw


import { Component, Host, Prop, h } from '@stencil/core';
let imageElements:Array<HTMLImageElement>=[];
let sliderFrame:HTMLDivElement;
let slider:HTMLDivElement;

let currentImageNumber:number=1;
let sliderSize
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
  sliderFrame=document.querySelector("image-slider").shadowRoot.querySelector("#slider");
  slider=document.querySelector("image-slider").shadowRoot.querySelector("#slider");
  for (let image of imageElements) {
    console.log(slider);
    slider.appendChild(image);
  }
  },0)
}