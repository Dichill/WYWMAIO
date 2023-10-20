// It is unsecure that it is stored here, but ill change the key after 1 week or so.
var CAT_API_KEY = 'live_S3Afda6CQfdbadvX82WADcerlQUuDIrqx34WVkGm6ZW2oiS6V6rz5JaouIzrTHbM'
var LOTR_API_KEY = ''
var OPEN_MOVIE_API_KEY = ''
var SPACESHIPS_API_KEY = ''

async function getResponse(type, data) {
    switch (type) {
        /* 
            Total of 4 APIs
            Cat -> 0 | Lord of the Rings -> 1 | Open Movie Database -> 2 | Spaceships -> 3
        */

        // Cat
        case 0:
            console.log('Fetching -> Cat')
            try {
                // In data[1] It is the breed id, if the user selected 'All Breed' the value is set to 0, thus it is comparing if it is equal to 0
                let response = undefined
                if (data[1].length == 0)
                    // Since the user selected All Breed then we change the response to the one below. This returns a JSON
                    response = await getData(`https://api.thecatapi.com/v1/images/search?limit=${data[0]}&api_key=${CAT_API_KEY}`);
                else
                    // However if User did select a Breed, then the value should be greater than 0, so we know that we can just easily insert the data here
                    // And let their API do the work
                    response = await getData(`https://api.thecatapi.com/v1/images/search?limit=${data[0]}&breed_ids=${data[1]}&api_key=${CAT_API_KEY}`);
                
                // Relatively, since getData returns an already parse JSON, we can simply map it and get the URL instead
                const urls = response.map(entry => entry.url);
                return urls;
            } catch (error) {
                console.log("An error has occurred -> " + error);
                throw error;
            }

            // Planning to test other API's to expand my knowledge, but for now, I had fun coding with the Cat API
            case 1:
                console.log('Fetching -> Lord of The Rings')
                break;

            case 2:
                console.log('Fetching -> Open Movie Database')
                break;

            case 3:
                console.log('Fetching -> Spaceships')
                break;
    }
}

// This is simply for the Index.html's Carousel.
function gotoPage(type) {
    switch(type) {
        // Cats
        case 0:
            location.href='pages/cat.html'
            break;

        // Lord of the Rings
        case 1:
            location.href='pages/omd.html'
            break;

        // Open Movie Database
        case 2:
            location.href='pages/lotr.html'
            break;

        // Spaceships
        case 3:
            location.href='pages/spaceships.html'
            break;
    }
}

// This is a flexible function that I coded in which it can also
// communicate with other APIs. It is simple but it should do the work.
async function getData(url) {
    try {
        // We wait for the request as to fullfill its promise.
        const response = await fetch(url);

        if (response.ok) {
            console.log('Fetching -> OK');

            const data = await response.json();
            
            // Once the promise has been fullfilled we then return the data
            return data;
        } else {
            console.log('Fetching -> Error');
            return {
                isSuccess: false
            };
        }
    } catch (error) {
        console.error('There was an error fetching -> ' + url + " | " + error);
        return {
            isSuccess: false
        };
    }
}