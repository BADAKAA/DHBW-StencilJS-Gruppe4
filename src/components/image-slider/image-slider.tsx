//This tutorial is the basis for the basic slider-logic:
//https://www.youtube.com/watch?v=KcdBOoK3Pfw


import { Component, Host, Prop, h } from '@stencil/core';
let imageElements:Array<HTMLImageElement>=[];
let stopSliderButton:HTMLImageElement;
let componentElement:ShadowRoot;
let sliderFrame:HTMLDivElement;
let slider:HTMLDivElement;

let previousImageButton:HTMLImageElement;
let nextImageButton:HTMLImageElement;

const sliderCooldown:number=7500;
let paused:boolean=false;

let currentImageNumber:number=2;
let sliderSize:number;

let autoplay:boolean=false;
let sliderTimingFunction:any;
let sliderCooldowFunction:any;


//responsiveness
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
  @Prop() height?:string;
  @Prop() width?:string;

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

  componentDidLoad() {
    initializeSlider(this.width, this.height)
  }

  render() {
    return (
      <Host>
        <div id="slider-frame" >
        <img src="/assets/pause.png"  class="sliderButton" id="stopSliderButton"></img>
        <img src="/assets/arrow.png"  class="sliderButton" id="previousImageButton"></img>
        <img src="/assets/arrow.png"  class="sliderButton" id="nextImageButton"></img>
        <div id="slider">
        </div>
        </div>
        <slot></slot>
      </Host>
    );

  }
} 

function initializeSlider(width:string,height:string) {

  defineObjectReferences()

  addImages();
  changeSliderProperties(width,height)

  slider.addEventListener("transitionend", ()=>{
    checkEndReached();
    transitionActive=false;
    adjustSliderSize();
  })

  if (autoplay) {
  sliderTimingFunction = setInterval(()=>{changeSlide("+")},5000);
  }
}

function addImages() {
  //add last image to start and first image to end to enable smooth transition
  //.cloneNode(true) is necessary because the elements won't get appended multiple times otherwise
  slider.appendChild(imageElements[imageElements.length-1]);
  
  //append images to slider
  for (let image of imageElements) {    
    slider.appendChild(image.cloneNode(true));
  }
  slider.appendChild(imageElements[0]).cloneNode(true);
  //move slider to hide last image appended to start for smooth transition
  adjustSliderSize();
}

function defineObjectReferences() {
  componentElement =  document.querySelector("image-slider").shadowRoot;
  slider =            componentElement.querySelector("#slider");
  sliderFrame =       componentElement.querySelector("#slider-frame");
  stopSliderButton =  componentElement.querySelector("#stopSliderButton");
  nextImageButton =   componentElement.querySelector("#nextImageButton");
  previousImageButton=componentElement.querySelector("#previousImageButton");
  
  nextImageButton.addEventListener("click", (event)=> {buttonClick(event.target as HTMLImageElement,"+")  }); 
  previousImageButton.addEventListener("click", (event)=> {buttonClick(event.target as HTMLImageElement,"-")  });
  stopSliderButton.addEventListener("click", startStopSlider);
}


function changeSliderProperties(width:string,height:string) {
if (width) {
  resized=true;
  sliderFrame.style.minWidth=width;
}
if (height) {
  resized=true;
  if(height.includes("%")){
    //calcualte height from screen size  
    const calculatedHeight:number=window.innerHeight*(parseInt(height)/100);
    sliderFrame.style.height=calculatedHeight.toString()+"px";
  } else {
    sliderFrame.style.height=height;
  }
}
adjustSliderSize();
}

function changeSlide(index:string) {

if(!transitionActive) {
transitionActive=true;
slider.style.transition = "transform 2s ease-in-out";
let factor:number;
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
  paused=false;
}
}

function adjustSliderSize() {

  if(!transitionActive&&resized) {
    //quick transition to smoothly fix position
  slider.style.transition = "transform 0.2s";
  sliderSize=sliderFrame.clientWidth;
  
  slider.style.transform = "translateX("+ (-sliderSize*(currentImageNumber-1))+"px)";
  console.log("resized");
  resized=false;
  
  const images:any = componentElement.querySelectorAll(".slideshow-image");
  //force images to adapt to slider size
  for(let image of images) {
    image.style.minWidth=sliderFrame.offsetWidth+"px";  
  }
  }
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

function startStopSlider() {

  if(!paused) {
  stopSliderButton.src="/assets/pauseToPlay.gif";
  clearInterval(sliderTimingFunction);
  paused=true;
  } else if (paused) {
    stopSliderButton.src="/assets/pause.png";
    changeSlide("+");
    sliderTimingFunction = setInterval(()=>{changeSlide("+")},5000);
    paused=false;
  }
}

function pauseSlider() {

  clearInterval(sliderTimingFunction);
  //clear slider cooldown function in case another instance is already active
  clearTimeout(sliderCooldowFunction);

  sliderCooldowFunction = setTimeout(() => {
      sliderTimingFunction = setInterval(()=>{changeSlide("+")},5000);
    }
  , sliderCooldown);
}



function buttonClick(button:HTMLImageElement,direction:string) {

  if(!transitionActive) {
    button.src="/assets/arrow.gif";
    setTimeout(()=>button.src="/assets/arrow.png",1000);
    changeSlide(direction);
    pauseSlider();
    }

}