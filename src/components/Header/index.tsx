import './styles.scss';

interface HeaderProps {
  selectedGenre?: string
}

export function Header({ selectedGenre }: HeaderProps) {
  return (
    <header>
      <span className="category">
        {selectedGenre && <>Categoria:<span> {selectedGenre}</span></>}
      </span>
    </header>
  );
}
