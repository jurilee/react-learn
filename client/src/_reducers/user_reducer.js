import { LOGIN_USER, REGISTER_USER, AUTH_USER } from "../_actions/types";

// const initialState = null;
export default function (state = {}, action) {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loginSucess: action.payLoad };
    case REGISTER_USER:
      return { ...state, register: action.payLoad };
    case AUTH_USER:
      return { ...state, userData: action.payLoad };
    default:
      return state;
      break;
  }
};
