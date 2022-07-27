import { useState, useContext } from "react";
import useContenful from '../../hooks/use-Contenful'

import { FaGreaterThan } from 'react-icons/fa'
import { AiOutlineSearch, AiOutlineUp } from 'react-icons/ai'
import logo from '../../images/logo.png'
import { useNavigate } from 'react-router-dom'

import './Navbar.css'
import { GlobalContext } from "../../contexts/GlobalContext";


const GET_CATEGORIES = `
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
const { search, setSearch } = useContext(GlobalContext)

const [ displaySearch, setDisplaySearch ] = useState(false)

const navigate = useNavigate();

let { data, errors } = useContenful(GET_CATEGORIES)

const { categoryCollection } = data

if(errors)
	return <span>{errors.map((error) => error.message).join(",")}</span>

if(!data) console.log('loading...')

const goHome = () => {
    navigate('/') 
}

// call function on the search button when the enter key is pressed
const onEnter = (event) => {
    if(event.charCode === 13) {
        setDisplaySearch(false)
    }
}

    return (
        <div className='header'>
            <div onClick={ () => goHome() } className="logo">
                <img src={logo} alt="" style={{ width: '100px' }} />
            </div>

        { !displaySearch && 
            <div className="search-box">
                <div className="search-box-flex">
                    <div onClick={ () => setDisplaySearch(true) } className="discover-Btn">
                        <FaGreaterThan  style={{cursor:'pointer'}}/>
                    </div>
                    </div>
                    <div className="searchBtn">
                        <div className="discover">
                            <p>Discover</p>
                        </div>
                    <div className="search-display">
                        <AiOutlineSearch style={{ fontSize: '2rem' }} onClick={ () => setDisplaySearch(true) } />
                    </div>
                </div>
            </div>
        }

       { displaySearch && 
        <div className="search-box dropDownState">
            <div className="search-box-flex">
                <div onClick={ () => setDisplaySearch(false) } className="discover-Btn" >
                    <AiOutlineUp  style={{cursor:'pointer'}}/>
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
                       onChange={event => setSearch(event.target.value) }
                       onKeyPress={ onEnter }
                />
                    <div className="search-display">
                        <AiOutlineSearch style={{ fontSize: '2rem', cursor:'pointer' }} onClick={ () => setDisplaySearch(false) }/>
                    </div>
                </div>  

                <div className="search-options">
                    <div className="btnFlex" >
                    { categoryCollection?.items.map((item) => (
                        <button onClick={ () => {
                            setSearch(item?.name)
                            } }    
                            key={ item.sys.id }>{ item?.name.toUpperCase() }</button>
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