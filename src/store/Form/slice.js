import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  formList: [],
  formEdit: undefined,
};

const formSlice = createSlice({
  name: "Form",
  initialState,
  reducers: {
    setFormList: (state, { payload }) => {
      const index = state.formList.findIndex((v) => v.id == payload.id);
      if (index != -1) {
        alert("Mã sinh viên đã tồn tại");
      } else {
        state.formList.push(payload);
      }
    },
    detleteForm: (state, { payload }) => {
      state.formList = state.formList.filter((v) => v.id != payload.id);
    },
    editsForm: (state, { payload }) => {
      state.formEdit = payload;
    },
    updateForm: (state, { payload }) => {
      state.formList = state.formList.map((v) => {
        if (v.id == payload.id) return payload;
        return v;
      });
      state.formEdit = undefined;
    },
  },
});

export const { reducer: formReducer, actions: formAction } = formSlice;
