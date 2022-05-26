const yargs = require('yargs');
const moment = require('moment');
const SCRIPT_NAME = 'portfolio';

const { argv } = yargs
    .scriptName(SCRIPT_NAME)
    .usage('Usage: $0 -t string -d string')
    .example(
        '$0 -d \'05/26/2022\'',
        'Return the portfolio value per token in USD on that date.'
    )
    .option('t', {
        alias: 'token',
        describe: 'Enter the token',
        demandOption: false,
        type: 'string'
    })
    .option('d', {
        alias: 'date',
        describe: 'Enter date in MM-DD-YYYY format',
        demandOption: false,
        type: 'string'
    })
    .strictOptions()
    .check(argv => {
        // Validate date
        if (argv.hasOwnProperty('date')) {
            const momentObj = moment(argv.date, 'MM/DD/YYYY', true);
            if (!momentObj.isValid()) {
                throw new Error('Date is invalid');
            }
            else {
                argv.fromDate = momentObj.startOf('day').valueOf();
                argv.toDate = momentObj.endOf('day').valueOf();
            }
        }
        return true;
    })
    .showHelp();


module.exports = { argv, SCRIPT_NAME };