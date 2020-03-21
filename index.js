const apiKey = 'd8739849e9msh9de0a072a19f9edp1762cejsne12be3c09936';
const apiHost = "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com";
const mealGenURL = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/mealplans/generate?timeFrame=day&';

//creates auth headers for API call
const myHeaders = new Headers({
'Content-Type': 'application/json',
'x-rapidapi-key': apiKey,
'X-RapidAPI-Host': apiHost
});

//adds
const fetchRecipe = (finalURL) => {
return  fetch(finalURL, {headers: {
'x-rapidapi-key': apiKey,
'X-RapidAPI-Host': apiHost
}})
}

function formatMealGenParams(params) {
    //create an array of the keys in the "params" object
    const queryItems = Object.keys(params)
      //for each of the keys in that array, create a string with the key and the key's value in the "params" object
      .map(key => `${key}=${params[key]}`)
    //return a string of the keys and values, separated by "&"
    return queryItems.join('&');
}
  


function callMealPlan(){
    fetchRecipe(finalURL)
    .then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(response.statusText);
  })
   .then(responseJson => {
    console.log(responseJson);
    const recipeId=  responseJson.meals[0].id;
    const recipeURL = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${recipeId}/information`;
    fetchRecipe(recipeURL)
      .then(res => {
    if (res.ok) {
      return res.json();
    }
    throw new Error(res.statusText);
   }).then(recipeRes => {
    console.log(recipeRes);
   }).catch(error => {
    console.log(error, 'Error')
   })
   })
  .catch(err => {
    console.log(err);
    $('#js-error-message').text(`Something went wrong: ${err.message}`);
   });
}




function getMealPlanQuery(mealCals, mealDiet) {
    //create the query parameters
    const params = {
      //set the "targetCalories" parameter equal to the value the user input, same with diet
      targetCalories: mealCals,
      diet: mealDiet
    };
    //create a string with the original URL and the new parameters
    const queryString = formatMealGenParams(params)
    finalURL = mealGenURL + queryString;
}

function getMealPlan(){
    $('form').submit(event => {
    event.preventDefault();
    const dailyCals = $('#js-dailycals').val();
    const dietRestricts = $('#js-dietRestrict').val();
    getMealPlanQuery(dailyCals, dietRestricts);
    });
}

getMealPlan();

