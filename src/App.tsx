import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import { getCurrenciesList, getLatestRates } from './services/currency';

export default function App() {
  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('BRL');

  const currencies = useQuery({ queryKey: ['currencies'], queryFn: () => getCurrenciesList() });
  const rates = useQuery({ queryKey: ['rates'], queryFn: () => getLatestRates(from) });

  useEffect(() => {
    rates.refetch();
  }, [from]);

  return (
    <main
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10/12 md:w-1/2 flex 
    flex-col mx-auto p-8 bg-white"
    >
      <h1 className="text-2xl text-center font-semibold mb-8">Currency Converter</h1>
      <section className="flex flex-col mb-4">
        <label className="font-medium mb-2" htmlFor="amount">
          Amount ($):
        </label>
        <input
          className="px-4 py-2.5 border"
          type="number"
          id="amount"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          min={1}
          autoComplete="off"
          required
        />
      </section>
      <section className="flex flex-col mb-4">
        <label className="font-medium mb-2" htmlFor="from">
          From Currency:
        </label>
        <select
          className="px-4 py-2.5 border"
          id="from"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
        >
          {currencies.data?.map((currency) => (
            <option key={currency.code} value={currency.code}>
              {currency.name}
            </option>
          ))}
        </select>
      </section>
      <section className="flex flex-col mb-8">
        <label className="font-medium mb-2" htmlFor="to">
          To Currency:
        </label>
        <select
          className="px-4 py-2.5 border"
          id="to"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        >
          {currencies.data?.map((currency) => (
            <option key={currency.code} value={currency.code}>
              {currency.name}
            </option>
          ))}
        </select>
      </section>
      <section className="flex flex-col items-center justify-between">
        <span className="text-xl text-center font-medium">
          {`${Number(amount).toFixed(2)} ${
            currencies.data?.find((currency) => currency.code === from)?.name
          } = ${Number(
            Number(rates.data?.find((rate) => rate.code === to)?.rate!) * Number(amount)
          ).toFixed(2)} ${currencies.data?.find((currency) => currency.code === to)?.name}`}
        </span>
      </section>
    </main>
  );
}
