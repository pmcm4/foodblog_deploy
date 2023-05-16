import styles from './about.module.scss';
import classNames from 'classnames';
import { Navbar } from '../navbar/navbar';
import { Footer } from '../footer/footer';

export interface AboutProps {
    className?: string;
}

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/configuration-for-abouts-and-templates
 */
export const About = ({ className }: AboutProps) => {
    return (
        <div className={classNames(styles.root, className)}>
            <Navbar />
            <div className={styles.content}>
                <div className={styles.FoodBuddies}>
                    <h1 className={styles.title}>FoodBuddies</h1>
                </div>
                <span className={styles.aboutFoodBud}>
                    FoodBuddies is a dynamic food review website that offers an exciting platform
                    for discovering new and exciting foods. Whether you&apos;re a foodie or someone
                    who loves to explore new flavors, FoodBuddies is your go-to resource. With an
                    extensive collection of reviews, recommendations, and tips from food enthusiasts
                    worldwide, you can discover new cuisines, restaurants, and recipes to try out.
                    Join the FoodBuddies community today and explore a world of culinary adventures!
                </span>
                <div className={styles.mid}>
                    <div className={styles.alalng}>
                        <div className={styles.sideline}>
                            <h1 className={styles.head}>Our vision</h1>
                        </div>
                        <span className={styles.visiondesc}>
                            FoodBuddies&apos; vision is to become the ultimate go-to destination for
                            food enthusiasts worldwide, fostering a sense of community and
                            togetherness among its users while promoting a love for food and
                            culinary exploration.
                        </span>
                    </div>
                    <img
                        className={styles.img}
                        src={
                            'https://res.cloudinary.com/dgb2lnz2i/image/upload/v1683917017/meeting_pal7zd.png'
                        }
                    />
                </div>
                <div className={styles.low}>
                    <img
                        className={styles.imag2}
                        src={
                            'https://res.cloudinary.com/dgb2lnz2i/image/upload/v1683917732/meeting_khdmgo.png'
                        }
                    />
                    <div className={styles.alalng1}>
                        <div className={styles.sideline1}>
                            <h1 className={styles.head1}>Our Approach</h1>
                        </div>
                        <span className={styles.visiondesc1}>
                            FoodBuddies&apos; approach is to provide an engaging and informative
                            experience through diverse content and user-driven collaboration, while
                            prioritizing user satisfaction and community-building, and leveraging
                            digital marketing channels to reach a wider audience.
                        </span>
                    </div>
                </div>
                <h1 className={styles.thedevs}>The Developers</h1>
                <div className={styles.firstrow}>
                    <div className={styles.pics}>
                        <div className={styles.pic} />
                        <div className={styles.pic}>
                            <img
                                src="https://res.cloudinary.com/dgb2lnz2i/image/upload/v1683918590/nath_tuot4b.png"
                                className={styles.image2}
                            />
                        </div>
                        <div className={styles.pic} />
                    </div>
                    <div className={styles.names}>
                        <h1 className={styles.name}>Justine Salvador</h1>
                        <h1 className={styles.name}>Nathanael Stephen Memis</h1>
                        <h1 className={styles.name}>Paolo Miguel Morato</h1>
                    </div>
                </div>
                <div className={styles.firstrow1}>
                    <div className={styles.pics1}>
                        <div className={styles.pic1}>
                            <img
                                src="https://res.cloudinary.com/dgb2lnz2i/image/upload/v1683918590/max_jnmzkl.png"
                                className={styles.image2}
                            />
                        </div>
                        <div className={styles.pic1}>
                            <img
                                src="https://res.cloudinary.com/dgb2lnz2i/image/upload/v1683918589/arriance_ukcx7d.png"
                                className={styles.image2}
                            />
                        </div>
                    </div>
                    <div className={styles.names1}>
                        <h1 className={styles.name1}>Maxine Clare Tejada</h1>
                        <h1 className={styles.name1}>Arriane Joie Bernabe</h1>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};
