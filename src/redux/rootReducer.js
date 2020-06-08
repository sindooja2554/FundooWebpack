import { combineReducers } from "redux";
import openDrawerReducer from "./openDrawer/openDrawerReducer";
import viewReducer from "./view/viewReducer";

const rootReducer = combineReducers({
  openDrawer: openDrawerReducer,
  view: viewReducer,
});

export default rootReducer;
