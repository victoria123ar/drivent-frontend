import styled from 'styled-components';
import { useState } from 'react';
import { useEffect } from 'react';
import useEnrollment from '../../../hooks/api/useEnrollment';
import useToken from '../../../hooks/useToken';
import { StyledTypography } from '../../../components/PersonalInformationForm';
import { TicketType } from './TicketType/index';
import { TicketHotelType } from './TicketHotelType/index';
import { getTicketsType, createTicket, getTickets } from '../../../services/ticketApi';
import { Reservation } from './TicketReservation';
import PaymentForm from './TicketPayment/PaymentForm';

export default function Payment() {
  const token = useToken();
  const [active, setActive] = useState({ inPersonActive: false, onlineActive: false });
  const [inPerson, setInPerson] = useState(false);
  const [form, setForm] = useState({ eventId: '', enrollmentId: '', online: '', withHotel: '', totalPrice: '' });
  const [selected, setSelected] = useState({ inPerson: false, online: false });
  const [ticketsType, setTicketsType] = useState();
  const [hotelTicketType, setHotelTicketType] = useState({ selected: false, includesHotel: null });
  const [ticket, setTicket] = useState({});
  const [reserved, setReserved] = useState(false);
  const { enrollment } = useEnrollment();

  useEffect(() => {
    const promise = getTicketsType(token);
    promise
  const [ticketSelected, setTicketSelected] = useState({});
  const [reserved, setReserved] = useState(false);
  const [userTickets, setUserTickets] = useState();

  async function reservation() {
    const bodyRequest = { ticketTypeId: ticketSelected.id };
    try {
      const newTicket = await createTicket(bodyRequest, token);
      setUserTickets(newTicket);
      setReserved(true);
    } catch (error) {
      alert('Erro ao reservar ticket');
      setTicketSelected({});
      setHotelTicketType({ selected: false, includesHotel: null });
    }
  }

  if (!ticketsType) return <>Carregando...</>;

  return (
    <>
      {reserved || userTickets ? (
        <PaymentForm />
      ) : (
        <>
          <StyledTypography variant="h4"> Ingresso e pagamento</StyledTypography>
          {!infos ? (
            <Container>
              <Text>Você precisa completar sua inscrição antes de prosseguir pra escolha de ingresso</Text>
            </Container>
          ) : (
            <>
              <TicketType
                active={active}
                setActive={setActive}
                setInPerson={setInPerson}
                selected={selected}
                setSelected={setSelected}
                form={form}
                setForm={setForm}
                event={event}
                ticketsType={ticketsType}
                setTicketSelected={setTicketSelected}
                setHotelTicketType={setHotelTicketType}
              />
              {!inPerson ? (
                <></>
              ) : (
                <TicketHotelType
                  ticketsType={ticketsType}
                  hotelTicketType={hotelTicketType}
                  setHotelTicketType={setHotelTicketType}
                  setTicketSelected={setTicketSelected}
                />
              )}
              {selected.online || hotelTicketType.selected ? (
                <Reservation reservation={reservation} ticketSelected={ticketSelected} />
              ) : (
                <></>
              )}
            </>
          )}
        </>
      )}
    </>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Text = styled.span`
  font-family: 'Roboto';
  font-weight: 400;
  font-size: 20px;
  color: #8e8e8e;
  text-align: center;
  line-height: 23px;
  margin-top: 40%;
`;
