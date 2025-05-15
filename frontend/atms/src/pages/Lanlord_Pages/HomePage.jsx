import React from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, CartesianGrid, Legend, PieChart, Pie, Cell
} from "recharts";
import { toast } from "react-toastify";
import { useEffect } from "react";


const incomeExpenseData = [
  { month: "Jan", income: 12000, expense: 8000 },
  { month: "Feb", income: 13500, expense: 7500 },
  { month: "Mar", income: 14200, expense: 9500 },
  { month: "Apr", income: 12500, expense: 8600 },
];

const expenseBreakdown = [
  { name: "Maintenance", amount: 3000 },
  { name: "Utilities", amount: 1800 },
  { name: "Repairs", amount: 2800 },
  { name: "Others", amount: 1000 },
];

const incomeByProperty = [
  { name: "Maple Apartments", value: 4500 },
  { name: "Sunset Villas", value: 3200 },
  { name: "Downtown Lofts", value: 2800 },
  { name: "Greenview Homes", value: 1900 },
];

const rentalStatusData = [
  { tenant: "Alice Johnson", property: "Maple Apartments", status: "Received" },
  { tenant: "Bob Smith", property: "Sunset Villas", status: "Due" },
  { tenant: "Carla Ruiz", property: "Downtown Lofts", status: "Received" },
  { tenant: "Daniel Kim", property: "Greenview Homes", status: "Due" },
];


const HomePage = () => {

  useEffect(() => {
  const userId = sessionStorage.getItem("userId");
  const showLoginToast = sessionStorage.getItem("showLoginToast");
  if (showLoginToast === "true") {
    toast.success("Login successful!", {
      position: "top-right",
      autoClose: 3000,
      pauseOnHover: true,
      theme: "colored",
    });
    sessionStorage.removeItem("showLoginToast");
  }

  const fetchRecentPayments = async () => {
    console.log("In fetch payments function")
    try {
      const res = await fetch("http://localhost:5000/api/payments/recent?hours=12", {
      credentials: 'include'
  });

      const payments = await res.json();

      console.log("Hit /api/payments/recent");
      res.json({ test: true }); 

      

      for (const payment of payments) {
        if (payment.landlordId === userId) {
          const tenantRes = await fetch(`/api/tenants/${payment.tenantId}`);
          const tenantData = await tenantRes.json();

          toast.info(`Rent received from ${tenantData.name}`, {
            position: "top-right",
            autoClose: 4000,
            pauseOnHover: true,
            theme: "light",
          });
        }
      }
    } catch (err) {
      console.error("Failed to fetch rent payment notifications:", err);
    }
  };

  fetchRecentPayments();
}, []);

  
  

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
     <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Landlord Dashboard</h1>
     <br />

      {/* Top Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card title="Total Properties" value="12" />
        <Card title="Active Tenants" value="38" />
        <Card title="Pending Maintenance" value="4" />
        <Card textColor="text-green-600" title="Total Income (This Month)" value="PKR 12,400" />
      </div>

      {/* Expense Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {expenseBreakdown.map((item) => (
          <Card
            key={item.name}
            title={item.name}
            value={`PKR ${item.amount.toLocaleString()}`}
            textColor="text-red-600"
          />
        ))}
      </div>

    {/* Rental Status Card */}
    <div className="bg-white p-6 rounded-xl shadow col-span-1 lg:col-span-2">
    <h3 className="text-lg font-semibold text-gray-700 mb-4">Rental Payment Status</h3>
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead className="bg-blue-50">
          <tr>
            <th className="px-4 py-2 text-left font-semibold text-gray-600">Tenant</th>
            <th className="px-4 py-2 text-left font-semibold text-gray-600">Property</th>
            <th className="px-4 py-2 text-left font-semibold text-gray-600">Status</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {rentalStatusData.map((item, idx) => (
            <tr key={idx}>
              <td className="px-4 py-2 text-gray-800">{item.tenant}</td>
              <td className="px-4 py-2 text-gray-600">{item.property}</td>
              <td className="px-4 py-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    item.status === "Received"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <br />

      {/* Maintenance Summary */}
      <div className="bg-white p-6 rounded-xl shadow">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Maintenance Requests</h3>
                <ul className="space-y-3">
                  <li className="flex justify-between text-sm">
                    <span>Plumbing - Apt 12B</span>
                    <span className="text-red-500">Pending</span>
                  </li>
                  <li className="flex justify-between text-sm">
                    <span>AC - Apt 4A</span>
                    <span className="text-green-500">Resolved</span>
                  </li>
                  <li className="flex justify-between text-sm">
                    <span>Lighting - Apt 9C</span>
                    <span className="text-yellow-500">In Progress</span>
                  </li>
                </ul>
              </div>

        <br />
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Expense Bar Chart */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Expense Breakdown</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={expenseBreakdown}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Income vs Expense Comparison */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Income vs Expense (Monthly)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={incomeExpenseData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <CartesianGrid strokeDasharray="3 3" />
              <Line type="monotone" dataKey="income" stroke="#10B981" strokeWidth={2} />
              <Line type="monotone" dataKey="expense" stroke="#EF4444" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Income by Property Pie Chart */}
        <div className="bg-white p-6 rounded-xl shadow col-span-1 lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Income by Property</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={incomeByProperty}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#3B82F6"
                label
              >
                {incomeByProperty.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={["#3B82F6", "#2563EB", "#1D4ED8", "#1E40AF"][index % 4]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

const Card = ({ title, value, textColor = "text-blue-700" }) => (
  <div className="bg-white p-4 rounded-xl shadow hover:shadow-md transition">
    <p className="text-sm text-gray-500">{title}</p>
    <h2 className={`text-2xl font-bold mt-2 ${textColor}`}>{value}</h2>
  </div>
);

export default HomePage;
