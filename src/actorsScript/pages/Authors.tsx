import { authors } from "../../../tests/data";
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import { PageHeader } from '../components/PageHeader';


export const Authors = () => {
  return (
    <div className="page">
      <PageHeader
        icon={<AssignmentIndIcon />}
        title="DramaturgXs"
      />

      {authors.map((author) => (
        <div key={author.id}>
          <h2>{author.name}</h2>
        </div>
      ))}
    </div>
  );
};
