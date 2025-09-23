import AsyncStorage from "@react-native-async-storage/async-storage";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface NotesState {
  notes: INote[];
  secretNotes: INote[];
  filtredNotes: INote[];
  currentFilter: string;
  currentSearch: string;
  selectedNote: INote | null;
  isLoading: boolean;
}

const initialState: NotesState = {
  notes: [],
  secretNotes: [],
  filtredNotes: [],
  currentFilter: "",
  currentSearch: "",
  selectedNote: null,
  isLoading: true,
};

const NOTES_STORAGE_KEY = "notes_app_notes";
const SECRET_NOTES_STORAGE_KEY = "notes_app_secret_notes";

const saveNotesToStorage = async (notes: INote[], secretNotes: INote[]) => {
  try {
    await AsyncStorage.multiSet([
      [NOTES_STORAGE_KEY, JSON.stringify(notes)],
      [SECRET_NOTES_STORAGE_KEY, JSON.stringify(secretNotes)],
    ]);
  } catch (error) {
    console.error("Error saving notes to storage:", error);
  }
};

export const loadNotesFromStorage = createAsyncThunk(
  "notes/loadNotesFromStorage",
  async () => {
    try {
      const notesData = await AsyncStorage.getItem(NOTES_STORAGE_KEY);
      const secretNotesData = await AsyncStorage.getItem(
        SECRET_NOTES_STORAGE_KEY
      );

      return {
        notes: notesData ? JSON.parse(notesData) : [],
        secretNotes: secretNotesData ? JSON.parse(secretNotesData) : [],
      };
    } catch (error) {
      console.error("Error loading notes from storage:", error);
      throw error;
    }
  }
);

export const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    initializeNotes: (
      state,
      action: PayloadAction<{ notes: INote[]; secretNotes: INote[] }>
    ) => {
      state.notes = action.payload.notes;
      state.secretNotes = action.payload.secretNotes;
      state.filtredNotes = action.payload.notes;
      state.isLoading = false;
      applyFilters(state);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    deleteNote: (state, action: PayloadAction<string>) => {
      state.notes = state.notes.filter((note) => note.title !== action.payload);
      state.secretNotes = state.secretNotes.filter(
        (note) => note.title !== action.payload
      );

      applyFilters(state);

      saveNotesToStorage(state.notes, state.secretNotes);
    },

    createNewNote: (state, action: PayloadAction<INote>) => {
      state.notes.push(action.payload);
      applyFilters(state);

      saveNotesToStorage(state.notes, state.secretNotes);
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
      saveNotesToStorage(state.notes, state.secretNotes);
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
      saveNotesToStorage(state.notes, state.secretNotes);
    },

    clearAllNotes: (state) => {
      state.notes = [];
      state.secretNotes = [];
      state.filtredNotes = [];
      state.currentFilter = "";
      state.currentSearch = "";
      state.selectedNote = null;

      AsyncStorage.multiRemove([NOTES_STORAGE_KEY, SECRET_NOTES_STORAGE_KEY]);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadNotesFromStorage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadNotesFromStorage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.notes = action.payload.notes;
        state.secretNotes = action.payload.secretNotes;
        state.filtredNotes = action.payload.notes;
      })
      .addCase(loadNotesFromStorage.rejected, (state) => {
        state.isLoading = false;
      });
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
  initializeNotes,
  setLoading,
  deleteNote,
  createNewNote,
  setSecretNote,
  setFilter,
  clearFilters,
  setSearch,
  redactNote,
  clearSelectedNote,
  updateNote,
  clearAllNotes,
} = notesSlice.actions;
export default notesSlice.reducer;
