const axios = require('axios');

const options = {
    method: 'GET',
    url: 'https://sports-information.p.rapidapi.com/mlb/team-list',
    headers: {
        'X-RapidAPI-Key': 'dcde77cbdcmsh81ae59432437887p1c079djsn99d2e7a05c18',
        'X-RapidAPI-Host': 'sports-information.p.rapidapi.com'
    }
};


try {
    axios.request(options).then((res) => {
        console.log(res.data);
    });
} catch (error) {
    console.error(error);
}