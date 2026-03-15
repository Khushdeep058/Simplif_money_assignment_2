const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


const GOLDAPI_KEY = process.env.GOLDAPI_KEY;
const METALPRICEAPI_KEY = process.env.METALPRICEAPI_KEY;


const GOLDAPI_BASE_URL = 'https://www.goldapi.io/api';
const METALPRICEAPI_BASE_URL = 'https://api.metalpriceapi.com/v1';


const generateMockData = (basePrice, timeframe = '1D') => {
  const data = [];
  let currentPrice = basePrice;
  let dataPoints = 0;
  let intervalLabel = '';
  let volatility = 0;

  switch (timeframe) {
    case '1W': dataPoints = 7; intervalLabel = 'Day '; volatility = 100; break;
    case '1M': dataPoints = 30; intervalLabel = 'Day '; volatility = 200; break;
    case '3M': dataPoints = 90; intervalLabel = 'Day '; volatility = 300; break;
    case '6M': dataPoints = 180; intervalLabel = 'Day '; volatility = 500; break;
    case '1Y': dataPoints = 12; intervalLabel = 'Month '; volatility = 1000; break;
    case '5Y': dataPoints = 5; intervalLabel = 'Year '; volatility = 3000; break;
    case 'All': dataPoints = 10; intervalLabel = 'Year '; volatility = 5000; break;
    case '1D': 
    default:
      dataPoints = 8; 
      volatility = 40; 
      break;
  }

  if (timeframe === '1D' || !timeframe) {
    const times = ["9:30", "10:30", "11:30", "12:30", "13:30", "14:30", "15:30", "16:00"];
    for (let i = 0; i < dataPoints; i++) {
      const change = Math.floor(Math.random() * (volatility + 1)) - (volatility / 2);
      currentPrice += change;
      data.push({ time: times[i] || `T+${i}`, value: currentPrice });
    }
  } else {
    for (let i = 1; i <= dataPoints; i++) {
      const change = Math.floor(Math.random() * (volatility + 1)) - (volatility / 2);
      currentPrice += change;
      
      let label = `${intervalLabel}${i}`;
      if (timeframe === '1Y') {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        label = months[i - 1];
      }
      data.push({ time: label, value: currentPrice });
    }
  }

  return data;
};

// Mock  prices if api failed to hit
const MOCK_CURRENT_PRICES = {
  gold: 6200,
  silver: 85,
  platinum: 900,
  palladium: 1050
};


app.get('/api/prices', async (req, res) => {
  try {
    const prices = {
      gold: null,
      silver: null,
      platinum: null,
      palladium: null,
      date: new Date().toLocaleDateString()
    };

    
    const fetchPromises = [];

    // 1. Fetching Gold  from goldapi.io
    if (GOLDAPI_KEY) {
      fetchPromises.push(
        axios.get(`${GOLDAPI_BASE_URL}/XAU/INR`, {
          headers: { 'x-access-token': GOLDAPI_KEY }
        }).then(res => prices.gold = res.data.price)
          .catch(err => {
            console.error("Gold API Error:", err.message);
            if (err.response && (err.response.status === 429 || err.response.status === 403)) {
              console.log(`GoldAPI Error (${err.response.status}). Using mock data for Gold.`);
            }
            prices.gold = MOCK_CURRENT_PRICES.gold;
          })
      );
    } else {
      prices.gold = MOCK_CURRENT_PRICES.gold;
    }

    // 2. Fetching Silver from goldapi.io
    if (GOLDAPI_KEY) {
      fetchPromises.push(
        axios.get(`${GOLDAPI_BASE_URL}/XAG/INR`, {
          headers: { 'x-access-token': GOLDAPI_KEY }
        }).then(res => prices.silver = res.data.price)
          .catch(err => {
            console.error("Silver API Error:", err.message);
            if (err.response && (err.response.status === 429 || err.response.status === 403)) {
              console.log(`GoldAPI Error (${err.response.status}). Using mock data for Silver.`);
            }
            prices.silver = MOCK_CURRENT_PRICES.silver;
          })
      );
    } else {
      prices.silver = MOCK_CURRENT_PRICES.silver;
    }

    // 3. Fetching Platinum and Palladium from metalpriceapi.com
    if (METALPRICEAPI_KEY) {
      fetchPromises.push(
        axios.get(`${METALPRICEAPI_BASE_URL}/latest`, {
          params: {
            api_key: METALPRICEAPI_KEY,
            base: 'USD',
            currencies: 'XPT,XPD,INR' 
          }
        }).then(res => {
          
          const rates = res.data.rates;
          
          if (rates && rates.INR) {
            const usdToInr = rates.INR; // e.g., 83.0
            if (rates.XPT) prices.platinum = Number((usdToInr / rates.XPT).toFixed(2));
            if (rates.XPD) prices.palladium = Number((usdToInr / rates.XPD).toFixed(2));
          } else {
            console.warn("MetalPrice API returned unexpected data structure (v1/latest). Using mock data.");
            prices.platinum = MOCK_CURRENT_PRICES.platinum;
            prices.palladium = MOCK_CURRENT_PRICES.palladium;
          }
        }).catch(err => {
          console.error("MetalPrice API Error:", err.message);
          prices.platinum = MOCK_CURRENT_PRICES.platinum;
          prices.palladium = MOCK_CURRENT_PRICES.palladium;
        })
      );
    } else {
      prices.platinum = MOCK_CURRENT_PRICES.platinum;
      prices.palladium = MOCK_CURRENT_PRICES.palladium;
    }

    
    await Promise.all(fetchPromises);

    res.json(prices);
  } catch (error) {
    console.error("Error fetching combined prices:", error);
    res.status(500).json({ error: "Failed to fetch prices" });
  }
});


