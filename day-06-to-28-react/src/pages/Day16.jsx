import { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  XAxis,
  YAxis,
  Bar,
  CartesianGrid,
} from "recharts";
const ExpensesTracker = () => {
  const [expenses, setexpenses] = useState(
    () => JSON.parse(localStorage.getItem("expenses")) || [],
  );
  const [description, setdescription] = useState("");
  const [amount, setamount] = useState("");
  const [category, setcategory] = useState("Food");
  const totalexpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const avgexpenses = expenses.length > 0 ? totalexpenses / expenses.length : 0;
  const categorycount = new Set(expenses.map((e) => e.category)).size;
  const categories = {
    Food: "🍔",
    Housing: "🏠",
    Transport: "🚗",
    Entertainment: "🎮",
    Health: "💊",
    Education: "📚",
    Shopping: "🛒",
    Other: "📦",
  };
  const COLORS = [
    "#3b82f6",
    "#f59e0b",
    "#10b981",
    "#ef4444",
    "#8b5cf6",
    "#f97316",
    "#06b6d4",
    "#ec4899",
  ];

  const categorytotals = expenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + e.amount;
    return acc;
  }, {});
  const piechart = Object.entries(categorytotals).map(([name, value]) => ({
    name,
    value,
  }));
  const monthlyTotals = expenses.reduce((acc, e) => {
    const month = new Date(e.date).toLocaleString("default", {
      month: "short",
    });
    acc[month] = (acc[month] || 0) + e.amount;
    return acc;
  }, {});
  const barchart = Object.entries(monthlyTotals).map(([name, value]) => ({
    name,
    value,
  }));

  const Addtransaction = () => {
    if (description === "" || amount === "" || category === "") return;
    const newtransaction = {
      id: Date.now() + Math.random(),
      description: description,
      amount: Number(amount),
      category: category,
      date: new Date().toISOString(),
    };
    const updatedtransaction = [...expenses, newtransaction];
    setexpenses(updatedtransaction);
    localStorage.setItem("expenses", JSON.stringify(updatedtransaction));
    setamount("");
    setdescription("");
    setcategory("Food");
  };
  const handledelete = (transaction) => {
    const newtransactions = expenses.filter((e) => e.id !== transaction.id);
    setexpenses(newtransactions);
    localStorage.setItem("expenses", JSON.stringify(newtransactions));
  };
  const clearall = () => {
    localStorage.removeItem("expenses");
    setexpenses([]);
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-sm w-full bg-white border border-white rounded-2xl">
        <div className="bg-blue-800 p-4  rounded-t-2xl">
          <h2 className="text-sm font-medium text-white">Total Expenses</h2>
          <p className="text-4xl font-bold mb-2 text-white">
            ${totalexpenses.toFixed(2)}
          </p>
          <div className="flex items-center gap-4 ">
            <div className="text-left p-4 bg-white/20 rounded-2xl flex-1">
              <h3 className="text-xs text-gray-200 font-semibold">
                Transactions
              </h3>
              <p className="text-2xl font-bold text-white">{expenses.length}</p>
            </div>
            <div className="text-left p-4 bg-white/20 rounded-2xl flex-1">
              <h3 className="text-xs text-gray-200 font-semibold">Average</h3>
              <p className="text-2xl font-bold text-gray-200">
                ${avgexpenses.toFixed(2)}
              </p>
            </div>
            <div className="text-left p-4 bg-white/20 rounded-2xl flex-1">
              <h3 className="text-xs text-gray-200 font-semibold">
                Categories
              </h3>
              <p className="text-2xl font-bold text-gray-200">
                {categorycount}
              </p>
            </div>
          </div>
        </div>
        <div className="p-4">
          <h2 className="text-sm font-semibold mb-2">Add Expense</h2>
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
          <div>
            <select
              className="w-full border border-gray-100 rounded-lg p-2 text-sm mb-2 bg-gray-100 cursor-pointer"
              value={category}
              onChange={(e) => setcategory(e.target.value)}
            >
              <option value="Food">🍔 Food</option>
              <option value="Housing">🏠 Housing</option>
              <option value="Transport">🚗 Transport</option>
              <option value="Entertainment">🎮 Entertainment</option>
              <option value="Health">💊 Health</option>
              <option value="Education">📚 Education</option>
              <option value="Shopping">🛒 Shopping</option>
              <option value="Other">📦 Other</option>
            </select>
          </div>
          <div className="w-full bg-blue-800 text-center cursor-pointer text-white p-2 text-xs border border-blue-800 rounded-xl mt-2  font-semibold hover:bg-blue-700">
            <button
              className="cursor-pointer hover:bg-blue-700"
              onClick={Addtransaction}
            >
              + Add Expense
            </button>
          </div>
        </div>
        {expenses.length === 0 && (
          <div className="text-center p-6 text-gray-400 text-sm">
            <p className="text-3xl mb-2">💸</p>
            <p>No transactions yet</p>
            <p className="text-xs">Add your first transaction above</p>
          </div>
        )}
        {expenses.length > 0 && (
          <div className="bg-white p-4 rounded-b-2xl">
            <div className="p-4 border-t border-gray-100">
              <h2>Spending by Category</h2>
              <div className="flex items-center gap-4">
                <PieChart
                  width={280}
                  height={250}
                  margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                >
                  <Pie
                    data={piechart}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="45%"
                    outerRadius={100}
                  >
                    {piechart.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => `$${value.toFixed(2)}`}
                    contentStyle={{
                      fontSize: "11px",
                      padding: "4px 8px",
                      borderRadius: "8px",
                    }}
                  />
                </PieChart>
                <div>
                  {piechart.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 mb-1 text-xs"
                    >
                      <div
                        style={{ backgroundColor: COLORS[index] }}
                        className="w-3 h-3 rounded-full"
                      ></div>
                      <div>{item.name}</div>
                      <div>
                        {((item.value / totalexpenses) * 100).toFixed(0)}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h2>Monthly spending</h2>
                <BarChart data={barchart} width={280} height={200}>
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Bar
                    dataKey="value"
                    fill="#1e40af"
                    barSize={40}
                    radius={[4, 4, 0, 0]}
                  />
                  <Tooltip
                    cursor={false}
                    contentStyle={{
                      fontSize: "11px",
                      padding: "4px 8px",
                      borderRadius: "8px",
                    }}
                  />
                </BarChart>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold mb-2">Recent Expenses</h2>
                <button
                  className="text-xs text-gray-400 cursor-pointer hover:text-red-500 transition duration-200 font-light"
                  onClick={clearall}
                >
                  clear all
                </button>
              </div>
              <div>
                {expenses.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="p-4 bg-gray-100 border border-gray-100 rounded-xl mb-2"
                  >
                    <div className="flex items-center justify-between">
                      {/* Left side - icon + description + date */}
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm shrink-0 ">
                          {categories[transaction.category]}
                        </div>
                        <div>
                          <p className="text-sm font-medium">
                            {transaction.description}
                          </p>
                          <p className="text-xs text-gray-400">
                            {transaction.category}
                          </p>
                        </div>
                      </div>
                      {/* Right side - amount + delete */}
                      <div className="flex items-center justify-end gap-4">
                        <div className="text-right">
                          <p className="font-bold text-sm text-red-600">
                            -${transaction.amount.toFixed(2)}
                          </p>
                          <p className="text-xs text-gray-400">
                            {new Date(transaction.date).toLocaleDateString()}
                          </p>
                        </div>
                        <button
                          className="text-xs text-gray-700 cursor-pointer bg-red-100 p-2 rounded-xl hover:text-gray-100 hover:bg-red-400 transition-all duration-200"
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
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpensesTracker;
