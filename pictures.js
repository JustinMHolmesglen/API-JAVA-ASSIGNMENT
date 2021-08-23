const images = document.querySelectorAll("span");
//Declare variables
const cards = document.getElementById('cards');
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
  getSong(formSearchInput.value, searchSelect.value, searchSelectColor.value, validateInput());
  document.getElementById('tag_cards').innerHTML = "";
  document.getElementById('royal').innerHTML = "";

});

// key press event listener in case user presses enter on keyboard, works the same as above, this does the same as the listener above but keypresses instead of click.
formSearchInput.addEventListener('keypress', function (e) {
 
  if (e.key === 'Enter') {
    getSong(formSearchInput.value, searchSelect.value, searchSelectColor.value, validateInput());
    document.getElementById('tag_cards').innerHTML = "";
    document.getElementById('royal').innerHTML = "";
    
  }
  
});

async function getSong(query, category, colors) {
    let data = await fetch(
      // pass in the Pixabay base url, our API key, search terms and category
      `${baseUrl}?key=${apiKey}&q=${colors}+${query}&category=${category}&page`)

        data = await data.json();
        console.log(data)

        populatePage(data);
}    
function populatePage(data) {
    //for all items in the array from 0 to the end of the array
    for (let i = 0; i < data.hits.length; i++) {
     
      //create Element, a div called newCol to append the other elements too
      var newCol = document.createElement("div");
      //it should be bootstrap responsive because we are setting the class
      newCol.className = "col";
      var newImg = document.createElement("img");
      newImg.setAttribute("src", data.hits[i].webformatURL);
      newImg.setAttribute("width", "320");
      newImg.setAttribute("height", "250");
      
      // removed because was duplicating the container newImg.appendChild(newImage);
      java_tech_box.appendChild(newImg);

      

     
      newCol.appendChild(newImg);
      java_tech_box.appendChild(newCol);

    }
}

//check that user has typed something in form, if yes return "input ok", if not return error.  This is the validation of the search box
function validateInput(){
    var inpObj = document.getElementById("formSearchInput");
  
    if (!inpObj.checkValidity()){
        document.getElementById("confirm").innerHTML = inpObj.validationMessage;
    } else{
        document.getElementById("confirm").innerHTML = "Input OK";
    }
  
images.forEach((image, index) => {
  image.addEventListener("click", (e) => {
    anime({
      targets: images,
      autoplay: true,
      opacity: [
        { value: 0.5, easing: "easeOutSine", duration: 600 },
        { value: 1, easing: "easeInOutQuad", duration: 900 }
      ],
      filter: [
        {
          value: "blur(5px) grayscale(100%)",
          easing: "easeOutSine",
          duration: 700
        },
        {
          value: "blur(0px) grayscale(0%)",
          easing: "easeInOutQuad",
          duration: 1000
        }
      ],
      borderRadius: [
        { value: "50%", easing: "easeOutSine", duration: 700 },
        { value: "0%", easing: "easeInOutQuad", duration: 1000 }
      ],
      scale: [
        { value: 0.5, easing: "easeOutSine", duration: 600 },
        { value: 1, easing: "easeInOutQuad", duration: 1100 }
      ],
      delay: anime.stagger(200, { grid: [5, 5], from: index })
    });
  });
});
}
window.onload = () => document.querySelector("#java_tech").remove();
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("img").forEach((img) => {
    img.onerror = function () {
      this.style.display = "none";
    };
  });
});