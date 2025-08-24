import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector } from '../../services/store';
import {
  getUserOrders,
  getUserOrdersHistory
} from '../../services/slices/ordersSlice';
import { useDispatch } from '../../services/store';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useSelector(getUserOrders);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserOrdersHistory());
  }, []);

  return <ProfileOrdersUI orders={orders} />;
};
