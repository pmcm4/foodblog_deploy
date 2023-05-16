import styles from './modal-errors.module.scss';
import classNames from 'classnames';

export interface ModalErrorsProps {
    className?: string;
    errorMessage: string | null;
}

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/configuration-for-modal-errorss-and-templates
 */
export const ModalErrors = ({ className, errorMessage }: ModalErrorsProps) => {
    return (
        <div className={classNames(styles.root, className)}>
            <div className={styles.container}>
                <h1 className={styles.errorheader}>Error</h1>
                <hr className={styles.divider} />
                {errorMessage && <span className={styles.errormessage}>{errorMessage}</span>}
                
            </div>
        </div>
    );
};
