import { FaGreaterThan } from 'react-icons/fa'
import aboutImg from '../../images/forward-about-image.png'
import './AboutContent.css'
import { Link , useNavigate} from 'react-router-dom'

import { useForm, ValidationError } from '@formspree/react'
import { toast } from 'react-toastify';


function AboutContent() {
const [ state, handleSubmit ] = useForm('xnqrqnlr')
const navigate = useNavigate()

if ( state.succeeded ) {
    toast.success('Thank you for joining!', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

    document.querySelector('#email').value = ""
}

    return (
    < div className='aboutPage'>
        <div className='aboutContent'>
            <div className="row1">
            <h1 className='about-heading'>About</h1>
            <p className='about-sub-heading'>Tuesday 28 June 2022</p>

            <div className="aboutSection">
                <p>Forward is a publication designed to inspire people everywhere. Conceived as an extension of Nonso Okpala's “Transformative Generosity”, Forward presents thoughtful pieces on life, work, the economy, sports, arts, entertainment and more. Each feature is written and illustrated to equip readers with insights that help get them closer to their potential.</p>
                <p>With its intuitive endless scroll design, content stays front and center, allowing you to immerse yourself in each piece and seamlessly move from one to the next. The intuitive “discover” arrow allows you to sort pieces by interest or search by keyword. Forward is super fast and responsive, and the combination of text and illustration look great on any screen (desktop, tablet, or phone).</p>
                <p>Our team of writers, editors, illustrators, and designers, work thoughtfully to create features that are as insightful as they are easy to read - the very best content to keep you going forward.</p>
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

                <form onSubmit={ handleSubmit }>
                    <div className="input-con-flex">
                        <input type="email" 
                            placeholder='Email'
                            name='email'
                            id='email'
                        />
                        <ValidationError 
                            prefix='Email'
                            field='email'
                            errors={ state.errors } 
                        />
                        <button type='submit' className="discover-Btn" disabled={ state.submitting }>
                            <FaGreaterThan  style={{ cursor:'pointer' }}/>
                        </button>
                    </div>
                </form>             
            </div>

           

           
        </div>
        <div className="fixedFlex" >
                <div className="fixedLeft">
              <Link to="/about" reloadDocument="true"><h5 className="about">ABOUT</h5></Link>
              {/* <h5 onClick={ () => setAboutPage(true) } className='about'>ABOUT</h5> */}

                
                <div className="terms">
                    <p onClick={ () => navigate('/terms') }>Terms and Conditions</p>
                    <p onClick={ () => navigate('/privacy') }>Privacy Policy</p>
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

