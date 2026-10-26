import React, { useState } from 'react';
import { ScreenType } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeScreen } from './components/HomeScreen';
import { SpellCheckScreen } from './components/SpellCheckScreen';
import { DictionaryScreen } from './components/DictionaryScreen';
import { PracticeScreen } from './components/PracticeScreen';
import { AboutScreen } from './components/AboutScreen';
import { ReferencesScreen } from './components/ReferencesScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('home');
  const [sampleTextForChecker, setSampleTextForChecker] = useState<string>('');

  const handleNavigate = (screen: ScreenType) => {
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSendTextToChecker = (text: string) => {
    setSampleTextForChecker(text);
    setCurrentScreen('checker');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-teal-100 selection:text-teal-900">
      {/* Navigation Header */}
      <Navbar currentScreen={currentScreen} onNavigate={handleNavigate} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        {currentScreen === 'home' && (
          <HomeScreen
            onNavigate={handleNavigate}
            onTrySampleText={handleSendTextToChecker}
          />
        )}

        {currentScreen === 'checker' && (
          <SpellCheckScreen
            initialText={sampleTextForChecker}
            onNavigate={handleNavigate}
          />
        )}

        {currentScreen === 'dictionary' && (
          <DictionaryScreen
            onNavigate={handleNavigate}
            onSendToChecker={handleSendTextToChecker}
          />
        )}

        {currentScreen === 'practice' && (
          <PracticeScreen onNavigate={handleNavigate} />
        )}

        {currentScreen === 'about' && (
          <AboutScreen onNavigate={handleNavigate} />
        )}

        {currentScreen === 'references' && (
          <ReferencesScreen onNavigate={handleNavigate} />
        )}
      </main>

      {/* Global Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
