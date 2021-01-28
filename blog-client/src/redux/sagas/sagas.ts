import { all, put, takeEvery } from "redux-saga/effects";
import * as type from "../actions/types";
const port = "http://localhost:5000";
//login
const logInData = async (email: string, password: string) => {
  const body = { email, password };
  console.log(body);
  const token = await fetch(`${port}/auth/login`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then(async (res) => {
      const data = await res.json();

      return data;
    })
    .catch((error) => {
      throw error;
    });
  return token;
};
function* logInSaga(action: any) {
  const { email, password } = action.payload;
  try {
    const res = yield logInData(email, password);
    if (res.hasOwnProperty("msg")) {
      return yield put({ type: type.LOG_IN_FAILED, payload: res });
    }
    console.log(res);
    return yield put({ type: type.LOG_IN_SUCCESS, payload: res.token });
  } catch (error) {
    yield put({ type: type.LOG_IN_FAILED, payload: error });
  }
}

function* watchLogInSaga() {
  yield takeEvery(type.LOG_IN_SAGA, logInSaga);
}

//register
const registerData = async (name: string, email: string, password: string) => {
  const body = { name, email, password };
  const content = {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(body),
  };
  const token = await fetch(`${port}/users/register`, content)
    .then(async (res) => {
      const data = await res.json();
      return data;
    })
    .catch((error) => {
      throw error;
    });
  console.log(token);
  return token;
};
function* registerDataSaga(action: any) {
  const { name, email, password } = action.payload;
  try {
    const res = yield registerData(name, email, password);
    if (res.hasOwnProperty("msg")) {
      return yield put({ type: type.REGISTER_FAILED, payload: res });
    }
    return yield put({ type: type.REGISTER_SUCCESS, payload: res });
  } catch (error) {
    yield put({ type: type.REGISTER_FAILED, payload: error });
  }
}
function* watchrRgisterDataSaga() {
  yield takeEvery(type.REGISTER_SAGA, registerDataSaga);
}

//BLOG POST
const blogPostData = async (
  title: string,
  blogContent: string,
  img: File,
  token: string,
  imgType: string
) => {
  console.log(img);
  const body = { title, blogContent, img, imgType };
  const content = {
    method: "POST",
    headers: { "x-auth-token": token, "Content-type": "application/json" },
    body: JSON.stringify(body),
  };
  const data = await fetch(`${port}/post/blog-post`, content)
    .then(async (res) => {
      const data = await res.json();
      return data;
    })
    .catch((error) => {
      throw error;
    });
  console.log(data);
  return data;
};
function* blogPostSaga(action: any) {
  const { title, blogContent, img, token, imgType } = action.payload;
  try {
    const res = yield blogPostData(title, blogContent, img, token, imgType);
    if (res.hasOwnProperty("msg")) {
      return yield put({ type: type.BLOGPOST_FAILED, payload: res });
    }
    return yield put({ type: type.BLOGPOST_SUCCESS, payload: res });
  } catch (error) {
    return yield put({ type: type.BLOGPOST_FAILED, payload: error });
  }
}
function* watchBlogPostSaga() {
  yield takeEvery(type.BLOGPOST_SAGA, blogPostSaga);
}

//GET ALL POST
const getAllPost = async () => {
  const content = { method: "GET" };
  const data = await fetch(`${port}/post/blog-posts`, content)
    .then(async (res) => {
      const data = await res.json();
      return data;
    })
    .catch((e) => {
      throw e;
    });
  return data;
};
function* getAllPostSaga() {
  try {
    const res = yield getAllPost();
    let newPosts: any[] = [];
    const encodeDataToImage = () => {
      newPosts = res.map((post: any) => {
        if (res.length !== 0) {
          const convertToBase64 = (image: any) => {
            const buffit = Buffer.from(image);
            post.image = `${buffit}`;
          };
          convertToBase64(post.img.data);
          return post;
        }
      });
    };
    encodeDataToImage();
    console.log(newPosts);
    return yield put({ type: type.GET_ALL_POST_SUCCESS, payload: newPosts });
  } catch (error) {
    throw error;
  }
}
function* watchGetAllPostSaga() {
  yield takeEvery(type.GET_ALL_POST_SAGA, getAllPostSaga);
}

function* removeAlertSaga() {
  yield put({ type: type.ALERT_SAGA_REMOVE });
}
function* watchRemoveAlertSaga() {
  yield takeEvery(type.ALERT_SAGA, removeAlertSaga);
}
export default function* rootSaga() {
  yield all([
    watchLogInSaga(),
    watchrRgisterDataSaga(),
    watchRemoveAlertSaga(),
    watchBlogPostSaga(),
    watchGetAllPostSaga(),
  ]);
}
