import { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { Button } from '../Button';

import './styles.scss';

interface GenreContentProps {
    id: number;
    name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
    title: string;
}

interface SideBarProps {
    // eslint-disable-next-line no-undef
    setSelectedGenreId: React.Dispatch<React.SetStateAction<number>>;
    selectedGenreId: number;
}

export function SideBar({ selectedGenreId, setSelectedGenreId }: SideBarProps) {
  const [genres, setGenres] = useState<GenreContentProps[]>([]);

  useEffect(() => {
    api.get<GenreContentProps[]>('genres').then((Content) => {
      setGenres(Content.data);
    });
  }, []);

  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }

  return (
    <nav className="sidebar">
      <span>
        Watch<p>Me</p>
      </span>

      <div className="buttons-container">
        {genres.map((genre) => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleClickButton(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>
    </nav>
  );
}
