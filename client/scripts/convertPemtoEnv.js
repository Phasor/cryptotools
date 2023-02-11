require("dotenv").config();

// simple script to take a multi line string and convert it to a single line string

function makeSingleLineKey(key) {
    return key.replace(/(\r\n|\n|\r)/gm, '\\n');
  }

const PRIV_KEY = process.env.LOCAL_AUTH_PRIV_KEY;
console.log(`PUB_KEY: ${PRIV_KEY}`);

console.log(`PUB_KEY: ${makeSingleLineKey(PRIV_KEY)}`);