import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { ArrowDownAZ, ArrowUpAZ, Plus, LogOut } from "lucide-react";

const Transaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");
  const [date, setDate] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [sortField, setSortField] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [editingId, setEditingId] = useState(null);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const fetchTransactions = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:5000/transactions", {
        params: {
          search: searchTerm,
          type: filterType,
          sort: sortField,
          order: sortOrder,
          page,
        },
        withCredentials: true,
      });
      setTransactions(res.data.data);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error(err);
    }
  }, [searchTerm, filterType, sortField, sortOrder, page]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!description.trim()) newErrors.description = "Description is required";
    if (!amount || isNaN(amount) || Number(amount) <= 0)
      newErrors.amount = "Amount must be a positive number";
    if (!date) newErrors.date = "Date is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      if (editingId) {
        await axios.put(
          `http://localhost:5000/transactions/${editingId}`,
          { description, amount, type, date },
          { withCredentials: true }
        );
        setMessage("Transaction updated!");
      } else {
        await axios.post(
          "http://localhost:5000/transactions",
          { description, amount, type, date },
          { withCredentials: true }
        );
        setMessage("Transaction added!");
      }
      setDescription("");
      setAmount("");
      setType("income");
      setDate("");
      setEditingId(null);
      setErrors({});
      fetchTransactions();
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/logout", {}, { withCredentials: true });
      window.location.href = "/login";
    } catch (err) {
      console.error(err);
    }
  };

  const toggleSort = (field) => {
    setSortField(field);
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const handleEdit = (item) => {
    setDescription(item.description);
    setAmount(item.amount);
    setType(item.type);
    setDate(item.date);
    setEditingId(item.id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/transactions/${id}`, { withCredentials: true });
      fetchTransactions();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen px-4 py-8 bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Transaction</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl flex items-center gap-2"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>

      {message && (
        <div className="mb-4 p-3 bg-green-100 text-green-800 rounded-xl shadow text-center">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <div>
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="p-2 rounded border dark:bg-gray-800 w-full"
          />
          {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
        </div>

        <div>
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="p-2 rounded border dark:bg-gray-800 w-full"
          />
          {errors.amount && <p className="text-red-500 text-sm">{errors.amount}</p>}
        </div>

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="p-2 rounded border dark:bg-gray-800"
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <div>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="p-2 rounded border dark:bg-gray-800 w-full"
          />
          {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
        </div>

        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl flex items-center justify-center gap-1">
          <Plus size={18} />
          {editingId ? "Update" : "Add"}
        </button>
      </form>

      <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
        <input
          type="text"
          placeholder="Search description..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(1);
          }}
          className="p-2 rounded border w-full md:w-1/3 dark:bg-gray-800"
        />

        <select
          value={filterType}
          onChange={(e) => {
            setFilterType(e.target.value);
            setPage(1);
          }}
          className="p-2 rounded border dark:bg-gray-800"
        >
          <option value="all">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <div className="flex items-center gap-2">
          <button onClick={() => toggleSort("amount")} className="flex items-center px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">
            Amount {sortField === "amount" && (sortOrder === "asc" ? <ArrowUpAZ size={16} /> : <ArrowDownAZ size={16} />)}
          </button>
          <button onClick={() => toggleSort("date")} className="flex items-center px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">
            Date {sortField === "date" && (sortOrder === "asc" ? <ArrowUpAZ size={16} /> : <ArrowDownAZ size={16} />)}
          </button>
        </div>
      </div>

      <div className="space-y-2">
        {transactions.map((tx) => (
          <div key={tx.id} className="p-4 border rounded-lg shadow dark:border-gray-700 flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
            <div className="flex-1">
              <p className="font-semibold">{tx.description}</p>
              <p>{tx.amount} - {tx.type} - {tx.date}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(tx)} className="text-yellow-500 hover:underline">Edit</button>
              <button onClick={() => handleDelete(tx.id)} className="text-red-500 hover:underline">Delete</button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center mt-6 gap-2">
        {Array.from({ length: totalPages }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => setPage(idx + 1)}
            className={`px-3 py-1 rounded ${page === idx + 1 ? "bg-blue-600 text-white" : "bg-gray-300 dark:bg-gray-700"}`}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Transaction;
