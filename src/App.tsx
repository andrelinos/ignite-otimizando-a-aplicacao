import { lazy, Suspense } from 'react';
import { Loading } from './components/Loading';

import { SideBar } from './components/SideBar';

import { MoviesContextProvider } from './context/MoviesContext';

import './styles/global.scss';

const Content = lazy(() => import('./components/Content'));

interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

export function App() {
  return (
    <MoviesContextProvider>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <SideBar />

        <Suspense fallback={<Loading />}>
          <Content />
        </Suspense>
      </div>
    </MoviesContextProvider>
  );
}
