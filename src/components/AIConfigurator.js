import React, { useState } from 'react';
import { StorageService } from '../services/localStorage';

const AIConfigurator = () => {
  const [settings, setSettings] = useState({
    model: 'gpt-3.5-turbo',
    temperature: 0.7,
    maxTokens: 1000,
    componentDescription: '',
    styleGuide: '',
    customInstructions: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!settings.componentDescription.trim()) {
      alert('Please provide a component description');
      return;
    }

    try {
      const designSystem = {
        name: settings.componentDescription.split('\n')[0].slice(0, 30) || 'AI Component',
        description: settings.componentDescription,
        type: 'ai-component',
        settings: {
          model: settings.model,
          temperature: settings.temperature,
          maxTokens: settings.maxTokens,
          styleGuide: settings.styleGuide,
          customInstructions: settings.customInstructions
        }
      };

      StorageService.saveDesignSystem(designSystem);
      alert('AI Configuration saved successfully!');

      setSettings({
        model: 'gpt-3.5-turbo',
        temperature: 0.7,
        maxTokens: 1000,
        componentDescription: '',
        styleGuide: '',
        customInstructions: ''
      });
    } catch (error) {
      console.error('Error saving AI configuration:', error);
      alert('Error saving configuration. Please try again.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">AI Configuration</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">
            AI Model
            <select
              name="model"
              value={settings.model}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
            >
              <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
              <option value="gpt-4">GPT-4</option>
              <option value="claude-2">Claude 2</option>
            </select>
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Temperature
            <input
              type="range"
              name="temperature"
              min="0"
              max="1"
              step="0.1"
              value={settings.temperature}
              onChange={handleChange}
              className="mt-1 block w-full"
            />
            <span className="text-sm text-gray-500">{settings.temperature}</span>
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Max Tokens
            <input
              type="number"
              name="maxTokens"
              value={settings.maxTokens}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
            />
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Component Description
            <textarea
              name="componentDescription"
              value={settings.componentDescription}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
              rows="4"
              placeholder="Describe the component you want to generate..."
              required
            />
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Style Guide
            <textarea
              name="styleGuide"
              value={settings.styleGuide}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
              rows="4"
              placeholder="Enter your design system style guide requirements..."
            />
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Custom Instructions
            <textarea
              name="customInstructions"
              value={settings.customInstructions}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
              rows="4"
              placeholder="Add any custom instructions for the AI..."
            />
          </label>
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Generate Component
        </button>
      </form>
    </div>
  );
};

export default AIConfigurator;