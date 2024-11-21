import React, { useEffect, useState } from "react";
import axios from "axios";

const LogList = () => {
  const [logs, setLogs] = useState([]);
  const [filters, setFilters] = useState({
    eventType: "",
    sourceAppId: "",
    start: "",
    end: "",
    page: 1,
    limit: 10,
  });
  const [totalLogs, setTotalLogs] = useState(0);


  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const query = new URLSearchParams(filters).toString();
        const response = await axios.get(`/api/logs?${query}`);
        setLogs(response.data.logs);
        setTotalLogs(response.data.total);
      } catch (error) {
        console.error("Error fetching logs:", error);
      }
    };

    fetchLogs();
  }, [filters]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

 
  const handlePageChange = (direction) => {
    setFilters((prev) => ({
      ...prev,
      page: Math.max(1, prev.page + direction),
    }));
  };

  return (
    <div className="bg-white p-4 shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-4">Event Logs</h2>

      <div className="mb-4">
        <label className="block mb-2">
          Event Type:
          <input
            type="text"
            name="eventType"
            value={filters.eventType}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </label>
        <label className="block mb-2">
          Source App ID:
          <input
            type="text"
            name="sourceAppId"
            value={filters.sourceAppId}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </label>
        <label className="block mb-2">
          Start Date:
          <input
            type="datetime-local"
            name="start"
            value={filters.start}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </label>
        <label className="block mb-2">
          End Date:
          <input
            type="datetime-local"
            name="end"
            value={filters.end}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </label>
        <label className="block mb-2">
          Logs Per Page:
          <select
            name="limit"
            value={filters.limit}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </label>
        <button
          onClick={() => setFilters((prev) => ({ ...prev, page: 1 }))}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
        >
          Apply Filters
        </button>
      </div>

      <ul>
        {logs.map((log) => (
          <li key={log._id} className="border-b py-2">
            <strong>Type:</strong> {log.eventType} <br />
            <strong>Source:</strong> {log.sourceAppId} <br />
            <strong>Time:</strong> {new Date(log.timestamp).toLocaleString()} <br />
            <strong>Data:</strong> {JSON.stringify(log.dataPayload)}
          </li>
        ))}
      </ul>

      
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => handlePageChange(-1)}
          disabled={filters.page <= 1}
          className="bg-gray-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {filters.page} of {Math.ceil(totalLogs / filters.limit)}
        </span>
        <button
          onClick={() => handlePageChange(1)}
          disabled={filters.page >= Math.ceil(totalLogs / filters.limit)}
          className="bg-gray-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default LogList;
