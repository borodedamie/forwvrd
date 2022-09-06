import { useParams } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS, MARKS, INLINES } from '@contentful/rich-text-types'
import '../mainContent/MainContent.css'
import { FaGreaterThan, FaShareAlt } from 'react-icons/fa'
import { GrClose } from 'react-icons/gr'
import {  AiOutlineUp } from 'react-icons/ai'
import { Waypoint } from 'react-waypoint'
import { GlobalContext } from "../../contexts/GlobalContext"
import { useState, useContext } from 'react'
import LoadingSpinner from '../loadingSpinner/LoadingSpinner'
import ErrorPage from '../errorPage/ErrorPage'
import { Link } from 'react-router-dom'

const PAGE_SIZE = 3

function CategoryComponent() {
const { categoryId } = useParams()

const GET_CATEGORY_STORIES = gql`
query GetCategoryStory ($limit: Int!, $skip: Int){
    category(id: "${categoryId}") {
      storiesCollection( limit: $limit, skip: $skip ) {
        items {
            sys{
                id
                firstPublishedAt
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
                }
              }
            }
          }
        }
      }
    }
  }
`;

const { search, spinner } = useContext(GlobalContext)

const { loading, error, data, fetchMore } = useQuery(GET_CATEGORY_STORIES, { variables: { limit: PAGE_SIZE, skip: 0 }})

const [visibleBtn , setVisibleBtn] = useState(false)

// convert sys.publishedAt to DateString
const convertDate = (str) => {
    let date = new Date(str);
  
    return date.toDateString()
}

// share story using the Web Share API
const share = async (id) => {
    const shareData = {
      title: document.title,
      url: window.location.origin + `/story/${id}`
    }
  
    try {
      await navigator.share(shareData)
    } catch(err) {
      console.log(`Error: ${err}`)
    }
  }

const [ newItems, setNewItems ] = useState({})
  
const toggleHandler = (id) => {
    setNewItems((txt) => ({
      ...txt,
      [id]: !txt[id],
    }));
};

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


  const renderOptions = (links) => {
    // create an asset map 
    const assetMap = new Map();
    // Loop through the assets and add them to the map
    for(const asset of links.assets.block) {
      assetMap.set( asset.sys.id, asset );
    }
  
    // create an entry block map
    const entryBlockMap = new Map();
  
    for(const entry of links.entries.block) {
      entryBlockMap.set( entry.sys.id, entry );
    }
  
    // render marks
    return {
      renderMark: {
        [ MARKS.BOLD ]: (text) => <b>{ text }</b>,
        [ MARKS.UNDERLINE ]: (text) => <span>{ text }</span>,
        [ MARKS.ITALIC ]: (text) => <i>{ text }</i>,
        [ MARKS.CODE ]: (text) => <code>{ text }</code>
      },
      renderNode: {
        [ BLOCKS.PARAGRAPH ]: (node, children) => {
          return <p className='story'>{ children }</p>
        },

        [ BLOCKS.HEADING_1 ]: (node, children) => {
          return <h1>{ children }</h1>
        },

        [ BLOCKS.HEADING_2 ]: (node, children) => {
          return <h2>{ children }</h2>
        },
  
        [ BLOCKS.HEADING_3 ]: (node, children) => {
            return <h3 className='heading-three' style={{ fontSize: "20px", marginTop: "1rem", marginBottom: "1rem", color: "#8c94ac" }}>{ children }</h3>
        },

        [ BLOCKS.HEADING_4 ]: (node, children) => {
          return <h4>{ children }</h4>
        },

        [ BLOCKS.HEADING_5 ]: (node, children) => {
          return <h5>{ children }</h5>
        },

        [ BLOCKS.HEADING_6 ]: (node, children) => {
          return <h6>{ children }</h6>
        },
  
        [INLINES.HYPERLINK]: ({ data }, children) => (
          <a
            href={data.uri}
            target='_blank'
            rel='noopener noreferrer'
          >{children}</a>
        ),
  
        [ BLOCKS.UL_LIST ]: (node, children) => (
          <ul>
            <li>{ children }</li>
          </ul>
        ),
  
        [ BLOCKS.OL_LIST ]: (node, children) => (
          <ol>{ children }</ol>
        ),
  
        [ BLOCKS.LIST_ITEM ]: (node, children) => <li style={{ fontSize: '16px'}}>{ children }</li>,
  
        [ BLOCKS.EMBEDDED_ASSET ]: (node, next) => {
          const asset = assetMap.get( node.data.target.sys.id );
  
          return (
            <div className='secondaryImgCon'>
              <img src={ asset.url } alt="asset-img" className='secondaryImg' />
            </div>
          )
        }
      }
    }
  }

if (loading) return <LoadingSpinner />;
if (error) return <ErrorPage message = {error.message} />;    

  return (
    <>
        { !spinner && data.category.storiesCollection.items.filter((item) => {
          if(search === "") {
            return item
          } else if( item?.title.toLowerCase().includes(search.toLowerCase()) ||
                      item?.author.name.toLowerCase().includes(search.toLowerCase()) ||
                      item?.introduction.toLowerCase().includes(search.toLowerCase())) {
            return item
          } 
          return false
        }).map((item, i) => (
            <div className='mainContent' key={ item?.sys.id }>
                <div className='text'>
                    <h1 className="story-heading">{ item?.title }</h1>
                    <p className='editor-name'>{ item?.author.name } . { convertDate( item?.sys.firstPublishedAt )} </p>
                </div>
                <div className='blog-Img-con'>
                    <img src={ item?.cover.url } alt="story-img" className='blog-img' />
                </div>
                <div className='text'>
                    <p className='story'>{ item?.introduction }</p>
                    { !newItems[i] ? <div><span onClick={ () => toggleHandler(i) } className='read-more-link'><strong>Read more </strong> <FaGreaterThan /></span></div> : "" }
                </div>

                { newItems[i] &&
                    <>
                        <div className='text'>
                            { documentToReactComponents( item?.story.json, renderOptions(item?.story.links) ) }
                        </div>
                        <div className='text share'>
                            <span onClick={ () => share( item?.sys.id ) } className='read-more-link'>Share <FaShareAlt /></span>
                            <span onClick={ () => toggleHandler(i) } className='read-more-link'>Close <GrClose /></span>
                        </div>
                    </>
                }
            
            </div>
        )) }

      { !spinner && <Waypoint onEnter={ () => fetchMore({ 
                variables: { skip: data.category.storiesCollection.items.length }, 
                updateQuery: ( prev, { fetchMoreResult }) => {
                    if(!fetchMoreResult) return prev;
                    return Object.assign({}, prev, {
                        category: {
                            storiesCollection: {
                                items: [ ...prev.category.storiesCollection.items, ...fetchMoreResult.category.storiesCollection.items ]
                            }
                        }
                    });
                }
      })} /> }

        <div className='fixedScroll' style={{display: visibleBtn ? 'block' : 'none'}}>
            <div className="discover-Btn fixedScrollToTop">
                <AiOutlineUp onClick={ scrollToTop }
                style={{color:'#fff', cursor:'pointer',fontSize: '1.6rem'}}/>
            </div>
        </div>

        { spinner && <LoadingSpinner /> }

        <div className="fixedFlex">
            <div className="fixedLeft">
              <Link to="/about" reloadDocument="true"><h5 className="about">ABOUT</h5></Link>

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
    </>
  )
}

export default CategoryComponent