import { Container, Text, Button } from './style';

export function TicketType({
  active,
  setActive,
  setInPerson,
  selected,
  setSelected,
  form,
  setForm,
  event,
  ticketsType,
  setTicket,
}) {
  function inPersonChange() {
    setSelected({ inPerson: true, online: false });
    setActive({ inPersonActive: true, onlineActive: false });
    setInPerson(true);
    setForm({ ...form, online: false, totalPrice: event.inPersonPrice });
  }

  function onlineChange() {
    setSelected({ inPerson: false, online: true });
    setActive({ inPersonActive: false, onlineActive: true });
    setInPerson(false);
    setForm({ ...form, online: true, totalPrice: event.onlinePrice });
    const [ticket] = ticketsType.filter((e) => e.isRemote);
    setTicket(ticket);
  }

  return (
    <>
      <Text>Primeiro, escolha sua modalidade de ingresso</Text>
      <Container>
        <Button active={active.inPersonActive} selected={selected} onClick={inPersonChange}>
          <h5>Presencial</h5>
          <p>R$ 250</p>
        </Button>
        <Button active={active.onlineActive} selected={selected} onClick={onlineChange}>
          <h5>Online</h5>
          <p>R$ 100</p>
        </Button>
      </Container>
    </>
  );
}
