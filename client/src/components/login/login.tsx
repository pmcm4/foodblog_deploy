import { useContext, useState } from 'react';
import styles from './login.module.scss';
import classNames from 'classnames';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/authContext';
import { useEffect } from 'react';
import firebase from '../../firebase';
import { ModalErrors } from '../modal-errors/modal-errors';

export interface LoginProps {
    className?: string;
}

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/configuration-for-logins-and-templates
 */
export const Login = ({ className }: LoginProps) => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [inputs, setInputs] = useState({
        email:"",
        password:""
    })
    const {login, currentUser} = useContext(AuthContext)
    const navigate = useNavigate();

    useEffect(() => {
        if (currentUser) {
          navigate('/');
        }
      }, [currentUser, navigate]);

    const [err, setError] = useState(null)

    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setInputs(prev=>({...prev,[e.target.name]: e.target.value}))
        
    }

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        try{
            await login(inputs)
            navigate("/")
        } catch(err: any){
            if (err.response && err.response.status == 404) {
                setErrorMessage("User not found!");
                setModal(true);
              } else if(err.response && err.response.status == 400) {
                setErrorMessage("Incorrect email/password!");
                setModal(true);
              }
        }
        
    }

    const handleGoogleLogin = async () => {
        try {
          const provider = new firebase.auth.GoogleAuthProvider();
          const userCredential = await firebase.auth().signInWithPopup(provider);
          const user = userCredential.user;
      
          // Prepare the data to be sent to your backend
          const userData = {
            email: user?.email,
            password: 'googleLogin', // Add a default password or generate one if required
          };
      
          // Make an API call to your backend server to login with Google
          const response = await login(userData)
          navigate("/")
      
          // Handle the response from your backend if needed
          console.log(response.data);
      
          // Proceed with login using user data if required
          if (response.data.token) {
            // Save the token to your authentication context or local storage
            // loginWithToken(response.data.token);
            // navigate("/");
          }
        } catch (error: any) {
            if (error.response && error.response.status == 404) {
                setErrorMessage("User not found!");
                setModal(true);
              } else if(error.response && error.response.status == 400) {
                setErrorMessage("Incorrect email/password!");
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
                <div className={styles.login}>
                    <h1 className={styles.logHead}>Log in here!</h1>
                    <div className={styles.input}>
                        <input className={styles.inputEmail} placeholder={'Email'} name='email' onChange={handleChange}/>
                        <input type='password' className={styles.inputEmail} placeholder={'Password'} name='password' onChange={handleChange}/>
                    </div>
                    <div className={styles.rfp}>
                        <input type="radio" className={styles.rememberBtn} />
                        <span className={styles.remember}>Remember me</span>
                        <span className={styles.remember1}>Forgot Password?</span>
                    </div>
                    <div className={styles.loggbtn}>
                        <button className={styles.loginBtn} onClick={handleSubmit}>Log in</button>
                        <span className={styles.outys}>or use your account</span>
                        <img alt='google login button'
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
                <div className={styles.reg}>
                    <div className={styles.containgerReg}>
                        <h1 className={styles.headerRegLog}>
                            Discover <br />
                            New Foods
                        </h1>
                        <p className={styles.regLogP}>
                            Join the epicurean escapade! Register now to tantalize your taste buds.
                        </p>
                        <Link to={"/register"} >
                        <button className={styles.regBtn}>Register Here!</button>
                        </Link>
                    </div>
                    <img
                        className={styles.logobg}
                        src={
                            'https://res.cloudinary.com/dgb2lnz2i/image/upload/v1683901570/LOGIN_login_bg_ziso9b.jpg'
                        }
                    />
                </div>
                {modal && (
                        <div className="modal">
                            <div className={styles.overlay} onClick={toggleModal}></div>
                            <ModalErrors errorMessage={errorMessage} />
                        </div>
                    )}
            </div>
        </div>
    );
};
