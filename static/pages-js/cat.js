// Once the DOM has been intialized, execute the following functions below.
document.addEventListener("DOMContentLoaded", async function () {
    console.log("Cat Page Initialized");

    // Get the Breed lists
    await getBreedList()
});

// In order to know what Cat the user selected
let selectedCat = ''

// ID's of all 4 columns so we can choose from them
const columns = ['uno', 'dos', 'tres', 'four']

function Clear() {
    // Simply Iterate from all Columns, get their Nodes by ID and setting their innerHTML to ''
    columns.forEach(column => {
        var col = document.getElementById(column)
        col.innerHTML = ''
    });
}

async function Generate() {
    // Values from the dropdown Menu
    var limitNo = document.getElementById("limitDropdown").value;
    var BreedType = document.getElementById("BreedDropdown").value;

    // We will make it into a list so we can easily pass the data
    let data = [limitNo, BreedType];

    // Call the function from main.js to get the data for Cats
    var generatedContent = await getResponse(0, data);

    // We need to get the width of the device so that if we the user
    // is a mobile user we can just stack the images to four so that
    // they can see the results properly.
    var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;

    // Results from the Response
    generatedContent.forEach(image => {
        // Randomly select any columns
        let index = undefined

        // To make sure that other devices that has a small screen can have a superb experience,
        // We check the width and let all the images that are going through to the 4th Column so that it will
        // Go down. If I set it to other columns, it will be hard as it wont show at the bottom but rather to its original position
        if (width < 600) {
            index = columns[3]
        } else {
            // If we, however, have a viable screen width, we can simply randomize in which column should the
            // images be placed
            const randomIndex = Math.floor(Math.random() * columns.length)
            index = columns[randomIndex]
        }
        var holder = document.getElementById(index);

        // Create a new Image element
        var img = document.createElement("img");
        img.src = image

        // For the Download Modal
        img.setAttribute("data-bs-toggle", "modal");
        img.setAttribute("data-bs-target", "#exampleModal");
        img.onclick = () => {
            // Let the whole scope know that when the user clicks on a cat, this is the URL of the said Cat.
            // I could, however make a modal where it shows the description of the Cat, so I might make some changes soon.
            selectedCat = image
        }

        holder.appendChild(img)
    });
}

async function getBreedList() {
    try {
        // Get the breed lists first so we can then append it onto the BreedDropdown
        const response = await fetch('https://api.thecatapi.com/v1/breeds')

        if (response.ok) {
            console.log('API Request for Breeds -> OK')

            // Getting the Nodes
            var loader = document.getElementById("loader");
            var mainContainer = document.getElementById("MainContainer");
            var BreedType = document.getElementById("BreedDropdown");

            // If the response is OK, we can then remove the Spinner
            loader.classList.remove("d-flex");
            loader.style.display = "none";

            // Once the spinner is removed we then appear the main container
            mainContainer.classList.remove("d-none");
            mainContainer.classList.add("d-inline-flex")

            // Create a new child for the ComboBox Options
            const data = await response.json()
            
            // Once we get the data, we can simply parse it and make it simple for us
            // To access.
            const nameAndIdArray = data.map(dataObj => ({
                name: dataObj.name,
                id: dataObj.id,
            }));

            // In here we loop each list and get their name & Id so we can place them to the Option
            // of our Select
            nameAndIdArray.forEach(dataObj => {
                var option = document.createElement("option");
                option.text = dataObj.name;
                option.value = dataObj.id;
                BreedType.add(option);
            });
        }
    } catch (err) {
        console.log('An error has occured => ' + err)
    }
}