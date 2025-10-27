import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./components/Header";
import Balance from "./components/Balance";
import TransactionList from "./components/TransactionList";
import AddTransaction from "./components/AddTransaction";
import './App.css';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const fetchTransactions = async () => {
    const res = await axios.get("http://localhost:5000/api/transactions");
    setTransactions(res.data);
  };

  useEffect(() => { fetchTransactions(); }, []);

  // Calculate totals
  const amounts = transactions.map(t => t.amount);
  const income = amounts.filter(a => a > 0).reduce((a, b) => a + b, 0);
  const expense = amounts.filter(a => a < 0).reduce((a, b) => a + b, 0);

  // Filter transactions by type and search
  const filteredTransactions = transactions.filter(t => {
    const matchesType = filter === 'all' ? true : filter === 'income' ? t.amount > 0 : t.amount < 0;
    const matchesSearch =
      t.text.toLowerCase().includes(search.toLowerCase()) ||
      (t.amount + '').includes(search); // Remove category and date from search
    return matchesType && matchesSearch;
  });

  return (
    <div className={"container" + (darkMode ? " dark-mode" : "")}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 8 }}>
        <button
          onClick={() => setDarkMode(dm => !dm)}
          style={{
            background: darkMode ? '#222' : '#eee',
            color: darkMode ? '#fff' : '#222',
            border: '1px solid #2ecc71',
            borderRadius: 4,
            padding: '6px 16px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
      <Header />
      <Balance transactions={transactions} />
      {/* Income/Expense Summary */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
        <div style={{ color: '#2ecc71', fontWeight: 'bold' }}>
          Income<br />₹{income.toFixed(2)}
        </div>
        <div style={{ color: '#e74c3c', fontWeight: 'bold' }}>
          Expense<br />₹{Math.abs(expense).toFixed(2)}
        </div>
      </div>
      {/* Search Bar */}
      <div style={{ marginBottom: 16, display: 'flex', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Search by text, category, amount, or date..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            marginRight: 16,
            padding: '6px 12px',
            borderRadius: 4,
            border: '1px solid #ddd',
            flex: 1
          }}
        />
        <button
          style={{
            marginRight: 8,
            background: filter === 'all' ? '#2ecc71' : '#eee',
            color: filter === 'all' ? '#fff' : '#222',
            border: 'none',
            padding: '6px 16px',
            borderRadius: 4,
            cursor: 'pointer'
          }}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button
          style={{
            marginRight: 8,
            background: filter === 'income' ? '#2ecc71' : '#eee',
            color: filter === 'income' ? '#fff' : '#222',
            border: 'none',
            padding: '6px 16px',
            borderRadius: 4,
            cursor: 'pointer'
          }}
          onClick={() => setFilter('income')}
        >
          Income
        </button>
        <button
          style={{
            background: filter === 'expense' ? '#e74c3c' : '#eee',
            color: filter === 'expense' ? '#fff' : '#222',
            border: 'none',
            padding: '6px 16px',
            borderRadius: 4,
            cursor: 'pointer'
          }}
          onClick={() => setFilter('expense')}
        >
          Expense
        </button>
      </div>
      <TransactionList transactions={filteredTransactions} fetchTransactions={fetchTransactions} />
      <AddTransaction fetchTransactions={fetchTransactions} />
    </div>
  );
}

export default App;
