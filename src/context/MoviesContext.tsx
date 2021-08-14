import {
  createContext, ReactNode, useEffect, useState,
} from 'react';

import { api } from '../services/api';

interface GenreResponseProps {
  id: number;
  name:
    | 'action'
    | 'comedy'
    | 'documentary'
    | 'drama'
    | 'horror'
    | 'family';
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

interface MoviesContextType {
  movies: MovieProps[];
  selectedGenre: GenreResponseProps;
  genres: GenreResponseProps[];
  selectedGenreId: number;
  setSelectedGenreId: (id: number) => void;
}

interface MoviesContextProviderProps {
  children: ReactNode;
}

export const MoviesContext = createContext({} as MoviesContextType);

export function MoviesContextProvider({
  children,
}: MoviesContextProviderProps) {
  const [selectedGenreId, setSelectedGenreId] = useState(1);
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>(
    {} as GenreResponseProps,
  );

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then((response) => {
      setGenres(response.data);
    });
  }, []);

  useEffect(() => {
    api
      .get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`)
      .then((response) => {
        setMovies(response.data);
      }).catch((error) => {
        console.log('🌏 No data found...');
      });

    api
      .get<GenreResponseProps>(`genres/${selectedGenreId}`)
      .then((response) => {
        setSelectedGenre(response.data);
      }).catch((error) => {
        if (error) {
          console.log('🌏 No data found...');
        }
      });
  }, [selectedGenreId]);

  return (
    <MoviesContext.Provider
      value={{
        movies,
        selectedGenre,
        genres,
        selectedGenreId,
        setSelectedGenreId,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
}
