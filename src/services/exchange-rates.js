const axios = require('axios');

async function getExchangeRates(token) {
    try {
        var payload = {
            fsym: token,
            tsyms: 'USD'
        };
        var response = await axios.get(
            'https://min-api.cryptocompare.com/data/price',
            { params: payload },
            { headers: { Authorization: `Apikey ${process.env.API_KEY}` } }
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