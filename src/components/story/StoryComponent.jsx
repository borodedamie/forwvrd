import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { useParams } from 'react-router-dom'
import { BLOCKS, MARKS, INLINES } from '@contentful/rich-text-types'
import { useQuery, gql } from '@apollo/client'
import '../mainContent/MainContent.css'
import LoadingSpinner from '../loadingSpinner/LoadingSpinner'

function Story() {
const { id } = useParams()

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
        return <p className='story'>{ children }</p>
      },

      [ BLOCKS.HEADING_3 ]: (node, children) => {
        return <h3 className='heading-three'>{ children }</h3>
      },

      [INLINES.HYPERLINK]: ({ data }, children) => (
        <a
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
          <div className='secondaryImgCon'>
            <img src={ asset.url } alt="asset-img" className='secondaryImg'/>
          </div>
        )
      }
    }
  }
}

  return (
    <div className='mainContent'>
      <div className='text'>
        <h1>{ data?.story.title }</h1>
        <p className='editor-name'>{ data?.story.author.name } . { convertDate( data?.story.sys.publishedAt )}</p>
      </div>
      <div className='blog-Img-con'>
        <img src={ data?.story.cover.url } alt="story-img" className='blog-img' />
      </div>
      <div className='text'>
        <p className='story'>{ data?.story.introduction }</p>
      </div>
      <div className='text'>
        { documentToReactComponents( data?.story.story.json, renderOptions( data?.story.story.links ) ) }
      </div>
    </div>
  )
}

export default Story