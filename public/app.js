const app = function () {

    const url = "https://api.punkapi.com/v2/beers";
    // const url = "https://s3-eu-west-1.amazonaws.com/brewdogapi/beers.json"

    const makeRequest = function(){
        const table = document.getElementById("beer-list");
        table.innerHTML = "";
        const beerTable = document.getElementById("beer");
        beerTable.innerHTML = "";

        const request = new XMLHttpRequest();
        request.open("GET", url);
        request.addEventListener("load", requestComplete);
        request.send();
    }

    const handleDDSelectionChange = function(){
        const table = document.getElementById("beer-list");
        table.innerHTML = "";
        const beerTable = document.getElementById("beer");
        beerTable.innerHTML = "";

        const id = parseInt(viewBeerDetailsDD.value) + 1;
        const urlWithId = "https://api.punkapi.com/v2/beers/" + id;
        const requestSingle = new XMLHttpRequest();
        requestSingle.open("GET", urlWithId);
        requestSingle.addEventListener("load", requestCompleteSingle);
        requestSingle.send();
    }

    const viewAllBeersButton = document.getElementById("view-all-button");
    viewAllBeersButton.addEventListener("click", makeRequest);

    const viewBeerDetailsDD = document.getElementById("select-beer");
    viewBeerDetailsDD.addEventListener("change", handleDDSelectionChange);
    
}

const requestCompleteSingle = function(){
    if(this.status !== 200) return;
    const jsonString = this.responseText;
    const beer = JSON.parse(jsonString);
    populateTableSingle(beer);
}

const populateTableSingle = function(beer){
    const table = document.getElementById("beer");
    table.innerHTML = "";

    let itemsToDisplay = [];
    itemsToDisplay.push("name");
    itemsToDisplay.push("tagline");
    itemsToDisplay.push("abv");
    itemsToDisplay.push("food_pairing");
    
    itemsToDisplay.forEach(function(key){
        const tr1 = document.createElement("tr");
        const td1 = document.createElement("td");
        td1.innerText = key + ":";
        const td2 = document.createElement("td");
        td2.innerText = beer[0][key];
        tr1.appendChild(td1);
        tr1.appendChild(td2);
        table.appendChild(tr1);
    })
}


const requestComplete = function(){
    if(this.status !== 200) return;
    const jsonString = this.responseText;
    const beers = JSON.parse(jsonString);
    populateTable(beers);
    populateDDList(beers);
}

const populateTable = function(beersList){
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

const populateDDList = function(beersList){
    const beerDetailsDropDown = document.getElementById("select-beer");
    beerDetailsDropDown.innerHTML = "";
    const disabledOption = document.createElement("option");
    disabledOption.disabled = true;
    disabledOption.selected = true;
    disabledOption.innerText = "Select a Beer from the list to view its details";
    beerDetailsDropDown.appendChild(disabledOption);
    beersList.forEach(function(beer, index){
        addBeerToList(beer, index, beerDetailsDropDown);
    });
}

const addBeerToList = function(beer, index, dropDown){
    const option = document.createElement("option");
    option.innerText = beer.name;
    option.value = index;
    dropDown.appendChild(option);
}

document.addEventListener('DOMContentLoaded', app);
