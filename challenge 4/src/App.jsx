// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { useEffect, useState } from "react";

export default function App() {
  const [input, setInput] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [currencyTo, setCurrencyTo] = useState("EUR");
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (!input || currency === currencyTo) {
      setResult(input);
      return;
    }

    const controller = new AbortController();
    (async () => {
      try {
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${input}&from=${currency}&to=${currencyTo}`,
          { signal: controller.signal }
        );
        const data = await res.json();
        setResult(data.rates[currencyTo]);
      } catch (err) {
        console.log(err);
      }
    })();

    return () => {
      controller.abort();
    };
  }, [input, currency, currencyTo]);

  return (
    <div className="app">
      <div className="input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="CAD">CAD</option>
          <option value="INR">INR</option>
        </select>
        <select
          value={currencyTo}
          onChange={(e) => setCurrencyTo(e.target.value)}
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="CAD">CAD</option>
          <option value="INR">INR</option>
        </select>
      </div>
      <p>
        {input && (
          <>
            {input} {currency} is {result} {currencyTo}
          </>
        )}
      </p>
    </div>
  );
}
