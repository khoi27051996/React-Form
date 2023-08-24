import { combineReducers } from "redux";
import { formReducer } from "./Form/slice";

export const rootReducer = combineReducers({
    formL : formReducer
})