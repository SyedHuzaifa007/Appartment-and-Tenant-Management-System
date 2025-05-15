import React, { useEffect, useState } from "react";

function FinancesPage() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/payments/recent?hours=24", {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to fetch payments");
        const data = await res.json();
        setPayments(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-600 text-lg">Loading payment data...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-red-600 text-lg">Error loading payments: {error}</p>
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8 text-gray-800 border-b-4 border-indigo-600 pb-2 text-center" style={{color:"var(--maintext-color)"}}>
        Finances
      </h1>

      {payments.length === 0 ? (
        <p className="text-center text-gray-500 text-lg mt-10">No payments found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-md">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="py-3 px-6 text-left">Tenant Name</th>
                <th className="py-3 px-6 text-left">Amount</th>
                <th className="py-3 px-6 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment, index) => (
                <tr
                  key={payment._id}
                  className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <td className="py-4 px-6">{payment.tenantName || payment.tenantId}</td>
                  <td className="py-4 px-6">
                    <span className="inline-block bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-full">
                      PKR {payment.amount.toFixed(2)}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-600">
                    {new Date(payment.date).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default FinancesPage;
