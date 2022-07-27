import { useState } from 'react'
import { FaGreaterThan } from 'react-icons/fa'
import aboutImg from '../../images/forward-about.png'
import './AboutContent.css'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

function AboutContent() {
const navigate = useNavigate();

const [ subscriberFormData, setSubscriberFormData ] = useState({
    email: ''
});

const { email } = subscriberFormData;

const handleSubscriberFormChange = ( event ) => {
    setSubscriberFormData(( prevState ) => ({
        ...prevState,
        [ event.target.name ] : event.target.value
    }))
};

const resetSubscriberForm = () => {
    setSubscriberFormData(( prevState ) => ({
        ...prevState,
        email: ''
    }))
}

const submitSubscriberForm = async (event ) => {
    event.preventDefault()

    const subscriberData = { email }

    fetch('http://localhost:5000/api/subscribers', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },

        body: JSON.stringify(subscriberData),
    })
    .then(response => response.json())
    .then(data => {
        resetSubscriberForm()
        
        toast.success('Newsletter subscription was successful!', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
    })
    .catch((err) => {
        console.log('Error:', err);
    })
}

    return (
        <div className='aboutContent'>
        <div className="row1">
            <h1>About</h1>
            <p>Tuesday 28 June 2022</p>

            <div className="aboutSection">
                <p>
                    Forward is a publication to inspire. Conceived by Nonso Okpala as an extension of his transformative agenda. Forward is for the future. Forward is for tomorrow. We publish new thematic articles weekly. Anywhere between 4 and 5 articles for your reading pleasure. In the form of photos, videos, and long and short form text.
                </p>

                <p>
                    Forward is fresh and bold. It is easy to read. Easy to share. Easy to bring to life. Meant to change your life. We are forward, you are forward. The world is forward. Never stop marching forward.
                </p>
            </div>
        </div>

        <div className="row2">
            <div className="aboutImg">
                <img src={aboutImg} alt="" />
            </div>

            <div className="about-title">
                <h3>Team</h3>
            </div>

            <div className="roles-section">
                <li className="role-name">Editor-in-Chief</li>
                <li className="role">Nonso Okpala</li>
            </div>
            <div className="roles-section">
                <li className="role-name">Managing Editor</li>
                <li className="role">Seun James Ahmed</li>
            </div>
            <div className="roles-section">
                <li className="role-name">Staff Writer/Editor</li>
                <li className="role">Uche San-David</li>
            </div>

            <div className="roles-section">
                <li className="role-name">Art Director</li>
                <li className="role">Bolem Dikop</li>
            </div>

            <div className="roles-section">
                <li className="role-name">Copy Editor</li>
                <li className="role">Faladim Bomselak</li>
            </div>
        </div>

        <div className="row3">
            <div className="about-title">
                <h3>Contact</h3>
            </div>

            <div className="roles-section">
                <li className="role-name">Submissions</li>
                <li className="role">Submissions@getforward.com</li>
            </div>

            <div className="roles-section">
                <li className="role-name">General/all enquiries</li>
                <li className="role">info@getforward.com</li>
            </div>

            <div className="about-title">
                <h3>Newsletter</h3>
            </div>

                <li className="role">Subscribe to receive updates</li>

                <form onSubmit={ submitSubscriberForm }>
                    <div className="input-con-flex">
                        <input type="text" 
                            placeholder='Email'
                            id='email'
                            name='email'
                            value={ email }
                            onChange={ handleSubscriberFormChange } 
                        />
                        <button type='submit' className="discover-Btn">
                            <FaGreaterThan  style={{cursor:'pointer'}}/>
                        </button>
                    </div>
                </form>
            </div>


            <div className="fixedFlex">
            <div className="fixedLeft">
                <h5 onClick={ () => navigate('/about') } className="about">ABOUT</h5>

                <div className="terms">
                    <p>Terms and Conditions <br /> Privacy Policy</p>
              </div>
            </div>

            <div className="fixedRight">
                <div className="social-links">
                    <p>T</p>
                    <p>IG</p>
                </div>
            </div>
        </div>
        </div>
    )
}

export default AboutContent

