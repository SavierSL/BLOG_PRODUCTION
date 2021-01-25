import * as types from "../actions/types";
export interface InitialState {
  token: null | string;
  loading: boolean;
  msg: string;
  isAuth: boolean;
}

export const initialState: InitialState = {
  token: localStorage.getItem("token"),
  loading: false,
  msg: "",
  isAuth: false,
};

interface Action {
  type: string;
  payload: string;
}
const post = (state = initialState, action: Action): InitialState => {
  const { type, payload } = action;
  switch (type) {
    case types.LOG_IN_SUCCESS: {
      localStorage.setItem("token", payload);
      return {
        ...state,
        isAuth: true,
      };
    }
    case types.LOG_IN_FAILED: {
      localStorage.removeItem("token");
      return {
        ...state,
        msg: payload,
      };
    }
    case types.REGISTER_SUCCESS: {
      localStorage.setItem("token", payload);
      return {
        ...state,
        isAuth: true,
      };
    }
    case types.REGISTER_FAILED: {
      return {
        ...state,
        msg: payload,
      };
    }
    default: {
      return state;
    }
  }
};
export default post;
