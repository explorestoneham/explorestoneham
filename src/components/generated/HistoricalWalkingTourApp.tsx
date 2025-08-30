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
  content: `Stoneham Square is now the heart of Stoneham, but was not its original town center, which was near Spring and Pleasant Streets. The town shifted west after the opening of the Medford-Andover Turnpike (now Route 28/Main Street) in 1806. For your first stop on the tour, notice the three major buildings that surround Central Square. They are typical examples of mid- to-late 19th century commercial architecture and were all built at a time of considerable prosperity in the local shoe industry.`,
  imageUrl: '/images/stoneham-square.jpg',
  subPages: [{
    id: 'three-buildings',
    title: 'The Three Major Buildings',
    content: `The Dow Block in the center was built by Charlestown investor Moses Dow in 1864 and once housed the post office, the library and was the headquarters for the Grand Army of the Republic, a Civil War veterans association. The Dow Block replaced the 1806 Gerry's Tavern, built when the turnpike was new and was only structure here in Central Square in a 1830 map of Stoneham before Franklin Street was even laid out. Notice the central dormer of the Odd Fellows Hall on the corner of Franklin and Central, built in 1870, with the date of purchase by the IOOF from Isaac Hersam in 1878. The Chase Block, the red brick building on Main Street, is the newest of the three, constructed in 1874 by the Chase brothers, two local grocers. Over the years it has housed small shoe manufacturing concerns, banks, shops and offices.`,
    imageUrl: '/images/stoneham-square.jpg'
  }, {
    id: 'street-railways',
    title: 'Street Railways',
    content: `From the turn of the century until the mid 1940s, street railways connected Stoneham with other area towns and to the City of Boston. The Eastern Street Railroad once ran multiple lines in Stoneham. The main branch ran from Elm Street south along Main Street towards Medford and on to Sullivan Square in Charlestown. Other branches ran along Elm, Franklin and Marble Streets and along Montvale Avenue. Bay State Street Railway Company and later the Eastern Railway ran lines through the Fells all the way to Haymarket in Boston. The Middlesex Fells was a particularly popular destination for riders from Boston who made day trips to stops along the shores of Spot Pond. The Seashore Trolley Museum in Kennebunk, Maine holds Streetcar No. 4387, a Bay State Street Railway car built in 1918 that ran on the route from Sullivan Square and Haymarket to Stoneham until the line was closed in 1946.`,
    imageUrl: '/images/street-railways.jpg'
  }, {
    id: 'police-box',
    title: 'Police Box',
    content: `You can also see the police box now in front of the Odd Fellows Hall, in its original location in the middle of the square. For over 40 years, the original Police Box stood in the center of the square and was used to regulate the traffic lights until it was destroyed in a car accident in 1983. On July 13, 2009 a ribbon cutting ceremony was held to dedicate the new Police Box replica.`,
    imageUrl: '/images/street-railways.jpg'
  }]
}, {
  id: 'franklin-fuller',
  title: 'Franklin & Fuller Streets',
  content: `Stoneham's claim to fame in the 19th century was as a shoe town. This heritage is reflected in the Town Seal, featuring a shoe, a peg hammer and a goat -- because kid (goat) leather made the finest shoes. The town grew very rapidly in the 19th century as shoemaking, long a town tradition, shifted from sole proprietors making a few pair in their spare time, to the factory system. In 1825, Stoneham only had 70 houses, The population by 1840 was just over 1000, and just under 5000 in 1875. Along with dozens of shoe factories, there were enterprises supporting the shoe industry, such as heel makers, tanneries and cardboard box manufacturers. In 1837, Stoneham produced over half a million pairs of shoes and shoemaking employed over half the town's workers. In 1890, Stoneham produced over a million pairs of shoes.`,
  imageUrl: '/images/franklin-fuller.jpg',
  subPages: [{
    id: 'jones-factory',
    title: 'Jones Factory',
    content: `Once on Franklin Street, look to your left again. The Jones Factory (pictured above) once stood where the Fuller Street parking area is today. Opened in 1890 as the last large shoe factory in Stoneham and razed in 1939, it employed almost 300 hands and could produce over a quarter of a million pairs of women's and children's shoes a year. While the factory is gone, the 1878 family home of its owner Thomas Jones is still standing on Warren Street and is listed on the National Register of Historic Places. Both were built by John Spencer, a local housewright.`,
    imageUrl: '/images/jones-factory.jpg'
  }, {
    id: 'fuller-house',
    title: 'Fuller House',
    content: `William Griffin Fuller, owner of a local leather business, built the house at 32 Franklin Street in 1850. He lived the Greek Revival/Italianate home until his death. His daughter left the house to a local civic group, who remodeled it and in 1930 opened it as a "Home for Aged People in Stoneham." In 1938, the matching addition was added on the left and the home continues to house older residents of the community even today. William G. Fulller served as both the representative to the General Court in 1840 and Vice President and Trustee of the Stoneham Five Cents Bank.`,
    imageUrl: '/images/fuller-house.jpg'
  }, {
    id: 'stoneham-branch-line',
    title: 'Stoneham Branch Line',
    content: `Continue walking south on Franklin. At Franklin & Pine sits the Franklin Street Depot, which was the end of the Stoneham Branch line of the Boston & Maine Railroad. Opened in 1843, the railroad, originally the Boston & Lowell, was a replacement for the Middlesex Canal which ferried passengers and freight from the Mystic River to Lowell's factories on the Merrimack River. The Stoneham Branch line, which opened in 1861, carried passengers until 1959. Its right-of-way is being converted into a pedestrian and bike trail.`,
    imageUrl: '/images/stoneham-branch-line.png'
  }, {
    id: 'historic-houses',
    title: 'Historic Houses on Pine Street',
    content: `As you walk further down Pine, you will see two very different homes from figures who loomed large in 19th century Stoneham. Silas Dean (b. 1815) had a long career as Town Clerk. He was also an auctioneer, historian, justice of the peace, educator, merchant and deacon of the First Congregational Church. His wife Sarah wrote poems in honor of Old People's Sunday and started the Dean Sunday School class at the church. For several years in the 1840s, Dean ran a school from this building and had an office here as Town Clerk for over 40 years. His History of Stoneham was published in 1870. The house at 8 Pine Street, built in 1840, is on the National Register of Historic Places and is one of several Greek Revival cottages scattered throughout Stoneham. The R.P. Turnbull House (6 Pine Street), dating to 1865, is a fine example of the Italianate style that was favored by Stoneham factory owners in the 19th century. Its owner, R. P. Turnbull, would have had only a short walk down the street to the William Tidd & Co. tannery and currying shop where he was a partner. The tannery was the largest in Stoneham.`,
    imageUrl: '/images/dean-house.jpg'
  }]
}, {
  id: 'old-burying-ground',
  title: 'Old Burying Ground',
  content: `In 1724, 54 men out of the approximately 250 people living in the area then known as Charlestown End petitioned to become a separate town. Part of the 1725 agreement creating the new Town of Stoneham was to make provision for a meetinghouse (church), minister, and schoolmaster. The newly-formed town bought land for the meeting house and burying ground from James Hay in 1726, who donated more land in 1758. For over 100 years, the Old Burying Ground served as the only burial place in Stoneham, and it was during this period that it received a majority of its roughly 350 interments.`,
  imageUrl: '/images/old-burying-ground.jpg',
  subPages: [{
    id: 'founding-families',
    title: 'Founding Families and Burials',
    content: `The first burial recorded was of Timothy Wright in 1728. Since Stoneham was settled by the English in 1645, there were deaths and burials within town limits before 1728, but the location of any graves is not officially recorded. Some were likely buried on their farms or in the Burying Ground in Wakefield (then Reading) as that is where they attended religious services. Many poorer inhabitants did not have stone markers and their exact grave locations are unknown, as are the burial spots of Native Americans, slaves and free blacks. The OBG holds the remains of many of the Town's founding families, and nine families account for 55% of headstones. They are Gould (45 headstones), Green (42 + a tomb), Hay (24), Richardson (19), Bucknam (15), Bryant (14), Vinton (13), Hill (11 + a family tomb) and Lynde (10). It also contains the graves of soldiers from the French & Indian War (3), the Revolutionary War (31), the War of 1812 (3) and the Civil War (2, one of whom was an army nurse).`,
    imageUrl: '/images/old-burying-ground.jpg'
  }, {
    id: 'gravestone-symbolism',
    title: 'Gravestone Symbolism',
    content: `The kinds of symbols and images used on gravestones changed over time, but there were common patterns. The earliest was the "death's head" or "winged skull" style (late 1600s through circa 1780). Carved gravestones were a compromise to the typical Puritan hostility to anything that could be considered idolatrous. However, the death's head would have been a graphic reminder of human mortality. Death's heads gave way over time to a "cherub's head" style (circa 1760 through 1810), as orthodox Puritanism softened in the 18th century. Cherubs were in turn displaced by a preference for the "urn and willow" style (circa 1770 through mid-1800s). Both remained common symbols of death and mourning into the 20th century.`,
    imageUrl: '/images/gravestone-symbolism.jpg'
  }, {
    id: 'cemetery-preservation',
    title: 'Preserving a Jewel',
    content: `Burials began to slow when the Town established the Stoneham Cemetery (across William Street) in 1844, and the Garden Movement-style Lindenwood Cemetery in 1861, which holds the graves of most civil war veterans. After the opening of the two larger sites, less than 40 interments took place at the Old Burying Ground. The last recorded (and only 20th century) burial took place in 1924. The Town of Stoneham maintains the Old Burying Ground, but that only includes small amounts of landscaping. In 2012, the Town commissioned an Historical and Engineering survey of the OBG. While the majority of markers in the cemetery are stable, 102 markers (65 headstones and 37 footstones) require conservation treatments because they are broken and in disrepair. The primary consideration, however, is safety, and 40 of the stones are considered structurally unsound or hazardous and in need of priority restoration.`,
    imageUrl: '/images/cemetery-preservation.png'
  }]
}, {
  id: 'willam-central',
  title: 'William & Central Streets',
  content: `William, Pomeworth and Central Streets host churches, schools and several very fine houses. This area showcases the architectural evolution from colonial times through the 19th century, including Renaissance Revival buildings and beautiful examples of Italianate villas.`,
  imageUrl: '/images/william-central-hero.jpg',
  subPages: [{
    id: 'central-school',
    title: 'Central School',
    content: `Located at 25 William Street, this Renaissance Revival brick building was constructed in 1901 and served as the high school until 1926. At that time a new addition was built on the right side for use as a junior high as well. Later, it became an elementary school and today, the building is rented to the SEEM Collaborative, a ten-town collaborative school serving children and youths with unique needs.`,
    imageUrl: '/images/central-school.jpg'
  }, {
    id: 'ten-footer',
    title: '10 Footer',
    content: `Located behind the Stoneham Historical Society at 36 William Street, Peter Doucett's Second Shoe Shop hearkens back to a time when the shoemaking industry in Stoneham was a specialized artisan craft. Buildings such as this came to be called Ten-Footers due to their size, and were used by cordwainers (shoemakers) to make and repair shoes. The building was moved from its original location on Pine Street in 1967, and placed on the National Register of Historic Places in 1984.`,
    imageUrl: '/images/ten-footer.png'
  }, {
    id: 'st-patricks',
    title: `St. Patrick's Parish`,
    content: `The cornerstone for the Gothic Stick-style St. Patrick Church was laid in 1887 and completed the next year for a cost of $38,000. In 1868, when the parish was established, it included not only Stoneham, but also Wakefield, Melrose, Reading and Lynnfield. The original St. Patrick's school was built in 1910 and features beautiful ornate brickwork along its Pomeworth Street face. The Rectory was built in 1903.`,
    imageUrl: '/images/st-patricks.png'
  }, {
    id: 'central-street-houses',
    title: 'Historic Houses on Central Street',
    content: `Central Street features several notable historic residences. The Old Town House (52 Central Street) was built in 1826 as the Town House (Town Hall) and moved by oxen in 1833. The Foster House (57 Central Street), built in 1870, showcases Italianate and Greek Revival features. The Farrier House (55 Central Street) is an excellent example of an Italianate villa, designed by Amasa Farrier, the town's first principal surveyor who designed Lindenwood Cemetery.`,
    imageUrl: '/images/old-town-house.jpg'
  }]
}, {
  id: 'church-square',
  title: 'Church Square',
  content: `At one time, four churches were located at the intersection of Central and Common Streets. In the 1900's local residents congregated on Sunday afternoons in this area to socialize at community functions.`,
  imageUrl: '/images/church-square.jpg',
  subPages: [{
    id: 'first-congregational',
    title: 'First Congregational Church',
    content: `After 1826 the town was not responsible for the financial support of the second Meeting House / church that was located at Pleasant Street. A parish was organized and the Congregational Church became independent of the town. That second church building burned in January of 1840. Like the Town House that had been moved seven years before, the goal was to build a new church closer to the Medford-Andover Turnpike and the new town center. The cost to build this church was just under $6,500. When the Congregational Church was built, it brought a flurry of activity with other churches becoming organized and erecting buildings nearby.`,
    imageUrl: '/images/first-congregational.png'
  }, {
    id: 'first-universalist',
    title: 'First Universalist Church',
    content: `The First Universalist Church was built in 1840 and looked much like the Congregational Church. That building was replaced by the current structure in 1870 that is now home to Stoneham TV. It previously had a very beautiful steeple that had to be taken down in the 1980s due to damage.`,
    imageUrl: '/images/first-universalist.png'
  }, {
    id: 'st-james-methodist',
    title: 'St. James Methodist Church',
    content: `The original Methodist Church burned in 1909 and was replaced by the building you see today. Its predecessor, built in 1856, was on Common Street and faced the Congregational Church, and also featured a lovely steeple.`,
    imageUrl: '/images/st-james-methodist.jpg'
  }, {
    id: 'baptist-chapel',
    title: 'Baptist Chapel',
    content: `The last church in "Church Square" was the former Baptist Chapel, built and dedicated in 1871 on Common Street. The building is now the property of the American Legion Hall. In 1892, the new First Baptist Church was dedicated at the corner of Main and Hancock Streets.`
  }]
}, {
  id: 'town-hall-fire-station',
  title: 'Town Hall & Fire Station',
  content: `The Common and Town Government area showcases Stoneham's civic buildings and memorials that represent the town's commitment to public service, community safety, and honoring those who served.`,
  imageUrl: '/images/town-hall-fire-station.jpg',
  subPages: [{
    id: 'spanish-war-memorial',
    title: 'Spanish War Memorial',
    content: `This bronze by sculptor Joseph P. Pollia was dedicated in May 1928 and commemorates the service of "hikers," as soldiers in the Spanish-American War were known.`,
    imageUrl: '/images/spanish-war-memorial.jpg'
  }, {
    id: 'dean-center-schools',
    title: 'Dean and Center Schools',
    content: `The Dean and Center Schools once stood on the area now occupied by Police Station. The Dean School, on the left, was built in 1871 as a high school and was later renamed to honor Silas Dean, 19th century Town Clerk and author of a book on Stoneham history. The Center School, which housed younger students, was built as a town hall in 1847.`,
    imageUrl: '/images/dean-center-schools.png'
  }, {
    id: 'town-hall',
    title: 'Town Hall',
    content: `Stoneham's Third Town Hall was built in 1939 with funds from the federal government's Public Works Administration, the estate of local philanthropist Samuel H. Webber and the local taxpayers. Stoneham boasts the only Town Meeting in the country opened by a concert on a Mighty Wurlitzer, a theater pipe organ purchased in 1941 by local businessman Ralph Patch from New York radio station WNAC. It is listed as # 55 on the National Registry of Historic and Significant Instruments.`,
    imageUrl: '/images/town-hall-building.jpg'
  }, {
    id: 'fire-station',
    title: 'Fire Station',
    content: `Located at 25 Central Street, the Stoneham Fire Station was completed in 1917 at a cost of $50,000 and was the first municipal building for both the Fire and Police Departments. The handsome Renaissance Revival building originally had 10 jail cells (8 for men, 2 for women), 3 slide poles for the firefighters, and a horse stable with 4 stalls which were used until 1923 when all the vehicles were motorized. In 2016, the Town of Stoneham celebrated the centennial of the Fire Station. Parades and a celebration on the Town Common were just part of the fun.`,
    imageUrl: '/images/fire-station.jpg'
  }]
}, {
  id: 'along-main',
  title: 'Along Main Street',
  content: `To round out our tour of historic downtown Stoneham, we continue along Main Street. Our tour concludes along historic Main Street (Route 28), the former Medford-Andover Turnpike built in 1806 that transformed Stoneham's development. Here you can see examples of Federal, Victorian, and Colonial Revival architecture that tell the story of Stoneham's evolution from a farming community to a modern suburb connected to Boston.`,
  imageUrl: '/api/placeholder/600/400',
  subPages: [{
    id: 'underground-railroad',
    title: 'Underground Railroad Site',
    content: `Abijah Bryant, (1801-1851) Deacon of the First Congregational Church, and his wife Lavinia operated their three-story colonial house as a stop on the Underground Railroad for slaves fleeing the south for Canada. Concealing escaped slaves was illegal in the years before the Civil War and the home's dual purpose was kept very secret. The house was located on the site of building housing the Book Oasis and Hong Kong City. Members of the First Church also created a public anti-slavery society in 1839.`,
    imageUrl: '/images/underground-railroad.jpg'
  }, {
    id: 'post-office-gerry-estate',
    title: 'Post Office and Arad Gerry Estate',
    content: `Before the present Post Office was built in 1941, this was the location of the Arad Gerry estate, which was built in 1867 and torn down in 1941. Other parts of the estate had already been sold off for buildings such as the Stoneham Savings Bank, built in 1927. Inside the post office lies a terracotta relief by William Zorach, "Shoemakers of Stoneham" (1942), funded by a New Deal program to create art for public buildings. Zorach's art is also on display in the MFA Boston, the Met, and the National Gallery.`,
    imageUrl: '/images/arad-gerry-estate.jpg'
  }, {
    id: 'stoneham-theatre',
    title: 'Stoneham Theatre',
    content: `Stoneham Theatre opened November 2, 1917, as the third theater in Stoneham, despite its population of only 7500. The theater flourished for many years with both live performances and film, adding sound in May 1929, but suffered from declining attendance in the 1950s and 60s. After being abandoned for over 20 years, it reopened in 2000 to showcase live theatre, rather than movies.`,
    imageUrl: '/images/stoneham-theatre.jpg'
  }, {
    id: 'stoneham-library',
    title: 'Stoneham Library',
    content: `In 1859, the citizens of Stoneham voted to spend $300 to establish a free public library. At first, the library was housed at various locations around town and several existing private libraries donated their volumes. In 1867, its 2,575 volumes were moved to the Dow Block. The current library building at 431 Main Street was built in 1904 with a $15,000 donation from the Andrew Carnegie Foundation, In 1931, a children's room and the cupola were added with a donation from Annie Hamilton Brown, the heir to the Tidd Tannery fortune. The newest wing opened in 1984.`,
    imageUrl: '/images/stoneham-library.jpg'
  }]
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