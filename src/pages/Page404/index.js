import React from "react";

import { FaExclamationTriangle } from "react-icons/fa";
import { Container } from "../../styles/GlobalStyles";
import { Div } from "./styled";

export default function Page404() {
  return (
    <Container>
      <Div>
        <FaExclamationTriangle size={100} />
        <h1>404 - Essa página não existe.</h1>
      </Div>
    </Container>
  );
}
