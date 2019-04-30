'use strict';

//use "https://api.github.com/users/"+searchTerm+"/repos" to search
//for the repositories



//I need to create a function to pull the correct data out of
//the json file and pop it into the DOM.
//Need to use jquery to insert into DOM.


function displayResults(responseJson) {
    // if there are previous results, remove them
    console.log(responseJson);
    $('#search-results').empty();
    // iterate through the articles array, stopping at the max number of results
    for (let i = 0; i < responseJson.length; i++){
        console.log(responseJson[i].name);
        $('#search-results').append(
            `<li><h3><a href="${responseJson[i].html_url}" target="_blank">${responseJson[i].name}</a></h3></li>`
        );
    };
    $('#results').removeClass('hidden');
}

//I need to create functionality on button click to clear the search
//the button click should also call the functions that display info
//and run the search through the API call.
function getResults(url) {
fetch(url)
.then(response => {
  if (response.ok) {
    return response.json();
  }
  throw new Error(response.statusText);
})
.then(responseJson => displayResults(responseJson))
.catch(err => {
  $('#js-error-message').text(`Something went wrong: ${err.message}`);
});
};


function watchForm() {
    $('#form').submit(event => {
      event.preventDefault();
      const searchTerm = $('#input').val();
      const url="https://api.github.com/users/"+searchTerm+"/repos"
      console.log(url)
      getResults(url)

    });
};

$(watchForm)