import styles from './register.module.scss';
import classNames from 'classnames';
import { useState, useContext, useEffect } from 'react';
import axios from "axios" 
import { Link, useNavigate } from 'react-router-dom'; 
import firebase from '../../firebase';
import { AuthContext } from '../../context/authContext';
import { ModalErrors } from '../modal-errors/modal-errors';



interface ModalProps {
    onClose: () => void;
    children: React.ReactNode;
  }
export interface RegisterProps {
    className?: string;
}

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/configuration-for-registers-and-templates
 */
export const Register = ({ className }: RegisterProps) => {

    const [errorMessage, setErrorMessage] = useState<string | null>(null);


    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        username: "",
        password: "",
      });

      const {login, currentUser} = useContext(AuthContext)
      const navigate = useNavigate();
  
      useEffect(() => {
          if (currentUser) {
            navigate('/');
          }
        }, [currentUser, navigate]);
  
    
      const [err, setError] = useState<string | null>(null); // Set the initial state type to string | null
    
    
      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
      };
    
      const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        try {
          const res = await axios.post("/auth/register", inputs);
          console.log(res);
        } catch (err: any) {
            if (err.response && err.response.status === 409) {
                setErrorMessage("User already exists");
                setModal(true);
              } else {
                setErrorMessage(err.message);
                setModal(true);
              }
          
        }
      };
      
    
      const handleGoogleLogin = async (
        e: React.MouseEvent<HTMLImageElement>
      ) => {
        try {
          const provider = new firebase.auth.GoogleAuthProvider();
          const userCredential = await firebase
            .auth()
            .signInWithPopup(provider);
          const user = userCredential.user;
      
          if (user && user.email) {
            // Prepare the data to be sent to your backend
            const userData = {
              name: user.displayName,
              email: user.email,
              username: user.email.split("@")[0],
              password: "googleLogin", // Add a default password or generate one if required
            };
            // Make an API call to your backend server to save the user data
            const response = await axios.post("/auth/register", userData);
      
            navigate("/login");
      
            // Handle the response from your backend if needed
          }
        } catch (error: any) {
          // Handle Google login error
          if (error.response && error.response.status === 409) {
            setErrorMessage("User already exists");
            setModal(true);
          } else {
            console.log(error);
            setErrorMessage(error.message);
            setModal(true);
          }
        }
      };
      
      const [modal, setModal] = useState(false);
      const toggleModal = () => {
          setModal(!modal);
      };


    return (
        <div className={classNames(styles.root, className)}>
            <div className={styles.container}>
                <div className={styles.reg}>
                    <div className={styles.containgerReg}>
                        <h1 className={styles.headerRegLog}>
                            Unleash Your <br />
                            Inner Foodie
                        </h1>
                        <p className={styles.regLogP}>
                            Tasty treats await! Already have an account? Simply log in here and let
                            the foodie fun begin.
                        </p>
                        <Link to={"/login"}>
                        <button className={styles.regBtn}>Login Here!</button>
                        </Link>
                    </div>
                    <img
                        className={styles.logobg}
                        src={
                            'https://res.cloudinary.com/dgb2lnz2i/image/upload/v1683901570/LOGIN_login_bg_ziso9b.jpg'
                        }
                    />
                </div>
                <div className={styles.login}>
                    <h1 className={styles.logHead}>Register here!</h1>
                    <div className={styles.input}>
                        <input className={styles.inputEmail} placeholder={'Name'} name='name' onChange={handleChange}/>
                        <input className={styles.inputEmail} placeholder={'Username'} name='username' onChange={handleChange}/>
                        <input className={styles.inputEmail} placeholder={'Email'} name='email' onChange={handleChange}/>
                        <input type='password' className={styles.inputEmail} placeholder={'Password'} name='password' onChange={handleChange}/>
                    </div>
                    <div className={styles.loggbtn}>
                        <button onClick={handleSubmit} className={styles.loginBtn} >Resister</button>
                        <span className={styles.outys}>or use your account</span>
                        <img
                            onClick={handleGoogleLogin}
                            src={
                                'https://res.cloudinary.com/dgb2lnz2i/image/upload/v1683903482/LOGIN_google_ja65yb.png'
                            }
                            className={styles.glbg}
                        />
                        <img
                        onClick={handleGoogleLogin}
                            src={
                                'https://res.cloudinary.com/dgb2lnz2i/image/upload/v1683903483/LOGIN_image_removebg_preview_1_a4wg0g.png'
                            }
                            className={styles.gllg}
                        />

                            
                            
                    </div>
                    
                    
                </div>
                
    
            </div>
            {modal && (
                        <div className="modal">
                            <div className={styles.overlay} onClick={toggleModal}></div>
                            <ModalErrors errorMessage={errorMessage} />
                        </div>
                    )}

        </div>
    );
};
