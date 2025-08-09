import { useMemo, useState, useEffect } from 'react';
import { Container, Theme } from './settings/types';
import { ExploreStonehamApp } from './components/generated/ExploreStonehamApp';
import { StyleGuide } from './components/generated/StyleGuide';
import { HistoricalWalkingTourApp } from './components/generated/HistoricalWalkingTourApp';
import { EventsPage } from './components/events/EventsPage';
import DiningShoppingPage from './components/dining/DiningShoppingPage';
import { RecyclingCenterPage } from './components/services/RecyclingCenterPage';
import { AttractionsPage } from './components/attractions/AttractionsPage';

let theme: Theme = 'light';
let container: Container = 'none';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  // Initialize page based on current URL
  useEffect(() => {
    const path = window.location.pathname;
    console.log('Initial path:', path);
    console.log('Current page state:', currentPage);
    if (path === '/style-guide') {
      console.log('Setting page to style-guide');
      setCurrentPage('style-guide');
    } else if (path === '/historic-walking-tour') {
      console.log('Setting page to historic-walking-tour');
      setCurrentPage('historic-walking-tour');
    } else if (path.startsWith('/events')) {
      console.log('Setting page to events');
      setCurrentPage('events');
    } else if (path.startsWith('/attractions')) {
      console.log('Setting page to attractions');
      setCurrentPage('attractions');
    } else if (path.startsWith('/dining')) {
      console.log('Setting page to dining');
      setCurrentPage('dining');
    } else if (path.startsWith('/recycling-center')) {
      console.log('Setting page to recycling-center');
      setCurrentPage('recycling-center');
    } else if (path === '/' || path.startsWith('/?')) {
      console.log('Setting page to home');
      setCurrentPage('home');
    }
  }, []);

  // Debug effect to see what's happening
  useEffect(() => {
    console.log('App rendered with currentPage:', currentPage);
    console.log('Current URL path:', window.location.pathname);
  });

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
    console.log('Current page:', currentPage);
    // THIS IS WHERE THE TOP LEVEL GENRATED COMPONENT WILL BE RETURNED!
    if (currentPage === 'style-guide') {
      console.log('Rendering StyleGuide');
      return <StyleGuide />;
    } else if (currentPage === 'historic-walking-tour') {
      console.log('Rendering HistoricalWalkingTourApp');
      return <HistoricalWalkingTourApp />;
    } else if (currentPage === 'events') {
      console.log('Rendering EventsPage');
      return <EventsPage googleApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ""} />;
    } else if (currentPage === 'attractions') {
      console.log('Rendering AttractionsPage');
      return <AttractionsPage />;
    } else if (currentPage === 'dining') {
      console.log('Rendering DiningShoppingPage');
      return <DiningShoppingPage googleApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ""} />;
    } else if (currentPage === 'recycling-center') {
      console.log('Rendering RecyclingCenterPage');
      return <RecyclingCenterPage />;
    }
    console.log('Rendering ExploreStonehamApp');
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
