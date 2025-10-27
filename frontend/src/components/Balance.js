const Balance = ({ transactions }) => {
    const total = transactions.reduce((acc, t) => acc + t.amount, 0).toFixed(2);
    return (
        <>
            <h4>Your Balance</h4>
            <h1 className="balance">₹{total}</h1>
        </>
    );
};
export default Balance;
