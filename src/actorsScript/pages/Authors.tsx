import { authors } from "../../../tests/data";

export const Authors = () => {
  return (
    <div>
      <img
        src="/src/assets/author.svg"
        alt="Icono dun autor"
        width="50"
        height="50"
      />
      <h1>Authors</h1>
      {authors.map((author) => (
        <div key={author.id}>
          <h2>{author.name}</h2>
        </div>
      ))}
    </div>
  );
};
