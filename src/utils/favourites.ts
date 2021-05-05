
interface event {
    title:string;
    date:Date;
}

let favourites:Array<event>=[];

window.addEventListener("beforeunload", function(e){
    // Do something
 }, false);



export function addFavourite(title:string,date:Date) {
    const newEvent:event= {title:title, date:date}
    favourites.push(newEvent);
}

export function isFavourite(title:string,date:Date):boolean {
    const event:event= {title:title, date:date}
    if (favourites.indexOf(event)!=-1) return true;
    return false;
}