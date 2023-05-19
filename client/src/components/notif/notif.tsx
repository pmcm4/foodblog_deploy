import styles from './notif.module.scss';
import classNames from 'classnames';

export interface NotifProps {
    className?: string;
}

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/configuration-for-notifs-and-templates
 */
export const Notif = ({ className }: NotifProps) => {
    return (
        <div className={classNames(styles.root, className)}>
            <div className={styles.overlay} />
            <h1 className={styles.NOTIFHEADER}>Notifications</h1>
            <div className={styles.notifBody}>
                <div className={styles.notif}>
                    <img className={styles.userPic} />
                    <div className={styles.notifText}>
                        <span className={styles.userName}>username liked your post</span>
                        <span className={styles.time}>text</span>
                    </div>
                    <img className={styles.postPic} />
                </div>
                <div className={styles.notif}>
                    <img className={styles.userPic} />
                    <div className={styles.notifText}>
                        <span className={styles.userName}>username liked your post</span>
                        <span className={styles.time}>text</span>
                    </div>
                    <img className={styles.postPic} />
                </div>
            </div>
        </div>
    );
};
