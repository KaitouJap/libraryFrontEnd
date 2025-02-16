import React, { useState } from 'react';

interface Book {
  title: string;
  author: string;
  year: number;
  genre: string;
  pages: number;
  available: boolean;
}

interface EditProps {
  book: Book;
  show: boolean;
  onClose: () => void;
  onSave: (book: Book) => void;
}

const EditForm: React.FC<EditProps> = ({ book, show, onClose, onSave }) => {
  const [editedBook, setEditedBook] = useState<Book>(book);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditedBook({ ...editedBook, [name]: name === 'year' || name === 'pages' ? parseInt(value) : value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(editedBook);
  };

  return (
    <div className={`modal ${show ? 'd-block' : 'd-none'}`} tabIndex={-1}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Book</h5>
            <button type="button" className="close" onClick={onClose}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Title</label>
                <input type="text" className="form-control" name="title" value={editedBook.title} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Author</label>
                <input type="text" className="form-control" name="author" value={editedBook.author} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Year</label>
                <input type="number" className="form-control" name="year" value={editedBook.year} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Genre</label>
                <input type="text" className="form-control" name="genre" value={editedBook.genre} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Pages</label>
                <input type="number" className="form-control" name="pages" value={editedBook.pages} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Available</label>
                <select className="form-control" name="available" value={editedBook.available ? 'Yes' : 'No'} onChange={handleChange}>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary">Save changes</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditForm;