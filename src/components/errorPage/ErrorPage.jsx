import React from 'react'
import errorImage from '../../images/server.png'
import './ErrorPage.css'
import logo from '../../images/logo.png'
import { Link } from 'react-router-dom'

function ErrorPage( props ) {
  return (
    <>
    <div className='header'>
            <Link to="/">
                <div className="logo">
                    <img src={logo} alt="" style={{ width: '100px' }} />
                </div>
            </Link>
    </div> 
    <div className='error-page'>
        <div className="error-image-con">
            <img src={errorImage} alt="" className="error-image" />
        </div>
        <h1>Something went wrong</h1>
        <p>{ props.message }</p>
        <Link to='/' reloadDocument='true' className='refresh-btn'>Go Home</Link>
    </div>
    </>
  )
}

export default ErrorPage