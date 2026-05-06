import { useState } from "react";

const Day12 = () => {
  const [transactions, settransaction] = useState(() => {
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : [];
  });
  const [description, setdescription] = useState("");
  const [amount, setamount] = useState("");
  const [type, settype] = useState("income");
  const totalincome = Number(
    transactions
      .filter((transaction) => transaction.type === "income")
      .reduce((sum, transaction) => sum + transaction.amount, 0),
  );
  const totalexpenses = Number(
    transactions
      .filter((transaction) => transaction.type === "expense")
      .reduce((sum, transaction) => sum + transaction.amount, 0),
  );
  const totalbalance = Number(totalincome - totalexpenses);
  const Addtransaction = () => {
    if (description === "" || amount === "" || type === "") return;
    const newtransaction = {
      id: Date.now(),
      description: description,
      amount: Number(amount),
      type: type,
      date: new Date().toLocaleDateString(),
    };
    const updatedtransaction = [...transactions, newtransaction];
    settransaction(updatedtransaction);
    localStorage.setItem("transactions", JSON.stringify(updatedtransaction));
    setamount("");
    setdescription("");
    settype("");
  };
  const handledelete = (transaction) => {
    const newtransactions = transactions.filter((t) => t.id !== transaction.id);
    settransaction(newtransactions);
    localStorage.setItem("transactions", JSON.stringify(newtransactions));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-sm w-full bg-white border border-white rounded-2xl">
        <div className="bg-blue-800 p-4  rounded-t-2xl">
          <h2 className="text-sm font-medium text-white">Total Balance</h2>
          <p
            className={`text-4xl font-bold mb-2 ${totalbalance < 0 ? "text-red-300" : "text-white"}`}
          >
            ${totalbalance.toFixed(2)}
          </p>
          <div className="flex items-center gap-4 ">
            <div className="text-left p-4 bg-white/20 rounded-2xl flex-1">
              <h3 className="text-xs text-gray-200 font-semibold">⬆️ Income</h3>
              <p className="text-2xl font-bold text-green-500">
                ${totalincome.toFixed(2)}
              </p>
            </div>
            <div className="text-left p-4 bg-white/20 rounded-2xl flex-1">
              <h3 className="text-xs text-gray-200 font-semibold">
                ⬇️ Expenses
              </h3>
              <p className="text-2xl font-bold text-red-300">
                ${totalexpenses.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
        <div className="p-4">
          <h2 className="text-sm font-semibold mb-2">Add Transaction</h2>
          <div>
            <input
              className="w-full border border-gray-100 rounded-lg p-2 text-sm mb-2 bg-gray-100"
              type="text"
              value={description}
              placeholder="Description (e.g.Salary,Rent...)"
              onChange={(e) => setdescription(e.target.value)}
            />
          </div>
          <div>
            <input
              className="w-full border border-gray-100 rounded-lg p-2 text-sm mb-2 bg-gray-100"
              type="number"
              value={amount}
              placeholder="amount"
              name="amount"
              onChange={(e) => setamount(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <button
              className={`p-2 rounded-lg text-sm text-gray-500 flex-1 cursor-pointer ${type === "income" ? "bg-green-100 border border-green-600 text-green-600" : "border-gray-100 bg-gray-100"}`}
              onClick={() => settype("income")}
            >
              ⬆️ Income
            </button>
            <button
              className={`p-2 rounded-lg text-sm text-gray-500 flex-1 cursor-pointer ${type === "expense" ? "bg-red-50 border border-red-300 text-red-300" : "border-gray-100 bg-gray-100"}`}
              onClick={() => settype("expense")}
            >
              ⬇️ Expense
            </button>
          </div>
          <div className="w-full bg-blue-800 text-center cursor-pointer text-white p-2 text-xs border border-blue-800 rounded-xl mt-2  font-semibold hover:bg-blue-700">
            <button
              className="cursor-pointer hover:bg-blue-700"
              onClick={Addtransaction}
            >
              + Add Transaction
            </button>
          </div>
        </div>
        {transactions.length === 0 && (
          <div className="text-center p-6 text-gray-400 text-sm">
            <p className="text-3xl mb-2">💸</p>
            <p>No transactions yet</p>
            <p className="text-xs">Add your first transaction above</p>
          </div>
        )}
        {transactions.length > 0 && (
          <div className="bg-gray-100 p-4 rounded-b-2xl">
            <h2 className="text-sm font-semibold mb-2">Recent Transactions</h2>
            <div>
              {transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="p-4 bg-white border border-gray-100 rounded-xl mb-2"
                >
                  <div className="flex items-center justify-between">
                    {/* Left side - icon + description + date */}
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0 ${transaction.type === "income" ? "bg-green-100" : "bg-red-100"}`}
                      >
                        {transaction.type === "income" ? "💰" : "🛒"}
                      </div>
                      <div>
                        <p className="text-sm font-medium">
                          {transaction.description}
                        </p>
                        <p className="text-xs text-gray-400">
                          {transaction.date}
                        </p>
                      </div>
                    </div>
                    {/* Right side - amount + delete */}
                    <div className="text-right">
                      <p
                        className={`font-bold text-sm ${transaction.type === "income" ? "text-green-600" : "text-red-600"}`}
                      >
                        {transaction.type === "income" ? "+" : "-"}$
                        {transaction.amount.toFixed(2)}
                      </p>
                      <button
                        className="text-xs text-gray-400 cursor-pointer hover:text-red-500 transition duration-200"
                        onClick={() => handledelete(transaction)}
                      >
                        ✕ delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Day12;
