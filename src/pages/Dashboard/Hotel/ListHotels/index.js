import styled from 'styled-components';
import { useState } from 'react';
import { useEffect } from 'react';
import { ListRooms } from '../ListRooms';
import { getHotels } from '../../../../services/hotelApi';
import { Link, useParams } from 'react-router-dom';
import { Container, Text } from './style';

export async function ListHotels(token) {
  const { idHotel } = useParams();
  const [hotels, setHotels] = useState();
  const [typeRooms, setTypeRooms] = useState();
  const [onRooms, setOnRooms] = useState();

  useEffect(() => {
    const promise = getHotels(token);
    promise
      .then((res) => {
        setHotels(res.data);
      })
      .catch((error) => {
        if (error.status === 404) setHotels(false);
      });
  }, []);

  if (idHotel) {
    return (
      <>
        {!hotels ? (
          <Container>
            <Text>Ainda não há hoteis cadastrados.</Text>
          </Container>
        ) : (
          <>
            <Text>Primeiro, escolha seu hotel</Text>
            <Container>
              {hotels.map((h) =>
                h.id === idHotel ? (
                  <Link to={`/hotel/${h.id}`} key={h.id}>
                    <HotelSelect>
                      <img src={h.image} />
                      <h1>{h.name}</h1>
                      <strong>Tipo de acomodação:</strong>
                      <p>{typeRooms}</p>
                      <strong>Vagas disponíveis:</strong>
                      <p>{onRooms}</p>
                    </HotelSelect>
                  </Link>
                ) : (
                  <Link to={`/hotel/${h.id}`} key={h.id}>
                    <Hotel>
                      <img src={h.image} />
                      <h1>{h.name}</h1>
                      <strong>Tipo de acomodação:</strong>
                      <p>{typeRooms}</p>
                      <strong>Vagas disponíveis:</strong>
                      <p>{onRooms}</p>
                    </Hotel>
                  </Link>
                )
              )}
            </Container>
            <ListRooms token={token} idHotel={idHotel} />
          </>
        )}
      </>
    );
  }

  return (
    <>
      {!hotels ? (
        <Container>
          <Text>Ainda não há hoteis cadastrados.</Text>
        </Container>
      ) : (
        <>
          <Text>Primeiro, escolha seu hotel</Text>
          <Container>
            {hotels.map((h) => (
              <Link to={`/hotel/${h.id}`} key={h.id}>
                <Hotel>
                  <img src={h.image} />
                  <h1>{h.name}</h1>
                  <strong>Tipo de acomodação:</strong>
                  <p>{typeRooms}</p>
                  <strong>Vagas disponíveis:</strong>
                  <p>{onRooms}</p>
                </Hotel>
              </Link>
            ))}
          </Container>
        </>
      )}
    </>
  );
}

const Hotel = styled.div`
  background-color: red;
`;

const HotelSelect = styled.div`
  background-color: red;
`;
