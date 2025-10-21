import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DefaultLayout from "./layouts/DefaultLayout";
import HomePage from "./pages/HomePage";
import NotFoundPage from './pages/NotFoundPage';
import { LoaderProvider } from './contexts/LoaderContext';
import pages from './assets/js/pages';
import ResourcesIndexPage from './pages/resources/ResourcesIndexPage';
import ResourceShowPage from './pages/resources/ResourceShowPage';

function App() {
  return (
    <>
    <LoaderProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route index element={<HomePage />} />

            <Route path={pages.GAMES()}>
              <Route index element={<ResourcesIndexPage resourceType="games" />} />
              <Route path={pages.SHOWGAME(":id")} element={<ResourceShowPage resourceType="games" />} />
            </Route>
            <Route path={pages.CARDS()}>
              <Route index element={<ResourcesIndexPage resourceType="cards" />} />
              <Route path={pages.SHOWCARD(":id")} element={<ResourceShowPage resourceType="cards" />} />
            </Route>
            <Route path={pages.DECKS()}>
              <Route index element={<ResourcesIndexPage resourceType="decks" />} />
              <Route path={pages.SHOWDECK(":id")} element={<ResourceShowPage resourceType="decks" />} />
            </Route>

            <Route path='*' element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </LoaderProvider>
    </>
  )
}

export default App
