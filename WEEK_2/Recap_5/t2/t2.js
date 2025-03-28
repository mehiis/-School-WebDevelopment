'use strict';

async function main() {
  console.log("Starting main function.");

  //create user data to post
  const userData = {
    "id": 666,
    "email": "joku@eeemail.ee",
    "first_name": "John",
    "last_name": "Smith",
    "avatar": "https://nettikuvat.joku/kissa.png"
  };

  const response = await fetch("https://reqres.in/api/users", {
    method: "POST", // Specify the request method
    headers: {
      "Content-Type": "application/json" // Set the Content-Type header to JSON
    },
    body: JSON.stringify(userData) // Convert the JavaScript object to JSON
  });

  const responseData = await response.json();

  console.log(`Response: First name:${responseData.first_name}, last name: ${responseData.last_name}, id: ${responseData.id}, email: ${responseData.email} and avatar in url: ${responseData.avatar}`);
}

main();
