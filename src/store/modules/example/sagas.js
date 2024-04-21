import { call, put, all, takeLatest } from "redux-saga/effects";
import { toast } from "react-toastify";
import * as actions from "./actions";
import * as types from "../types";

const request = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 600);
  });

function* exampleRequest() {
  try {
    yield call(request);
    yield put(actions.clicaBotaoSuccess());
    toast.success("Deu certo");
  } catch (e) {
    yield put(actions.clicaBotaoFailure());
    toast.error("Deu erro");
  }
}

export default all([takeLatest(types.BOTAO_CLICADO_REQUEST, exampleRequest)]);
