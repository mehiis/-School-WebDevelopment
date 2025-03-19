'use strict';
const listOfMovies = [];

let amountOfMoviesToRate;

function sortMoviesByRating(movieList) {
  return movieList.sort(function ({rating: a}, {rating: b}) {
    return b - a;
  });
}

while (isNaN(amountOfMoviesToRate) || amountOfMoviesToRate <= 0) {
  amountOfMoviesToRate = parseInt(
    prompt('How many movies you would like to rate?')
  );
}

let duplicate = false;

for (let i = 0; i < amountOfMoviesToRate; i++) {
  let name = '';

  if (!duplicate) {
    while (name.length <= 0) {
      name = prompt(`What movie would you like to rate?:`);
    }
  } else {
    name = prompt(
      `ERROR THAT MOVIE IS ALREADY IN THE LIST!\nWhat movie would you like to rate?:`
    );
  }

  duplicate = false;
  for (let j = 0; j < listOfMovies.length; j++) {
    if (name === listOfMovies[j].name) {
      i--;
      duplicate = true;
    }
  }

  if (!duplicate) {
    let rating = -1;

    while (isNaN(rating) || rating < 0 || rating > 5) {
      rating = prompt(
        `How would you rate the movie "${name}" on a scale of 0-5?:`
      );
    }

    const movie = {
      name: name,
      rating: rating,
    };

    listOfMovies.push(movie);
  }
}

const listOfMoviesSortedByRating = sortMoviesByRating(listOfMovies);

document.querySelector(
  '#target'
).innerHTML += `Highest rated movie was "${listOfMoviesSortedByRating[0].name}" with rating of ${listOfMoviesSortedByRating[0].rating}!<br><br>List of movies:<br>`;

for (let i = 0; i < listOfMoviesSortedByRating.length; i++) {
  document.querySelector('#target').innerHTML += `Movie ${i + 1}: ${
    listOfMoviesSortedByRating[i].name
  }, rating: ${listOfMoviesSortedByRating[i].rating}<br>`;
}
