import logo from '../../images/logo.png';
import './LoginComponent.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react'

function LoginComponent() {
    const navigate = useNavigate();

    const [ password, setPassword ] = useState('')

    const submitLoginForm = (event) => {
        event.preventDefault()

        if( password === `${ process.env.REACT_APP_LOGIN_PASSWORD }`) {
            navigate('/home')
        } 
    }

  return (
    <div>
        <div className="loginPage">
            {/* <div onClick={ () => navigate('/' )} className="header">
                <img src={logo} alt="" style={{ width: '100px' }} />
            </div> */}

           <div className="login-page">
           <div className="loginCon">
               <div className='title'>
                    <h1>Log In</h1>
                    <h5>Enter password to continue</h5>
               </div>

               <form onSubmit={ submitLoginForm }>
                    <div className="input-con">
                        <label htmlFor="">Password</label>
                        <input type="password"
                                name='password'
                                onChange={ (event) => setPassword( event.target.value ) } />
                    </div>

                    <div className="check-input-con">
                        <div className="checkbox">
                            <input type="checkbox" name="" id="" />
                            Remember password
                        </div>
                        <a>Forgot Password</a>
                    </div>

                    <div className="input-con">
                        <input type="submit" />
                    </div>


               </form>
            </div>
           </div>
        </div>
    </div>
  )
}

export default LoginComponent 