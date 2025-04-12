import type { MovieDto } from '@t/MovieDto'
import { useTranslations } from 'next-intl'
import FormattedDate from 'src/components/FormattedDate';

const Movie = (props: { item: MovieDto; key: number; onClick: () => void }) => {
  const tr = useTranslations('COMMON')
  return (
    <div key={props.key} onClick={props.onClick} onKeyDown={props.onClick}>
      <h3>{props.item.title}</h3>
      {tr('RELEASE_DATE')}
      <FormattedDate value={new Date(props.item.release_date)} dateStyle={'long'} />
      <img
        src={`https://image.tmdb.org/t/p/original${props.item.poster_path}`}
        alt={props.item.title}
        height={200}
      />
    </div>
  )
}

export default Movie
