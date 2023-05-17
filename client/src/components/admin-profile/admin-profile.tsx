import styles from './admin-profile.module.scss';
import classNames from 'classnames';
import { Footer } from '../footer/footer';
import { Navbar } from '../navbar/navbar';
import { MiniPost } from '../mini-post/mini-post';
import { useContext, useEffect, useState } from 'react';
import { Create } from '../create/create';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/authContext';
import EditIcon from '@mui/icons-material/Edit';

export interface AdminProfileProps {
    className?: string;
}

export const AdminProfile = ({ className }: AdminProfileProps) => {
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const state = useLocation().state;
    const [file, setFile] = useState<File | null>(null);
    const [name, setName] = useState(state?.name || "");
    const [uname, setUsername] = useState(state?.uname || "");
    const [bbio, setBio] = useState(state?.bio || "");
    const [userr, setUser] = useState<{ img: string, name: string, bio: string, username: string}>({
        img: '',
        name: '',
        bio: '',
        username: ''
      });
      console.log(uname)

      useEffect(() => {
        if (!currentUser) {
          navigate("https://foodblog-api.herokuapp.com/api/");
        }
      }, [currentUser, navigate]);


    const [modal, setModal] = useState(false);
    const toggleModal = () => {
        setModal(!modal);
    };
    const [editMode, setEditMode] = useState(false);
    const [posts, setPosts] = useState<{img: string , id: string  }[]>([]);

    const location = useLocation();
    const userId = location.pathname.split("/")[4];

    useEffect(() => {
        const fetchData = async () => {
          try {
            const res = await axios.get(`https://foodblog-api.herokuapp.com/api/posts/admin/${userId}`);
            setPosts(res.data);
          } catch (err) {
            console.log(err);
          }
        };
        fetchData();
      }, [userId]);
      


      const upload = async () => {
        try {
          const formData = new FormData();
          if (file) {
            formData.append("file", file);
          }
          const res = await axios.post("https://foodblog-api.herokuapp.com/api/upload", formData);
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

      useEffect(() => {
        const fetchData = async () => {
          try {
            const res = await axios.get(`/users/getuser/${userId}`);
            setUser(res.data);
          } catch (err) {
            console.log(err);
          }
        };
        fetchData();
      }, [userId]);


      const handleDelete = async () =>{
        try {
            await axios.delete(`/posts/${userId}`);
            navigate("/")
          } catch (err) {
            console.log(err);
          }
      }
      
      const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setUser((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      };
      const isCurrentUser = currentUser?.id == userId;

      console.log(isCurrentUser)
    return (
        <div className={classNames(styles.root, className)}>
            <Navbar />
            <div className={styles.content}>
                        <div className={styles.left1}>
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
                    <h1 className={styles.Name}>{userr.name}</h1>
                    <span className={styles.info}>@{userr.username}</span>
                    <span className={styles.info}>{userr.bio}</span>
                    </>
                )}
                </div>



                <div className={styles.right1}>
                    <div className={styles.head}>
                        <div className={styles.geadgead}>
                            <span className={styles.hello}>Post</span>
                            {isCurrentUser && (
                            <span className={styles.hello} onClick={toggleModal}>
                                Create
                            </span>
                            )}
                        </div>
                        <hr className={styles.divider} />
                    </div>
                    <div className={styles.bod}>
                    {posts.map((post) => (
                        <div className={classNames(styles.root, className)} >
                            <Link className="link" to={`/post/${post.id}`}>
                            <img
                                className={styles.image}
                                src={`../upload/${post.img}`}
                            />
                            </Link>
                        </div>
                     ))}
                    </div>
                    
                    {modal && (
                        <div className="modal">
                            <div className={styles.overlay} onClick={toggleModal}></div>
                            <Create />
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};
