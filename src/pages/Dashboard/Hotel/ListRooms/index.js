import { useState } from 'react';
import { useEffect } from 'react';
import { getHotelsWithRooms } from '../../../../services/hotelApi';
import { Container, Room, Capacity } from './style';

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
};