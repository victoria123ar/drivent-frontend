import styled from 'styled-components';
import { useState } from 'react';
import { useEffect } from 'react';
import useToken from '../../../hooks/useToken';
import { StyledTypography } from '../../../components/PersonalInformationForm';
import { getTicket } from '../../../services/ticketApi';
import { ListHotels } from './ListHotels';

export default function Hotels() {
  const token = useToken();
  const [remoteStatus, setRemoteStatus] = useState(false);
  const [ticketStatus, setTicketStatus] = useState(false);
  const [ticket, setTicket] = useState();

  useEffect(() => {
    const promise = getTicket(token);
    promise
      .then((res) => {
        setTicket(res.data);
      })
      .catch((error) => {
        if (error.status === 404) setTicket(false);
      });
  }, []);

  if (ticket.status === 'PAID') setTicketStatus(true);

  if(ticket.TicketType.isRemote) setRemoteStatus(true);

  return (
    <>
      <StyledTypography variant="h4"> Escolha de hotel e quarto </StyledTypography>
      {!ticket || !ticketStatus ? (
        <Container>
          <Text>Você precisa ter confirmado pagamento antes de fazer a escolha de hospedagem.</Text>
        </Container>
      ) : !remoteStatus ? (
        <Container>
          <Text>Sua modalidade de ingresso não inclui hospedagem.<br/>Prossiga para a escolha de atividades.</Text>
        </Container>
      ):(
        <>
          <ListHotels
          token={token}
          />
        </>
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
