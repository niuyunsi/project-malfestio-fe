import axios, { AxiosResponse } from 'axios';

import { API_URL, PROD_API_URL } from '../config';

const url = process.env.NODE_ENV === 'production' ? PROD_API_URL : API_URL;

interface Animal {
  dateOfEntry: string;
  isEndangered: boolean;
  name: string;
  __v: number;
  _id: string;
}

type ServiceConfig = {
  url: string;
};

class AnimalService {
  constructor(private url: string) {
    console.log('new animal service');
  }
  
  getAnimals = async () => {
    const res = await axios.get<Animal[]>(this.url);
    return res.data;
  };

  createAnimal = async (animal: Partial<Animal>) => {
    const res = await axios.post<Animal>(this.url, animal);
    return res.data;
  };

  deleteAnimal = async (id: string) => {
    const res = await axios.delete(`${this.url}/${id}`);
    console.log('deleteAnimal', res);
    return;
  };

  updateAnimal = async (id: string, animal: Partial<Animal>) => {
    const res = await axios.put(`${this.url}/${id}`, animal);
    console.log('updateAnimal', res);
    return res;
  };
}

export const animalService = new AnimalService(url);
