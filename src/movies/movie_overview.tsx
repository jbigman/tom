import type { MovieDto } from '@t/MovieDto'
import { useTranslations } from 'next-intl'
import type { ReactElement } from 'react'
import FormattedDate from 'src/components/FormattedDate'

const MovieOverview = (props: { item: MovieDto }) => {
  const tr = useTranslations('COMMON')

  const Property = (props: { label: string; value: string | ReactElement }) => {
    return (
      <span>
        {tr(props.label)} &nbsp;
        {props.value}
      </span>
    )
  }

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <img
        src={`https://image.tmdb.org/t/p/original${props.item.poster_path}`}
        alt={props.item.title}
        width={200}
      />
      <br />
      <div>{props.item.overview}</div>
      <Property
        label={'RELEASE_DATE'}
        value={
          <FormattedDate
            value={new Date(props.item.release_date)}
            dateStyle={'long'}
          />
        }
      />
      <Property label={'GENRES'} value={props.item.genre_ids.toString()} />
      <Property label={'SCORE'} value={props.item.vote_average.toString()} />
    </div>
  )
}

export default MovieOverview
