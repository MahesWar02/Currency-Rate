// src/components/CurrencyTable.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import TableRow from "./TableRow"; // Import komponen TableRow untuk setiap baris data

const CurrencyTable = () => {
  const [currencyData, setCurrencyData] = useState([]); // Menyimpan data kurs

  // Fungsi untuk mengambil data kurs dari API
  const fetchCurrencyRates = async () => {
    try {
      const response = await axios.get(
        "https://api.currencyfreaks.com/latest",
        {
          params: {
            apikey: "5b47642c38044fb189b142de20ebeba9", // API key untuk otorisasi
          },
        }
      );

      const rates = response.data.rates; // Data kurs dari API
      const currencies = ["CAD", "IDR", "JPY", "CHF", "EUR", "GBP"]; // Kurs yang ingin ditampilkan
      const formattedData = currencies.map((currency) => {
        const exchangeRate = parseFloat(rates[currency]);
        return {
          currency,
          buy: (exchangeRate * 1.05).toFixed(4), // Kurs pembelian
          exchangeRate: exchangeRate.toFixed(4), // Kurs tengah
          sell: (exchangeRate * 0.95).toFixed(4), // Kurs penjualan
        };
      });

      setCurrencyData(formattedData); // Memperbarui state dengan data yang diformat
    } catch (error) {
      console.error("Gagal mengambil data kurs:", error); // Menangani error
    }
  };

  // Mengambil data ketika komponen pertama kali dimuat
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

      {/* Informasi tambahan di bawah tabel */}
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
