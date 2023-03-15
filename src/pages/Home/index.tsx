import { useTheme } from 'contexts/Theme';

import styles from './Home.module.scss';

export function Homepage() {
  const { theme } = useTheme();

  return (
    <>
      <div className={styles.home} data-theme={theme}>
        <h1>
          vite<span>boilerplate 🤙🏾</span>
        </h1>
      </div>
    </>
  );
}
