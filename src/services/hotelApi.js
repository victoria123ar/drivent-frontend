import api from './api';

export async function getHotels(token) {
    const response = await api.get( '/hotel', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data;
}

export async function getHotelsWithRooms(token, hotelId) {
    const response = await api.get(`/hotel/${hotelId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data;
}