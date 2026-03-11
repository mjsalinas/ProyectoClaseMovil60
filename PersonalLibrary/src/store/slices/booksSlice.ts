import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Book {
    name: string;
    author: string;
    genre: string;
    rating: string;
    publishDate: string;
}
const initialState: Book = {
    name: "",
    author: "",
    genre: "",
    rating: "",
    publishDate: ""
};

const bookSlice = createSlice({
    name: 'book',
    initialState,
    reducers:{
        setBook: (state, action: PayloadAction<Book>)=>{
            state.name = action.payload.name,
            state.author = action.payload.author,     
            state.genre = action.payload.genre,
            state.rating =action.payload.rating,
            state.publishDate = action.payload.publishDate      
        },
        clearBook: () => initialState,
    },
});
//exportar actions utilizando Slice
export const {setBook, clearBook} = bookSlice.actions;
//exportar el reducer de book como default
export default bookSlice.reducer;
