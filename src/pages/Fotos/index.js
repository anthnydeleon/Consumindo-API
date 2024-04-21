import React, { useState, useEffect } from "react";
import { get } from "lodash";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

import { toast } from "react-toastify";
import * as actions from "../../store/modules/auth/actions";
import { Container } from "../../styles/GlobalStyles";
import Loading from "../../components/Loading";
import { Title, Form } from "./styled";
import axios from "../../services/axios";
import history from "../../services/history";

export default function Fotos({ match }) {
  const dispatch = useDispatch();

  const id = get(match, "params.id", "");

  const [isLoading, setIsLoading] = useState(false);
  const [photo, setPhoto] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`/alunos/${id}`);
        const Photo = get(data, "Photos[0].url", "");

        setPhoto(Photo);
        setIsLoading(false);
      } catch {
        toast.error("Erro ao obter a imagem");
        setIsLoading(false);
        history.push("/");
      }
    };
    getData();
  }, [id]);

  const handleChange = async (e) => {
    const foto = e.target.files[0];
    const photoURL = URL.createObjectURL(foto);

    setPhoto(photoURL);

    const formData = new FormData();
    formData.append("aluno_id", id);
    formData.append("foto", foto);

    setIsLoading(true);
    try {
      await axios.post("/photos", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Foto enviada com sucesso.");

      setIsLoading(false);
    } catch (err) {
      const { status } = get(err, "response", "");
      toast.error("Erro ao enviar a foto.");

      if (status === 401) dispatch(actions.loginFailure());

      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />

      <Title>Fotos</Title>

      <Form>
        <label htmlFor="photo">
          {photo ? <img src={photo} crossOrigin="" alt="" /> : "Selecionar"}
          <input type="file" id="photo" onChange={handleChange} />
        </label>
      </Form>
    </Container>
  );
}

Fotos.propTypes = {
  match: PropTypes.shape({}).isRequired,
};
