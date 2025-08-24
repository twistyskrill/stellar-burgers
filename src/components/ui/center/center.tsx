import { FC, memo } from 'react';

import styles from './center.module.css';

import { TCenterUI } from './type';

export const CenterUI: FC<TCenterUI> = memo(({ title, children }) => (
  <>
    <div className={styles.center}>
      <div className={styles.header}>
        <h3
          className={`text text_type_main-medium  pb-3 pt-10 ${styles.header}`}
        >
          {title}
        </h3>
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  </>
));
