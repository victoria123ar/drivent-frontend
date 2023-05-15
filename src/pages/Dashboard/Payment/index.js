import styled from 'styled-components';
import { useState } from 'react';
import { useEffect } from 'react';
import { getPersonalInformations } from '../../../services/enrollmentApi';
import useToken from '../../../hooks/useToken';
import { StyledTypography } from '../../../components/PersonalInformationForm';
import { TicketType } from './TicketType/index';
import { getEventInfo } from '../../../services/eventApi';
import { TicketHotelType } from './TicketHotelType/index';
import { getTicketsType, createTicket, getTickets } from '../../../services/ticketApi';
import { Reservation } from './TicketReservation';
import PaymentForm from './TicketPayment/PaymentForm';

export default function Payment() {
  const token = useToken();
  const [infos, setInfos] = useState();
  const [active, setActive] = useState({ inPersonActive: false, onlineActive: false });
  const [inPerson, setInPerson] = useState(false);
  const [event, setEvent] = useState();
  const [form, setForm] = useState({ eventId: '', enrollmentId: '', online: '', withHotel: '', totalPrice: '' });
  const [selected, setSelected] = useState({ inPerson: false, online: false });
  const [ticketsType, setTicketsType] = useState();
  const [hotelTicketType, setHotelTicketType] = useState({ selected: false, includesHotel: null });
  const [ticketSelected, setTicketSelected] = useState({});
  const [reserved, setReserved] = useState(false);
  const [userTickets, setUserTickets] = useState();

  useEffect(() => {
    getPersonalInformations(token)
      .then((responsePersonal) => {
        setInfos(true);
      })
      .catch((error) => {
        if (error.status === 404) {
          setInfos(false);
        }
      });
    getEventInfo()
      .then((responseEvent) => {
        setEvent(responseEvent);
      })
      .catch((error) => {});
    getTicketsType(token)
      .then((res) => {
        setTicketsType(res);
      })
      .catch((error) => {
        if (error.status === 404) setInfos(false);
      });
    getTickets(token)
      .then((res) => {
        setUserTickets(res);
      })
      .catch((error) => {
        if (error.status === 404) setUserTickets();
      });
  }, []);

  async function reservation() {
    const bodyRequest = { ticketTypeId: ticketSelected.id };
    try {
      await createTicket(bodyRequest, token);
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
  background-color: red;
`;

const Text = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
