import { useMemo, useState } from 'react';
import { Container, Theme } from './settings/types';
import { ExploreStonehamApp } from './components/generated/ExploreStonehamApp';
import { StyleGuide } from './components/generated/StyleGuide';

let theme: Theme = 'light';
let container: Container = 'none';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

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
    if (href === '/style-guide') {
      setCurrentPage('style-guide');
    } else if (href === '/') {
      setCurrentPage('home');
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
