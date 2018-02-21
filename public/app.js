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
    const table = document.getElementById("beer-list");
    beersList.forEach(function(beer){
        addBeerToList(beer, table);
    });
}

const addBeerToList = function(beer, tableElement){
    const img = document.createElement("img");
    img.src = beer.image_url;
    // img.height = 200;
    const tr = document.createElement("tr");
    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    td1.appendChild(img);
    td2.innerText = beer.name;
    tr.appendChild(td1);
    tr.appendChild(td2);
    tableElement.appendChild(tr);
}

document.addEventListener('DOMContentLoaded', app);
