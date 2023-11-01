import ListBox from '@/components/common/listbox';
import PetItem from '../petitem';

import style from './petlist.module.css';
import { usePetList } from '@/api/pet/list';
import { MouseEvent, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { selectedPet as selectedPetAtom } from '@/context/atom/home.atom';
import Link from 'next/link';

type PetListProps = {
  className?: string;
};

const PetList = ({ className }: PetListProps) => {
  const { data: pets } = usePetList();
  const petList = pets?.data;
  const [selectedPet, setSelectedPet] = useRecoilState(selectedPetAtom);

  const onPetChange = (e: MouseEvent) => {
    const target = e.target as HTMLLIElement;
    const id = target.dataset.id;

    setSelectedPet(
      (prev) => petList?.find(({ id: petId }) => petId === Number(id)) || prev
    );
  };

  useEffect(() => {
    if (petList && petList.length > 0) setSelectedPet(petList[0]);
  }, [pets]);

  return (
    <ListBox value={selectedPet} className={className} onChange={onPetChange}>
      <ListBox.Button>
        {selectedPet && (
          <PetItem
            gender={selectedPet.gender}
            imgUrl={selectedPet.imgUrl}
            name={selectedPet.name}
          />
        )}
        {!selectedPet && (
          <Link href={'/'}>
            <PetItem imgUrl="/image/add.png" name="반려견 추가" />
          </Link>
        )}
      </ListBox.Button>

      <ListBox.Options className={style.list}>
        {petList && petList.length > 0 && (
          <>
            {petList
              .filter(({ id }) => id !== selectedPet?.id)
              .map(({ imgUrl, name, gender, id }) => {
                return (
                  <ListBox.Option key={name} value={id} className={style.item}>
                    <PetItem
                      name={name}
                      imgUrl={imgUrl}
                      gender={gender}
                      className={style.petItem}
                    />
                  </ListBox.Option>
                );
              })}
            <Link href={'/'} className={style.item}>
              <PetItem imgUrl="/image/add.png" name="반려견 추가" />
            </Link>
          </>
        )}
      </ListBox.Options>
    </ListBox>
  );
};

export default PetList;
