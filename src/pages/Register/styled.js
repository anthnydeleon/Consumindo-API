import styled from "styled-components";
import { primaryColor } from "../../config/colors";

// export const NOME = styled.{TAG} `{estilização}`
export const Form = styled.form`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  label {
    display: flex;
    flex-direction: column;
  }

  input {
    margin-top: 5px;
    height: 30px;
    font-size: 18px;
    border: 1px solid #ddd;
    padding: 10px;
    border-radius: 4px;

    &:focus {
      border: 1px solid ${primaryColor};
    }
  }
`;
