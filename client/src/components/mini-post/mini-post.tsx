import styles from './mini-post.module.scss';
import classNames from 'classnames';

export interface MiniPostProps {
    className?: string;
}

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/configuration-for-mini-posts-and-templates
 */
export const MiniPost = ({ className }: MiniPostProps) => {
    return (
        <div className={classNames(styles.root, className)}>
            <img
                className={styles.image}
                src={
                    'https://res.cloudinary.com/dgb2lnz2i/image/upload/v1683915156/example_vclscm.png'
                }
            />
        </div>
    );
};
