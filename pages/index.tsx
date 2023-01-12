import Head from 'next/head'
import { Tweet } from '../types/tweet'
import TweetComponent from '../components/tweet'
import axios from 'axios'

export async function getStaticProps(): Promise<{ props: { tweets: Tweet [] }}> {
  const config = {
    url: 'https://cihan-software-chatter-backend-bucket.s3.eu-west-1.amazonaws.com/latest/all.json',
    method: 'get',
  }

  const _response = await axios.request(config)
  const tweets = (_response.data as Tweet[])
    .filter((t: any) => t.likes > 100)
    .map((d: any, idx: number) => ({ ...d, index: idx }))

  return {
    props: {
      tweets,
    },
  }
}

export default function Home({ tweets }: { tweets: Tweet [] }) {
  return (
    <>
      <Head>
        <title>Software News Curator</title>
        <meta name="description" content="Daily news from Twitter about software." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:image" content="/sw-chatter-img.png" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {tweets.map((t, idx) => <TweetComponent key={idx.toString()} tweet={t}/>)}
      </main>
    </>
  )
}
