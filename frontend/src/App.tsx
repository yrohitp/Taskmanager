import React from 'react';
import Header from './components/Header';
import TaskList from './components/TaskList';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="py-6">
        <TaskList />
      </main>
    </div>
  );
};

export default App;
