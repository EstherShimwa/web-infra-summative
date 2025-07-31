require('dotenv').config();
const axios = require('axios');

async function fetchMentalHealthResources(location, type) {
  const apiKey = process.env.API_KEY;

  const options = {
    method: 'GET',
    url: 'https://better-doctor.p.rapidapi.com/practices',
    params: {
      location: location,
      specialty_uid: type,
      limit: 10
    },
    headers: {
      'X-RapidAPI-Key': apiKey,
      'X-RapidAPI-Host': 'better-doctor.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    return response.data.data; // or just response.data
  } catch (error) {
    console.error('API error:', error.message);
    throw error;
  }
}

module.exports = { fetchMentalHealthResources };
