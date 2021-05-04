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