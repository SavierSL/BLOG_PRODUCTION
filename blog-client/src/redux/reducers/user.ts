import * as types from "../actions/types";
interface InitialUserState {
  user: {};
  msg: any;
  posts: [];
  loadingPosts: boolean;
}
export const initialState: InitialUserState = {
  user: {},
  msg: "",
  posts: [],
  loadingPosts: true,
};
interface Action {
  type: string;
  payload: string | [];
}

const user = (state = initialState, action: Action) => {
  const { type, payload } = action;
  switch (type) {
    case types.GET_USER_SUCCESS: {
      return {
        ...state,
        user: payload,
      };
    }
    case types.GET_USER_FAILED: {
      return {
        ...state,
        user: {},
        msg: payload,
      };
    }
    case types.GET_USER_POSTS_SUCCESS: {
      return {
        ...state,
        posts: payload,
        loadingPosts: false,
      };
    }
    case types.GET_USER_POSTS_FAILED: {
      return {
        ...state,
        msg: payload,
        loadingPosts: false,
      };
    }
    default: {
      return state;
    }
  }
};
export default user;
