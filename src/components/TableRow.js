// src/components/TableRow.js
import React from "react";

const TableRow = ({ data }) => {
  const { currency, buy, exchangeRate, sell } = data;

  const styles = {
    cell: {
      color: "white",
      padding: "10px",
      textAlign: "center",
    },
  };

  return (
    <tr style={styles.row}>
      <td style={styles.cell}>{currency}</td>
      <td style={styles.cell}>{buy}</td>
      <td style={styles.cell}>{exchangeRate}</td>
      <td style={styles.cell}>{sell}</td>
    </tr>
  );
};

export default TableRow;
