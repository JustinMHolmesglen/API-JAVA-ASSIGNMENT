//Version 9.0 by Justin McAleer , last edited 18.08.2

//Declare variables cards will be used to store the returned images or videos into divs alligned in bootstrap and css grid
const cards = document.getElementById('cards');
//Form search is used to take a string for search terms and is run through a validater that has JS towards the bottom of this file
const formSearchInput = document.getElementById('formSearchInput');
// this was the vaiable to look if there had been hits in the search but chose to go with a simple innerHTML call to print the error "const zeroHits = document.getElementById('zeroHits')"
//the below variables are to allow the search function to read if an event has been triggered
const submitBtn = document.getElementById('submitBtn');
// the below three vaariables are needed to listen to the select boxes for the search terms
const searchSelect = document.getElementById('searchSelect');
const searchSelectType = document.getElementById('searchSelectType');
const submitForm = document.getElementById('submitForm');
//base url is where the API is located on the web
const baseUrl = 'https://pixabay.com/api/';
//API key is my personal key to use Pixabay 
const apiKey = '19965580-2372b740a9e3270145184fb45';
// this variable was for setting a boolean to check to see if the pixabay logo is showing after search terms are met
var image = true;


// Event Listeners to activate Search Operation
submitBtn.addEventListener('click', (event) => {
  //These are the actions that take place when an event is triggered , they send data into the getSong() function.  They are attributes and there is also a validate input function to check if a search term has been included in the search bar and if there is no search term it will return an error and if there is no error display "input ok"
  getSong(formSearchInput.value, searchSelect.value, searchSelectColor.value, searchSelectType.value, validateInput());
  //get Element by ID searches the DOM for the given ID
  //innerhtml writes the empty string to the ID to set it to blank before a response is given as to whether there are any hits or not . If there are no hits the tag_cards div shows an error message and if there are hits the royal ID shows the pixabay logo under results for attribution -- Shown in section A      
  document.getElementById('tag_cards').innerHTML = "";
  document.getElementById('royal').innerHTML = "";

});

// key press event listener in case user presses enter on keyboard, works the same as above, this does the same as the listener above but keypresses instead of click.
formSearchInput.addEventListener('keypress', function (e) {
// once the enter key is pressed it triggers the search event 
  if (e.key === 'Enter') {
    getSong(formSearchInput.value, searchSelect.value, searchSelectColor.value, searchSelectType.value, validateInput());
    document.getElementById('tag_cards').innerHTML = "";
    document.getElementById('royal').innerHTML = "";
    
  }
  
});


//this is the main function of the program, it runs a fetch call to the API , the fetch call has backticks so that it can take javascript in the string, the getSong function, atributes from the search fields such as query which is the search string. Category, colors and type are the select drop down boxes.  The get song function needs to be run asyncronously as we dont know how long it will take to complete, therefore we must use await with the fetch command 
async function getSong(query, category, colors, type) {
  let data = await fetch(
    // pass in the Pixabay base url, our API key, search terms and category
    `${baseUrl}${type}?key=${apiKey}&q=${colors}+${query}&category=${category}&page`)
       
   
  // this is the data that is returned therough the API it is processed as a asyncronous call to the API
  data = await data.json();
  // I have console.logged the data to make sure that I can see in the console 
  console.log(data);
  //set cards ti be empty so we can populate it with videos and pictures later, it is set above any methods that exist after it so that it is empty first
  cards.innerHTML ="";
  //code for running the next function and passing in the JSON data that we got from the api and also passing in type which is photo or video as set by the select in the addEventListeners above
  populatePage(data, type);
  // show message upon 0 hits
  //Section A -- check to see if there are items according to search terms, if there are none , I will run this if statement
  if(data.hits == 0){
    //confirm in the console if there is no hits
    console.log("no hits!")
    //write to the DOM that there are no hits on those search terns
    document.getElementById('tag_cards').innerHTML = "No Hits on those Search Terms! Please try Again..";
    //format the response message for no hits
    tag_cards.style.display = "block";
    tag_cards.style.color = "white";
    tag_cards.style.fontSize = "22px";
    

    }
    //this loop checks to see if there are any pictures or videos and displays pixabay logo for attribution if there is, included a boolean as a control to run through and remove the pixabay logo between searches so that duplicates do not appear, it works by using a universal variable
if(data.totalHits > 0 && image === true){
  // loading a new class object of Image into the variable
    var Imgsrc = new Image();
    //providing the source of the picture
    Imgsrc.src = "./images/Pixabay_logo_white.png";
    //append the image to the royal div
    document.getElementById('royal').appendChild(Imgsrc);
    //set attributes for the size of the picture
    Imgsrc.setAttribute("width", "320");
    Imgsrc.setAttribute("height", "100");
    
    // using this boolean as set to false also worked to hide the pixabay logo between searches
    //image = !true;
    
    //End section A
  }
       
}

