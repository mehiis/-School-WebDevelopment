//ALL AWAIT INSIDE TRY CATCH

import {fetchData} from '../lib/fetchData.js';
import variables from './variables.js';

const tbl = document.querySelector('#target');
const mdl = document.querySelector('#the-modal');

let restaurants = [];
let allRestaurantsSaved = [];

const filterbutton = document.querySelector('#filter');
filterbutton.addEventListener('click', (event) => {
  event.preventDefault();

  const filterValue = document.querySelector('#restaurant-list');
  const currentList = document.querySelector('#target');
  currentList.innerHTML = `<tr>
      <th>Name</th>
      <th>Address</th>
      <th>City</th>
    </tr>`;

  restaurants = allRestaurantsSaved.filter((r) =>
    r.company.toLowerCase().includes(filterValue.value.toLowerCase())
  );
  createTable();
});

let previuousHl = null;

//FUCNTIONS
const getAllRestaurants = async () => {
  try {
    restaurants = await fetchData(`${variables.apiUrl}/restaurants/`);
    allRestaurantsSaved = restaurants;
  } catch (e) {
    console.log(e);
  }
};

const getDailyMenu = async (id, language) => {
  try {
    return await fetchData(
      `${variables.apiUrl}/restaurants/daily/${id}/${language}/`
    );
  } catch (e) {
    console.log(e);
  }
};

const sortAlphabeticly = () => {
  restaurants.sort(function (a, b) {
    return a.name > b.name ? 1 : -1;
  });
};

const createTable = () => {
  for (const r of restaurants) {
    const tr = document.createElement('tr'); //new row
    tr.addEventListener('click', async () => {
      try {
        previuousHl?.classList.remove('highlight');
        mdl.innerHTML = '';

        const coursesResponse = await getDailyMenu(r._id, 'fi');

        const menuHtml = createMenuHtml(coursesResponse.courses);

        tr.classList.add('highlight');

        createModalHtlm(r, mdl);

        console.log(menuHtml[0] == null);

        mdl.insertAdjacentHTML('beforeend', menuHtml);

        if (menuHtml[0] == null) {
          mdl.insertAdjacentHTML('beforeend', '<p>NO DATA FOUND.</p>');
        }

        mdl.showModal();
        previuousHl = tr;
      } catch {
        /* empty */
      }
    });

    restaurantRow(r, tr);
    tbl.append(tr);
  }
};

const restaurantRow = (r, tr) => {
  const nametd = document.createElement('td'); //name cell
  nametd.innerText = r?.name;

  const addressTd = document.createElement('td');
  addressTd.innerText = r?.address;

  const cityTd = document.createElement('td');
  cityTd.innerText = r?.city;

  tr.append(nametd, addressTd, cityTd);
};

const createModalHtlm = (r, mdl) => {
  const nameP = document.createElement('h1');
  nameP.innerText = r.name;
  mdl.append(nameP);
};

const createMenuHtml = (courses) => {
  let html = '';

  for (const {name, price, diets} of courses) {
    html += `
    <article class="course">
        <p><strong>${name}</strong></p>
        <p>Hinta: ${price}</p>
        <p>Allergeenit: ${diets}</p><br>
    </article>`;
  }

  return html;
};

export default {
  getAllRestaurants,
  sortAlphabeticly,
  createTable,
};
