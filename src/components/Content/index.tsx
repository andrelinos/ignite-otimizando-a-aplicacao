import { memo, useEffect, useState } from 'react';
import lodash from 'lodash';

import { MovieCard } from '../MovieCard';

import { api } from '../../services/api';

import './styles.scss';
import { Header } from '../Header';

type ContentProps = {
    selectedGenreId: number;
};

interface GenreContentProps {
    name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
    title: string;
}

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

function ContentItems({ selectedGenreId }: ContentProps) {
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreContentProps>(
        {} as GenreContentProps,
  );

  useEffect(() => {
    api.get(`movies/?Genre_id=${selectedGenreId}`).then((response) => {
      setMovies(response.data);
    });

    api.get(`genres/${selectedGenreId}`).then((response) => {
      setSelectedGenre(response.data);
    });
  }, [selectedGenreId]);

  return (
    <div className="container">
      <Header selectedGenre={selectedGenre.title} />
      <main>
        <div className="movies-list">
          {movies.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              title={movie.Title}
              poster={movie.Poster}
              runtime={movie.Runtime}
              rating={movie.Ratings[0].Value}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export const Content = memo(
  ContentItems,
  (prevProps, nextProps) => (
    lodash.isEqual(prevProps.selectedGenreId, nextProps.selectedGenreId)
  ),
);
