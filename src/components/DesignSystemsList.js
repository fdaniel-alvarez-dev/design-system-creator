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

  const renderProperties = (properties) => {
    return properties.map((prop, index) => (
      <div key={index} className="mb-2 pl-2 border-l-2 border-gray-200">
        <p><strong>{prop.name}</strong> ({prop.type})</p>
      </div>
    ));
  };

  const renderSystemContent = (system) => {
    if (system.type === 'ai-component') {
      return (
        <div className="text-sm space-y-2">
          <p><strong>Model:</strong> {system.settings.model}</p>
          <p><strong>Temperature:</strong> {system.settings.temperature}</p>
          <p><strong>Max Tokens:</strong> {system.settings.maxTokens}</p>
          {system.settings.styleGuide && (
            <div className="border-t border-gray-100 pt-2 mt-2">
              <p><strong>Style Guide:</strong></p>
              <p className="pl-2 text-gray-600">{system.settings.styleGuide}</p>
            </div>
          )}
          {system.settings.customInstructions && (
            <div className="border-t border-gray-100 pt-2 mt-2">
              <p><strong>Custom Instructions:</strong></p>
              <p className="pl-2 text-gray-600">{system.settings.customInstructions}</p>
            </div>
          )}
        </div>
      );
    } else if (system.type === 'component') {
      return (
        <div className="text-sm space-y-2">
          <p><strong>Type:</strong> {system.componentType}</p>
          <div className="border-t border-gray-100 pt-2 mt-2">
            <p className="font-medium mb-2">Properties:</p>
            <div className="space-y-2">
              {renderProperties(system.properties)}
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="text-sm space-y-2">
        <p className="text-gray-600">{system.description}</p>
      </div>
    );
  };

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-bold text-gray-900">Design Systems</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            value={newSystem.name}
            onChange={(e) => setNewSystem({ ...newSystem, name: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={newSystem.description}
            onChange={(e) => setNewSystem({ ...newSystem, description: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
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

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {systems.map((system) => (
          <div
            key={system.id}
            className="flex flex-col h-[250px] rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow bg-white"
          >
            <div className="flex-grow">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{system.name}</h3>
              <div className="overflow-y-auto h-[150px] pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                {renderSystemContent(system)}
              </div>
            </div>
            <div className="flex justify-end mt-4 pt-2 border-t border-gray-100">
              <button
                onClick={() => {
                  StorageService.deleteDesignSystem(system.id);
                  loadSystems();
                }}
                className="text-sm text-red-600 hover:text-red-800"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}