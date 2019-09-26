import axios from 'axios';

import { API_URL, PROD_API_URL } from '../config';
import { Animal } from '../common/types';

const url = process.env.NODE_ENV === 'production' ? PROD_API_URL : API_URL;

class AnimalService {
  constructor(private url: string) {}

  getAnimals = async () => {
    const res = await axios.get<Animal[]>(this.url);
    return res.data;
  };

  createAnimal = async (animal: Partial<Animal>) => {
    const res = await axios.post<Animal>(this.url, animal);
    return res.data;
  };

  deleteAnimal = async (id: string) => {
    await axios.delete(`${this.url}/${id}`);
    return;
  };

  updateAnimal = async (id: string, animal: Partial<Animal>) => {
    await axios.put(`${this.url}/${id}`, animal);
    return;
  };
}

export const animalService = new AnimalService(url);
