
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Login from './screens/Login';
import Dashboard from './screens/Dashboard';
import Profile from './screens/Profile';
import Planning from './screens/Planning';
import Stats from './screens/Stats';
import Notifications from './screens/Notifications';
import NewSession from './screens/NewSession';
import ActiveSession from './screens/ActiveSession';
import Goals from './screens/Goals';
import WorkoutLibrary from './screens/WorkoutLibrary';
import Layout from './components/Layout';
import { AppProvider } from './context/AppContext';

const AppContent = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/new-session" element={<NewSession />} />
      <Route path="/active-session/:sessionId" element={<ActiveSession />} />
      <Route path="/active-session" element={<ActiveSession />} />
      <Route path="/*" element={
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/planning" element={<Planning />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/goals" element={<Goals />} />
            <Route path="/workouts" element={<WorkoutLibrary />} />
          </Routes>
        </Layout>
      } />
    </Routes>
  );
};

export default function App() {
  return (
    <AppProvider>
      <HashRouter>
        <AppContent />
      </HashRouter>
    </AppProvider>
  );
}
