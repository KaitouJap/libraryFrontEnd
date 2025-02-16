import React, { useState } from 'react';

interface Book {
    title: string;
    author: string;
    year: number;
    genre: string;
    pages: number;
    available: boolean;
}

interface CreateFormProps {
    show: boolean;
    onClose: () => void;
    onSave: (newBook: Book) => void;
}

const CreateForm: React.FC<CreateFormProps> = ({ show, onClose, onSave }) => {
    const [newBook, setNewBook] = useState<Book>({
        title: '',
        author: '',
        year: new Date().getFullYear(),
        genre: '',
        pages: 0,
        available: true
    });

    const [errors, setErrors] = useState<{[key: string]: string }>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewBook({ ...newBook, [name]: name === 'year' || name === 'pages' ? parseInt(value) : value });
    };

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};
        if (!newBook.title) newErrors.title = 'Title is required';
        if (!newBook.author) newErrors.author = 'Author is required';
        if (!newBook.year) newErrors.year = 'Year is required';
        if (!newBook.genre) newErrors.genre = 'Genre is required';
        if (!newBook.pages) newErrors.pages = 'Pages are required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            onSave(newBook);
        }
    };

    return (
        <div className={`modal ${show ? 'd-block' : 'd-none'}`} tabIndex={-1}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Create Book</h5>
                        <button type="button" className="close" onClick={onClose}>
                            <span>&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Title</label>
                                <input type="text" className="form-control" name="title" value={newBook.title} onChange={handleChange} />
                                {errors.title && <div className="text-danger">{errors.title}</div>}
                            </div>
                            <div className="form-group">
                                <label>Author</label>
                                <input type="text" className="form-control" name="author" value={newBook.author} onChange={handleChange} />
                                {errors.author && <div className="text-danger">{errors.author}</div>}
                            </div>
                            <div className="form-group">
                                <label>Year</label>
                                <input type="number" className="form-control" name="year" value={newBook.year} onChange={handleChange} />
                                {errors.year && <div className="text-danger">{errors.year}</div>}
                            </div>
                            <div className="form-group">
                                <label>Genre</label>
                                <input type="text" className="form-control" name="genre" value={newBook.genre} onChange={handleChange} />
                                {errors.genre && <div className="text-danger">{errors.genre}</div>}
                            </div>
                            <div className="form-group">
                                <label>Pages</label>
                                <input type="number" className="form-control" name="pages" value={newBook.pages} onChange={handleChange} />
                                {errors.pages && <div className="text-danger">{errors.pages}</div>}
                            </div>
                            <div className="form-group">
                                <label>Available</label>
                                <select className="form-control" name="available" value={newBook.available ? 'Yes' : 'No'} onChange={handleChange}>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </select>
                            </div>
                            <button type="submit" className="btn btn-primary">Save</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateForm;