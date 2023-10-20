// It is unsecure that it is stored here, but ill change the key after 1 week or so.
var CAT_API_KEY = 'live_S3Afda6CQfdbadvX82WADcerlQUuDIrqx34WVkGm6ZW2oiS6V6rz5JaouIzrTHbM'
var LOTR_API_KEY = ''
var OPEN_MOVIE_API_KEY = ''
var SPACESHIPS_API_KEY = ''

async function getResponse(type, data) {
    switch (type) {
        // Cat
        case 0:
            console.log('Fetching -> Cat')
            try {
                let response = undefined
                if (data[1].length == 0)
                    response = await getData(`https://api.thecatapi.com/v1/images/search?limit=${data[0]}&api_key=${CAT_API_KEY}`);
                else
                    response = await getData(`https://api.thecatapi.com/v1/images/search?limit=${data[0]}&breed_ids=${data[1]}&api_key=${CAT_API_KEY}`);

                const urls = response.map(entry => entry.url);
                return urls;
            } catch (error) {
                console.log("An error has occurred -> " + error);
                throw error;
            }

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

async function getData(url) {
    try {
        const response = await fetch(url);

        if (response.ok) {
            console.log('Fetching -> OK');
            const data = await response.json();
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