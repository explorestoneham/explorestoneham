import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from './Header';
import { Footer } from './Footer';
import { TourIntroPage } from './TourIntroPage';
import { TourStopPage } from './TourStopPage';
import { TourSubPage } from './TourSubPage';

export interface TourStop {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  subPages?: SubPage[];
}

export interface SubPage {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
}

const tourStops: TourStop[] = [{
  id: 'stoneham-square',
  title: 'Stoneham Square',
  content: 'Stoneham Square is now the heart of Stoneham, but was not its original town center, which was near Spring and Pleasant Streets. The town shifted west after the opening of the Medford-Andover Turnpike (now Route 28/Main Street) in 1806. The Dow Block in the center was built by Charlestown investor Moses Dow in 1864, once housed the post office, library and Grand Army of the Republic headquarters. The Odd Fellows Hall on the corner of Franklin and Central was built in 1870, and The Chase Block (red brick building on Main Street) was constructed in 1874 by the Chase brothers, two local grocers.',
  imageUrl: 'uploads/6/3/3/7/63378583/3272810.jpg',
  subPages: [{
    id: 'street-railways',
    title: 'Street Railways',
    content: 'The police box now in front of the Odd Fellows Hall was originally in the middle of the square and used to regulate traffic lights until destroyed in a car accident in 1983. A replica was dedicated in 2009. Street railways and trolleys connected Stoneham to the broader Boston area, bringing commerce and residents to the growing town center.',
    imageUrl: 'uploads/6/3/3/7/63378583/7745743_orig.jpg'
  }]
}, {
  id: 'franklin-fuller',
  title: 'Franklin & Fuller Streets',
  content: 'Stoneham\'s claim to fame in the 19th century was as a shoe town, reflected in the Town Seal featuring a shoe, peg hammer and goat (kid leather made the finest shoes). The population grew rapidly from 70 houses in 1825 to over 1000 people by 1840, reaching just under 5000 in 1875. In 1837, the town produced over half a million pairs of shoes; by 1890, over a million pairs. Shoemaking employed over half the town\'s workers.',
  imageUrl: 'uploads/6/3/3/7/63378583/4155534.jpg',
  subPages: [{
    id: 'jones-factory',
    title: 'Jones Factory',
    content: 'The Jones Factory once stood where Fuller Street parking area is today. Opened in 1890 as the last large shoe factory, it employed almost 300 hands and could produce over 250,000 pairs of women\'s and children\'s shoes per year. The factory was razed in 1939, marking the end of Stoneham\'s shoe manufacturing era.',
    imageUrl: 'uploads/6/3/3/7/63378583/9357515.jpg'
  }, {
    id: 'stoneham-branch-line',
    title: 'Stoneham Branch Line',
    content: 'At Franklin & Pine sits the Franklin Street Depot, end of the Stoneham Branch line of the Boston & Maine Railroad. Opened in 1843, it carried passengers until 1959. This vital transportation link transformed Stoneham from a rural farming community into a thriving suburban town connected to Boston.',
    imageUrl: 'uploads/6/3/3/7/63378583/203865_orig.png'
  }, {
    id: 'historic-houses',
    title: 'Historic Houses on Pine Street',
    content: 'Notable houses include the Silas Dean House (8 Pine Street) built in 1840 - a Greek Revival cottage where the Town Clerk for over 40 years lived and wrote "History of Stoneham" in 1870. The R.P. Turnbull House (6 Pine Street) dates to 1865 in Italianate style, owned by a partner in William Tidd & Co. tannery, the largest in Stoneham.',
    imageUrl: 'uploads/6/3/3/7/63378583/dean-thumbnail.jpg'
  }]
}, {
  id: 'old-burying-ground',
  title: 'Old Burying Ground',
  content: 'The Old Burying Ground, established in 1726, is the last remnant of Stoneham\'s original town center. In 1724, 54 men petitioned to become a separate town, and part of the 1725 agreement creating Stoneham included provision for a meetinghouse, minister, and schoolmaster. The first recorded burial was Timothy Wright in 1728. Roughly 350 total interments occurred over 100+ years, with nine families accounting for 55% of headstones. The cemetery contains graves of soldiers from the French & Indian War, Revolutionary War, War of 1812, and Civil War.',
  imageUrl: 'uploads/6/3/3/7/63378583/8013229.jpg',
  subPages: [{
    id: 'gravestone-symbolism',
    title: 'Gravestone Symbolism',
    content: 'The gravestones show the evolution of colonial death symbolism: Death\'s head/winged skull (late 1600s-1780) served as Puritan reminders of mortality, Cherub\'s head symbols (1760-1810) appeared as orthodox Puritanism softened, and Urn and willow motifs (1770-mid 1800s) became symbols of death and mourning.',
    imageUrl: 'uploads/6/3/3/7/63378583/deathhead-gravestone_orig.jpg'
  }]
}, {
  id: 'willam-central',
  title: 'William & Central Streets',
  content: 'This area represents the transition between Stoneham\'s colonial origins and its 19th-century growth. Central Street became a key thoroughfare connecting the old town center to the new commercial district around Stoneham Square.',
  imageUrl: '/api/placeholder/600/400'
}, {
  id: 'church-square',
  title: 'Church Square',
  content: 'Church Square has been home to Stoneham\'s religious institutions for generations. The area showcases beautiful examples of 19th-century church architecture and has served as a spiritual center for the community throughout its history.',
  imageUrl: '/api/placeholder/600/400'
}, {
  id: 'town-hall-fire-station',
  title: 'Town Hall & Fire Station',
  content: 'Stoneham\'s civic buildings represent the town\'s commitment to public service and community safety. The Town Hall, built in 1939, replaced earlier structures and serves as the center of local government. The Central Fire Station, built 1916-1917, has protected the community for over a century.',
  imageUrl: 'uploads/6/3/3/7/63378583/392562.jpg'
}, {
  id: 'along-main',
  title: 'Along Main Street',
  content: 'Our tour concludes along historic Main Street (Route 28), the former Medford-Andover Turnpike built in 1806 that transformed Stoneham\'s development. Here you can see examples of Federal, Victorian, and Colonial Revival architecture. Many of these buildings date back to the 1800s and tell the story of Stoneham\'s evolution from a farming community to a modern suburb connected to Boston.',
  imageUrl: '/api/placeholder/600/400'
}];

