import { VIEW } from "./viewActionTypes";

const initialState = {
  view: false,
};

const viewReducer = (state = initialState, action) => {
  switch (action.type) {
    case VIEW:
      return {
        ...state,
        view: !state.view,
      };

    default:
      return state;
  }
};

export default viewReducer;
