import React, { useState } from 'react';
import { StorageService } from '../services/localStorage';

const ComponentsCreator = () => {
  const [componentName, setComponentName] = useState('');
  const [componentType, setComponentType] = useState('functional');
  const [properties, setProperties] = useState([]);

  const addProperty = () => {
    setProperties([...properties, { name: '', type: 'string', required: false }]);
  };

  const removeProperty = (index) => {
    setProperties(properties.filter((_, i) => i !== index));
  };

  const updateProperty = (index, field, value) => {
    const updatedProperties = [...properties];
    updatedProperties[index] = { ...updatedProperties[index], [field]: value };
    setProperties(updatedProperties);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!componentName.trim()) {
      alert('Please enter a component name');
      return;
    }

    if (properties.some(prop => !prop.name.trim())) {
      alert('All properties must have a name');
      return;
    }

    try {
      const newComponent = {
        name: componentName,
        description: `${componentType} component with ${properties.length} properties`,
        type: 'component',
        componentType: componentType,
        properties: properties.map(prop => ({
          name: prop.name,
          type: prop.type,
          required: prop.required
        }))
      };

      StorageService.saveDesignSystem(newComponent);
      alert('Component created successfully!');

      setComponentName('');
      setComponentType('functional');
      setProperties([]);
    } catch (error) {
      console.error('Error saving component:', error);
      alert('Error saving component. Please try again.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Create New Component</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">
            Component Name
            <input
              type="text"
              value={componentName}
              onChange={(e) => setComponentName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
              required
            />
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Component Type
            <select
              value={componentType}
              onChange={(e) => setComponentType(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
            >
              <option value="functional">Functional Component</option>
              <option value="class">Class Component</option>
            </select>
          </label>
        </div>

        <div>
          <h2 className="text-lg font-medium mb-4">Properties</h2>
          {properties.map((prop, index) => (
            <div key={index} className="flex gap-4 mb-4">
              <input
                type="text"
                value={prop.name}
                onChange={(e) => updateProperty(index, 'name', e.target.value)}
                placeholder="Property name"
                className="flex-1 rounded-md border-gray-300 shadow-sm p-2"
              />
              <select
                value={prop.type}
                onChange={(e) => updateProperty(index, 'type', e.target.value)}
                className="flex-1 rounded-md border-gray-300 shadow-sm p-2"
              >
                <option value="string">String</option>
                <option value="number">Number</option>
                <option value="boolean">Boolean</option>
                <option value="object">Object</option>
                <option value="array">Array</option>
              </select>
              <button
                type="button"
                onClick={() => removeProperty(index)}
                className="px-4 py-2 bg-red-500 text-white rounded-md"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addProperty}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Add Property
          </button>
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-green-500 text-white rounded-md"
        >
          Create Component
        </button>
      </form>
    </div>
  );
};

export default ComponentsCreator;