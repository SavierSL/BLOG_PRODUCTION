import * as types from "../actions/types";

export interface InitalStateBlogPost {
  posts: [];
}
export const initialState: InitalStateBlogPost = {
  posts: [],
};
interface Action {
  type: string;
  payload: string;
}

const blogPost = (state = initialState, action: Action) => {
  const { type, payload } = action;
  switch (type) {
    case types.GET_ALL_POST_SUCCESS: {
      return {
        ...state,
        posts: payload,
      };
    }
    default: {
      return state;
    }
  }
};
export default blogPost;
