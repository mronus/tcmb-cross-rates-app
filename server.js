const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/currency', async (req, res) => {
  const { yearMonth, dayMonthYear } = req.query;
  if (!yearMonth || !dayMonthYear) return res.status(400).send("Missing parameters");

  const url = `https://www.tcmb.gov.tr/kurlar/${yearMonth}/${dayMonthYear}.xml`;

  try {
    const response = await axios.get(url);
    res.set('Content-Type', 'application/xml');
    res.send(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).send("Error fetching XML");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
