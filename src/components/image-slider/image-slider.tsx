//This tutorial is the basis for the basic slider-logic:
//https://www.youtube.com/watch?v=KcdBOoK3Pfw


import { Component, Host, Prop, h } from '@stencil/core';
//images that are appended 
let imageElements:Array<HTMLImageElement>=[];

let previousImageButton:HTMLImageElement;
let stopSliderButton:HTMLImageElement;
let nextImageButton:HTMLImageElement;

let componentElement:ShadowRoot;
let sliderFrame:HTMLDivElement;
let slider:HTMLDivElement;

const sliderCooldown:number=7500;
let sliderFrequency:number=5000;
let paused:boolean=false;

let currentImageNumber:number=2;
let autoplay:boolean=false;
let sliderSize:number;

let sliderCooldowFunction:any;
let sliderTimingFunction:any;

let sliderHeight:string;
let sliderWidth:string;

//responsiveness
let resized:boolean=false;
let transitionActive:boolean=false;
window.addEventListener('resize', ()=> {
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
  @Prop() height:string;
  @Prop() width:string;

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

  render() {
    return (
      <Host>
        <div id="slider-frame" >
        <img src="./assets/pause.png"  class="sliderButton" id="stopSliderButton"></img>
        <img src="./assets/arrow.png"  class="sliderButton" id="previousImageButton"></img>
        <img src="./assets/arrow.png"  class="sliderButton" id="nextImageButton"></img>
        <div id="slider">
        </div>
        </div>
        <slot></slot>
      </Host>
    );
  }
  componentDidLoad() {
    initializeSlider()
  }
} 

function initializeSlider() {

  defineObjectReferences();
  addEventListeners();
  addImages();
  changeSliderProperties();

  if (autoplay) {
  sliderTimingFunction = setInterval(()=>{changeSlide("+")},sliderFrequency);
  }
}

function defineObjectReferences() {
  componentElement =  document.querySelector("image-slider").shadowRoot;
  slider =            componentElement.querySelector("#slider");
  sliderFrame =       componentElement.querySelector("#slider-frame");
  nextImageButton =   componentElement.querySelector("#nextImageButton");
  stopSliderButton =  componentElement.querySelector("#stopSliderButton");
  previousImageButton=componentElement.querySelector("#previousImageButton");
}


function addEventListeners() {
  nextImageButton.addEventListener("click", (event)=>     {buttonClick(event.target as HTMLImageElement,"+")  }); 
  previousImageButton.addEventListener("click", (event)=> {buttonClick(event.target as HTMLImageElement,"-")  });
  stopSliderButton.addEventListener("click", startStopSlider);

  slider.addEventListener("transitionend", ()=>{
    checkEndReached();
    transitionActive=false;
    adjustSliderSize();
  })
}

function addImages() {
  //add last image to start and first image to end to enable smooth transition
  
  slider.appendChild(imageElements[imageElements.length-1]);
  
  //append images to slider
  for (let image of imageElements) {
    //.cloneNode(true) is necessary, beacuse duplicate first and last images will not get appended otherwise.
    slider.appendChild(image.cloneNode(true));
  }
  slider.appendChild(imageElements[0]).cloneNode(true);
  //move slider to hide last image appended to start for smooth transition
  adjustSliderSize();
}


function changeSliderProperties() {
  //match user input width to slider
  if (sliderWidth) {
    resized=true;
    sliderFrame.style.minWidth=sliderWidth;
  }
//match user input height to slider
  if(sliderHeight){

    if (sliderHeight.includes("%")) {
    resized=true;
    //calculate height from screen size  
    sliderFrame.style.height=sliderHeight.replace("%","vh");

    } else if (sliderHeight.includes("px") || sliderHeight.includes("vh")){
    resized=true;
    sliderFrame.style.height=sliderHeight;
}
  }
//height is updated in "adjustSliderSize()";
  adjustSliderSize();
}


function adjustSliderSize() {

  if(!transitionActive&&resized) {
    //quick transition to smoothly fix position
  slider.style.transition = "transform 0.2s";
  sliderSize=sliderFrame.clientWidth;
  
  slider.style.transform = "translateX("+ (-sliderSize*(currentImageNumber-1))+"px)";
  console.log("resized");
  resized=false;

    //force images to adapt to slider size
  const images = componentElement.querySelectorAll(".slideshow-image") as unknown as Array<HTMLImageElement>;

  for(let image of images) {
    image.style.minWidth=sliderFrame.offsetWidth+"px";  
  }
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
  stopSliderButton.src="./assets/pauseToPlay.gif";
  clearInterval(sliderTimingFunction);
  paused=true;
  } else if (paused) {
    stopSliderButton.src="./assets/pause.png";
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
    button.src="./assets/arrow.gif";
    setTimeout(()=>button.src="./assets/arrow.png",1000);
    changeSlide(direction);
    pauseSlider();
    }

}