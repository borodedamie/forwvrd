import { useState, useContext } from "react";
import { FaGreaterThan } from 'react-icons/fa'
import { AiOutlineSearch, AiOutlineUp } from 'react-icons/ai'
import logo from '../../images/forwardLogo.png'
import { Link, NavLink } from 'react-router-dom'
import './Navbar.css'
import { GlobalContext } from "../../contexts/GlobalContext";
import { useQuery, gql } from '@apollo/client';

const GET_CATEGORIES = gql`
query {
    categoryCollection(limit: 10) {
      items {
        name
        sys {
          id
        }
      }
    }
  }
`;

function Navbar() {
const { loading, error, data } = useQuery(GET_CATEGORIES);
// const NavLinkStyles = ({ isActive }) => {
//     return{
//         backgroundColor: isActive ? '#0b7166' : 'transparent',
//         textDecoration: isActive ? 'none' : 'underline'
//     }
// }
const { search, setSearch, setSpinner } = useContext(GlobalContext)
const [ displaySearch, setDisplaySearch ] = useState(false)
    
if (loading) return console.log('Loading...');
if (error) return <span>Error : {error.message}</span>;

// call function on the search button when the enter key is pressed
// const onEnter = (event) => {
//     if(event.charCode === 13) {
//         setSpinner(false)
//     }
// }

    return (
        <div className='header'>
            <Link to="/">
                <div className="logo">
                    <img src={logo} alt="" style={{ width: '100px' }} />
                </div>
            </Link>

        { !displaySearch && 
            <div className="search-box">
                <div className="search-box-flex">
                    <div onClick={ () => setDisplaySearch(true) } className="discover-Btn">
                        <FaGreaterThan  style={{ cursor:'pointer' }}/>
                    </div>
                    </div>
                    <div className="searchBtn">
                        <div className="discover">
                            <p>Discover</p>
                        </div>
                    <div className="search-display">
                        <AiOutlineSearch style={{ fontSize: '2rem', color: '#346c64' }} onClick={ () => setDisplaySearch(true) } />
                    </div>
                </div>
            </div>
        }

       { displaySearch && 
        <div className="search-box dropDownState">
            <div className="search-box-flex">
                <div onClick={ () => setDisplaySearch(false) } className="discover-Btn" >
                    <AiOutlineUp  style={{cursor:'pointer', fontSize: '1.5rem' }}/>
                </div>
            </div>
          
           <div className="searchBtn">
                <div className="discover">
                    
                </div>
                <div className="searchCon">
                <div className='search-wrapper'>
                <input 
                       autoComplete="off"
                       type="text" 
                       placeholder='Search' 
                       name={ search }
                       onChange={ event => setSearch(event.target.value) }
                       onKeyDown={ () => setSpinner(true) }
                       onKeyUp={ () => setSpinner(false)}
                    //    onKeyPress={ onEnter }
                />
                    <div className="search-display">
                        <AiOutlineSearch style={{ fontSize: '2rem', cursor:'pointer', color: '#346c64' }} onClick={ () => setDisplaySearch(false) }/>
                    </div>
                </div>  
                <div className="search-options">
                    <div className="btnFlex" >
                    { data?.categoryCollection?.items.map((item, i) => (
                        // <button 
                        //     className={`${toggleClassActive}`}
                        //     onClick={ (event) => {
                        //     event.preventDefault()
                        //     setButtonState(true)
                        //     navigate(`/category/${item.sys.id }`)
                        //     } }    
                        //     key={ item.sys.id }>{ item?.name.toUpperCase() }
                        // </button>
                        <NavLink
                            // style={{NavLinkStyles}}
                            className='btnFlexBtn'
                            to={`/category/${item.sys.id}`} 
                            key={ item.sys.id }>{ item?.name.toUpperCase() }
                        </NavLink>
                    )) }
                    </div>
                    <div className="btnFlex Flex2">
                        <p className="viewed">Most viewed</p>
                        <p className="recent">Most Recent</p>
                    </div>
                    </div>
                </div>              
            </div>           
        </div>
       }           
        </div>
    )
}

export default Navbar