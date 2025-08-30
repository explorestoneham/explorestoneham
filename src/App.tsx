import { useMemo, useState, useEffect } from 'react';
import { Container, Theme } from './settings/types';
import { ExploreStonehamApp } from './components/generated/ExploreStonehamApp';
import { StyleGuide } from './components/generated/StyleGuide';
import { HistoricalWalkingTourApp } from './components/generated/HistoricalWalkingTourApp';
import { EventsPage } from './components/events/EventsPage';
import DiningShoppingPage from './components/dining/DiningShoppingPage';
import { RecyclingCenterPage } from './components/services/RecyclingCenterPage';
import { AttractionsPage } from './components/attractions/AttractionsPage';
import { AboutWebsite } from './components/pages/AboutWebsite';
import { SearchResultsPage } from './components/search/SearchResultsPage';

let theme: Theme = 'light';
let container: Container = 'none';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  // Initialize page based on current URL
  useEffect(() => {
    const path = window.location.pathname;
    if (path === '/style-guide') {
      setCurrentPage('style-guide');
    } else if (path === '/historic-walking-tour') {
      setCurrentPage('historic-walking-tour');
    } else if (path.startsWith('/events')) {
      setCurrentPage('events');
    } else if (path.startsWith('/attractions')) {
      setCurrentPage('attractions');
    } else if (path.startsWith('/dining')) {
      setCurrentPage('dining');
    } else if (path.startsWith('/recycling-center')) {
      setCurrentPage('recycling-center');
    } else if (path.startsWith('/search')) {
      setCurrentPage('search');
    } else if (path === '/about-website') {
      setCurrentPage('about-website');
    } else if (path === '/' || path.startsWith('/?')) {
      setCurrentPage('home');
    }
  }, []);


  // Handle browser back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      // Scroll to top of page when using browser back/forward
      window.scrollTo(0, 0);
      
      const path = window.location.pathname;
      if (path === '/style-guide') {
        setCurrentPage('style-guide');
      } else if (path === '/historic-walking-tour') {
        setCurrentPage('historic-walking-tour');
      } else if (path.startsWith('/events')) {
        setCurrentPage('events');
      } else if (path.startsWith('/attractions')) {
        setCurrentPage('attractions');
      } else if (path.startsWith('/dining')) {
        setCurrentPage('dining');
      } else if (path.startsWith('/recycling-center')) {
        setCurrentPage('recycling-center');
      } else if (path.startsWith('/search')) {
        setCurrentPage('search');
      } else if (path === '/about-website') {
        setCurrentPage('about-website');
      } else if (path === '/' || path.startsWith('/?')) {
        setCurrentPage('home');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  function setTheme(theme: Theme) {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  setTheme(theme);

  // Handle navigation
  const handleNavigation = (href: string) => {
    // Scroll to top of page when navigating
    window.scrollTo(0, 0);
    
    if (href === '/style-guide') {
      setCurrentPage('style-guide');
      window.history.pushState({}, '', href);
    } else if (href === '/historic-walking-tour') {
      setCurrentPage('historic-walking-tour');
      window.history.pushState({}, '', href);
    } else if (href.startsWith('/events')) {
      setCurrentPage('events');
      window.history.pushState({}, '', href);
    } else if (href.startsWith('/attractions')) {
      setCurrentPage('attractions');
      window.history.pushState({}, '', href);
    } else if (href.startsWith('/dining')) {
      setCurrentPage('dining');
      window.history.pushState({}, '', href);
    } else if (href.startsWith('/recycling-center')) {
      setCurrentPage('recycling-center');
      window.history.pushState({}, '', href);
    } else if (href.startsWith('/search')) {
      setCurrentPage('search');
      window.history.pushState({}, '', href);
    } else if (href === '/about-website') {
      setCurrentPage('about-website');
      window.history.pushState({}, '', href);
    } else if (href === '/' || href.startsWith('/?')) {
      setCurrentPage('home');
      window.history.pushState({}, '', href);
    }
  };

  // Add navigation handler to window for Header component
  if (typeof window !== 'undefined') {
    (window as any).handleNavigation = handleNavigation;
  }

  const generatedComponent = useMemo(() => {
    // THIS IS WHERE THE TOP LEVEL GENRATED COMPONENT WILL BE RETURNED!
    if (currentPage === 'style-guide') {
      return <StyleGuide />;
    } else if (currentPage === 'historic-walking-tour') {
      return <HistoricalWalkingTourApp />;
    } else if (currentPage === 'events') {
      return <EventsPage googleApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ""} />;
    } else if (currentPage === 'attractions') {
      return <AttractionsPage />;
    } else if (currentPage === 'dining') {
      return <DiningShoppingPage googleApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ""} />;
    } else if (currentPage === 'recycling-center') {
      return <RecyclingCenterPage />;
    } else if (currentPage === 'search') {
      return <SearchResultsPage googleApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ""} />;
    } else if (currentPage === 'about-website') {
      return <AboutWebsite />;
    }
    return <ExploreStonehamApp />; // %EXPORT_STATEMENT%
  }, [currentPage]);

  if (container === 'centered') {
    return (
      <div className="h-full w-full flex flex-col items-center justify-center">
        {generatedComponent}
      </div>
    );
  } else {
    return generatedComponent;
  }
}

export default App;
