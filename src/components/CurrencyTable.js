import React, { useEffect, useState } from "react";
import axios from "axios";
import TableRow from "./TableRow";

const CurrencyTable = () => {
  const [currencyData, setCurrencyData] = useState([]);

  const fetchCurrencyRates = async () => {
    try {
      const response = await axios.get(
        "https://api.currencyfreaks.com/latest",
        {
          params: {
            apikey: "5b47642c38044fb189b142de20ebeba9",
          },
        }
      );

      const rates = response.data.rates;
      const currencies = ["CAD", "IDR", "JPY", "CHF", "EUR", "GBP"];
      const formattedData = currencies.map((currency) => {
        const exchangeRate = parseFloat(rates[currency]);
        return {
          currency,
          buy: (exchangeRate * 1.05).toFixed(4),
          exchangeRate: exchangeRate.toFixed(4),
          sell: (exchangeRate * 0.95).toFixed(4),
        };
      });

      setCurrencyData(formattedData);
    } catch (error) {
      console.error("Error get currency date:", error);
    }
  };

  useEffect(() => {
    fetchCurrencyRates();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <table
        style={{ width: "80%", margin: "auto", borderCollapse: "separate" }}
      >
        <thead>
          <tr>
            <th
              style={{
                color: "white",
                padding: "10px",
              }}
            >
              Currency
            </th>
            <th
              style={{
                color: "white",
                padding: "10px",
              }}
            >
              We Buy
            </th>
            <th
              style={{
                color: "white",
                padding: "10px",
              }}
            >
              Exchange Rate
            </th>
            <th
              style={{
                color: "white",
                padding: "10px",
              }}
            >
              We Sell
            </th>
          </tr>
        </thead>
        <tbody>
          {currencyData.map((data, index) => (
            <TableRow
              key={data.currency}
              data={data}
              isEvenRow={index % 2 === 0}
            />
          ))}
        </tbody>
      </table>

      <p style={{ textAlign: "center", marginTop: "30px", color: "white" }}>
        Rates are based from 1 USD
        <br />
        This application uses API from{" "}
        <a
          href="https://currencyfreaks.com"
          style={{ color: "white", textDecoration: "underline" }}
        >
          https://currencyfreaks.com
        </a>
      </p>
    </div>
  );
};

export default CurrencyTable;
