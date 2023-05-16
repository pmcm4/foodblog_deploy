import styles from './comments.module.scss';
import classNames from 'classnames';

export interface CommentsProps {
    className?: string;
}

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/configuration-for-commentss-and-templates
 */
export const Comments = ({ className }: CommentsProps) => {
    return (
        <div className={classNames(styles.root, className)}>
            <div className={styles.commentcontainer}>
                <h1 className={styles.header}>Comments</h1>
                <hr className={styles.divider} />
                <div className={styles.commentHouse}>
                    <div className={styles.commentBox}>
                        <img
                            src="https://wixplosives.github.io/codux-assets-storage/add-panel/image-placeholder.jpg"
                            className={styles.user}
                        />
                        <div className={styles.commentText}>
                            <span className={styles.username}>@username</span>
                            <span className={styles.commentcontent}>text</span>
                            <span className={styles.date}>text</span>
                        </div>
                    </div>

                    <div className={styles.commentBox}>
                        <img
                            src="https://wixplosives.github.io/codux-assets-storage/add-panel/image-placeholder.jpg"
                            className={styles.user}
                        />
                        <div className={styles.commentText}>
                            <span className={styles.username}>@username</span>
                            <span className={styles.commentcontent}>text</span>
                            <span className={styles.date}>text</span>
                        </div>
                    </div>

                    <div className={styles.commentBox}>
                        <img
                            src="https://wixplosives.github.io/codux-assets-storage/add-panel/image-placeholder.jpg"
                            className={styles.user}
                        />
                        <div className={styles.commentText}>
                            <span className={styles.username}>@username</span>
                            <span className={styles.commentcontent}>text</span>
                            <span className={styles.date}>text</span>
                        </div>
                    </div>

                    <div className={styles.commentBox}>
                        <img
                            src="https://wixplosives.github.io/codux-assets-storage/add-panel/image-placeholder.jpg"
                            className={styles.user}
                        />
                        <div className={styles.commentText}>
                            <span className={styles.username}>@username</span>
                            <span className={styles.commentcontent}>text</span>
                            <span className={styles.date}>text</span>
                        </div>
                    </div>
                </div>
                <div className={styles.yourCommentContainer}>
                    <div className={styles.upper}>
                        <img
                            src="https://wixplosives.github.io/codux-assets-storage/add-panel/image-placeholder.jpg"
                            className={styles.user}
                        />
                        <textarea className={styles.textArea} placeholder={'Comment Here...'} />
                    </div>
                    <button className={styles.commentBtn}>Comment</button>
                </div>
            </div>
        </div>
    );
};
