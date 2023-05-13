import React from 'react';
import { PaymentContent, TicketContent, PaymentConfirme, ConfirmeIcon } from './style';
import PaymentForm from './PaymentForm';

export default function TicketPayment() {
  const ticket = {
    id: 1,
    ticketTypeId: 1,
    enrollmentId: 1,
    status: 'RESERVE',
  };

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
        <PaymentForm />
        <button>
          <p>FINALIZAR PAGAMENTO</p>
        </button>
      </>
    );
  }

  function PaymentRender() {
    if (ticket.status === 'PAID') return Paid();
    return Reserve();
  }
  return (
    <>
      <PaymentContent>
        <h1>Ingresso e Pagamento</h1>
        <h2>Ingresso Escolhido</h2>
        <TicketContent>
          <h3>Presencial + Com Hotel</h3>
          <h4>R$600,00</h4>
        </TicketContent>
        <h2>Pagamento</h2>
        <PaymentRender />
      </PaymentContent>
    </>
  );
}
