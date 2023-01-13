type Tweet = {
  link: string
  text: string
  author: string
  likes: number
  index: number
  urls: {
    shortened: string
    actual: string
  } []
}

export type { Tweet }
