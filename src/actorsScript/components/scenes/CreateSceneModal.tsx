import { Modal } from '@mui/material';
import { useEffect } from 'react';

export const CreateSceneModal = ({
  open,
  handleModalClose
}: {
  open: boolean;
  handleModalClose: () => void;
}) => {
  useEffect(() => {
    if (open) {
      // Fetch necessary data when modal opens
    }
  }, [open]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic
    handleModalClose();
  };
  return (
    <Modal
      open={open}
      onClose={handleModalClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      {/* Modal content goes here */}
      <div>
        <h2 id="modal-modal-title">Create Scene</h2>
        <form onSubmit={handleSubmit}>
          {/* Form fields go here */}
          <button type="submit">Submit</button>
        </form>
      </div>
    </Modal>
  );
};
