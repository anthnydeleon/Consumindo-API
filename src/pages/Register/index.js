import React, { useState } from "react";
import { toast } from "react-toastify";
import validator from "validator";
import { useSelector, useDispatch } from "react-redux";

import * as actions from "../../store/modules/auth/actions";
import { Container } from "../../styles/GlobalStyles";
import { Form } from "./styled";
import Loading from "../../components/Loading";

export default function Register() {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.auth.user.id);
  const nomeStored = useSelector((state) => state.auth.user.nome);
  const emailStored = useSelector((state) => state.auth.user.email);
  const isLoading = useSelector((state) => state.auth.isLoading);

  const [nome, setNome] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  React.useEffect(() => {
    if (!id) return;
    setEmail(emailStored);
    setNome(nomeStored);
  }, [emailStored, id, nomeStored]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formErrors = false;

    if (typeof nome === "undefined" || nome.length < 3 || nome.length > 250) {
      formErrors = true;
      toast.error("Campo nome deve ter entre 3 e 250 caracteres.");
    }

    if (
      !id &&
      (typeof password === "undefined" ||
        password.length < 6 ||
        password.length > 30)
    ) {
      formErrors = true;
      toast.error("Campo senha deve ter entre 6 e 30 caracteres.");
    }
    if (typeof email === "undefined" || !validator.isEmail(email)) {
      formErrors = true;
      toast.error("E-mail inválido.");
    }

    if (formErrors) return;

    dispatch(actions.registerRequest({ nome, email, password, id }));
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1>{id ? "Editar" : "Crie sua conta"}</h1>

      <Form onSubmit={handleSubmit}>
        <label htmlFor="nome">
          Nome:{" "}
          <input
            type="text"
            id="nome"
            value={nome || ""}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Digite seu nome"
          />
        </label>
        <label htmlFor="email">
          Email:{" "}
          <input
            type="email"
            id="email"
            value={email || ""}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite seu e-mail"
          />
        </label>
        <label htmlFor="password">
          Password:{" "}
          <input
            type="password"
            id="password"
            value={password || ""}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite sua senha"
          />
        </label>

        <button type="submit">{id ? "Salvar" : "Criar minha conta"}</button>
      </Form>
    </Container>
  );
}
