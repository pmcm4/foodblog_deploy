import styles from './user-profile.module.scss';
import classNames from 'classnames';
import { Navbar } from '../navbar/navbar';
import { Footer } from '../footer/footer';
import { MiniPost } from '../mini-post/mini-post';
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/authContext';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';

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
    const [file, setFile] = useState<File | null>(null);
    const location = useLocation();
    const postId = location.pathname.split("/")[2];
    const navigate = useNavigate();
    const [editMode, setEditMode] = useState(false);
    const [userr, setUser] = useState<{ img: string, name: string, bio: string, username: string}>({
      img: '',
      name: '',
      bio: '',
      username: ''
    });
    
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

      const userId = location.pathname.split("/")[2];
      const isCurrentUser = currentUser?.id == userId;
      const upload = async () => {
        try {
          const formData = new FormData();
          if (file) {
            formData.append("file", file);
          }
          const res = await axios.post("/upload", formData);
          return res.data
        } catch (err) {
          console.log(err);
        }
      };
      
      const handleClick = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
    
        const imgUrl = await upload();
    
        try {
          await axios.put(`/users/${userId}`, {
            name: userr.name,
            uname: userr.username,
            bbio: userr.bio,
            img: file ? imgUrl : "",
          });
        } catch (err) {
          console.log(err);
        }
    
        // Wait for 2 seconds before refreshing the page
      };

      const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setUser((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      };
    return (
        <div className={classNames(styles.root, className)}>
            <Navbar />
            <div className={styles.content}>
            {isCurrentUser && (
                <div className={styles.iconedit} >
                    <EditIcon onClick={() => setEditMode(true) } />
                </div>
                )}
                {editMode ? (
                    // Edit mode UI
                    <>
                    <input type='file' id='file' onChange={e => {
                                const selectedFile = e.target.files?.[0];
                                if (selectedFile) {
                                    setFile(selectedFile);
                                }
                                }} />
                            <input type="text" name="name" value={userr.name} onChange={handleChange} />
                            <input type="text" name="username" value={userr.username} onChange={handleChange} />
                            <textarea name="bio" value={userr.bio} onChange={handleChange} />
                            <button onClick={handleClick}>Save</button>
                    </>
                ) : (
                    <>
                    <img
                                className={styles.profPic}
                                src={`../upload/${userr.img}`}
                            />
                    <h1 className={styles.Name}>{currentUser?.name}</h1>
                    <span className={styles.info}>@{currentUser?.username}</span>
                    <span className={styles.info}>{currentUser?.bio}</span>
                    </>
                )}
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
