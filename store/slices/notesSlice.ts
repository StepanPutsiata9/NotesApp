import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface NotesState {
  notes: INote[];
  secretNotes: INote[];
  filtredNotes: INote[];
}

const initialState: NotesState = {
  notes: [
    {
      isSecret: false,
      categoryColor: "#FF6B6B",
      categoryName: "Рассуждения",
      title: "1",
      date: "10.01.2024",
      description: "111111",
    },
    {
      isSecret: false,
      categoryColor: "#F8C715",
      categoryName: "Покупки",
      title: "2",
      date: "10.01.2024",
      description: "2222222222222",
    },
    {
      isSecret: false,
      categoryColor: "#FF6B6B",
      categoryName: "Цели",
      title: "3",
      date: "10.01.2024",
      description: "333333333333333333333333333333",
    },
  ],
  secretNotes: [],
  filtredNotes: [],
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
      const secretNote = state.secretNotes.find(
        (n) => n.title === action.payload
      ) as INote;
      if (note) {
        state.notes = state.notes.filter(
          (note) => note.title !== action.payload
        );
        note.isSecret = true;
        state.secretNotes.push(note);
      }
      if (secretNote) {
        state.secretNotes = state.secretNotes.filter(
          (note) => note.title !== action.payload
        );
        secretNote.isSecret = false;
        state.notes.push(secretNote);
      }
    },

    setFilter: (state, action: PayloadAction<string>) => {
      state.filtredNotes = state.notes.filter(
        (n) => n.categoryName === action.payload
      );
    },
    clearFilters: (state) => {
      state.filtredNotes = state.notes;
    },
  },
});

export const {
  deleteNote,
  createNewNote,
  setSecretNote,
  setFilter,
  clearFilters,
} = notesSlice.actions;
export default notesSlice.reducer;
