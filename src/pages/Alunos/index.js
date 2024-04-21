/* eslint-disable react/button-has-type */
import React, { useEffect, useState } from "react";
import { get } from "lodash";
import { Link } from "react-router-dom";
import {
  FaUserCircle,
  FaEdit,
  FaWindowClose,
  FaExclamation,
} from "react-icons/fa";

import { toast } from "react-toastify";
import { Container } from "../../styles/GlobalStyles";
import { AlunoContainer, ProfilePicture, DivNewAluno } from "./styled";
import axios from "../../services/axios";

import Loading from "../../components/Loading";

export default function Alunos() {
  const [alunos, setAlunos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      const response = await axios.get("/alunos");
      setAlunos(response.data);
      setIsLoading(false);
    }

    getData();
  }, []);

  const handleDeleteAsk = (e) => {
    e.preventDefault();
    const exclamation = e.currentTarget.nextSibling;
    exclamation.setAttribute("display", "block");
    e.currentTarget.remove();
  };

  const handleDelete = async (e, id, index) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await axios.delete(`/alunos/${id}`);
      const novosAlunos = [...alunos];
      novosAlunos.splice(index, 1);
      setAlunos(novosAlunos);
      setIsLoading(false);
      toast.success("Aluno deletado");
    } catch (err) {
      const status = get(err, "response.status", 0);

      if (status === 401) {
        toast.error("Você precisa estar logado.");
      } else {
        toast.error("Ocorreu um erro ao excluir aluno");
      }
      setIsLoading(false);
    }
  };
  return (
    <Container>
      <Loading isLoading={isLoading} />
      <DivNewAluno>
        <h1>Alunos</h1>
        <Link to="/aluno/">
          <button>Novo aluno</button>
        </Link>
      </DivNewAluno>

      <AlunoContainer>
        {alunos.map((aluno, index) => (
          <div key={String(aluno.id)}>
            <ProfilePicture>
              {get(aluno, "Photos[0].url", false) ? (
                <img crossOrigin="" src={aluno.Photos[0].url} alt="" />
              ) : (
                <FaUserCircle size={36} />
              )}
            </ProfilePicture>
            <span>
              {aluno.nome} {aluno.sobrenome}
            </span>
            <span>{aluno.email}</span>

            <Link to={`/aluno/${aluno.id}/edit`}>
              <FaEdit color="green" size={16} />
            </Link>
            <Link to={`/aluno/${aluno.id}/delete`} onClick={handleDeleteAsk}>
              <FaWindowClose color="red" size={16} />
            </Link>

            <FaExclamation
              onClick={(e) => handleDelete(e, aluno.id, index)}
              size={16}
              color="red"
              display="none"
              cursor="pointer"
            />
          </div>
        ))}
      </AlunoContainer>
    </Container>
  );
}
