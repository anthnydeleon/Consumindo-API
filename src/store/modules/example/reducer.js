/* eslint-disable no-console */
/* eslint-disable func-names */
import * as types from "../types";

const initialState = {
  botaoClicado: false,
};

// eslint-disable-next-line default-param-last
export default function (state = initialState, action) {
  switch (action.type) {
    case types.BOTAO_CLICADO_SUCCESS: {
      const newState = { ...state };
      newState.botaoClicado = !newState.botaoClicado;
      console.log("success");
      return newState;
    }

    case types.BOTAO_CLICADO_REQUEST: {
      console.log("request");
      return state;
    }

    case types.BOTAO_CLICADO_FAILURE: {
      console.log("failure");
      return state;
    }

    default: {
      return state;
    }
  }
}
