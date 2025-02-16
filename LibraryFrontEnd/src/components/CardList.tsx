import React, { useEffect, useState } from 'react';
import Card from './Card';
import EditForm from './EditForm';
import DeleteForm from './DeleteForm';
import CreateForm from './CreateForm';

interface Book {
    id: number;
    title: string;
    author: string;
    year: number;
    genre: string;
    pages: number;
    available: boolean;
}

type UpdateBookDto = Omit<Book, 'id'>;

const CardList: React.FC = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);
    const [showEditForm, setShowEditForm] = useState(false);
    const [showDeleteForm, setShowDeleteForm] = useState(false);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [orderBy, setOrderBy] = useState<string>('title');
    const [sortDirection, setSortDirection] = useState<string>('asc');
    const cardsPerPage = 12;

    useEffect(() => {
        fetch('http://localhost:3000/books')
            .then(response => response.json())
            .then(data => setBooks(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;

    const sortedBooks = [...books].sort((a, b) => {
        let comparison = 0;
        switch(orderBy){
            case 'title':
                comparison = a.title.localeCompare(b.title);
                break;
            case 'author':
                comparison = a.author.localeCompare(b.author);
                break;
            case 'year':
                comparison = a.year - b.year;
                break;
        }
        return sortDirection === 'asc' ? comparison : -comparison;
    })

    const currentCards = sortedBooks.slice(indexOfFirstCard, indexOfLastCard);

    const totalPages = Math.ceil(books.length / cardsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleEdit = (book: Book) => {
        setSelectedBook(book);
        setShowEditForm(true);
    };

    const handleDelete = (book: Book) => {
        setSelectedBook(book);
        setShowDeleteForm(true);
    };

    const handleEditSubmit = (updatedBook: UpdateBookDto) => {
        if (selectedBook) {
            fetch(`http://localhost:3000/books/${selectedBook.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedBook),
            })
                .then(response => response.json())
                .then(data => {
                    setBooks(books.map(book => (book.id === selectedBook.id ? { ...data, id: selectedBook.id } : book)));
                    setShowEditForm(false);
                })
                .catch(error => console.error('Error updating book:', error));
        }
    };

    const handleDeleteConfirm = () => {
        if (selectedBook) {
          fetch(`http://localhost:3000/books/${selectedBook.id}`, {
            method: 'DELETE',
          })
            .then(() => {
              setBooks(books.filter(book => book.title !== selectedBook.title));
              setShowDeleteForm(false);
            })
            .catch(error => console.error('Error deleting book:', error));
        }
    };

    const handleCreateSubmit = (newBook: UpdateBookDto) => {
        fetch('http://localhost:3000/books', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newBook),
        })
            .then(response => response.json())
            .then(data => {
                setBooks([...books, data]);
                setShowCreateForm(false);
            })
            .catch(error => console.error('Error creating book:', error));
    };

    const toggleSortDirection = () => {
        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    }

    return (
        <div>
            <div className="d-flex justify-content-between mb-4">
                <button className="btn btn-success mb-4" onClick={() => setShowCreateForm(true)}>Add New Book</button>
                <div>
                    <label htmlFor="orderBy" className="mr-2">Order By:</label>
                    <select id="orderBy" value={orderBy} onChange={(e) => setOrderBy(e.target.value)}>
                        <option value="title">Title</option>
                        <option value="author">Author</option>
                        <option value="year">Year</option>
                    </select>
                    <button className="btn btn-secondary btn-sm ml-2" onClick={toggleSortDirection}>
                        {sortDirection === 'asc' ? 'Ascending' : 'Descending'}
                    </button>
                </div>
            </div>

            {selectedBook && (
                <EditForm 
                book={selectedBook}
                show={showEditForm}
                onClose={() => setShowEditForm(false)}
                onSave={handleEditSubmit}
                />
            )}

            {selectedBook && (
                <DeleteForm 
                book={selectedBook}
                show={showDeleteForm}
                onClose={() => setShowDeleteForm(false)}
                onDelete={handleDeleteConfirm}
                />
            )}

            <CreateForm 
                show={showCreateForm}
                onClose={() => setShowCreateForm(false)}
                onSave={handleCreateSubmit}
            />

            <div className='row'>
                {currentCards.map((book, index) => (
                    <div key={index} className='col-md-4 mb-4'>
                        <Card book={book} onEdit={handleEdit} onDelete={handleDelete}></Card>
                    </div>
                ))}
            </div>

            <div className="pagination">
                <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                    Previous
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default CardList;