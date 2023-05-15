import styled from 'styled-components';
import { useState } from 'react';
import { useEffect } from 'react';
import useEnrollment from '../../../hooks/api/useEnrollment';
import useToken from '../../../hooks/useToken';
import { StyledTypography } from '../../../components/PersonalInformationForm';
import { TicketType } from './TicketType/index';
import { TicketHotelType } from './TicketHotelType/index';
import { getTicketsType } from '../../../services/ticketApi';
import { Reservation } from './Reservation';

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
      .then((res) => {
        setTicketsType(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (!ticketsType) return <>Carregando...</>;

  return (
    <>
      <StyledTypography variant="h4"> Ingresso e pagamento</StyledTypography>
      {!enrollment ? (
        <Container>
          <Text>
            Você precisa completar sua inscrição antes
            <br />
            de prosseguir pra escolha de ingresso
          </Text>
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
            ticketsType={ticketsType}
            setTicket={setTicket}
          />
          {!inPerson ? (
            <></>
          ) : (
            <TicketHotelType
              ticketsType={ticketsType}
              hotelTicketType={hotelTicketType}
              setHotelTicketType={setHotelTicketType}
              setTicket={setTicket}
            />
          )}
          {selected.online || hotelTicketType.selected ? (
            <Reservation setReserved={setReserved} ticket={ticket} />
          ) : (
            <></>
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
