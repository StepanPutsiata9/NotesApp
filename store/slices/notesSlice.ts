import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface NotesState {
  notes: INote[];
  secretNotes: INote[];
}

const initialState: NotesState = {
  notes: [
    {
      isSecret: false,
      categoryColor: "#FF6B6B",
      categoryName: "Личное",
      title: "1",
      date: "10.01.2024",
      description: "111111",
    },
    {
      isSecret: false,
      categoryColor: "#F8C715",
      categoryName: "Личное",
      title: "2",
      date: "10.01.2024",
      description: "2222222222222",
    },
    {
      isSecret: false,
      categoryColor: "#FF6B6B",
      categoryName: "Личное",
      title: "3",
      date: "10.01.2024",
      description: "333333333333333333333333333333",
    },
  ],
  secretNotes: [],
};

export const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    deleteNote: (state, action: PayloadAction<string>) => {
      state.notes = state.notes.filter((note) => note.title !== action.payload);
    },

    createNewNote: (state, action: PayloadAction<INote>) => {
      state.notes.push(action.payload);
    },

    setSecretNote: (state, action: PayloadAction<string>) => {
      const note = state.notes.find((n) => n.title === action.payload) as INote;
      state.notes = state.notes.filter((note) => note.title !== action.payload);
      console.log(note);
      note.isSecret = true;
      state.secretNotes.push(note);
    },
  },
});

export const { deleteNote, createNewNote, setSecretNote } = notesSlice.actions;
export default notesSlice.reducer;
