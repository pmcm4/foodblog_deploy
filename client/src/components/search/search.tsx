import styles from './search.module.scss';
import classNames from 'classnames';
import { Navbar } from '../navbar/navbar';
import { Footer } from '../footer/footer';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { MiniPost } from '../mini-post/mini-post';

export interface SearchProps {
    className?: string;
}

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/configuration-for-searchs-and-templates
 */
export const Search = ({ className }: SearchProps) => {
    return (
        <div className={classNames(styles.root, className)}>
            <Navbar />
            <div className={styles.container}>
                <div className={styles.searchbar}>
                    <input className={styles.searchInput} placeholder={'Search here!'} />
                    <div className={styles.searchLogo}>
                        <SearchOutlinedIcon sx={{ fontSize: 50 }} />
                    </div>
                </div>
                <div className={styles.searchRes}>
                    <MiniPost />
                    <MiniPost />
                    <MiniPost />
                    <MiniPost />
                    <MiniPost />
                    <MiniPost />
                    <MiniPost />
                    <MiniPost />
                </div>
            </div>
            <Footer />
        </div>
    );
};
