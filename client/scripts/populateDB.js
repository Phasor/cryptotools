const Tool = require("../models/Tool");
const mongoose = require("mongoose");
require("dotenv").config({path: '../.env'})

const tools = [
    {
        name: "CryptoTax",
        image: "https://res.cloudinary.com/duzlvcryq/image/upload/v1671222547/cryptofrens/mogxhvgge5z2izqbz1km.png",
        website: "https://cryptotax.io/",
        description: "CryptoTax is a tax software that helps you calculate your crypto taxes. It is a web-based application that allows you to import your trades from exchanges and wallets and calculate your taxes. It also supports multiple currencies and tax years.",
        active: true,
        category: "tax",
        rating: "4"
    },
    {
        name: "Glassnode",
        image: "https://res.cloudinary.com/duzlvcryq/image/upload/v1671227113/cryptofrens/pou6jyu9mkitfxwwmkbw.png",
        website: "https://www.glassnode.com",
        description: "Glassnode provides first class on chain analytics",
        active: true,
        category: "onchain-data",
        rating: "5"
    },
    {
        name: "Messari",
        image: "https://res.cloudinary.com/duzlvcryq/image/upload/v1671227113/cryptofrens/pou6jyu9mkitfxwwmkbw.png",
        website: "https://www.messari.com",
        description: "Messari provides first class on chain analytics",
        active: true,
        category: "research",
        rating: "5"
    },
    {
        name: "Token Terminal",
        image: "https://res.cloudinary.com/duzlvcryq/image/upload/v1671227113/cryptofrens/pou6jyu9mkitfxwwmkbw.png",
        website: "https://www.Token.com",
        description: "Token Terminal provides first class on chain analytics",
        active: true,
        category: "research",
        rating: "5"
    },
    {
        name: "Dune Analytics",
        image: "https://res.cloudinary.com/duzlvcryq/image/upload/v1671227113/cryptofrens/pou6jyu9mkitfxwwmkbw.png",
        website: "https://www.dune.com",
        description: "Dune provides first class on chain analytics",
        active: true,
        category: "research",
        rating: "5"
    },
    {
        name: "CoinGecko",
        image: "https://res.cloudinary.com/duzlvcryq/image/upload/v1671227113/cryptofrens/pou6jyu9mkitfxwwmkbw.png",
        website: "https://www.coingecko.com",
        description: "Coin Gecko provides first class on chain analytics",
        active: true,
        category: "research",
        rating: "5"
    },
    {
        name: "CoinMarketCap",
        image: "https://res.cloudinary.com/duzlvcryq/image/upload/v1671227113/cryptofrens/pou6jyu9mkitfxwwmkbw.png",
        website: "https://www.coinmarketcap.com",
        description: "Coinmarketcap provides first class on chain analytics",
        active: true,
        category: "research",
        rating: "5"
    }
]

const connectionString = process.env.NODE_ENV == "development" ? process.env.DB_STRING_DEV : process.env.DB_STRING_PROD;

const connectToMongoDB = async () => {
    mongoose.connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }, (err) => {
        if(err){
            console.error(err)
        } else {
            console.log(`Database connected to ${mongoose.connection.host}`);
        }
    });
};

async function run() {
    await connectToMongoDB();
    await Tool.deleteMany({});
    // insert projects
    await Tool.create(tools);
    console.log("Done!");
    process.exit();
}

run();

