import { memo } from 'react';
import lodash from 'lodash';

import { Star, Clock } from 'react-feather';

import './styles.scss';

type MovieCardProps = {
  title: string;
  poster: string;
  rating: string;
  runtime: string;
};

interface MovieCards {
  movieCard: MovieCardProps;
}

export function MovieCardComponent({ movieCard }: MovieCards) {
  return (
    <div className="movie-card">
      <img src={movieCard.poster} alt={movieCard.title} />

      <div>
        <div className="movie-info">
          <span>{movieCard.title}</span>
          <div className="meta">
            <div>
              <Star /> {movieCard.rating}
            </div>

            <div>
              <Clock /> {movieCard.runtime}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const MovieCard = memo(
  MovieCardComponent,
  (prevProps, nextProps) => lodash.isEqualWith(
    prevProps.movieCard, nextProps.movieCard,
  ),
);

// export const MovieCard = memo(
//   MovieCardComponent,
//   (prevProps, nextProps) => Object.is(
//    prevProps.movieCard, nextProps.movieCard,
//   ),
// );
