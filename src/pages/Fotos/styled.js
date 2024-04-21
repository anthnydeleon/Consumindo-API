import styled from "styled-components";
import { primaryColor } from "../../config/colors";

// export const NOME = styled.{TAG} `{estilização}`
export const Title = styled.h1`
  text-align: center;
`;

export const Form = styled.form`
  label {
    width: 180px;
    height: 180px;
    display: flex;
    background: #eee;
    border: 5px dashed ${primaryColor};
    margin: 30px auto;
    cursor: pointer;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    color: gray;
    overflow: hidden;

    img {
      width: 180px;
      height: 180px;
    }
  }

  input {
    display: none;
  }
`;
