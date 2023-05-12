import { Container, Text, Button } from './style';

export function Reservation() {
  return (
    <>
      <Text>Fechado! O total ficou em R$ 600. Agora é só confirmar:</Text>
      <Container>
        <Button>
          <h5>RESERVAR INGRESSO</h5>
        </Button>
      </Container>
    </>
  );
}
