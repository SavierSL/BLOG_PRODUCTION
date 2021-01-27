import * as types from "../actions/types";

interface blogPostActionType {
  type: string;
  payload: object;
}

export const blogPostAction = (
  title: string,
  blogContent: string,
  img: undefined | null | File,
  token:string
): blogPostActionType => {
  return {
    type: types.BLOGPOST_SAGA,
    payload: { title, blogContent, img, token },
  };
};
