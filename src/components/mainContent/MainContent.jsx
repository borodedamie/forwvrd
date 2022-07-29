import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, MARKS, INLINES } from '@contentful/rich-text-types';
import './MainContent.css'
import { useNavigate } from 'react-router-dom'
import useContenful from '../../hooks/use-Contenful'
import { FaGreaterThan, FaShareAlt } from 'react-icons/fa'
import { GrClose } from 'react-icons/gr'
import {  AiOutlineUp } from 'react-icons/ai'
import { useState, useContext } from 'react'

import { GlobalContext } from "../../contexts/GlobalContext"


const GET_STORIES = `
query {
  storyCollection(limit: 10) {
    items {
      sys {
        id
        publishedAt
      }
      title 
      cover {
        url
      }
      introduction
      author {
      	name
      }
      story {
        json 
        links {
          entries {
            block {
              __typename
            }
            inline {
              sys {
                id
              }
            }
          }
          assets {
            block {
              sys {
                id
              }
              url
              contentType
            }
          }
        }
      }
      category {
        name
      }
    }
  }
}
`;

function MainContent() {
const { search } = useContext(GlobalContext)
  
const navigate = useNavigate();

let { data, errors } = useContenful(GET_STORIES)

const { storyCollection } = data

const [visibleBtn , setVisibleBtn] = useState(false)

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

const [ newItems, setNewItems ] = useState({})

const toggleHandler = (id) => {
  setNewItems((txt) => ({
    ...txt,
    [id]: !txt[id],
  }));
};

if(errors)
	return <span>{errors.map((error) => error.message).join(",")}</span>

if(!storyCollection) return <span>Loading...</span>

// convert sys.publishedAt to DateString
const convertDate = (str) => {
  let date = new Date(str);

  return date.toDateString()
}

// share story using the Web Share API
const share = async () => {
  const shareData = {
    title: document.title,
    url: window.location.href
  }

  try {
    await navigator.share(shareData)
    console.log('shared successfully')
  } catch(err) {
    console.log(`Error: ${err}`)
  }
}

// set render options for the JSON file fetched from Contentful 
const renderOptions = (links) => {
  // create an asset map
  const assetMap = new Map();
  // // loop through the assets and add them to the map
  for(const asset of links.assets.block) {
    assetMap.set(asset.sys.id, asset);
  }

   // create an entry block map
  //  const entryBlockMap = new Map();
  //  // loop through the entries and add them to the map
  //  for (const entry of links.entries.block) {
  //    console.log(entry)
  //    entryBlockMap.set(entry.sys.id, entry);
  //  }

  return {
    renderMark: {
      [ MARKS.BOLD ]: (text) => <b className='bold'>{text}</b>,
      [ MARKS.UNDERLINE ] : (text) => <span style={{
                                              textUnderlineOffset: "0.5rem",
                                              textDecorationThickness: "2em",
                                              textDecoration: "underline",
                                            }}>{text}</span>,
      [ MARKS.ITALIC ]: (text) => <i>{text}</i>
    },
    renderNode: {
      [ BLOCKS.EMBEDDED_ASSET ]: (node, next) => {
        const asset = assetMap.get(node.data.target.sys.id);

        if (asset.contentType.indexOf('video') > -1) {
          return (
            <iframe
              src={ asset.url }
              height="100%"
              width="100%"
              frameBorder="0"
              scrolling="no"
              title={node.data.target.fields.title}
              allowFullScreen={true}
            />
          );
        } else {
          // render the asset accordingly
        return (
          <div className="secondaryImgCon">
            <img src={ asset.url } className='secondaryImg' alt="asset-img"/>
          </div>
        )
        }
      },

      [ BLOCKS.PARAGRAPH ]: (node, children) => {
        return <p className='story'>{ children }</p>
      },

      [ BLOCKS.HEADING_3 ]: (node, children) => {
        return <h3 className='heading-three' style={{ fontSize: "20px", marginTop: "1rem", marginBottom: "1rem"}}>{ children }</h3>
      },

      [INLINES.HYPERLINK]: ({ data }, children) => (
        <a
          href={data.uri}
          target='_blank'
          rel='noopener noreferrer'
        >{children}</a>
      ),

      [BLOCKS.UL_LIST]: (node, children) => (
        <ul>{children}</ul>
      ),
      [BLOCKS.OL_LIST]: (node, children) => (
        <ol>{children}</ol>
      ),
      [BLOCKS.LIST_ITEM]: (node, children) => <li>{children}</li>,
    }
  }
}

  return (
    <div className='mainContent'>
        { storyCollection?.items.filter((item) => {
          if (search === "") {
            return item
          } else if (item?.title.toLowerCase().includes(search.toLowerCase())) {
            return item
          } else if (item?.author.name.toLowerCase().includes(search.toLowerCase())) {
            return item
          } else if (item?.introduction.toLowerCase().includes(search.toLowerCase())) {
            return item
          } else if (item?.category.name.toLowerCase().includes(search.toLowerCase())) {
            return item
          }
          return false
        }).map((item, i) => (
        <div key={ item?.sys.id }>
            <div className=' text' >
                <h1>{ item?.title }</h1>
                <p className='editor-name'>{ item?.author.name } · { convertDate(item?.sys.publishedAt) }</p>
            </div>

            <div className="blog-Img-con">
                <img src={ item?.cover.url } alt=""  className='blog-img'/>
            </div>

            <div className='text'>
              <p className='story'>{ item?.introduction } </p>
              { !newItems[i] ? <div><span onClick={ () => toggleHandler(i) } className='read-more-link'><strong>Read more </strong> <FaGreaterThan /></span></div> : "" }
            </div>

            { newItems[i] &&
              <>
                <div className="text">
                  { documentToReactComponents( item?.story.json, renderOptions(item?.story.links) )}    
                </div>
                <div className='text share'>
                 <span onClick={ share } className='read-more-link'>Share <FaShareAlt /></span>
                 <span onClick={ () => toggleHandler(i) } className='read-more-link'>Close <GrClose /></span>
               </div>
              </>
            } 

        </div>          
        ))}

        <div className="fixedScroll" style={{display: visibleBtn ? 'block' : 'none'}}>
            <div className="discover-Btn fixedScrollToTop" onClick={scrollToTop}  >
              <AiOutlineUp onClick={scrollToTop} style={{color:'#fff', cursor:'pointer',fontSize: '1.6rem'}}/>
            </div> 
        </div>
        
        <div className="fixedFlex">
            <div className="fixedLeft">
                <h5 onClick={ () => navigate('about') } className="about">ABOUT</h5>

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

export default MainContent