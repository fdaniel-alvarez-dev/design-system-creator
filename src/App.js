import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import DesignSystemsList from './components/DesignSystemsList';
import ComponentsCreator from './components/ComponentsCreator';
import AIConfigurator from './components/AIConfigurator';
import Footer from './components/Footer';

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<DesignSystemsList />} />
            <Route path="/components" element={<ComponentsCreator />} />
            <Route path="/ai-config" element={<AIConfigurator />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
