import './styles.scss';

interface HeaderProps {
  selectedGenre?: string;
}

export function Header({ selectedGenre }: HeaderProps) {
  return (
    <header>
      <span className="category">
        {selectedGenre && (
          <>
            <span> {selectedGenre}</span>
          </>
        )}
      </span>
    </header>
  );
}
