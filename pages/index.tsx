import Head from 'next/head'
import { Tweet } from '../types/tweet'
import TweetComponent from '../components/tweet'
import axios from 'axios'

type PropType = {
  tweets: Tweet []
  date: number
}

export async function getStaticProps(): Promise<{ props: PropType }> {
  const config = {
    url: 'https://cihan-software-chatter-backend-bucket.s3.eu-west-1.amazonaws.com/latest/all.json',
    method: 'get',
  }

  const _response = await axios.request(config)
  const tweets = (_response.data as Tweet[])
    .filter((t: any) => t.likes > 50)
    .map((d: any, idx: number) => ({ ...d, index: idx }))

  return {
    props: {
      tweets,
      date: +new Date(_response.headers['last-modified'] as string)
    },
  }
}

export default function Home({ tweets, date }: PropType) {
  return (
    <>
      <Head>
        <title>Software News Curator</title>
        <meta name="description" content="Daily news from Twitter about software." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:image" content="/sw-chatter-img.png" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <main className="bg-stone-100">
        <header className='sticky top-20 ml-6 p-2 z-10 underline font-mono font-bold text-2xl'>
            <a href='#about'>About</a>
        </header>
        <div className='mx-auto text-center text-2xl'>&#128187; Today&apos;s ({new Date(date).toISOString().substring(0, 10)}) tweets on software &#128187;</div>
        <div className='container mx-auto'>
          {tweets.map((t, idx) => <TweetComponent key={idx.toString()} tweet={t}/>)}
        </div>
        <section id='about' className='p-10 text-xl text-left font-mono'>
            <div className='text-2xl p-10'>About</div>
            <ul className='list-disc pl-10'>
              <li>The data is fetched from AWS S3 at build time. It contains latest popular tweets on software.</li>
              <li>Frontend code can be found at <a href='https://github.com/selcukcihan/software-chatter' rel="noreferrer" target='_blank'>https://github.com/selcukcihan/software-chatter</a>.</li>
              <li>More details on how the data in S3 gets created is explained in <a href='https://github.com/selcukcihan/software-chatter-backend' rel="noreferrer" target='_blank'>https://github.com/selcukcihan/software-chatter-backend</a></li>
              <li>Check <a href='https://selcukcihan.com' rel="noreferrer" target='_blank'>selcukcihan.com</a> to reach out!</li>
            </ul>
          </section>
      </main>
    </>
  )
}
