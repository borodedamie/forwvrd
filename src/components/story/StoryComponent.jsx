import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { useParams } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'

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

console.log(GET_STORY)

const { loading, error, data } = useQuery(GET_STORY)

if (loading) return <p>Loading...</p>;
if (error) return <span>Error : {error.message}</span>; 

// convert sys.publishedAt to DateString
const convertDate = (str) => {
  let date = new Date(str);

  return date.toDateString()
}

console.log(data)

  return (
    <div>
      <div>
        <h1>{ data?.story.title }</h1>
        <p>{ data?.story.author.name } . { convertDate( data?.story.sys.publishedAt )}</p>
      </div>
      <div>
        <img src={ data?.story.cover.url } alt="story-img" />
      </div>
      <div>
        <p>{ data?.story.introduction }</p>
      </div>
      <div>
        { documentToReactComponents( data?.story.story.json ) }
      </div>
    </div>
  )
}

export default Story