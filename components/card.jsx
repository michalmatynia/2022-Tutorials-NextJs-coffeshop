import Link from 'next/link';
import Image from 'next/image';
import cls from 'classnames';

import styles from './card.module.css';

function Card({ href, imgUrl, title }) {
  return (
    <Link href={href}>
      <a className={styles.cardLink}>
        <div className={cls('glass', styles.container)}>
          <div className={styles.cardHeaderWrapper}>
            <h2 className={styles.cardHeader}>{title}</h2>
          </div>
          <div className={styles.cardImageWrapper}>
            <Image
              alt={title}
              className={styles.cardImage}
              src={imgUrl}
              width={260}
              height={160}
            />
          </div>
        </div>
      </a>
    </Link>
  );
}

export default Card;
