import { OPEN_DRAWER } from "./openDrawerActionTypes";

const initialState = {
  open: true,
};

const openDrawerReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_DRAWER:
      return {
        ...state,
        open: !state.open,
      };

    default:
      return state;
  }
};

export default openDrawerReducer;
