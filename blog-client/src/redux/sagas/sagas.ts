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
export default function* rootSaga() {
  yield all([watchLogInSaga(), watchrRgisterDataSaga()]);
}
