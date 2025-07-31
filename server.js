require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.static('frontend'));

app.get('/api/exercises', async (req, res) => {
  const searchQuery = req.query.search || 'legs';

  try {
    const response = await fetch(`https://exercisedb.p.rapidapi.com/exercises/name/${searchQuery}`, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': process.env.EXERCISE_API_KEY,
        'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    res.json(data);

  } catch (error) {
    console.error('Error fetching from API:', error);
    res.status(500).json({ error: 'Failed to load exercises' });
  }
});
app.get('/', (req, res) => {
  res.send('Welcome to the Exercise API backend!');
});

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
