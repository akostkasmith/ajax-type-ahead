const url = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6';

const data = fetch(url);
const cities = [];
const listEle = document.querySelector('#search-results');
const searchEle = document.querySelector('#search-box');


data.then((blob) => blob.json())
    .then((json) => cities.push(...json))
    .catch((e) => console.log(e)
    ); 




function findMatches(keyMatch, cities) {
    return cities.filter((place) => {
        const regex = new RegExp(keyMatch, 'gi');
        return place.city.match(regex) || place.state.match(regex);
    });
}

searchEle.addEventListener('keyup', displayMatches); 

function displayMatches() {
    const searchVal = this.value;
    if (searchVal.length == 0) { 
        listEle.innerHTML = '';
        return false;
    };
    
    const citiesArray = findMatches(searchVal,cities);
    citiesArray.sort((a,b) => a.city > b.city);
    listEle.innerHTML = citiesArray.map(ele => {
        const re = new RegExp(searchVal, 'gi');
        const city = ele.city.replace(re, `<strong>${searchVal}</strong>`);
        const state = ele.state.replace(re, `<strong>${searchVal}</strong>`);
        return `<li><span>${city}, ${state}</span></li>`;
        
    }).join('');

}