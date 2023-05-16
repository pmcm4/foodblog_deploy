import styles from './home-posts.module.scss';
import classNames from 'classnames';

export interface HomePostsProps {
    className?: string;
}

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/configuration-for-home-postss-and-templates
 */
export const HomePosts = ({ className }: HomePostsProps) => {
    return (
        <div className={classNames(styles.root, className)}>
            <div className={styles.container}>
                <img
                    src="https://wixplosives.github.io/codux-assets-storage/add-panel/image-placeholder.jpg"
                    className={styles.imgclass}
                />
                <div className={styles.contents}>
                    <span className={styles.cat}>Category</span>
                    <span className={styles.title}>Title</span>
                    <span className={styles.contentprev}>Preview</span>
                </div>
                <div className={styles.user}>
                    <img
                        src="https://wixplosives.github.io/codux-assets-storage/add-panel/image-placeholder.jpg"
                        className={styles.profPic}/>
                    <div className={styles.profInfo}>
                        <span className={styles.username}>@Name</span>
                        <span className={styles.time}>Ago</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
