import styles from './user-profile.module.scss';
import classNames from 'classnames';
import { Navbar } from '../navbar/navbar';
import { Footer } from '../footer/footer';
import { MiniPost } from '../mini-post/mini-post';
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/authContext';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export interface UserProfileProps {
    className?: string;
}

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/configuration-for-user-profiles-and-templates
 */
export const UserProfile = ({ className }: UserProfileProps) => {
    const [likes, setLikes] = useState<{img: string , id: string  }[]>([]);
    const {currentUser, logout} = useContext(AuthContext)

    const location = useLocation();
    const postId = location.pathname.split("/")[2];
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
          try {
            const res = await axios.get(`/posts/user/${postId}`);
            setLikes(res.data);
          } catch (err) {
            console.log(err);
          }
        };
        fetchData();
      }, [postId]);

      useEffect(() => {
        if (!currentUser) {
          navigate('/login');
        }
      }, [currentUser, navigate]);

    return (
        <div className={classNames(styles.root, className)}>
            <Navbar />
            <div className={styles.content}>
                <div className={styles.prof}>
                    <div className={styles.profPic} />
                    <h1 className={styles.profName}>{currentUser?.name}</h1>
                    <span>@{currentUser?.username}</span>
                </div>
                <hr className={styles.divider} />
                <div className={styles.likes}>
                {likes.map((post) => (
                        <div className={classNames(styles.mini, className)}>
                        <Link className="link" to={`/post/${post.id}`}>
                        <img
                            className={styles.image}
                            src={`../upload/${post.img}`}
                        />
                        </Link>
                    </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
};
