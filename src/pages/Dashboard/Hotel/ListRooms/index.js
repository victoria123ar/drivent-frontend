import styled from 'styled-components';
import { useState } from 'react';
import { useEffect } from 'react';
import { Container, Text } from './style';
import { getHotelsWithRooms } from '../../../../services/hotelApi';

export async function ListRooms(token, idHotel) {
  const [rooms, setRooms] = useState();

  useEffect(() => {
    const promise = getHotelsWithRooms(token, idHotel);
    promise
      .then((res) => {
        setRooms(res.data);
      })
      .catch((error) => {
        if (error.status === 404) setRooms(false);
      });
  }, []);

  function capacity(qtd) {
    for (let i = 0; i < qtd; i++) {
      return <ion-icon name="person"></ion-icon>;
    }
  }

  return (
    <>
      <Text>Ótima pedida! Agora escolha seu quarto:</Text>
      <Container>
        {rooms.map((r) => (
          <Room key={r.id}>
            <p>{r.id}</p>
            <Capacity>{capacity(r.capacity)}</Capacity>
          </Room>
        ))}
      </Container>
    </>
  );
}

const Room = styled.div``;

const Capacity = styled.div``;
