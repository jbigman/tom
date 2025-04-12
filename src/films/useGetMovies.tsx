import type { MovieDto } from '@t/MovieDto'
import type { Paginate } from '@t/Paginate'
import axios, { type RawAxiosRequestHeaders } from 'axios'
import useSWR from 'swr'

interface DiscoverMovieQueryParams {
  include_adult: boolean
  include_video: boolean
  'vote_average.gte': number
  'vote_count.gte': number
  page: number
}

const useGetMovies = (params: Partial<DiscoverMovieQueryParams>) => {
  const headers: RawAxiosRequestHeaders = {
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_IMDB_TOKEN}`,
  }

  const fetcher = async (url: string) =>
    (
      await axios.get(url, {
        headers,
      })
    ).data

  const searchParams = new URLSearchParams()
  searchParams.append('include_adult', params.include_adult ? 'true' : 'false')
  searchParams.append('include_video', params.include_video ? 'true' : 'false')
  searchParams.append('page', params.page?.toString() || '1')

  const { data, error, isLoading, mutate } = useSWR<Paginate<MovieDto>>(
    `https://api.themoviedb.org/3/discover/movie?${searchParams.toString()}`,
    fetcher
  )

  return { data, error, isLoading, mutate }
}

export default useGetMovies