app.get('/api/prices/history/:metal', async (req, res) => {
  const { metal } = req.params;
  const { timeframe = '1D' } = req.query; 
  
  const validMetals = ['gold', 'silver', 'platinum', 'palladium'];
  
  if (!validMetals.includes(metal.toLowerCase())) {
    return res.status(400).json({ error: "Invalid metal type" });
  }

  try {
    

    let currentPrice = MOCK_CURRENT_PRICES[metal.toLowerCase()];
    const date = new Date().toLocaleDateString();

    
    if ((metal === 'gold' || metal === 'silver') && GOLDAPI_KEY) {
      const symbol = metal === 'gold' ? 'XAU' : 'XAG';
      try {
        const result = await axios.get(`${GOLDAPI_BASE_URL}/${symbol}/INR`, {
          headers: { 'x-access-token': GOLDAPI_KEY }
        });
        currentPrice = result.data.price;
      } catch (e) {
        console.error("History fetch error (GoldAPI):", e.message);
      }
    } else if ((metal === 'platinum' || metal === 'palladium') && METALPRICEAPI_KEY) {
      try {
        const result = await axios.get(`${METALPRICEAPI_BASE_URL}/latest`, {
          params: { api_key: METALPRICEAPI_KEY, base: 'USD', currencies: 'XPT,XPD,INR' }
        });
        const rates = result.data.rates;
        const usdToInr = rates.INR;
        if (metal === 'platinum' && rates.XPT) currentPrice = Number((usdToInr / rates.XPT).toFixed(2));
        if (metal === 'palladium' && rates.XPD) currentPrice = Number((usdToInr / rates.XPD).toFixed(2));
      } catch (e) {
        console.error("History fetch error (MetalPriceAPI):", e.message);
      }
    }

    const chartData = generateMockData(currentPrice, timeframe);
    
    
    const prices = chartData.map(d => d.value);
    const low = Math.min(...prices);
    const high = Math.max(...prices);
    const latestPrice = chartData[chartData.length - 1].value;

    
    const yearLow = Math.floor(latestPrice * 0.85); 
    const yearHigh = Math.floor(latestPrice * 1.12); 
    
    res.json({
      metal: metal,
      date: date,
      currentPrice: latestPrice,
      low: low,
      high: high,
      yearLow: yearLow,
      yearHigh: yearHigh,
      chartData: chartData
    });

  } catch (error) {
    console.error(`Error fetching history for ${metal}:`, error);
    res.status(500).json({ error: "Failed to fetch historical data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  if (!GOLDAPI_KEY || !METALPRICEAPI_KEY) {
    console.log("Warning: API Keys are missing. Using mock data for missing keys.");
  }
});
