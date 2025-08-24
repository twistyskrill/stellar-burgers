import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { TCenter } from './type';
import { CenterUI } from '../ui/center';

export const Center: FC<TCenter> = memo(({ title, children }) => (
  <>
    <CenterUI title={title} children={children} />
  </>
));
