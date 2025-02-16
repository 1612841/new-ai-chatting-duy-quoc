import { AuthWrapper, Home, Login, Navigation } from '@pages';
import './tailwind-global.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Suspense } from 'react';
import { ToastContainer } from 'react-toastify';
import { WebsocketProvider } from 'hooks';

export function App() {
  return (
    <Suspense
      fallback={
        <div className="h-screen flex justify-center items-center">
          <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
        </div>
      }
    >
      <WebsocketProvider>
        <ToastContainer />
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={<AuthWrapper component={<Login />} isLoginPage />}
            />
            <Route
              path="/home"
              element={<AuthWrapper component={<Home />} />}
            />
            <Route path="*" element={<Navigation />} />
          </Routes>
        </BrowserRouter>
      </WebsocketProvider>
    </Suspense>
  );
}

export default App;
