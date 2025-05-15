import React, { useEffect, useState } from "react";

function RentalStatusCard() {
  const [rentalStatusData, setRentalStatusData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRentalStatus = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/payments/recent?limit=10", {
          credentials: "include",
        });
        const data = await res.json();
        setRentalStatusData(data);
      } catch (error) {
        console.error("Failed to fetch rental status:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRentalStatus();
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow col-span-1 lg:col-span-2">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">
        Rental Payment Status
      </h3>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : rentalStatusData.length === 0 ? (
        <p className="text-gray-500">No recent payments found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-blue-50">
              <tr>
                <th className="px-4 py-2 text-left font-semibold text-gray-600">Tenant</th>
                <th className="px-4 py-2 text-left font-semibold text-gray-600">Property</th>
                <th className="px-4 py-2 text-left font-semibold text-gray-600">Amount</th>
                <th className="px-4 py-2 text-left font-semibold text-gray-600">Date</th>
                <th className="px-4 py-2 text-left font-semibold text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {rentalStatusData.map((item, idx) => (
                <tr key={idx}>
                  <td className="px-4 py-2 text-gray-800">
                    {item.tenantName || item.tenantId}
                  </td>
                  <td className="px-4 py-2 text-gray-600">
                    {item.propertyName || "N/A"}
                  </td>
                  <td className="px-4 py-2 text-green-700 font-semibold">
                    PKR {Number(item.amount).toLocaleString()}
                  </td>
                  <td className="px-4 py-2 text-gray-500">
                    {new Date(item.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                  <td className="px-4 py-2">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                      Received
                    </span>
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

export default RentalStatusCard;
