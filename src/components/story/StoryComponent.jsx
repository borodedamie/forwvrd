import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { useParams } from 'react-router-dom'
import { BLOCKS, MARKS, INLINES } from '@contentful/rich-text-types'
import { useQuery, gql } from '@apollo/client'
import LoadingSpinner from '../loadingSpinner/LoadingSpinner'
import logo from '../../images/forwardLogo.png'
import { Link , useNavigate} from 'react-router-dom'

function Story() {
const { id } = useParams()
const navigate = useNavigate()
const GET_STORY = gql`
query {
  story(id: "${id}") {
    sys{
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
          }
        }
      }
    }
  }
}
`;

const { loading, error, data } = useQuery(GET_STORY)

// if (loading) return <p>Loading...</p>;
if (loading) return <LoadingSpinner/>;
if (error) return <span>Error : {error.message}</span>; 

// convert sys.publishedAt to DateString
const convertDate = (str) => {
  let date = new Date(str);

  return date.toDateString()
}


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
      [ MARKS.ITALIC ]: (text) => <i>{ text }</i>
    },
    renderNode: {
      [ BLOCKS.PARAGRAPH ]: (node, children) => {
        return <p>{ children }</p>
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
          className='hyperLinks'
          href={data.uri}
          target='_blank'
          rel='noopener noreferrer'
        >{children}</a>
      ),

      [ BLOCKS.UL_LIST ]: (node, children) => (
        <ul>{ children }</ul>
      ),

      [ BLOCKS.OL_LIST ]: (node, children) => (
        <ol>{ children }</ol>
      ),

      [ BLOCKS.LIST_ITEM ]: (node, children) => <li>{ children }</li>,

      [ BLOCKS.EMBEDDED_ASSET ]: (node, next) => {
        const asset = assetMap.get( node.data.target.sys.id );

        return (
          <div className="secondaryImgCon">
            <img src={ asset.url } alt="asset-img" className='secondaryImg'/>
          </div>
        )
      }
    }
  }
}

  return (
    <>
    <div className='header'>
            <Link to="/">
                <div className="logo">
                    <img src={logo} alt="" style={{ width: '100px' }} />
                </div>
            </Link>
    </div>        
    <div className='mainContent'>
      <div className='text'>
        <h1 className="story-heading">{ data?.story.title }</h1>
        <p className='editor-name'>{ data?.story.author.name } . { convertDate( data?.story.sys.publishedAt )}</p>
      </div>
      <div className="blog-Img-con">
        <img src={ data?.story.cover.url } alt="story-img" className='blog-img'/>
      </div>
      <div className='text'>
        <p  className='story'>{ data?.story.introduction }</p>
      </div>
      <div className="text">
        <p className="story">{ documentToReactComponents( data?.story.story.json, renderOptions( data?.story.story.links ) ) }</p>
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

export default Story