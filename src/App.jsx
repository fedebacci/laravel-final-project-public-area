import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DefaultLayout from "./layouts/DefaultLayout";
import HomePage from "./pages/HomePage";
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route index element={<HomePage />} />
            <Route path='*' element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
