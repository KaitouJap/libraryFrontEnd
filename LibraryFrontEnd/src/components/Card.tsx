import React from 'react';

interface Book {
    id: number;
    title: string;
    author: string;
    year: number;
    genre: string;
    pages: number;
    available: boolean;
}

interface CardProps {
  book: Book;
  onEdit: (book: Book) => void;
  onDelete: (book: Book) => void;
}

const Card: React.FC<CardProps> = ({ book, onEdit, onDelete }) => {
  return (
    <div className="card">
         <div className='card-header d-flex justify-content-between align-items-center'>
            <h5 className='card-title mb-0'>{book.title}</h5>
            <div>
                <button className='btn btn-primary btn-sm mr-2' onClick={() => onEdit(book)}>Edit</button>
                <button className='btn btn-danger btn-sm'  onClick={() => onDelete(book)}>Delete</button>
            </div>
        </div>
        <div className='card-body'>
            <h6 className="card-subtitle mb-2 text-muted">{book.author}</h6>
            <p className="card-text">Year: {book.year}</p>
            <p className="card-text">Genre: {book.genre}</p>
            <p className="card-text">Pages: {book.pages}</p>
            <p className="card-text">Available: {book.available ? 'Yes' : 'No'}</p>
        </div>
    </div>
  );
};

export default Card;