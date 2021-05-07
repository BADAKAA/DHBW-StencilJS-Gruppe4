export function getSearchedElement(componentToBeSearchedIn?: string, elementToBeSearchedIn?: string) {
    //if no component has been specified, search for the element directly.
    if (!componentToBeSearchedIn && document.querySelector(elementToBeSearchedIn)) {
        return document.querySelector(elementToBeSearchedIn) as HTMLElement;
    }
    //check if either the component element can be found in the document.
    if (!document.querySelector(componentToBeSearchedIn)) {
        throw new Error('The element you want to search in cannot be found.');
    }
    //check if the component has a shadowRoot and search within it if that is the case.
    if (document.querySelector(componentToBeSearchedIn).shadowRoot) {
        //if no element is specified, the last child of the component will be searched
        //→ no element property is required to use the "search-bar" with the "event-list" component, as this defines the list as searched object automatically.
        if (!elementToBeSearchedIn) {
            return document.querySelector(componentToBeSearchedIn).shadowRoot.lastChild as HTMLElement;
        }
        if (document.querySelector(componentToBeSearchedIn).shadowRoot.querySelector(elementToBeSearchedIn)) {
            return document.querySelector(componentToBeSearchedIn).shadowRoot.querySelector(elementToBeSearchedIn) as HTMLElement;
        }
    }
    if (document.querySelector(componentToBeSearchedIn)) {
        return document.querySelector(componentToBeSearchedIn).querySelector(elementToBeSearchedIn) as HTMLElement;
    }
    console.log('%c The element you want to search in cannot be found.', "color:orange; font-weight:bold;font-family:'Open sans'");
    throw new Error('The element you want to search in cannot be found.');
}

export function componentNotFound(element:HTMLElement | ShadowRoot) {
    //check if searched Element was found
    if (element) return;
    //if not found:
    const errorMessage: string = "We looked everywhere, but the element you want to search in cannot be found."
    const tipps: string =
      "Try checking the spelling of your element.\n\n" +
      `If you want to search within a component that has a shadow root, make sure to use the component-property (component="COMPONENT-NAME").\n\n` +
      "When searching for an element by id, put a hastag (#) in front of the id.\n" +
      "When searching by class, put a dot (.) in front of the class name.\n" +
      "If you are searching by type you do not need to put anything in front of the type name (e.g. element='ul').\n";
  
    console.log("%c\n" + errorMessage,
      "color:orangered; font-weight:bold;font-family:'Open sans', sans-serif;line-height:22pt"
    );
    console.log("%c\n" + tipps,
      "color:darkgreen; font-weight:bold;font-family:'Open sans', sans-serif;line-height:14pt"
    );
  }