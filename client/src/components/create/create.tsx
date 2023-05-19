import styles from './create.module.scss';
import classNames from 'classnames';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import {useContext, useEffect, useState} from "react"
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import { AuthContext } from '../../context/authContext';
import { Navbar } from '../navbar/navbar';

export interface CreateProps {
    className?: string;
}

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/configuration-for-creates-and-templates
 */
export const Create = ({ className }: CreateProps) => {
    const {currentUser} = useContext(AuthContext)
    const state = useLocation().state;
    const [value, setValue] = useState(state?.desc || "");
    const [title, setTitle] = useState(state?.title || "");
    const [file, setFile] = useState<File | null>(null);
    const [cat, setCat] = useState(state?.cat || "");
    const navigate = useNavigate();


    const location = useLocation()

    const userId = location.pathname.split('/')[2];

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

    console.log(value)

    const handleClick = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
      
        const imgUrl = await upload();
      
        try {
          state 
          ? await axios.put(`/posts/${state.id}`, {
            title,
            desc: value,
            cat,
            img: file ? imgUrl : "",
          })
        : await axios.post(`/posts/`, {
            title,
            desc: value,
            cat,
            img: file ? imgUrl : "",
            date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
          });
        } catch (err) {
          console.log(err);
        }
      
        // Wait for 2 seconds before refreshing the page
        window.location.reload();
      };
      
    return (
      
        <div className={classNames(styles.root, className)}>
            <div className={styles.header}>
                <div className={styles.bkacdiv}>
                    <ArrowBackIosNewOutlinedIcon />
                </div>
                <h1 className={styles.headercreate}>Create New Post</h1>
                <h1 className={styles.headershare} onClick={handleClick}>Share</h1>
            </div>
            <div className={styles.body}>
                <div className={styles.left}>
                                <input type='file' id='file' onChange={e => {
                                const selectedFile = e.target.files?.[0];
                                if (selectedFile) {
                                    setFile(selectedFile);
                                }
                                }} />
                                
                </div>
                
                <div className={styles.right}>
                    <div className={styles.top}>
                        <div className={styles.prof}>
                            <img
                                src="https://wixplosives.github.io/codux-assets-storage/add-panel/image-placeholder.jpg"
                                className={styles.img}
                            />
                            <span className={styles.username}>@{currentUser?.username}</span>
                        </div>
                        <input value={title} type='text' className={styles.title} placeholder={'Title'} onChange={(e) => setTitle(e.target.value)} required/>
                        <ReactQuill className={styles.textArea} theme='snow' value={value} onChange={setValue}/>
                        
                    </div>
                    <div className={styles.bottom}>
                    <select defaultValue={cat} className={styles.choosecat} id="Choose Category" onChange={(e) => setCat(e.target.value)} required>
                    <option value="healthyfood">Select Category</option>
                    <option value="healthyfood">Healthy Food</option>
                    <option value="beverages">Beverages</option>
                    <option value="snacks">Snacks</option>
                    <option value="intfood">International Food</option>
                    <option value="specialty">Specialty</option>
                    <option value="restaurants">Restaurants</option>
                    </select>
                        <input className={styles.locs} placeholder="Add location" />
                    </div>
                </div>
            </div>
        </div>
    );
};
