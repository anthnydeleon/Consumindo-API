import styled from "styled-components";
import { primaryColor, primaryDarkColor } from "../../config/colors";

export const Nav = styled.nav`
  background: ${primaryColor};
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);

  a {
    color: #fff;
    font-weight: bold;
  }
`;
