import Image from 'next/image';

import Male from 'public/icons/male.svg';
import Female from 'public/icons/femaie.svg';

import style from './petitem.module.css';
import { useState } from 'react';

import cn from 'classnames';

type PetItemsProps = {
  imgUrl: string;
  gender?: 0 | 1;
  name: string;
  className?: string;
};
const PetItem = ({ imgUrl, gender, name, className }: PetItemsProps) => {
  const [url, setUrl] = useState(imgUrl);

  const onError = () => {
    const fallbackUrl = '/image/profile.png';
    setUrl(fallbackUrl);
  };

  return (
    <div className={cn(style.wrapper, className)}>
      <Image src={url} width={48} height={48} alt={name} onError={onError} />
      <div className={style.contentWrapper}>
        {gender === 0 && <Male />}
        {gender === 1 && <Female />}
        <span className={style.name}>{name || ''}</span>
      </div>
    </div>
  );
};

export default PetItem;
