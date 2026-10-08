import { useState } from 'react';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { FanFicsProvider } from './contexts/FanFicsContext';
import { FanFic } from './contexts/FanFicsContext';
import Header from './components/Header';
import Hero from './components/Hero';
import QuoteSection from './components/QuoteSection';
import Filters from './components/Filters';
import Catalog from './components/Catalog';
import FanficReader from './components/FanficReader';
import AddFanficForm from './components/AddFanficForm';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

function AppContent() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [currentView, setCurrentView] = useState<'home' | 'reader'>('home');
  const [selectedFic, setSelectedFic] = useState<FanFic | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleRead = (fic: FanFic) => {
    setSelectedFic(fic);
    setCurrentView('reader');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setCurrentView('home');
    setSelectedFic(null);
  };

  if (currentView === 'reader' && selectedFic) {
    return <FanficReader fic={selectedFic} onBack={handleBack} />;
  }

  return (
    <div className={`min-h-screen ${isDark ? 'bg-dark-900 text-gray-200' : 'bg-gray-50 text-gray-900'}`}>
      <Header onAddFanfic={() => setShowAddForm(true)} />
      <main>
        <Hero />
        <QuoteSection />
        <Filters />
        <Catalog onRead={handleRead} />
      </main>
      <Footer />
      <ScrollToTop />
      {showAddForm && <AddFanficForm onClose={() => setShowAddForm(false)} />}
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <FanFicsProvider>
        <AppContent />
      </FanFicsProvider>
    </ThemeProvider>
  );
}

export default App;
