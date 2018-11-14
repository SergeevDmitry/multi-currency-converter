const axios = require('axios');

// const getExchangeRate = (from, to) => {
//   return axios.get('http://data.fixer.io/api/latest?access_key=527113fdba1be461eb20a589770073fe').then((response) => {
//     const euro = 1 / response.data.rates[from];
//     const rate = euro * response.data.rates[to];
//     return rate;
//   })
// }

const getExchangeRate = async (from, to) => {
  const response = await axios.get('http://data.fixer.io/api/latest?access_key=527113fdba1be461eb20a589770073fe');
  const euro = 1 / response.data.rates[from];
  const rate = euro * response.data.rates[to];
  return rate;
}

const getCountries = async (currencyCode) => {
  const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`);
  const countries = response.data.reduce((countriesArray, country) => {
    countriesArray.push(country.name);
    return countriesArray;
  }, []);

  return countries;
}

getCountries('USD').then((countries) => {
  console.log(countries);
})

getExchangeRate('USD', 'CAD').then((rate) => {
  console.log(rate);
})