type ViewState = {
  type: 'intro';
} | {
  type: 'stop';
  stopIndex: number;
} | {
  type: 'subpage';
  stopIndex: number;
  subPageId: string;
};

export function HistoricalWalkingTourApp() {
  const [viewState, setViewState] = useState<ViewState>({
    type: 'intro'
  });

  const handleStartTour = () => {
    window.scrollTo(0, 0);
    setViewState({
      type: 'stop',
      stopIndex: 0
    });
  };

  const handleNextStop = () => {
    if (viewState.type === 'stop' && viewState.stopIndex < tourStops.length - 1) {
      window.scrollTo(0, 0);
      setViewState({
        type: 'stop',
        stopIndex: viewState.stopIndex + 1
      });
    }
  };

  const handlePreviousStop = () => {
    if (viewState.type === 'stop' && viewState.stopIndex > 0) {
      window.scrollTo(0, 0);
      setViewState({
        type: 'stop',
        stopIndex: viewState.stopIndex - 1
      });
    }
  };

  const handleViewSubPage = (subPageId: string) => {
    if (viewState.type === 'stop') {
      window.scrollTo(0, 0);
      setViewState({
        type: 'subpage',
        stopIndex: viewState.stopIndex,
        subPageId
      });
    }
  };

  const handleBackToStop = () => {
    if (viewState.type === 'subpage') {
      window.scrollTo(0, 0);
      setViewState({
        type: 'stop',
        stopIndex: viewState.stopIndex
      });
    }
  };

  const handleRestartTour = () => {
    window.scrollTo(0, 0);
    setViewState({
      type: 'intro'
    });
  };

  const pageVariants = {
    initial: {
      opacity: 0,
      x: 20
    },
    in: {
      opacity: 1,
      x: 0
    },
    out: {
      opacity: 0,
      x: -20
    }
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.4
  };

  return (
    <div className="min-h-screen bg-[#F7F7F7] text-[#404040]">
      <Header />
      <main>
        <AnimatePresence mode="wait">
          {viewState.type === 'intro' && (
            <motion.div 
              key="intro" 
              initial="initial" 
              animate="in" 
              exit="out" 
              variants={pageVariants} 
              transition={pageTransition}
            >
              <TourIntroPage onStartTour={handleStartTour} />
            </motion.div>
          )}

          {viewState.type === 'stop' && (
            <motion.div 
              key={`stop-${viewState.stopIndex}`} 
              initial="initial" 
              animate="in" 
              exit="out" 
              variants={pageVariants} 
              transition={pageTransition}
            >
              <TourStopPage 
                stop={tourStops[viewState.stopIndex]} 
                currentIndex={viewState.stopIndex} 
                totalStops={tourStops.length} 
                onNext={handleNextStop} 
                onPrevious={handlePreviousStop} 
                onViewSubPage={handleViewSubPage} 
                onRestartTour={handleRestartTour} 
                isLastStop={viewState.stopIndex === tourStops.length - 1} 
              />
            </motion.div>
          )}

          {viewState.type === 'subpage' && (
            <motion.div 
              key={`subpage-${viewState.subPageId}`} 
              initial="initial" 
              animate="in" 
              exit="out" 
              variants={pageVariants} 
              transition={pageTransition}
            >
              <TourSubPage 
                subPage={tourStops[viewState.stopIndex].subPages?.find(sp => sp.id === viewState.subPageId)!} 
                parentStopTitle={tourStops[viewState.stopIndex].title} 
                onBackToStop={handleBackToStop} 
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}