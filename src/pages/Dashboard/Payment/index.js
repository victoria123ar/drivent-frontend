import styled from 'styled-components';
import { useState } from 'react';
import { useEffect } from 'react';
import { getPersonalInformations } from '../../../services/enrollmentApi';
import useToken from '../../../hooks/useToken';
import { StyledTypography } from '../../../components/PersonalInformationForm';
import { TicketType } from './TicketType/index';

export default function Payment() {
  const token = useToken();
  const [infos, setInfos] = useState();

  useEffect(() => {
    const promise = getPersonalInformations(token);
    promise
      .then((responsePersonal) => {
        setInfos(true);
      })
      .catch((error) => {
        if (error.status === 404) setInfos(false);
      });
  });

  return (
    <>
      <StyledTypography variant="h4"> Ingresso e pagamento</StyledTypography>
      {!infos ? (
        <Container>
          <Text>Você precisa completar a sua inscrição antes de prosseguir pra escolha de ingresso</Text>
        </Container>
      ) : (
        <TicketType />
      )}
    </>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: red;
`;

const Text = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