//Displaying API datas, passing in the results according to type of video or photo, essential to use in the below code to populate the right data in the output to #cards  
function populatePage(data, type) {
  //for all items in the array from 0 to the end of the array
  for (let i = 0; i < data.hits.length; i++) {
   
    //create Element, a div called newCol to append the other elements too
    var newCol = document.createElement("div");
    //it should be bootstrap responsive because we are setting the class and have used cols and rows in the HTML
    newCol.className = "col";
   
    // amend element
    var newVid = document.createElement("video"); // create new div in the doc
    var newSource = document.createElement("source");//new video source
    //set newVid.id to hold the ids of the objects from the JSON data in our array
    newVid.id = data.hits[i].id;
    // creating a new element to store an image
    var newImg = document.createElement("img");

    // only need source container for a video // var newImage = document.createElement("source"
    newImg.id = data.hits[i].id;
    //log out the array to the console to find how the objects are structured
    console.log(data.hits[i]);
    // Load the image and its tags / must change the array options to suit the array for example Pixabay uses data.hits and iTunes uses data.results
    
    //set URL in tiny size, width, height and controls on the videos
    //Create loop for picture or video
    if(type === "videos"){
      newSource.setAttribute("src", data.hits[i].videos.tiny.url);
      newVid.setAttribute("width", "320");
      newVid.setAttribute("height", "240");
      newVid.setAttribute("controls", true);
      
      //set tags to show 
      newVid.setAttribute("alt", data.hits[i].tags);
      //make space for the videos and append them into place
      newVid.appendChild(newSource);
      cards.appendChild(newVid); // appending the new div node into the imgDiv element
      //creating a p element to hold the text we take from the array
      var newTags = document.createElement("p");
      //style the p element using bootstrap classes
      newTags.className = "badge bg-secondary"
      //pull the text from the array into the new text each time
      var newPText = document.createTextNode(data.hits[i].tags); 
      // create a place to save the tags and append each bit of structure to its parent
      newTags.appendChild(newPText);
      newCol.appendChild(newTags);
      newCol.appendChild(newVid);
      cards.appendChild(newCol); 

      
      
    }
      //if the search type is photo we use the null field I have used in the html to run the following for picture type items
    else if(type === ""){
      //set a div and attributes for the image, process is same as videos, but we use a different endpoint from the array.  Attributes include height , width and alt tags
      newImg.setAttribute("src", data.hits[i].webformatURL);
      newImg.setAttribute("width", "320");
      newImg.setAttribute("height", "250");
      newImg.setAttribute("alt", data.hits[i].tags);
      // removed because was duplicating the container newImg.appendChild(newImage);
      cards.appendChild(newImg);

      var newPicTags = document.createElement("p");
      //set the styling for I.D data
      newPicTags.className = "badge bg-info"
      var newPicText = document.createTextNode(data.hits[i].tags);

      newPicTags.appendChild(newPicText);
      newCol.appendChild(newPicTags);
      newCol.appendChild(newImg);
      cards.appendChild(newCol);

    }
    
   
    
    
  }
}
//check that user has typed something in search form up the top for event listeners, if yes return "input ok", if not return error.  This is the validation of the search box
function validateInput(){
  //take a look at JAVAscript validation API from W3C schools.  set a variable from the string in search field
  var inpObj = document.getElementById("formSearchInput");
  //if there is no data entered return checkValidity method to false
  if (!inpObj.checkValidity()){
      //print message in confirm Div using innerHTML
      document.getElementById("confirm").innerHTML = inpObj.validationMessage;
      //else if there is data print Input OK using the same innerHTML
  } else{
      document.getElementById("confirm").innerHTML = "Input OK";
  }
}


// Final solution to searching for video or photo 
// worked out that just need to name id in HTML and have them passed in as ${type} and pass this into functions, then use the variable in the if and else loops to set either image or video as the output

//animate css*/ 
//didnt work in my code , may add at a later time, have included the CSS link
//cards.classList.add('animate__animated', 'animate_bounceInLeft')


// Module to submit form for registering but cannot do without a backend
/*window.addEventListener('load', event =>{
    function sendData(){
      const Form = new XMLHttpRequest();

      const FD = new FormData( form );

      Form.addEventListener( "load", function(event) {
        alert(event.target.responseText);
      });
      Form.addEventListener( "error", function(event){
        alert( 'Oops! Something went wrong.');
      });
      Form.open( "POST", "./my-form-handle-page.db");

      Form.send (FD);
    }

    const form = document.getElementById('submitForm');

    form.addEventListener( "submit", function (event) {
      event.preventDefault();

      sendData();
    });
});
//document.getElementById('submitForm').addEventListener('click', (event) =>{
  //saveFile();
//});

let saveFile = () => {
    	
  // Get the data from each element on the form.
const firstName = document.getElementById('first-name');
  const lastName = document.getElementById('last-name');
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const password2 = document.getElementById('password2');
  
  // This variable stores all the data.
  let data = 
      '\r Name: ' + firstName.value + ' \r\n ' + 
      'Lastname: ' +lastName.value + ' \r\n ' + 
      'Email: ' + email.value + ' \r\n ' + 
      'Password: ' + password.value + ' \r\n ' + 
      'Password2: ' + password2.value;
  
  // Convert the text to BLOB.
  const textToBLOB = new Blob([data], { type: 'text/plain' });
  const sFileName = 'formData.txt';	   // The file to save the data.

  let newLink = document.createElement("a");
  newLink.download = sFileName;

  if (window.webkitURL != null) {
      newLink.href = window.webkitURL.createObjectURL(textToBLOB);
  }
  else {
      newLink.href = window.URL.createObjectURL(textToBLOB);
      newLink.style.display = "none";
      document.body.appendChild(newLink);
  }

  newLink.click(); 
}*/



