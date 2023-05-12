import { Container, Text, Button } from './style';

export function TicketType() {
  return (
    <>
      <Text>Primeiro, escolha sua modalidade de ingresso</Text>
      <Container>
        <Button>
          <h5>Presencial</h5>
          <p>R$ 250</p>
        </Button>
        <Button>
          <h5>Online</h5>
          <p>R$ 100</p>
        </Button>
      </Container>
    </>
  );
}
