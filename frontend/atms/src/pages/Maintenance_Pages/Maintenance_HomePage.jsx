import React, { useEffect, useState } from 'react';

const Maintenance_HomePage = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const dummyData = [
      { _id: '1', title: 'Fix kitchen sink', status: 'Completed' },
      { _id: '2', title: 'Repair AC unit', status: 'Ongoing' },
      { _id: '3', title: 'Replace hallway bulb', status: 'Completed' },
      { _id: '4', title: 'Paint living room', status: 'Ongoing' },
    ];
    setRequests(dummyData);
  }, []);

  const completed = requests.filter(req => req.status === 'Completed');
  const ongoing = requests.filter(req => req.status === 'Ongoing');

  return (
    <>
    <h1 className="text-3xl font-bold mb-4 ml-1">Home</h1>
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Maintenance Summary</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-green-500">
          <h3 className="text-xl font-semibold text-green-600 mb-2">Completed Requests</h3>
          {completed.length > 0 ? (
            <ul className="list-disc list-inside text-gray-700">
              {completed.map(req => (
                <li key={req._id}>{req.title}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No completed requests.</p>
          )}
          <p className="mt-2 text-sm text-gray-500">Total: {completed.length}</p>
        </div>

        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-yellow-500">
          <h3 className="text-xl font-semibold text-yellow-600 mb-2">Ongoing Requests</h3>
          {ongoing.length > 0 ? (
            <ul className="list-disc list-inside text-gray-700">
              {ongoing.map(req => (
                <li key={req._id}>{req.title}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No ongoing requests.</p>
          )}
          <p className="mt-2 text-sm text-gray-500">Total: {ongoing.length}</p>
        </div>
      </div>
    </div>
    </>
  );
};

export default Maintenance_HomePage;
