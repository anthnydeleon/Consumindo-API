import React, { useState, useEffect } from "react";
import { get } from "lodash";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { FaUserCircle, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import validator from "validator";
import { Container } from "../../styles/GlobalStyles";
import Loading from "../../components/Loading";
import { Form, ProfilePicture, Title } from "./styled";
import axios from "../../services/axios";
import history from "../../services/history";
import * as actions from "../../store/modules/auth/actions";

export default function Aluno({ match }) {
  const dispatch = useDispatch();

  const id = get(match, "params.id", "");
  const [photo, setPhoto] = useState("");
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [email, setEmail] = useState("");
  const [idade, setIdade] = useState("");
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    async function getData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`/alunos/${id}`);
        const Photo = get(data, "Photos[0].url", "");

        setPhoto(Photo);

        setNome(data.nome);
        setSobrenome(data.sobrenome);
        setEmail(data.email);
        setIdade(data.idade);
        setPeso(data.peso);
        setAltura(data.altura);

        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        const status = get(err, "response.status", 0);
        const errors = get(err, "response.data.errors", [0]);

        if (status === 404) errors.map((error) => toast.error(error));
        history.push("/");
      }
    }

    getData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formErrors = false;

    if (typeof nome === "undefined" || nome.length < 3 || nome.length > 255) {
      toast.error("Nome precisa ter entre 3 e 255 caracteres.");
      formErrors = true;
    }
    if (
      typeof sobrenome === "undefined" ||
      sobrenome.length < 3 ||
      sobrenome.length > 255
    ) {
      toast.error("Sobrenome precisa ter entre 3 e 255 caracteres.");
      formErrors = true;
    }
    if (typeof email === "undefined" || !validator.isEmail(email)) {
      toast.error("E-mail inválido.");
      formErrors = true;
    }
    if (typeof idade === "undefined" || !validator.isInt(String(idade))) {
      toast.error("Idade precisa ser um número inteiro");
      formErrors = true;
    }
    if (typeof peso === "undefined" || !validator.isFloat(String(peso))) {
      toast.error("Peso inválido");
      formErrors = true;
    }
    if (typeof altura === "undefined" || !validator.isFloat(String(altura))) {
      toast.error("Altura inválida.");
      formErrors = true;
    }

    if (formErrors) return;
    setIsLoading(true);

    try {
      if (id) {
        await axios.put(`/alunos/${id}`, {
          nome,
          sobrenome,
          email,
          idade,
          peso,
          altura,
        });
        toast.success("Aluno(a) editado(a) com sucesso.");
      } else {
        await axios.post(`/alunos/`, {
          nome,
          sobrenome,
          email,
          idade,
          peso,
          altura,
        });
        toast.success("Aluno(a) criado(a) com sucesso.");
      }

      setIsLoading(false);
      history.push("/");
    } catch (err) {
      setIsLoading(false);
      const status = get(err, "response.status", 0);
      const data = get(err, "response.data", {});
      const errors = get(data, "errors", []);

      if (errors.length > 0) {
        errors.map((error) => toast.error(error));
      } else {
        toast.error("Erro desconhecido");
      }
      if (status === 401) {
        dispatch(actions.loginFailure());
      }
    }
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <Title>{id ? "Editar aluno" : "Novo aluno"}</Title>

      {id && (
        <ProfilePicture>
          {photo ? (
            <img src={photo} crossOrigin="" alt={Aluno.nome} />
          ) : (
            <FaUserCircle size={180} />
          )}
          <Link to={`/fotos/${id}`}>
            <FaEdit size={20} />
          </Link>
        </ProfilePicture>
      )}

      <Form onSubmit={handleSubmit}>
        <label htmlFor="nome">
          Nome:
          <input
            id="nome"
            type="text"
            value={nome || ""}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Digite o nome"
          />
        </label>
        <label htmlFor="sobrenome">
          Sobrenome:
          <input
            id="sobrenome"
            type="text"
            value={sobrenome || ""}
            onChange={(e) => setSobrenome(e.target.value)}
            placeholder="Digite o sobrenome"
          />
        </label>
        <label htmlFor="email">
          E-mail:
          <input
            id="email"
            type="email"
            value={email || ""}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite o e-mail"
          />
        </label>
        <label htmlFor="idade">
          Idade:
          <input
            id="idade"
            type="number"
            value={idade || ""}
            onChange={(e) => setIdade(e.target.value)}
            placeholder="Digite a idade"
            min="0"
            max="120"
          />
        </label>
        <label htmlFor="peso">
          Peso:
          <input
            id="peso"
            type="text"
            value={peso || ""}
            onChange={(e) => setPeso(e.target.value)}
            placeholder="Digite o peso"
          />
        </label>
        <label htmlFor="altura">
          Altura:
          <input
            id="altura"
            type="text"
            value={altura || ""}
            onChange={(e) => setAltura(e.target.value)}
            placeholder="Digite a altura"
          />
        </label>
        <button type="submit">Enviar</button>
      </Form>
    </Container>
  );
}

Aluno.propTypes = {
  match: PropTypes.shape({}).isRequired,
};
