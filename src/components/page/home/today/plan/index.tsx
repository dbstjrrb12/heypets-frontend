import { EMPTY_DATA_MESSAGE } from '@/components/common/errorboundary/empty-boundary';
import PlanItem from './plan-item';
import style from './plan.module.css';

import { usePlanList } from '@/api/calendar/plan';
import { useEffect, useState } from 'react';
import DownIcon from 'public/icons/arrow_down.svg';

import cn from 'classnames';

const Plan = ({ className }: { className?: string }) => {
  const { data } = usePlanList();
  const planList = data?.data;
  const [displaySize, setDisplaySize] = useState(5);

  useEffect(() => {
    if (planList && planList.length === 0) {
      throw new Error(EMPTY_DATA_MESSAGE);
    }
  }, [planList]);

  return (
    <div className={cn(style.container, className)}>
      <ul className={style.wrapper}>
        {planList?.slice(0, displaySize).map(({ type, interval, title }) => {
          return (
            <li key={`type${type}_interval${interval}`}>
              <PlanItem type={type} interval={interval} title={title} />
            </li>
          );
        })}
      </ul>

      {planList && displaySize < planList.length && (
        <button
          type="button"
          className={style.link}
          onClick={() =>
            setDisplaySize((prev) =>
              prev + 3 <= planList.length ? prev + 3 : planList.length
            )
          }>
          <span>일정 더 보기</span>
          <DownIcon />
        </button>
      )}
    </div>
  );
};

export default Plan;
