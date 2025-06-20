import React from 'react';
import Header from './components/Header';
import './index.css';

function App() {
  return (
    <div className="font-sans text-[#20303C] h-full w-full">
      <Header />
      <main className="px-6 md:px-20 mt-16">
        <section className="flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="max-w-2xl">
            <p className="text-sm text-gray-500 tracking-widest mb-2">MULTILINGUAL PAPERBACKS & AUDIOBOOKS</p>
            <h1 className="text-4xl md:text-5xl font-semibold mb-4">Explore, Read, Listen, and Print</h1>
            <p className="text-lg text-gray-600">Explore 1,000+ titles tailored for every learner. Access content digitally or order printed paperbacks in 30+ languages and multiple reading levels.</p>
          </div>
          <div>
            <img src="/hero-book-headphone.png" alt="Book and Headphone" className="w-full max-w-md" />
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;