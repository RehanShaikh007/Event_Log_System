import React, { useState } from 'react';
import axios from 'axios';

const LogForm = () => {
  const [formData, setFormData] = useState({
    eventType: '',
    timestamp: '',
    sourceAppId: '',
    dataPayload: '{}',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...formData, dataPayload: JSON.parse(formData.dataPayload) };
      await axios.post('/api/logs', payload);
      alert('Log added successfully!');
    } catch (error) {
      alert('Error adding log');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 shadow-md rounded-md mb-6">
      <div className="mb-4">
        <label className="block font-bold mb-1">Event Type</label>
        <input
          type="text"
          className="w-full border rounded p-2"
          value={formData.eventType}
          onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
        />
      </div>
      <div className="mb-4">
        <label className="block font-bold mb-1">Timestamp</label>
        <input
          type="datetime-local"
          className="w-full border rounded p-2"
          value={formData.timestamp}
          onChange={(e) => setFormData({ ...formData, timestamp: e.target.value })}
        />
      </div>
      <div className="mb-4">
        <label className="block font-bold mb-1">Source App ID</label>
        <input
          type="text"
          className="w-full border rounded p-2"
          value={formData.sourceAppId}
          onChange={(e) => setFormData({ ...formData, sourceAppId: e.target.value })}
        />
      </div>
      <div className="mb-4">
        <label className="block font-bold mb-1">Data Payload (JSON)</label>
        <textarea
          className="w-full border rounded p-2"
          value={formData.dataPayload}
          onChange={(e) => setFormData({ ...formData, dataPayload: e.target.value })}
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add Log</button>
    </form>
  );
};

export default LogForm;
