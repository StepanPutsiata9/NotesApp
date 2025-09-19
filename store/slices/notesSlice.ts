import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface NotesState {
  notes: INote[];
}

const initialState: NotesState = {
  notes: [
    {
      isSecret: true,
      categoryColor: "#FF6B6B",
      categoryName: "Личное",
      title: "Секретные мысли",
      date: "10.01.2024",
      description: "Это мои личные мысли, которые никто не должен видеть",
    },
    {
      isSecret: true,
      categoryColor: "#F8C715",
      categoryName: "Личное",
      title: "Секретные мысли2",
      date: "10.01.2024",
      description: "Это мои личные мысли, которые никто не должен видеть",
    },
    {
      isSecret: true,
      categoryColor: "#FF6B6B",
      categoryName: "Личное",
      title: "Секретные мысли3",
      date: "10.01.2024",
      description: "Это мои личные мысли, которые никто не должен видеть",
    },
  ],
};

export const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    increment: (state) => {
      // state.value += 1;
    },

    createNewNote: (state, action: PayloadAction<INote>) => {
      state.notes.push(action.payload);
    },
  },
});

export const { increment, createNewNote } = notesSlice.actions;
export default notesSlice.reducer;
