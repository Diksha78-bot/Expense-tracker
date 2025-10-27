import { useState } from "react";
import axios from "axios";

const AddTransaction = ({ fetchTransactions }) => {
    const [text, setText] = useState("");
    const [amount, setAmount] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:5000/api/transactions", { text, amount: +amount });
        setText("");
        setAmount(0);
        fetchTransactions();
    };

    return (
        <>
            <h3>Add new transaction</h3>
            <form className="add-transaction-form" onSubmit={handleSubmit}>
                <input value={text} onChange={e => setText(e.target.value)} placeholder="Enter text..." />
                <input value={amount} onChange={e => setAmount(e.target.value)} placeholder="Enter amount..." />
                <button type="submit">Add Transaction</button>
            </form>
        </>
    );
};

export default AddTransaction;
