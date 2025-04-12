import type { MovieDto } from '@t/MovieDto'
import type { Paginate } from '@t/Paginate'
import axios, { type RawAxiosRequestHeaders } from 'axios'
import useSWR from 'swr'

const useGetMovies = () => {
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

  const { data, error, isLoading } = useSWR<Paginate<MovieDto>>(
    'https://api.themoviedb.org/3/discover/movie',
    fetcher
  )

  return { data, error, isLoading }
}

export default useGetMovies
