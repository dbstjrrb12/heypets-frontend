import { useQuery } from '@tanstack/react-query';
import { axiosRequest } from '..';
import { useRecoilValue } from 'recoil';
import { selectedDay, selectedPet } from '@/context/atom/home.atom';
import { ApiResponse } from '@/types/api.types';

type Props = {
  petId: number;
  seletedDay: string;
};

type Plan = {
  type: 0 | 1 | 2 | 3 | 4 | 5;
  interval: 0 | 1 | 2 | 3 | 4 | 5;
  title?: string;
};

const getPlanOf = ({
  petId,
  seletedDay,
}: Props): Promise<ApiResponse<Plan[]>> => {
  const path = '/plans';

  return axiosRequest.get(path, { data: { petId, seletedDay } });
};

export const usePlanList = () => {
  const petInfo = useRecoilValue(selectedPet);
  const dayInfo = useRecoilValue(selectedDay);

  return useQuery(
    ['plans', petInfo?.id, dayInfo],
    () => getPlanOf({ petId: petInfo?.id || 0, seletedDay: dayInfo }),
    {
      // enabled: !!petInfo?.id,
    }
  );
};
