import {fetchData} from './fetchData.js'; //requires in html <link type="module>"!!!

const url = 'https://media2.edu.metropolia.fi/restaurant/api/v1/restaurants/';
const tbl = document.querySelector('#target');
const mdl = document.querySelector('#the-modal');

let restaurants = [];
let previuousHl = null;

async function main(){
  await getAllRestaurants();
  sortRestaurantsInAlphabet();
  createTable();
}

main();

async function getAllRestaurants() {
  // your code here
  restaurants = await fetchData(url); //requires in html <link type="module>" if not async!!!
}

function sortRestaurantsInAlphabet() {
  restaurants.sort(function (a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });
}

function createTable() {
  for (const r of restaurants) {
    const tr = document.createElement('tr'); //new rivi
    tr.addEventListener('click', function () {
      previuousHl?.classList.remove('highlight');
      mdl.innerHTML = '';

      tr.classList.add('highlight');

      const nameP = document.createElement('h3');
      nameP.innerText = r.name;
      mdl.append(nameP);

      mdl.showModal();

      previuousHl = tr;
    });

    const nametd = document.createElement('td'); //name cell

    nametd.innerText = r.name;

    const addressTd = document.createElement('td');
    addressTd.innerText = r.address;

    const cityTd = document.createElement('td');
    cityTd.innerText = r.city;

    tr.append(nametd, addressTd, cityTd);
    tbl.append(tr);
  }
}
