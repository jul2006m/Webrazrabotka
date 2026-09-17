import Header from './components/Header';
import Hero from './components/Hero';
import QuoteSection from './components/QuoteSection';
import Filters from './components/Filters';
import Catalog from './components/Catalog';
import Poll from './components/Poll';
import ReviewForm from './components/ReviewForm';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <div className="min-h-screen bg-dark-900 text-gray-200">
      <Header />
      <main>
        <Hero />
        <QuoteSection />
        <Filters />
        <Catalog />
        <Poll />
        <ReviewForm />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}

export default App;
