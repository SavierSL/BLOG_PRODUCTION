import { all, put, takeEvery } from "redux-saga/effects";
import * as type from "../actions/types";

//login
const logInData = async (email: string, password: string) => {
  const body = { email, password };
  console.log(body);
  const token = await fetch("/auth/login", {
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
    if (res.hasOwnProperty("errors")) {
      return yield put({ type: type.LOG_IN_FAILED, payload: res });
    }
  } catch (error) {
    yield put({ type: type.LOG_IN_FAILED, payload: error });
  }
}
function* watchLogInSaga() {
  yield takeEvery(type.LOG_IN_SAGA, logInSaga);
}
export default function* rootSaga() {
  yield all([watchLogInSaga()]);
}
