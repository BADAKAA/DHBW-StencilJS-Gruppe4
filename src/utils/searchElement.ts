
let searchedDate: string = "";
let searchedElement:HTMLElement;
let searchTerm:string="";

export function searchElement(element?: HTMLElement, input?: string) {

    if(element) searchedElement=element;
    const childElements: Array<HTMLElement> = getChildren(searchedElement);
    searchTerm = input;

    for (const element of childElements) {
        //search for string value and disable all elements not containing it
        if (!element.textContent.toLowerCase().includes(searchTerm) || !element.textContent.toLowerCase().includes(searchedDate)) {
            element.style.position = "absolute";
            element.style.visibility = "hidden";
            element.style.opacity = "0";
        }
    }
}


export function resetSearch(searchedElement: HTMLElement) {

    const childElements: Array<HTMLElement> = getChildren(searchedElement);

    for (const element of childElements) {
        element.style.visibility = "visible";
        element.style.position = "relative";
        element.style.opacity = "1";
    }
}

export function getChildren(searchedElement: HTMLElement) {
    if (typeof searchedElement === typeof HTMLUListElement || typeof searchedElement === typeof HTMLOListElement) {
        return searchedElement.querySelectorAll("li") as unknown as Array<HTMLElement>;
    }
    return searchedElement.children as unknown as Array<HTMLElement>;
}

export function searchDate(date: string) {
    searchedDate = date;
    searchElement();
}
