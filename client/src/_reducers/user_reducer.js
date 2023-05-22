import { LOGIN_USER, REGISTER_USER } from "../_actions/types";

const initialState = null;
export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loginSuccess: action.payLoad };
      break;
    case REGISTER_USER:
      return {...state, register: action.payLoad};
      break;
    default:
      return state;
      break;
  }
};
