import Navbar from "../components/navbar/Navbar"
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import {  AiOutlineUp } from 'react-icons/ai'

function Privacy() {
const [visibleBtn , setVisibleBtn] = useState(false)
const navigate = useNavigate()

// scroll functionality
 const makeBtnVisible = () => {
    const scrolled = document.documentElement.scrollTop;
     if(scrolled > 500){
         setVisibleBtn(true)
     }
     else if (scrolled <= 500){
       setVisibleBtn(false)
     }
   }

  const scrollToTop = () =>{
    window.scrollTo({
      top: 0, 
      behavior: 'smooth'
  
    });
  };

window.addEventListener('scroll', makeBtnVisible);

  return (
    <>
        <Navbar />
        <div className='mainContent privacypage'>
            <div className='text'>
               <h2 className='story-heading' style={{ fontSize: '3.8rem' }}>PRIVACY NOTICE</h2>
               <p className='about-sub-heading'>Last updated September 12, 2022</p>
            </div>
            <div className='text'>
                <p className='story'>This privacy notice for Forward Initiative ('Company', 'we', 'us', or 'our',), describes how and why we might collect, store, use, and/or share ('process') your information when you use our services ('Services'), such as when you:</p>
                <ul className='story' style={{ listStyle: 'square inside' }}>
                    <li>Visit our website at <a href="http://www.forwardinitiative.com">http://www.forwardinitiative.com</a>, or any website of ours that links to this privacy notice</li>
                    <li>Engage with us in other related ways, including any sales, marketing, or events</li>
                </ul>
                <p className='story'>Questions or concerns? Reading this privacy notice will help you understand your privacy rights and choices. If you do not agree with our policies and practices, please do not use our Services. If you still have any questions or concerns, please contact us at forwardinitiativee@gmail.com.</p>
            </div>
            <div className='text'>
                <h3 className='story-heading'>1. WHAT INFORMATION DO WE COLLECT?</h3>
                <p className='story'><b>Personal information you disclose to us</b></p>
                <p className='story'><i>In Short: We collect personal information that you provide to us.</i></p>
                <p className='story'>We collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our products and Services, when you participate in activities on the Services, or otherwise when you contact us.</p>
                <p className='story'>Personal Information Provided by You. The personal information that we collect depends on the context of your interactions with us and the Services, the choices you make, and the products and features you use. The personal information we collect may include the following:</p>
                <ul className='story' style={{ listStyle: 'square inside' }}>
                    <li>Email addresses</li>
                </ul>
                <p className='story'>Sensitive Information. We do not process sensitive information.</p>
                <p className='story'>All personal information that you provide to us must be true, complete, and accurate, and you must notify us of any changes to such personal information.</p>
            </div>
            <div className='text'>
                <h3 className='story-heading'>2. HOW DO WE PROCESS YOUR INFORMATION?</h3>
                <p className='story'><i>In Short: We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We may also process your information for other purposes with your consent.</i></p>
                <p className='story'>We process your personal information for a variety of reasons, depending on how you interact with our Services, including:</p>
                <ul className='story' style={{ listStyle: 'square inside' }}>
                    <li>To save or protect an individual's vital interest. We may process your information when necessary to save or protect an individual???s vital interest, such as to prevent harm.</li>
                </ul>
            </div>
            <div className='text'>
                <h3 className='story-heading'>3. WHAT LEGAL BASES DO WE RELY ON TO PROCESS YOUR INFORMATION?</h3>
                <p className='story'><i>In Short: We only process your personal information when we believe it is necessary and we have a valid legal reason (i.e. legal basis) to do so under applicable law, like with your consent, to comply with laws, to provide you with services to enter into or fulfil our contractual obligations, to protect your rights, or to fulfil our legitimate business interests.</i></p>
                <p className='story'><i  style={{ textDecoration: 'underline' }}>If you are located in the EU or UK, this section applies to you.</i></p>
                <p className='story'>The General Data Protection Regulation (GDPR) and UK GDPR require us to explain the valid legal bases we rely on in order to process your personal information. As such, we may rely on the following legal bases to process your personal information:</p>
                <ul className='story' style={{ listStyle: 'square inside' }}>
                    <li>Consent. We may process your information if you have given us permission (i.e. consent) to use your personal information for a specific purpose. You can withdraw your consent at any time. Click <a href="https://app.termly.io/dashboard/website/03e1ad66-95d5-4c83-8382-f22794255230/privacy-policy#withdrawconsent" target='_blank' rel="noreferrer">here</a> to learn more.</li>
                    <li>Legal Obligations. We may process your information where we believe it is necessary for compliance with our legal obligations, such as to cooperate with a law enforcement body or regulatory agency, exercise or defend our legal rights, or disclose your information as evidence in litigation in which we are involved.</li>
                    <li>Vital Interests. We may process your information where we believe it is necessary to protect your vital interests or the vital interests of a third party, such as situations involving potential threats to the safety of any person.</li>
                </ul>
                <p className='story'><i  style={{ textDecoration: 'underline' }}>If you are located in Canada, this section applies to you.</i></p>
                <p className='story'>We may process your information if you have given us specific permission (i.e. express consent) to use your personal information for a specific purpose, or in situations where your permission can be inferred (i.e. implied consent). You can withdraw your consent at any time. Click <a href='https://app.termly.io/dashboard/website/03e1ad66-95d5-4c83-8382-f22794255230/privacy-policy#withdrawconsent' target='_blank' rel="noreferrer">here</a> to learn more.</p>
                <p className='story'>In some exceptional cases, we may be legally permitted under applicable law to process your information without your consent, including, for example:</p>
                <ul className='story' style={{ listStyle: 'square inside' }}>
                    <li>If collection is clearly in the interests of an individual and consent cannot be obtained in a timely way</li>
                    <li>For investigations and fraud detection and prevention</li>
                    <li>For business transactions provided certain conditions are met</li>
                    <li>If it is contained in a witness statement and the collection is necessary to assess, process, or settle an insurance claim</li>
                    <li>For identifying injured, ill, or deceased persons and communicating with next of kin</li>
                    <li>If we have reasonable grounds to believe an individual has been, is, or may be victim of financial abuse</li>
                    <li>If it is reasonable to expect collection and use with consent would compromise the availability or the accuracy of the information and the collection is reasonable for purposes related to investigating a breach of an agreement or a contravention of the laws of Canada or a province</li>
                    <li>If disclosure is required to comply with a subpoena, warrant, court order, or rules of the court relating to the production of records</li>
                    <li>If it was produced by an individual in the course of their employment, business, or profession and the collection is consistent with the purposes for which the information was produced</li>
                    <li>If the collection is solely for journalistic, artistic, or literary purposes</li>
                    <li>If the information is publicly available and is specified by the regulations</li>
                </ul>
            </div>
            <div className='text'>
                <h3 className='story-heading'>4. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?</h3>
                <p className='story'><i>In Short: We may share information in specific situations described in this section and/or with the following third parties</i></p>
                <p className='story'>We may need to share your personal information in the following situations:</p>
                <ul className='story' style={{ listStyle: 'square inside' }}>
                    <li>Business Transfers. We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.</li>
                </ul>
            </div>
            <div className='text'>
                <h3 className='story-heading'>5. HOW LONG DO WE KEEP YOUR INFORMATION?</h3>
                <p className='story'><i>In Short: We keep your information for as long as necessary to fulfil the purposes outlined in this privacy notice unless otherwise required by law.</i></p>
                <p className='story'>We will only keep your personal information for as long as it is necessary for the purposes set out in this privacy notice, unless a longer retention period is required or permitted by law (such as tax, accounting, or other legal requirements).</p>
                <p className='story'>When we have no ongoing legitimate business need to process your personal information, we will either delete or anonymise such information, or, if this is not possible (for example, because your personal information has been stored in backup archives), then we will securely store your personal information and isolate it from any further processing until deletion is possible.</p>
            </div>
            <div className='text'>
                <h3 className='story-heading'>6. HOW DO WE KEEP YOUR INFORMATION SAFE?</h3>
                <p className='story'><i>In Short: We aim to protect your personal information through a system of organisational and technical security measures.</i></p>
                <p className='story'>We have implemented appropriate and reasonable technical and organisational security measures designed to protect the security of any personal information we process.</p>
                <p className='story'>However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or other unauthorised third parties will not be able to defeat our security and improperly collect, access, steal, or modify your information. Although we will do our best to protect your personal information, transmission of personal information to and from our Services is at your own risk. You should only access the Services within a secure environment.</p>
            </div>
            <div className='text'>
                <h3 className='story-heading'>6. HOW DO WE KEEP YOUR INFORMATION SAFE?</h3>
                <p className='story'><i>In Short: We aim to protect your personal information through a system of organisational and technical security measures.</i></p>
                <p className='story'>We have implemented appropriate and reasonable technical and organisational security measures designed to protect the security of any personal information we process.</p>
                <p className='story'>However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or other unauthorised third parties will not be able to defeat our security and improperly collect, access, steal, or modify your information. Although we will do our best to protect your personal information, transmission of personal information to and from our Services is at your own risk. You should only access the Services within a secure environment.</p>
            </div>
            <div className='text'>
                <h3 className='story-heading'>7. DO WE COLLECT INFORMATION FROM MINORS?</h3>
                <p className='story'><i>In Short: We do not knowingly collect data from or market to children under 18 years of age.</i></p>
                <p className='story'>We do not knowingly solicit data from or market to children under 18 years of age. By using the Services, you represent that you are at least 18 or that you are the parent or guardian of such a minor and consent to such minor dependent???s use of the Services. If we learn that personal information from users less than 18 years of age has been collected, we will deactivate the account and take reasonable measures to promptly delete such data from our records. If you become aware of any data we may have collected from children under age 18, please contact us at forwardinitiativee@gmail.com.</p>
            </div>
            <div className='text'>
                <h3 className='story-heading'>8. WHAT ARE YOUR PRIVACY RIGHTS?</h3>
                <p className='story'><i>In Short: In some regions, such as the European Economic Area (EEA), United Kingdom (UK), and Canada, you have rights that allow you greater access to and control over your personal information. You may review, change, or terminate your account at any time.</i></p>
                <p className='story'>In some regions (like the EEA, UK, and Canada), you have certain rights under applicable data protection laws. These may include the right (i) to request access and obtain a copy of your personal information, (ii) to request rectification or erasure; (iii) to restrict the processing of your personal information; and (iv) if applicable, to data portability. In certain circumstances, you may also have the right to object to the processing of your personal information. You can make such a request by contacting us by using the contact details provided in the section 'HOW CAN YOU CONTACT US ABOUT THIS NOTICE?' below.</p>
                <p className='story'>We will consider and act upon any request in accordance with applicable data protection laws.</p>
                <p className='story'>If you are located in the EEA or UK and you believe we are unlawfully processing your personal information, you also have the right to complain to your local data protection supervisory authority. You can find their contact details here: <a href="https://ec.europa.eu/justice/data-protection/bodies/authorities/index_en.html" target='_blank' rel="noreferrer">https://ec.europa.eu/justice/data-protection/bodies/authorities/index_en.html.</a></p>
                <p className='story'>If you are located in Switzerland, the contact details for the data protection authorities are available here: <a href="https://www.edoeb.admin.ch/edoeb/en/home.html" target='_blank' rel="noreferrer">https://www.edoeb.admin.ch/edoeb/en/home.html.</a></p>
                <p className='story'><span style={{ textDecoration: 'underline' }}>Withdrawing your consent:</span> If we are relying on your consent to process your personal information, which may be express and/or implied consent depending on the applicable law, you have the right to withdraw your consent at any time. You can withdraw your consent at any time by contacting us by using the contact details provided in the section 'HOW CAN YOU CONTACT US ABOUT THIS NOTICE?' below.</p>
                <p className='story-heading' style={{ fontSize: '16px' }}>However, please note that this will not affect the lawfulness of the processing before its withdrawal nor, when applicable law allows, will it affect the processing of your personal information conducted in reliance on lawful processing grounds other than consent.</p>
                <p className='story-heading' style={{ fontSize: '16px' }}>If you have questions or comments about your privacy rights, you may email us at forwardinitiativee@gmail.com.</p>
            </div>
            <div className='text'>
                <h3 className='story-heading'>9. CONTROLS FOR DO-NOT-TRACK FEATURES</h3>
                <p className='story'>Most web browsers and some mobile operating systems and mobile applications include a Do-Not-Track ('DNT') feature or setting you can activate to signal your privacy preference not to have data about your online browsing activities monitored and collected. At this stage no uniform technology standard for recognising and implementing DNT signals has been finalised. As such, we do not currently respond to DNT browser signals or any other mechanism that automatically communicates your choice not to be tracked online. If a standard for online tracking is adopted that we must follow in the future, we will inform you about that practice in a revised version of this privacy notice.</p>
            </div>
            <div className='text'>
                <h3 className='story-heading'>10. DO CALIFORNIA RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?</h3>
                <p className='story'><i>In Short: Yes, if you are a resident of California, you are granted specific rights regarding access to your personal information.</i></p>
                <p className='story'>California Civil Code Section 1798.83, also known as the 'Shine The Light' law, permits our users who are California residents to request and obtain from us, once a year and free of charge, information about categories of personal information (if any) we disclosed to third parties for direct marketing purposes and the names and addresses of all third parties with which we shared personal information in the immediately preceding calendar year. If you are a California resident and would like to make such a request, please submit your request in writing to us using the contact information provided below.</p>
                <p className='story'>If you are under 18 years of age, reside in California, and have a registered account with Services, you have the right to request removal of unwanted data that you publicly post on the Services. To request removal of such data, please contact us using the contact information provided below and include the email address associated with your account and a statement that you reside in California. We will make sure the data is not publicly displayed on the Services, but please be aware that the data may not be completely or comprehensively removed from all our systems (e.g. backups, etc.).</p>
            </div>
            <div className='text'>
                <h3 className='story-heading'>11. DO WE MAKE UPDATES TO THIS NOTICE?</h3>
                <p className='story'><i>In Short: Yes, we will update this notice as necessary to stay compliant with relevant laws.</i></p>
                <p className='story'>We may update this privacy notice from time to time. The updated version will be indicated by an updated 'Revised' date and the updated version will be effective as soon as it is accessible. If we make material changes to this privacy notice, we may notify you either by prominently posting a notice of such changes or by directly sending you a notification. We encourage you to review this privacy notice frequently to be informed of how we are protecting your information.</p>
            </div>
            <div className='text'>
                <h3 className='story-heading'>12. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</h3>
                <p className='story'>If you have questions or comments about this notice, you may email us at forwardinitiativee@gmail.com.</p>
            </div>
        </div>

        <div className='fixedScroll' style={{display: visibleBtn ? 'block' : 'none'}}>
            <div className="discover-Btn fixedScrollToTop">
                <AiOutlineUp onClick={ scrollToTop }
                style={{color:'#fff', cursor:'pointer',fontSize: '1.6rem'}}/>
            </div>
        </div>

        <div className="fixedFlex">
        <div className="fixedLeft">
          <Link to="/about" reloadDocument="true"><h5 className="about">ABOUT</h5></Link>

            <div className="terms">
                <p onClick={ () => navigate('/terms') }>Terms and Conditions</p>
                <p onClick={ () => navigate('/privacy') }>Privacy Policy</p>
            </div>
        </div>

        <div className="fixedRight">
            <div className="social-links">
                <a href='https://twitter.com/forwardinitia1' target='_blank'><p>T</p></a>
                <a href='https://www.instagram.com/forwardinitiative/' target='_blank'><p>IG</p></a>
            </div>
        </div>
</div>
    </>
  )
}

export default Privacy