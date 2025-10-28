import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DefaultLayout from "./layouts/DefaultLayout";
import HomePage from "./pages/HomePage";
import NotFoundPage from './pages/NotFoundPage';
import { LoaderProvider } from './contexts/LoaderContext';
import pages from './assets/js/pages';

// import { ResourcesProvider } from './contexts/ResourcesContext';
import GamesIndexPage from './pages/games/GamesIndexPage';
import GameShowPage from './pages/games/GameShowPage';
import CardsIndexPage from './pages/cards/CardsIndexPage';
import CardShowPage from './pages/cards/CardShowPage';
import DecksIndexPage from './pages/decks/DecksIndexPage';
import DeckShowPage from './pages/decks/DeckShowPage';

function App() {
  return (
    <>
    <LoaderProvider>
      {/* <ResourcesProvider> */}
        <BrowserRouter>
          <Routes>
            <Route element={<DefaultLayout />}>
              <Route index element={<HomePage />} />

              <Route path={'resources'}>
                <Route path={pages.GAMES()}>
                  <Route index element={<GamesIndexPage />} />
                  <Route path={pages.SHOWGAME(":id")} element={<GameShowPage />} />
                </Route>
                <Route path={pages.CARDS()}>
                  <Route index element={<CardsIndexPage />} />
                  <Route path={pages.SHOWCARD(":id")} element={<CardShowPage />} />
                </Route>
                <Route path={pages.DECKS()}>
                  <Route index element={<DecksIndexPage />} />
                  <Route path={pages.SHOWDECK(":id")} element={<DeckShowPage />} />
                </Route>
              </Route>

              <Route path='*' element={<NotFoundPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      {/* </ResourcesProvider> */}
    </LoaderProvider>
    </>
  )
}

export default App
