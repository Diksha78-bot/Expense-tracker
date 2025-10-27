import axios from "axios";

const TransactionList = ({ transactions, fetchTransactions }) => {
    const deleteTransaction = async (id) => {
        await axios.delete(`http://localhost:5000/api/transactions/${id}`);
        fetchTransactions();
    };

    return (
        <>
            <h3>History</h3>
            <ul className="history-list">
                {transactions.map(t => (
                    <li key={t._id} className={t.amount >= 0 ? "income" : "expense"} style={{ display: 'flex', alignItems: 'center' }}>
                        <span style={{ flex: 1 }}>{t.text}</span>
                        <span style={{ flex: '0 0 100px', textAlign: 'center', fontWeight: 500 }}>{t.amount}</span>
                        <button style={{ marginLeft: 12 }} onClick={() => deleteTransaction(t._id)}>x</button>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default TransactionList;
