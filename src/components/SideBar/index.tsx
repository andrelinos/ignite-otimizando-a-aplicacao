import { useContext, useState } from 'react';

import { MoviesContext } from '../../context/MoviesContext';
import { Button } from '../Button';

import './styles.scss';

export function SideBar() {
  const [isActive, setIsActive] = useState(false);
  const { selectedGenreId, setSelectedGenreId } = useContext(MoviesContext);
  const { genres } = useContext(MoviesContext);

  function handleClickButton(id: number) {
    setSelectedGenreId(id);
    setIsActive(false);
  }

  const handleToggle = () => {
    setIsActive(!isActive);
  };

  return (
    <nav className="sidebar-container">
      <button
        type="button"
        className="sidebar-button"
        onClick={handleToggle}
      >
        <img src="./images/menu.svg" alt="Menu" />
      </button>
      <span>
        Watch<p>Me</p>
      </span>
      <div className={isActive ? 'sidebar bt-right ' : 'hide bt-right'}>

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
      </div>
    </nav>
  );
}
