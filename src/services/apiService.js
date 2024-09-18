const BASE_URL = 'https://fast-tensor-435818-j0.rj.r.appspot.com'; // URL de tu backend

export const fetchAnimales = async () => {
    const response = await fetch(`${BASE_URL}/animales`);
    return response.json();
};

export const createAnimal = async (animalData) => {
    const response = await fetch(`${BASE_URL}/animal`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(animalData),
    });
    return response.json();
};

export const updateAnimal = async (id, animalData) => {
    const response = await fetch(`${BASE_URL}/animal/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(animalData),
    });
    return response.json();
};

export const deleteAnimal = async (id) => {
    const response = await fetch(`${BASE_URL}/animal/${id}`, {
        method: 'DELETE',
    });
    return response.json();
};
