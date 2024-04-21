import styled from "styled-components";
import { Link } from "react-router-dom";

// export const NOME = styled.{TAG} `{estilização}`
export const AlunoContainer = styled.div`
  margin-top: 20px;

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 0;
  }

  div + div {
    border-top: 1px solid #ccc;
  }
`;

export const ProfilePicture = styled.div`
  img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
  }
`;

export const DivNewAluno = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 15px;
`;
