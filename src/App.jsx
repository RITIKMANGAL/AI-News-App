import React from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import NewsCards from './components/NewsCards/NewsCards';

const App = () => (
  <div>
    <Header />
    <main>
      <NewsCards />
    </main>
    <Footer />
  </div>
);

export default App;
