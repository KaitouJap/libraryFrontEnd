import React from 'react';

interface Book {
  title: string;
}

interface DeleteProps {
  book: Book;
  show: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const DeleteForm: React.FC<DeleteProps> = ({ book, show, onClose, onDelete }) => {
  return (
    <div className={`modal ${show ? 'd-block' : 'd-none'}`} tabIndex={-1}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Delete Book</h5>
            <button type="button" className="close" onClick={onClose}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p>Are you sure you want to delete the book titled "{book.title}"?</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="button" className="btn btn-danger" onClick={onDelete}>Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteForm;