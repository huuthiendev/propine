# Propine Test

## How to run the program ?
#### 1. Add transactions.csv file in the root folder
#### 2. Install all dependencies
```bash
npm install
```
#### 3. Start the program by command line
```bash
node src/main.js portfolio
```

#### Examples:
#### Given no parameters, return the latest portfolio value per token in USD
```bash
node src/main.js portfolio
```

#### Given a token, return the latest portfolio value for that token in USD
```bash
node src/main.js portfolio --token='ETH'
```

#### Given a date, return the portfolio value per token in USD on that date
```bash
node src/main.js portfolio --date='05/26/2022'
```

#### Given a date and a token, return the portfolio value of that token in USD on that date
```bash
node src/main.js portfolio --token='ETH' --date='05/26/2022'
```

## Explain the design
#### 1. Using createReadStream
Processing large files is nothing new to JavaScript, in fact, in the core functionality of Node.js, there are a number of standard solutions for reading and writing to and from files. The most straightforward is fs.readFile() wherein, the whole file is read into memory and then acted upon once Node has read it, and the second option is fs.createReadStream().

Since my solution needed to involve such things as calculating the amount of transactions and parsing through each line to get token, amount, transaction_type and date. I chose to use the second method: fs.createReadStream().

It seemed easier to me, than having to split apart the whole file once it was read in and run through the lines that way.

#### 2. Using yargs
Yargs helps me build interactive command line tools by parsing arguments and generating an elegant user interface.

#### 3. Parsing the content
I'm using `csv-parser` module that supports streaming CSV parser. So, it makes the process faster.