import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface NotesState {
  notes: INote[];
  secretNotes: INote[];
  filtredNotes: INote[];
  currentFilter: string;
  currentSearch: string;
  selectedNote: INote | null;
}

const initialState: NotesState = {
  notes: [],
  secretNotes: [],
  filtredNotes: [],
  currentFilter: "",
  currentSearch: "",
  selectedNote: null,
};

export const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    deleteNote: (state, action: PayloadAction<string>) => {
      state.notes = state.notes.filter((note) => note.title !== action.payload);
      state.secretNotes = state.secretNotes.filter(
        (note) => note.title !== action.payload
      );

      applyFilters(state);
    },

    createNewNote: (state, action: PayloadAction<INote>) => {
      state.notes.push(action.payload);
      applyFilters(state);
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

      applyFilters(state);
    },

    setFilter: (state, action: PayloadAction<string>) => {
      state.currentFilter = action.payload;
      applyFilters(state);
    },

    clearFilters: (state) => {
      state.currentFilter = "";
      state.currentSearch = "";
      state.filtredNotes = state.notes;
    },

    setSearch: (state, action: PayloadAction<string>) => {
      state.currentSearch = action.payload;
      applyFilters(state);
    },

    redactNote: (state, action: PayloadAction<INote>) => {
      state.selectedNote = action.payload;
    },
    clearSelectedNote: (state) => {
      state.selectedNote = null;
    },
    updateNote: (state, action: PayloadAction<INote>) => {
      if (action.payload.isSecret) {
        state.secretNotes = state.secretNotes.map((item) =>
          item.id === action.payload.id ? action.payload : item
        );
      } else {
        state.notes = state.notes.map((item) =>
          item.id === action.payload.id ? action.payload : item
        );
        applyFilters(state);
      }
    },
  },
});

function applyFilters(state: NotesState) {
  let filtered = state.notes;

  if (state.currentFilter) {
    filtered = filtered.filter((n) => n.categoryName === state.currentFilter);
  }

  if (state.currentSearch) {
    filtered = filtered.filter((item) =>
      item?.title?.toLowerCase().includes(state.currentSearch.toLowerCase())
    );
  }

  state.filtredNotes = filtered;
}
export const {
  deleteNote,
  createNewNote,
  setSecretNote,
  setFilter,
  clearFilters,
  setSearch,
  redactNote,
  clearSelectedNote,
  updateNote,
} = notesSlice.actions;
export default notesSlice.reducer;
