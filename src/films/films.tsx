import { Modal } from '@mantine/core'
import type { MovieDto } from '@t/MovieDto'
import { useState } from 'react'
import Film from './film'
import styles from './film.module.scss'
import useGetMovies from './useGetMovies'

const Films = () => {
  const [opened, setOpened] = useState(false)
  const [selected, setSelected] = useState<MovieDto | undefined>(undefined)

  const { data, error, isLoading } = useGetMovies()

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>{JSON.stringify(error)}</div>

  const handler = (item: MovieDto) => {
    setOpened(true)
    setSelected(item)
  }
  return (
    <div className={styles.film}>
      <Modal
        opened={opened}
        onClose={() => {
          setOpened(false)
        }}
        title={selected?.title}
      >
        {selected?.overview}
      </Modal>

      {data?.results.map((item: MovieDto) => {
        return <Film item={item} key={item.id} onClick={() => handler(item)} />
      })}
    </div>
  )
}

export default Films
