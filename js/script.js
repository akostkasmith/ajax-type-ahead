const url = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6';

const data = fetch(url);
const cities = [];
const listEle = document.querySelector('#search-results');

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

document.querySelector('#search-box').addEventListener('keyup', function(e) {
    if (e.target.value.length == 0) { 
        listEle.innerHTML = '';
        return false;
    };
    
    const citiesArray = findMatches(e.target.value,cities);
    listEle.innerHTML = citiesArray.map(ele => `<li><span>${ele.city}</span></li>`).join('');


})