import { useParams } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS, MARKS, INLINES } from '@contentful/rich-text-types'

function CategoryComponent() {
const { categoryId } = useParams()

const GET_CATEGORY_STORIES = gql`
query {
    category(id: "${categoryId}") {
      storiesCollection( limit: 3, skip: 0 ) {
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

const { loading, error, data } = useQuery(GET_CATEGORY_STORIES)

if (loading) return <p>Loading...</p>;
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
  
        [ BLOCKS.HEADING_3 ]: (node, children) => {
          return <h3>{ children }</h3>
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
            <div>
              <img src={ asset.url } alt="asset-img"/>
            </div>
          )
        }
      }
    }
  }
  

  return (
    <>
        { data.category.storiesCollection.items.map((item, i) => (
            <div>
                <div key={ item?.sys.id }>
                    <h1>{ item.title }</h1>
                    <p>{ item?.author.name } . { convertDate( item?.sys.firstPublishedAt )} </p>
                </div>
                <div>
                    <img src={ item?.cover.url } alt="story-img" />
                </div>
                <div>
                    <p>{ item?.introduction }</p>
                </div>
                <div>
                    { documentToReactComponents( item?.story.json, renderOptions(item?.story.links) ) }
                </div>
            </div>
        )) }
    </>
  )
}

export default CategoryComponent