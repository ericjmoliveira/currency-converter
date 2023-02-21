import axios from 'axios';

import { Currency, Rate } from '../interfaces';

const api = axios.create({ baseURL: 'https://api.freecurrencyapi.com/v1' });
const CURRENCY_API_KEY = import.meta.env.VITE_CURRENCY_API_KEY;

export async function getCurrenciesList() {
  const response = await api.get(`/currencies?apikey=${CURRENCY_API_KEY}`);
  const data = response.data;
  const currenciesList = Object.values(data.data).map((currency) => currency);

  return currenciesList as Currency[];
}

export async function getLatestRates(base: string = 'USD') {
  const response = await api.get(`/latest?base_currency=${base}&apikey=${CURRENCY_API_KEY}`);
  const data = response.data;
  const latestRates = Object.entries(data.data).map((currency) => {
    return { code: currency[0], rate: currency[1] };
  });

  return latestRates as Rate[];
}
