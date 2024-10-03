export type Headline = {
  headline: string
  average: number
  share_of_voice: number
  dates: { [key: string]: number }
}

export type Recommend = {
  search_term: string
  headlines: Array<Headline>
}
