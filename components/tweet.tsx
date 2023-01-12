import { Tweet } from '../types/tweet'
import { convert } from 'html-to-text'

const TweetComponent = ({ tweet }: { tweet: Tweet }) => {
  return (
    <section id={`${tweet.index}`}>
      <div className='bg-gray-50 rounded ring-1 ring-orange-400 border-2 border-orange-300 my-8 mx-auto p-2 max-w-lg shadow-xl shadow-gray-400 opacity-90 mix-blend-darken'>
        <div>
          <div className='flex'>
            <a className='group' href={tweet.link} target='_blank' rel="noreferrer">
              <span className='text-sm italic font-light opacity-60 group-hover:opacity-100 group-hover:font-normal'>{tweet.author}</span>
            </a>
          </div>
        </div>
        <div className='my-2'>{convert(tweet.text)}</div>
        <div className='flex mt-2 gap-8 text-xs font-light justify-end'>
          <span>{tweet.likes} likes</span>
        </div>
      </div>
    </section>
  )
}

export default TweetComponent
