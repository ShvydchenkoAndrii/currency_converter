import { AppContext } from "@/pages";
import React, { useContext, useState, useRef } from "react";

function Converter() {
  const store = useContext(AppContext);
  const { USD, EUR, UAH } = store;
  const currencies = ["USD", "UAH", "EUR"];
  const [fromCurrencyValue, setFromCurrencyValue] = useState("");
  const [toCurrencyValue, setToCurrencyValue] = useState("");

  const fromCurrencyInput = useRef(null);
  const toCurrencyInput = useRef(null);
  const fromCurrency = useRef(null);
  const toCurrency = useRef(null);

  const handleCurrencyChange = (side) => {
    const fromSelector = fromCurrency.current.value;
    const toSelector = toCurrency.current.value;
    const rates = {
      USD: { UAH: USD.UAH, EUR: USD.EUR },
      UAH: { USD: UAH.USD, EUR: UAH.EUR },
      EUR: { USD: EUR.USD, UAH: EUR.UAH },
    };
    const fromCurrencyNum = fromCurrencyInput.current.value;
    const toCurrencyNum = toCurrencyInput.current.value;
    if (fromCurrencyNum >= 0 && toCurrencyNum >= 0) {
      if (side === "from") {
        const rate = rates[fromSelector][toSelector] || 1;
        setFromCurrencyValue(fromCurrencyNum);
        setToCurrencyValue((fromCurrencyNum * rate).toFixed(4));
      } else {
        const rate = rates[toSelector][fromSelector] || 1;
        setFromCurrencyValue((toCurrencyNum * rate).toFixed(4));
        setToCurrencyValue(toCurrencyNum);
      }
    }
  };

  return (
    <div className="flex flex-col gap-5 items-center bg-gray-200 py-10 min-h-screen">
      <h1 className="text-3xl italic text-red-300">Currency converter</h1>
      <div className="flex gap-5">
        <input
          className="p-2 text-lg"
          type="number"
          value={fromCurrencyValue}
          ref={fromCurrencyInput}
          onChange={() => handleCurrencyChange("from")}
        ></input>
        <select
          className="border"
          name="fromCurrency"
          id="fromCurrency"
          defaultValue="USD"
          ref={fromCurrency}
          onChange={() => handleCurrencyChange("from")}
        >
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
      <div className="flex gap-5">
        <input
          className="p-2 text-lg"
          type="number"
          ref={toCurrencyInput}
          value={toCurrencyValue}
          onChange={() => handleCurrencyChange("to")}
        />
        <select
          className="border"
          name="toCurrency"
          id="toCurrency"
          defaultValue="UAH"
          ref={toCurrency}
          onChange={() => handleCurrencyChange("to")}
        >
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default Converter;
