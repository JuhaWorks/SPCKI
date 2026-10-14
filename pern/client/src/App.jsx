import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Login from './features/auth/Login.jsx';
import Dashboard from './features/dashboard/Dashboard.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Layout from './components/Layout.jsx';
import Reports from './features/reports/Reports.jsx';
import CookingSessionForm from './features/sessions/CookingSessionForm.jsx';
import DailyTechnicalForm from './features/dailyLogs/DailyTechnicalForm.jsx';
import GeneratorLogForm from './features/generatorLogs/GeneratorLogForm.jsx';
import FeedbackForm from './features/feedback/FeedbackForm.jsx';
import MyEntries from './features/sessions/MyEntries.jsx';
import Settings from './features/settings/Settings.jsx';
import HouseholdForm from './features/households/HouseholdForm.jsx';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          {/* Protected Routes */}
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="reports" element={<Reports />} />
            <Route path="log-session" element={<CookingSessionForm />} />
            <Route path="log-technical" element={<DailyTechnicalForm />} />
            <Route path="log-generator" element={<GeneratorLogForm />} />
            <Route path="log-feedback" element={<FeedbackForm />} />
            <Route path="my-entries" element={<MyEntries />} />
            <Route path="enroll-household" element={<HouseholdForm />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
