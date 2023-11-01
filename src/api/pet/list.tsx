import { useQuery } from '@tanstack/react-query';
import { axiosRequest } from '..';
import { ApiResponse } from '@/types/api.types';

export type Pet = {
  id: number;
  name: string;
  gender: 0 | 1;
  imgUrl: string;
};

export const petList = async (): Promise<ApiResponse<Pet[]>> => {
  return await axiosRequest.get('/pets');
};

export const usePetList = () => {
  return useQuery(['pets'], petList);
};
