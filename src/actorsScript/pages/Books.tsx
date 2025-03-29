import { books } from "../../../tests/data";

export const Books = () => {
  return (
    <div>
      <img src="/assets/script.svg" alt="Icono dun pergamino" width="50" height="50" />
      <h1>Books</h1>
      {books.map((book) => (
        <div key={book.id}>
          <h2>{book.title}</h2>
        </div>
      ))}
    </div>
  );
};
