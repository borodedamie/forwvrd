import { FaGreaterThan } from 'react-icons/fa'
import aboutImg from '../../images/forward-about.png'
import './AboutContent.css'
import { Link} from 'react-router-dom'


function AboutContent() {

const handleSubmit = (e) => {
    e.preventDefault();
    let myForm = document.getElementById("sub");
    let formData = new FormData(myForm);
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString(),
    })
      .then(() => console.log("Form successfully submitted"))
      .catch((error) => alert(error));
};

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

                <form onSubmit={ handleSubmit } id="sub" method="POST" data-netlify="true">
                    <div className="input-con-flex">
                        <input type="text" 
                            placeholder='Email'
                            name='email'
                        />
                        <button type='submit' className="discover-Btn">
                            <FaGreaterThan  style={{cursor:'pointer'}}/>
                        </button>
                    </div>
                </form>
            </div>


            <div className="fixedFlex">
            <div className="fixedLeft">
              <Link to="/about" reloadDocument="true"><h5 className="about">ABOUT</h5></Link>
              {/* <h5 onClick={ () => setAboutPage(true) } className='about'>ABOUT</h5> */}

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

