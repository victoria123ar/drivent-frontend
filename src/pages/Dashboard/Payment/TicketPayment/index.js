import React, { useState } from 'react';
import { PaymentContent, TicketContent, PaymentConfirme, ConfirmeIcon, CardContent } from './style';
import useToken from '../../../../hooks/useToken';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';

const PaymentForm = ({ ticket }) => {
  const [ticketStatus, setTicketStatus] = useState('RESERVE');
  const ticketPrice = ticket.TicketType.price;
  const token = useToken();
  const [number, setNumber] = useState('');
  const [expiry, setExpity] = useState('');
  const [cvc, setCvc] = useState('');
  const [name, setName] = useState('');
  const [focus, setFocus] = useState('');
  const handleInputFocus = (evt) => {
    setFocus(evt.target.name);
  };
  console.log('Jorge');
  console.log(ticket);
  function Paid() {
    return (
      <>
        <PaymentConfirme>
          <ConfirmeIcon />
          <p>
            <strong>Pagamento confirmado!</strong>
            <br />
            Prossiga para escolha de hospedagem e atividades
          </p>
        </PaymentConfirme>
      </>
    );
  }
  function Reserve() {
    return (
      <>
        <CardContent>
          <Cards number={number} expiry={expiry} cvc={cvc} name={name} focused={focus} />
          <form>
            <input
              type="number"
              name="number"
              placeholder="Card Number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              onFocus={handleInputFocus}
              required
            />
            <h5>E.g.: 49..., 51..., 36..., 37...</h5>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onFocus={handleInputFocus}
              maxLength={16}
              required
            />
            <input
              type="number"
              name="expiry"
              placeholder="Valid Thru"
              value={expiry}
              onChange={(e) => setExpity(e.target.value)}
              onFocus={handleInputFocus}
              className="validThru"
              maxLength={4}
              minLength={4}
              required
            />
            <input
              type="number"
              name="cvc"
              placeholder="CVC"
              value={cvc}
              onChange={(e) => setCvc(e.target.value)}
              onFocus={handleInputFocus}
              className="cvc"
              maxLength={3}
              minLength={3}
              required
            />
          </form>
        </CardContent>
        <button onClick={finalizePayment}>
          <p>FINALIZAR PAGAMENTO</p>
        </button>
      </>
    );
  }

  function PaymentRender() {
    if (ticketStatus === 'PAID') return Paid();
    return Reserve();
  }

  function finalizePayment(e) {
    setTicketStatus('PAID');
  }

  return (
    <>
      <PaymentContent>
        <h1>Ingresso e Pagamento</h1>
        <h2>Ingresso Escolhido</h2>
        <TicketContent>
          <h3>{ticket.TicketType.name}</h3>
          <h4>+ {ticketPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h4>
        </TicketContent>
        <h2>Pagamento</h2>
        <PaymentRender />
      </PaymentContent>
    </>
  );
};

export default PaymentForm;
