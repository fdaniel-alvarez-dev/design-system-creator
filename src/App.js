import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import DesignSystemsList from './components/DesignSystemsList';
import ComponentsCreator from './components/ComponentsCreator';
import AIConfigurator from './components/AIConfigurator';

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<DesignSystemsList />} />
            <Route path="/components" element={<ComponentsCreator />} />
            <Route path="/ai-config" element={<AIConfigurator />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
