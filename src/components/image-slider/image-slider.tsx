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
let sliderFrequency:number=5000;
let paused:boolean=false;

let sliderSize:number;
let autoplay:boolean=false;
let currentImageNumber:number=2;

let sliderTimingFunction:any;
let sliderCooldowFunction:any;

let sliderHeight:string;
let sliderWidth:string;

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
  @Prop() time?:string;
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
    }

    //store user input height and width
    sliderHeight=this.height;
    sliderWidth=this.width;
      //check if autoplay property has been set to "true"
      if(this.autoplay==="true") {
        autoplay=true;
      }
      //adapt slider frequency
      if(this.time) {
        if(this.time.includes("s")){
        sliderFrequency=parseInt(this.time)*1000;
      } else {
        sliderFrequency=parseInt(this.time);
      }
      
    }
  }

  componentDidLoad() {
    initializeSlider()
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

function initializeSlider() {

  defineObjectReferences()

  addImages();
  changeSliderProperties()

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
  //.cloneNode(true) is necessary because the elements will not get appended multiple times otherwise
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


function changeSliderProperties() {
if (sliderWidth) {
  resized=true;
  sliderFrame.style.minWidth=sliderWidth;
}
//height is updated in "adjustSliderSize()";
adjustSliderSize();
}


function calculateSliderHeight() {

  let calculatedHeight:string;
  
  if(sliderHeight.includes("%")){
    //calcualte height from screen size  
    const pixelvalueFromPercantage:number=window.innerHeight*(parseInt(sliderHeight)/100);
    calculatedHeight=pixelvalueFromPercantage.toString()+"px";
    return calculatedHeight;

  } else if (sliderHeight.includes("px")){
    return sliderHeight;

  } else {
    return null;
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
  if (calculateSliderHeight()!=null) {
  sliderFrame.style.height=calculateSliderHeight();

  }
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
    sliderTimingFunction = setInterval(()=>{changeSlide("+")},sliderFrequency);
    paused=false;
  }
}

function pauseSlider() {

  clearInterval(sliderTimingFunction);
  //clear slider cooldown function in case another instance is already active
  clearTimeout(sliderCooldowFunction);

  sliderCooldowFunction = setTimeout(() => {
      sliderTimingFunction = setInterval(()=>{changeSlide("+")},sliderFrequency);
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