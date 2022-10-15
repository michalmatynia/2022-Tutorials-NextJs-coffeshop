import styles from '../styles/Banner.module.css';

function Banner({ buttonText, handleOnClick }) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <span className={styles.title1}>Coffee</span>{' '}
        <span className={styles.title2}>Conneseuir</span>
        <p className={styles.subTitle}>Discover your local coffee</p>
        <div className={styles.buttonWrapper}>
          <button
            className={styles.button}
            onClick={handleOnClick}
            type="button"
          >
            {buttonText}
          </button>
        </div>
      </h1>
    </div>
  );
}

export default Banner;
