import {fetchData} from '../../lib/fetchData.js';
'use strict';

async function main(){
  const get = await fetchData("https://reqres.in/api/users/1");
  console.log(get);
};

main();
