import * as types from "./types";
interface getUseActionType {
  type: string;
  payload: { token: string };
}
export const getUserAction = (token: string): getUseActionType => {
  return {
    type: types.GET_USER_SAGA,
    payload: { token },
  };
};

export const getUserPostsAction = (token: string): getUseActionType => {
  return {
    type: types.GET_USER_POSTS_SAGA,
    payload: { token },
  };
};
