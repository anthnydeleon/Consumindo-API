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

export const ProfilePicture = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 0 20px;
  position: relative;

  img {
    width: 180px;
    height: 180px;
    border-radius: 50%;
  }

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom: 0;
    color: #fff;
    background: ${primaryColor};
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
`;

export const Title = styled.h1`
  text-align: center;
  margin-bottom: 10px;
`;
