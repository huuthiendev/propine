const fs = require('fs');
const csv = require('csv-parser');
require('dotenv').config();

const { argv, SCRIPT_NAME } = require('./cli-command');
const { getExchangeRates } = require('./services/exchange-rates');
const TRANSACTION_FILE = 'transactions.csv';

function getPorfolio(argv) {
    console.log('Calculating the portfolio ...')
    var tokenPorfolios = {};

    fs.createReadStream(TRANSACTION_FILE)
        .pipe(csv())
        .on('data', data => {
            // Token & Date
            if (argv.token &&
                argv.date &&
                data.token === argv.token &&
                data.timestamp >= argv.fromDate &&
                data.timestamp <= argv.toDate) {
                tokenCounter(tokenPorfolios, data);
            }
            // Date
            else if (argv.date &&
                data.timestamp >= argv.fromDate &&
                data.timestamp <= argv.toDate) {
                tokenCounter(tokenPorfolios, data);
            }
            // Token
            else if (argv.token && data.token === argv.token) {
                tokenCounter(tokenPorfolios, data);
            }
            // No options
            else {
                tokenCounter(tokenPorfolios, data);
            }
        })
        .on('end', async function () {
            if (!Object.keys(tokenPorfolios).length) {
                console.log('No matching results');
                return;
            }

            for (let index = 0; index < Object.keys(tokenPorfolios).length; index++) {
                const token = Object.keys(tokenPorfolios)[index];
                const amount = tokenPorfolios[token];
                const price = await getExchangeRates(token);
                tokenPorfolios[token] = price ? amount * price : amount;
            }
            console.log('Token portfolio in USD: ', tokenPorfolios);
        })
        .on('error', function (err) {
            console.log('[ERROR] getPorfolio: ', err);
        });
}

function tokenCounter(tokenPorfolios, data) {
    if (!tokenPorfolios[data.token]) {
        tokenPorfolios[data.token] = data.transaction_type === 'DEPOSIT'
            ? Number(data.amount)
            : Number(-data.amount);
    } else {
        tokenPorfolios[data.token] = data.transaction_type === 'DEPOSIT'
            ? Number(tokenPorfolios[data.token]) + Number(data.amount)
            : Number(tokenPorfolios[data.token]) - Number(data.amount);
    }
}

if (argv._.length && argv._[0] === SCRIPT_NAME) {
    getPorfolio(argv);
}