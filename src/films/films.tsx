import { Checkbox, Modal, Pagination } from '@mantine/core'
import type { MovieDto } from '@t/MovieDto'
import { useState } from 'react'
import Film from './film'
import styles from './film.module.scss'
import useGetMovies from './useGetMovies'
import { useTranslations } from 'next-intl'
import FilmOverview from './film_overview'

const Films = () => {
  const tr = useTranslations('COMMON')
  const [opened, setOpened] = useState(false)
  const [selected, setSelected] = useState<MovieDto | undefined>(undefined)

  const [checked, setChecked] = useState(false)

  const [activePage, setPage] = useState(1)
  const { data, error, isLoading, mutate } = useGetMovies({
    page: activePage,
    include_video: checked,
  })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>{JSON.stringify(error)}</div>

  const openModal = (item: MovieDto) => {
    setOpened(true)
    setSelected(item)
  }

  return (
    <div>
      <Modal
        opened={opened}
        onClose={() => {
          setOpened(false)
        }}
        title={selected?.title}
      >
        {selected && <FilmOverview item={selected} />}
      </Modal>
      <Checkbox
        label={tr('WITH_VIDEO')}
        checked={checked}
        onChange={(event) => setChecked(event.currentTarget.checked)}
        mt="sm"
      />
      <div className={styles.film}>
        {data?.results.map((item: MovieDto) => {
          return (
            <Film item={item} key={item.id} onClick={() => openModal(item)} />
          )
        })}
      </div>
      {data && (
        <Pagination
          total={data.total_results}
          value={data.page}
          onChange={setPage}
          mt="sm"
        />
      )}
    </div>
  )
}

export default Films
