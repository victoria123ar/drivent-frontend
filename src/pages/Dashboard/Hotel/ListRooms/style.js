import styled from "styled-components";

export const Container = styled.div`
  height: 90%;
  display: flex;
  flex-wrap: wrap;
  padding: 0 35px;
`;

export const Text = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  font-family: 'Roboto';
  font-size: 20px;
  text-align: center;

  color: #8E8E8E;
`;

export const Room = styled.div`
    box-sizing: border-box;
    width: 190px;
    height: 45px;
    display: flex;
    justify-content: space-between;
    align-items:center;
    border: 1px solid #CECECE;
    border-radius: 10px;
    p{
        font-family: 'Roboto';
        font-weight: 700;
        font-size: 20px;
        text-align: center;
        color: #454545;
    }
`;

export const Capacity = styled.div`
    ion-icon{
        width: 12.5%;
        height: 12.5%;

        background: #000000;
    }
`;