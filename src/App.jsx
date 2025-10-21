import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DefaultLayout from "./layouts/DefaultLayout";
import HomePage from "./pages/HomePage";
import NotFoundPage from './pages/NotFoundPage';
import { LoaderProvider } from './contexts/LoaderContext';

function App() {
  return (
    <>
    <LoaderProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route index element={<HomePage />} />
            <Route path='*' element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </LoaderProvider>
    </>
  )
}

export default App
