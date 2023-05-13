import styled from 'styled-components';
import { AiFillCheckCircle } from 'react-icons/ai';

export const PaymentContent = styled.div`
  h1 {
    font-size: 34px;
    margin-bottom: 40px;
  }
  h2 {
    font-size: 20px;
    color: #8e8e8e;
    margin-bottom: 20px;
  }
  button {
    width: 200px;
    height: 45px;
    background: #e0e0e0;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-color: transparent;
    margin-top: 45px;
    &:hover {
      cursor: pointer;
      width: 210px;
      height: 50px;
      transition: 0.5s;
      p {
        font-size: 14px;
        transition: 0.5s;
      }
    }
    &:not(:hover) {
      transition: 0.7s;
    }
    p {
      text-decoration: none;
      font-family: 'Lexend Deca';
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      text-align: center;
      color: #000000;
    }
  }
`;
export const TicketContent = styled.div`
  width: 290px;
  height: 108px;
  background-color: #ffeed2;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 30px;
  h3 {
    margin-bottom: 8px;
  }
  h4 {
    color: #8e8e8e;
  }
`;
export const PaymentConfirme = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

export const ConfirmeIcon = styled(AiFillCheckCircle)`
  color: #36b853;
  font-size: 40px;
  margin-right: 10px;
`;
