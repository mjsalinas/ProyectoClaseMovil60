import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Book } from "../../types/book";

interface BooksState {
    books: Book[];
    selectedBook: Book | null;
}

const initialState: BooksState = {
    books: [],
    selectedBook: null,
};

const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        addBook: (state, action: PayloadAction<Book>) => {
            state.books.push(action.payload);
        },
        updateBook: (state, action: PayloadAction<Book>) => {
            const index = state.books.findIndex(b => b.id === action.payload.id);
            if (index !== -1) {
                state.books[index] = action.payload;
            }
        },
        deleteBook: (state, action: PayloadAction<string>) => {
            state.books = state.books.filter(b => b.id !== action.payload);
        },
        selectBook: (state, action: PayloadAction<Book | null>) => {
            state.selectedBook = action.payload;
        },
        clearBooks: () => initialState,
    },
});

export const { addBook, updateBook, deleteBook, selectBook, clearBooks } = booksSlice.actions;
export default booksSlice.reducer;
