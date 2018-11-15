const axios = require('axios');

const getExchangeRate = async (from, to) => {
  try {
    const response = await axios.get('http://data.fixer.io/api/latest?access_key=527113fdba1be461eb20a589770073fe');
    const euro = 1 / response.data.rates[from];
    const rate = euro * response.data.rates[to];

    if (isNaN(rate)) {
      throw new Error();
    }

    return rate;
  } catch (e) {
    throw new Error(`Unable to get exchange rate for ${from} and ${to}`);
  }
}

const getCountries = async (currencyCode) => {
  try {
    const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`);
    const countries = response.data.reduce((countriesArray, country) => {
      countriesArray.push(country.name);
      return countriesArray;
    }, []);

    return countries;
  } catch (e) {
    throw new Error(`Unable to get countries the use ${currencyCode}`);
  }
}

const convertCurrency = async (from, to, amount) => {
  const rate = await getExchangeRate(from, to);
  const countries = await getCountries(to);
  const convertedAmount = (amount * rate).toFixed(2);

  return `${convertedAmount} in ${countries.join(', ')}`;
}

convertCurrency('USD', 'CAD', 220)
  .then((result) => console.log(result))
  .catch((e) => console.log(e.message));
