import Head from 'next/head'
import data from '../data.json'
import { Tweet } from '../types/tweet'
import TweetComponent from '../components/tweet'

export async function getStaticProps(): Promise<{ props: { tweets: Tweet [] }}> {
  const tweets = (data as []).filter((t: any) => t.likes > 100).map((d: any, idx: number) => ({ ...d, index: idx })) as Tweet []
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
