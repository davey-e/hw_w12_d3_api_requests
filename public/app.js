const app = function () {

    const url = "https://api.punkapi.com/v2/beers";
    // const url = "https://s3-eu-west-1.amazonaws.com/brewdogapi/beers.json"

    makeRequest(url, requestComplete);
}

const makeRequest = function(url, callback){
    const request = new XMLHttpRequest();
    request.open("GET", url);
    request.addEventListener("load", callback);
    request.send();
}

const requestComplete = function(){
    if(this.status !== 200) return;
    const jsonString = this.responseText;
    const beers = JSON.parse(jsonString);
    populateList(beers);
}

const populateList = function(beersList){
    const beerListUl = document.getElementById("beers-list")
    beersList.forEach(function(beer){
        addBeerToList(beer, beerListUl);
    });
}

const addBeerToList = function(beer, beerListUlElement){
    const li = document.createElement("li");
    li.innerText = beer.name;
    beerListUlElement.appendChild(li);
    const img = document.createElement("img");
    img.src = beer.image_url;
    img.height = 200;
    li.appendChild(img);
}

document.addEventListener('DOMContentLoaded', app);
