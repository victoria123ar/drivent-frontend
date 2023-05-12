import { Container, Text, Button } from './style';

export function TicketHotelType() {
  return (
    <>
      <Text>Ótimo! Agora escolha sua modalidade de hospedagem</Text>
      <Container>
        <Button>
          <h5>Sem Hotel</h5>
          <p>+ R$ 0</p>
        </Button>
        <Button>
          <h5>Com Hotel</h5>
          <p>+ R$ 350</p>
        </Button>
      </Container>
    </>
  );
}
