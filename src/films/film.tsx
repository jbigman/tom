import type { MovieDto } from '@t/MovieDto'

const Film = (props: { item: MovieDto; key: number; onClick: () => void }) => {
  return (
    <div key={props.key} onClick={props.onClick} onKeyDown={props.onClick}>
      <h3>{props.item.title}</h3>
      <img
        src={`https://image.tmdb.org/t/p/original${props.item.poster_path}`}
        alt={props.item.title}
        height={200}
      />
    </div>
  )
}

export default Film
