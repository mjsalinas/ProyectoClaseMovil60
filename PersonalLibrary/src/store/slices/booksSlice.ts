import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Book } from "../../types/book";


interface BooksState {
    books: Book[];
    selectedBook: Book;
}
const initialState: BooksState = {
  books: [],
  book: {
     id: '',
        title: '',
        author: '',
        genre: '',
        status: 'read',
        rating: '',
        review: '',
        coverImage: '',
        photos: [],
        startDate?: '',
        endDate?: '',
        createdAt: '',
  }
};

const bookSlice = createSlice({
    name: 'books',
    initialState,
    reducers:{
        // setSelectedBook: (state, action: PayloadAction<Book>)=>{
        //     state.name = action.payload.name,
        //     state.author = action.payload.author,     
        //     state.genre = action.payload.genre,
        //     state.rating =action.payload.rating,
        //     state.publishDate = action.payload.publishDate      
        // },
        addBook: (state, action: PayloadAction<Book>)=>{
            state.books.push(action.payload);
        },
        clearBook: () => initialState,
    },
});
//exportar actions utilizando Slice
export const {addBook, clearBook} = bookSlice.actions;
//exportar el reducer de book como default
export default bookSlice.reducer;
