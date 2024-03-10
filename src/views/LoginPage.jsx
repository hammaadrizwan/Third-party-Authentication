import FullPageLoader from '../components/FullPageLoader.jsx';
import {useState} from 'react';
import {auth} from '../firebase/config.js';
import {
  createUserWithEmailAndPassword,
   signInWithEmailAndPassword,
    sendPasswordResetEmail,
   } 
   from "firebase/auth";
  import {useDispatch} from 'react-redux';
  import {setUser} from '../store/usersSlice.js';

function LoginPage() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [loginType, setLoginType] = useState('login');
  const [error, setError] = useState('');//error is the value initialized to empty string, but it will be updated with the error message from the Firebase Authentication API, using setError() function.
  const [userCredentials,setUserCredentials] = useState({});//userCredentials is the value initialized to an empty object, but it will be updated with the user's email and password, using setUserCredentials() function.
  
  function handleCredentials(e){
    setError("");
    setUserCredentials({...userCredentials,[e.target.name]:e.target.value});
    console.log(userCredentials);
  }

  function handleSignup(e){
    e.preventDefault();
    createUserWithEmailAndPassword(auth, userCredentials.email, userCredentials.password)
      .then((userCredential) => {
        // Signed up -successfull
        console.log(userCredential.user);
        dispatch(setUser({id:userCredential.user.uid,email:userCredential.user.email}));
      })
      .catch((error) => {
        setError(error.message);
        // ..
      });
  }

  function handleLogin(e){
    e.preventDefault();
    signInWithEmailAndPassword(auth, userCredentials.email, userCredentials.password)
      .then((userCredential) => {
        // Signed in
        console.log(userCredential.user);
        dispatch(setUser({id:userCredential.user.uid,email:userCredential.user.email}));
      })
      .catch((error) => {
        setError(error.message);
      });
  }

  function handlePasswordReset(){
    const email = prompt("Enter your email to reset your password");
    sendPasswordResetEmail(auth, email)
    if((email)==""){
      alert("Enter a valid email.")
    }else{
      alert("Email sent, check your inbox for further instructions.")
    }
    

  }


    return (
      <>
        { isLoading && <FullPageLoader></FullPageLoader> }
        
        <div className="container login-page">
          <section>
            <h1>Welcome to the Book App</h1>
            <p>Login or create an account to continue</p>
            <div className="login-type">
              <button 
                className={`btn ${loginType == 'login' ? 'selected' : ''}`}
                onClick={()=>setLoginType('login')}>
                  Login
              </button>
              <button 
                className={`btn ${loginType == 'signup' ? 'selected' : ''}`}
                onClick={()=>setLoginType('signup')}>
                  Signup
              </button>
            </div>
            <form className="add-form login">
                  <div className="form-control">
                      <label>Email *</label>
                      <input onChange={(e)=>{handleCredentials(e)}} type="text" name="email" placeholder="Enter your email" />
                  </div>
                  <div className="form-control">
                      <label>Password *</label>
                      <input onChange={(e)=>{handleCredentials(e)}} type="password" name="password" placeholder="Enter your password" />
                  </div>
                  {
                    loginType == 'login' ?
                    <button onClick={(e)=>{handleLogin(e)}} className="active btn btn-block">Login</button>
                    : 
                    <button onClick={(e)=>{handleSignup(e)}} className="active btn btn-block">Sign Up</button>
                  }

                  {
                    error &&
                    <div className="error">
                    {error}
                    </div>
                    /* error message from the Firebase Authentication API, will be displayed here, if the use state is an error.
                   */
                  }
                  

                  <p onClick={handlePasswordReset} className="forgot-password">Forgot Password?</p>
                  
              </form>
          </section>
        </div>
      </>
    )
  }
  
  export default LoginPage
  