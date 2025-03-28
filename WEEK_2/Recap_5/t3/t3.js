'use strict';

async function main(){
//POST
try{
  const userData = {
    "id": 666,
    "email": "joku@eeemail.ee",
    "first_name": "John",
    "last_name": "Smith",
    "avatar": "https://nettikuvat.joku/kissa.png"
  };

  const response = await fetch("https://reqres.in/api/unknown/23", {
    method: "POST"
  });

  if (!response.ok) {
    throw new Error(`HTTP error!${response.status}`);
  }

  const responseData = await response.json();
}catch(e){
console.log("POST ERROR: " + e);
}
};

//DELETE
try{
  const userData = {
    "id": 666,
    "email": "joku@eeemail.ee",
    "first_name": "John",
    "last_name": "Smith",
    "avatar": "https://nettikuvat.joku/kissa.png"
  };

  const response = await fetch("https://reqres.in/api/unknown/23", {
    method: "DELETE"
  });

  if (!response.ok) {
    throw new Error(`HTTP error!${response.status}`);
  }
}catch(e){
console.log("DELETE ERROR: " + e);
}

//GET
  try{
    const url = "https://reqres.in/api/unknown/23";
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error!${response.status}`);
    }

    const json = response.json();
}catch(e){
  console.log("GET ERROR: " + e);
}

main();
