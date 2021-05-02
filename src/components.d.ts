/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface DatePicker {
        "backgroundcolor": string;
        "width": string;
    }
    interface EventList {
    }
    interface ExampleComponent {
        "exampleProp": string;
        "exampleToUpperCase": () => Promise<void>;
    }
    interface ImageSlider {
        "autoplay"?: string;
        "height": string;
        "sources": string;
        "time"?: string;
        "width": string;
    }
    interface MyComponent {
        /**
          * The first name
         */
        "first": string;
        /**
          * The last name
         */
        "last": string;
        /**
          * The middle name
         */
        "middle": string;
    }
    interface SearchBar {
        "color": string;
        "component": string;
        "element": string;
        "google": string;
        "position": string;
        "width": string;
    }
}
declare global {
    interface HTMLDatePickerElement extends Components.DatePicker, HTMLStencilElement {
    }
    var HTMLDatePickerElement: {
        prototype: HTMLDatePickerElement;
        new (): HTMLDatePickerElement;
    };
    interface HTMLEventListElement extends Components.EventList, HTMLStencilElement {
    }
    var HTMLEventListElement: {
        prototype: HTMLEventListElement;
        new (): HTMLEventListElement;
    };
    interface HTMLExampleComponentElement extends Components.ExampleComponent, HTMLStencilElement {
    }
    var HTMLExampleComponentElement: {
        prototype: HTMLExampleComponentElement;
        new (): HTMLExampleComponentElement;
    };
    interface HTMLImageSliderElement extends Components.ImageSlider, HTMLStencilElement {
    }
    var HTMLImageSliderElement: {
        prototype: HTMLImageSliderElement;
        new (): HTMLImageSliderElement;
    };
    interface HTMLMyComponentElement extends Components.MyComponent, HTMLStencilElement {
    }
    var HTMLMyComponentElement: {
        prototype: HTMLMyComponentElement;
        new (): HTMLMyComponentElement;
    };
    interface HTMLSearchBarElement extends Components.SearchBar, HTMLStencilElement {
    }
    var HTMLSearchBarElement: {
        prototype: HTMLSearchBarElement;
        new (): HTMLSearchBarElement;
    };
    interface HTMLElementTagNameMap {
        "date-picker": HTMLDatePickerElement;
        "event-list": HTMLEventListElement;
        "example-component": HTMLExampleComponentElement;
        "image-slider": HTMLImageSliderElement;
        "my-component": HTMLMyComponentElement;
        "search-bar": HTMLSearchBarElement;
    }
}
declare namespace LocalJSX {
    interface DatePicker {
        "backgroundcolor"?: string;
        "width"?: string;
    }
    interface EventList {
    }
    interface ExampleComponent {
        "exampleProp"?: string;
        "onExampleEvent"?: (event: CustomEvent<string>) => void;
    }
    interface ImageSlider {
        "autoplay"?: string;
        "height"?: string;
        "sources"?: string;
        "time"?: string;
        "width"?: string;
    }
    interface MyComponent {
        /**
          * The first name
         */
        "first"?: string;
        /**
          * The last name
         */
        "last"?: string;
        /**
          * The middle name
         */
        "middle"?: string;
    }
    interface SearchBar {
        "color"?: string;
        "component"?: string;
        "element"?: string;
        "google"?: string;
        "position"?: string;
        "width"?: string;
    }
    interface IntrinsicElements {
        "date-picker": DatePicker;
        "event-list": EventList;
        "example-component": ExampleComponent;
        "image-slider": ImageSlider;
        "my-component": MyComponent;
        "search-bar": SearchBar;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "date-picker": LocalJSX.DatePicker & JSXBase.HTMLAttributes<HTMLDatePickerElement>;
            "event-list": LocalJSX.EventList & JSXBase.HTMLAttributes<HTMLEventListElement>;
            "example-component": LocalJSX.ExampleComponent & JSXBase.HTMLAttributes<HTMLExampleComponentElement>;
            "image-slider": LocalJSX.ImageSlider & JSXBase.HTMLAttributes<HTMLImageSliderElement>;
            "my-component": LocalJSX.MyComponent & JSXBase.HTMLAttributes<HTMLMyComponentElement>;
            "search-bar": LocalJSX.SearchBar & JSXBase.HTMLAttributes<HTMLSearchBarElement>;
        }
    }
}
