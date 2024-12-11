import React, { useState, useEffect } from 'react';
import { StorageService } from '../services/localStorage';

export default function DesignSystemsList() {
  const [systems, setSystems] = useState([]);
  const [newSystem, setNewSystem] = useState({ name: '', description: '' });

  useEffect(() => {
    loadSystems();
  }, []);

  const loadSystems = () => {
    setSystems(StorageService.getAllDesignSystems());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    StorageService.saveDesignSystem(newSystem);
    setNewSystem({ name: '', description: '' });
    loadSystems();
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Design Systems</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            value={newSystem.name}
            onChange={(e) => setNewSystem({ ...newSystem, name: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={newSystem.description}
            onChange={(e) => setNewSystem({ ...newSystem, description: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            rows="3"
          />
        </div>
        <button
          type="submit"
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        >
          Create New System
        </button>
      </form>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {systems.map((system) => (
          <div
            key={system.id}
            className="rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <h3 className="text-lg font-semibold text-gray-900">{system.name}</h3>
            <p className="mt-2 text-gray-600">{system.description}</p>
            <button
              onClick={() => {
                StorageService.deleteDesignSystem(system.id);
                loadSystems();
              }}
              className="mt-4 text-sm text-red-600 hover:text-red-800"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}