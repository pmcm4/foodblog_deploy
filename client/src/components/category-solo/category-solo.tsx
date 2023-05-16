import styles from './category-solo.module.scss';
import classNames from 'classnames';
import { Navbar } from '../navbar/navbar';
import { Footer } from '../footer/footer';
import { BlogSingle } from '../blog-single/blog-single';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DOMPurify from 'dompurify';
import { AuthContext } from '../../context/authContext';
import moment from "moment";

export interface CategorySoloProps {
    className?: string;
}

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/configuration-for-category-solos-and-templates
 */
export const CategorySolo = ({ className }: CategorySoloProps) => {
    const [posts, setPosts] = useState<
    {
      username: string;
      title: string;
      desc: string;
      img: string;
      id: string;
      cat: string;
      liked: boolean;
      likeCount: number;
      date: string;
    }[]
  >([]);

  const formatCategoryName = (category: any) => {
    if (category === 'healthyfood') {
      return 'Healthy Food';
    } else if (category === 'intfood') {
      return 'International Food';
    } else if (category.match(/[A-Z]/)) {
      const words = category.split(/(?=[A-Z])/);
      const formattedName = words.map((word:any) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
      return formattedName;
    } else {
      return category.charAt(0).toUpperCase() + category.slice(1);
    }

  };

  
  const getText = (html: string, maxLength: number) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    const textContent = doc.body.textContent || "";
    if (textContent.length <= maxLength) {
      return textContent;
    } else {
      return textContent.substring(0, maxLength) + "...";
    }
  };

    return (
        <div className={classNames(styles.root, className)}>
            <Navbar />
            <div className={styles.content}>
                <div className={styles.headerName}>
                    <h1 className={styles.catNameHead}>Healthy Foods</h1>
                </div>
                <div className={styles.posts11}>
            
            {posts.map((post) => (
                <div className={classNames(styles.cardpost, className)}>
                  <Link to={`/post/${post.id}`} style={{ textDecoration: 'none', color: 'black'}}> <div className={styles.container}>
                     <img className={styles.imgclass}
                         src={`../upload/${post.img}`}
                     />
                     <div className={styles.contents}>
                       <div className={styles.catContainer}>
                       <span className={styles.cat}>{formatCategoryName(post.cat)}</span>
                       </div>
                         
                         <span className={styles.title}>{post.title}</span>
                         <p className={styles.content11}>
                          {getText(DOMPurify.sanitize(post.desc), 100)}
                        </p>
                         
                     </div>
                     <div className={styles.user}>
                             <img
                                 src="https://wixplosives.github.io/codux-assets-storage/add-panel/image-placeholder.jpg"
                                 className={styles.profPic}
                             />
                             <div className={styles.profInfo}>
                                 <span className={styles.username}>{post.username}</span>
                                 <span className={styles.time}>{moment(post.date).fromNow()}</span>
                             </div>
                         </div>
                 </div> </Link>
             </div>
            
            
             ))}
             </div>
            </div>
            <Footer />
        </div>
    );
};
