const app = function () {

    const url = "https://api.punkapi.com/v2/beers";
    // const url = "https://s3-eu-west-1.amazonaws.com/brewdogapi/beers.json"

    const makeRequest = function(){
        const table = document.getElementById("beer-list");
        table.innerHTML = "";
        const request = new XMLHttpRequest();
        request.open("GET", url);
        request.addEventListener("load", requestComplete);
        request.send();
    }

    const viewAllBeersButton = document.getElementById("view-all-button");
    viewAllBeersButton.addEventListener('click', makeRequest);
    
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
        addBeerToTable(beer, table);
    });
}

const addBeerToTable = function(beer, tableElement){
    const img = document.createElement("img");
    img.src = beer.image_url;
    const tr = document.createElement("tr");
    const td1 = document.createElement("td");
    td1.appendChild(img);
    const td2 = document.createElement("td");
    td2.innerText = beer.name;
    td2.id = beer.id;
    tr.appendChild(td1);
    tr.appendChild(td2);
    tableElement.appendChild(tr);
}

document.addEventListener('DOMContentLoaded', app);
