import dotenv from 'dotenv';
dotenv.config();
import fetch from 'node-fetch';
import express from 'express';
import cors from 'cors';
const app = express();
import bodyParser from 'body-parser';
const COINMARKETCAP_API_URL = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest';
const apiKey = process.env.COINMARKETCAP_API_KEY


async function getCryptoData(symbol, amount) {
  try {
    const response = await fetch(`${COINMARKETCAP_API_URL}?symbol=${symbol}`, {
      method: 'GET',
      headers: {
        'X-CMC_PRO_API_KEY': process.env.COINMARKETCAP_API_KEY,
      },
    });

    if (response.ok) {
      const data = await response.json();
      const price = data.data[symbol].quote.USD.price;

      if (amount !== undefined && !isNaN(amount)) {
        const valueInUSD = price * amount;
        return valueInUSD;
      }

      return price;
    } else {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}

app.use(bodyParser.json());

// Enable CORS
app.use(cors()); // This will allow all origins by default. You can configure it for specific origins if needed.


app.post('/process', async (req, res) => {
  console.log("recieved")
  const assets = req.body;
  const price_array = {};

  try {
    const pricePromises = Object.keys(assets).map(async (key) => {
      const value = await getCryptoData(key, assets[key]);
      if (value !== null) {
        price_array[key] = value;
      } else {
        console.log(`Failed to fetch data for ${key}.`);
      }
    });

    await Promise.all(pricePromises);

    // Now you have all the prices in the price_array
    
    // You can send the response or perform further actions here
    
    console.log(price_array);
    res.send(JSON.stringify(price_array))

  } catch (error) {
    console.error('Error while fetching data:', error);
  }
});



const port = 5500;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});