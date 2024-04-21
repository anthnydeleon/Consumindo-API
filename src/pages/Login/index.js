import React from "react";
import { toast } from "react-toastify";
import validator from "validator";
import { useDispatch, useSelector } from "react-redux";
import { get } from "lodash";

import { Container } from "../../styles/GlobalStyles";
import { Form } from "./styled";
import * as actions from "../../store/modules/auth/actions";

import Loading from "../../components/Loading";

export default function Login(props) {
  const dispatch = useDispatch();

  const prevPath = get(props, "location.state.prevPath", "/");

  const isLoading = useSelector((state) => state.auth.isLoading);

  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    let formErrors = false;

    if (
      typeof password === "undefined" ||
      password.length < 6 ||
      password.length > 30
    ) {
      formErrors = true;
      toast.error("Campo senha deve ter entre 6 e 30 caracteres.");
    }
    if (typeof email === "undefined" || !validator.isEmail(email)) {
      formErrors = true;
      toast.error("E-mail inválido.");
    }

    if (formErrors) return;

    dispatch(actions.loginRequest({ email, password, prevPath }));
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1>Login</h1>
      <Form onSubmit={handleSubmit}>
        <label htmlFor="email">
          Email:{" "}
          <input
            type="text"
            value={email || ""}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite seu e-mail"
          />
        </label>
        <label htmlFor="password">
          Senha:{" "}
          <input
            type="password"
            value={password || ""}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite sua senha"
          />
        </label>
        <button type="submit">Fazer login</button>
      </Form>
    </Container>
  );
}
