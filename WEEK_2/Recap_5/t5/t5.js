//ALL AWAIT INSIDE TRY CATCH

import {fetchData} from '../../lib/fetchData.js'; //requires in html <link type="module>"!!!

const apiUrl = 'https://media2.edu.metropolia.fi/restaurant/api/v1';
const tbl = document.querySelector('#target');
const mdl = document.querySelector('#the-modal');

let restaurants = [];
let previuousHl = null;

//FUCNTIONS
async function getAllRestaurants() {
  try {
    restaurants = await fetchData(apiUrl + '/restaurants/'); //requires in html <link type="module>" if not async!!!
  } catch (e) {
    console.log(e);
  }
  console.log(restaurants);
}

async function getDailyMenu(id, language) {
  const url = apiUrl + '/restaurants/daily/' + id + '/' + language + '/';
  console.log(url);

  try {
    return await fetchData(url); //requires in html <link type="module>" if not async!!!
  } catch (e) {
    console.log(e);
  }
  //not reccomended to add here any html code
  //only for fetching data
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
    const tr = document.createElement('tr'); //new row
    tr.addEventListener('click', async function () {
      try{
      previuousHl?.classList.remove('highlight');
      mdl.innerHTML = '';

      const coursesResponse = await getDailyMenu(r._id, 'fi');

      const menuHtml = createMenuHtml(coursesResponse.courses);

      tr.classList.add('highlight');

      createModalHtlm(r, mdl);

      console.log(menuHtml[0] == null);

      mdl.insertAdjacentHTML('beforeend', menuHtml);

      if(menuHtml[0] == null){
        mdl.insertAdjacentHTML('beforeend', "<p>NO DATA FOUND.</p>");
      }
      mdl.showModal();
      previuousHl = tr;
      } catch{/* empty */}
    });

    createRestaurantCells(r, tr);
    tbl.append(tr);
  }
}

function createRestaurantCells(r, tr) {
  const nametd = document.createElement('td'); //name cell
  nametd.innerText = r.name;

  const addressTd = document.createElement('td');
  addressTd.innerText = r.address;

  const cityTd = document.createElement('td');
  cityTd.innerText = r.city;

  tr.append(nametd, addressTd, cityTd);
}

function createModalHtlm(r, mdl) {
  const nameP = document.createElement('h3');
  nameP.innerText = r.name;
  mdl.append(nameP);
}

function createMenuHtml(courses) {
  let html = '';

  for (const course of courses) {
    html += `
    <article class="course">
        <p><strong>${course.name}</strong></p>
        <p>Hinta: ${course.price}</p>
        <p>Allergeenit: ${course.diets}</p><br>
    </article>`;
  }

  return html;
}

//MAIN FUCNTION -> Better to be in the end.
async function main() {
  await getAllRestaurants();
  sortRestaurantsInAlphabet();
  createTable();
}

main(); //EXECUTE!
