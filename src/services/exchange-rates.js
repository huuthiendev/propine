const axios = require('axios');
const API_KEY = '38e9357f76ef54ff59cbd3217468aaf9498cc718680f77f8bcbc8dad253fd7d8';

async function getExchangeRates(token) {
    try {
        var payload = {
            fsym: token,
            tsyms: 'USD'
        };
        var response = await axios.get(
            'https://min-api.cryptocompare.com/data/price',
            { params: payload },
            { headers: { Authorization: `Apikey ${API_KEY}` } }
        );
        return response.data.USD;
    }
    catch (err) {
        console.error('[ERROR] getExchangeRates: ', err);
        return null;
    }
}

module.exports = {
    getExchangeRates
}