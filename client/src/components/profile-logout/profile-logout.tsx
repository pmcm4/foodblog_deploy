import { AuthContext } from '../../context/authContext';
import styles from './profile-logout.module.scss';
import classNames from 'classnames';
import { useContext } from 'react';

export interface ProfileLogoutProps {
    className?: string;
}

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/configuration-for-profile-logouts-and-templates
 */
export const ProfileLogout = ({ className }: ProfileLogoutProps) => {
    const {currentUser} = useContext(AuthContext)
    console.log("hello"+currentUser)
    return (
        <div className={classNames(styles.root, className)}>
            <div className={styles.toProfileBtn}>
                <p className={styles.userProfileName}></p>
            </div>
            <div className={styles.toLogoutBtn}>
                <p className={styles.logOut}>Log out</p>
            </div>
            
        </div>
    );
};
