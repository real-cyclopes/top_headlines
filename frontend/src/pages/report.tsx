import { useState, useEffect, useMemo } from 'react'
import { Typography, Container, Card, CardContent } from '@mui/material'
import { getRecommends } from '../services'
import { Recommend } from '../types'
import SearchIcon from '@mui/icons-material/Search'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import TablePagination from '@mui/material/TablePagination'
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from '../components/Search'
import Order from '../components/Order'

const Report = () => {
  const [recommends, setRecommends] = useState<Array<Recommend>>([])
  const [page, setPage] = useState<number>(0)
  const [rowsPerPage, setRowsPerPage] = useState<number>(4)
  const [search, setSearch] = useState<string>('')

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }
  useEffect(() => {
    getRecommends()
      .then(async (response) => {
        const { data } = await response.json()
        setRecommends(data)
      })
      .catch(() => {})
  }, [])

  const searchResult = useMemo(() => {
    const result = recommends.filter(({ search_term, headlines }) => {
      if (search_term.toLowerCase().includes(search.toLowerCase())) return true
      const find = headlines.find(({ headline }) =>
        headline.toLowerCase().includes(search.toLowerCase()),
      )
      if (find) return true
    })
    return result
  }, [search, recommends])

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
    setPage(0)
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
      }}
    >
      <Box
        sx={{
          height: '72px',
          width: '100%',
          padding: `8px 16px`,
          borderBottom: '1px solid black',
          fontSize: '20px',
          fontWeight: 500,
        }}
      >
        <Container maxWidth="xl">
          <span>Winners & Losers Report</span>
          <Typography>Top performing search marketing headlines</Typography>
        </Container>
      </Box>
      <Container maxWidth="xl" sx={{ margin: '24px auto' }}>
        <Box sx={{ width: '320px', margin: '16px 0px' }}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              value={search}
              onChange={handleSearch}
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
          }}
        >
          {searchResult
            .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
            .map((recommend) => (
              <Card
                variant="outlined"
                sx={{ margin: 1, width: '320px' }}
                key={recommend.search_term}
              >
                <CardContent>
                  <Typography
                    sx={{
                      fontSize: '16px',
                      fontWeight: 500,
                      height: '44px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                    component="div"
                  >
                    {recommend.search_term}{' '}
                  </Typography>
                </CardContent>
                <CardContent sx={{ paddingTop: 0 }}>
                  {recommend.headlines.map((headline, index) => (
                    <Chip
                      key={index}
                      sx={{
                        margin: '4px',
                        width: '100%',
                        justifyContent: 'start',
                      }}
                      avatar={
                        <Order value={headline.average}>{index + 1}</Order>
                      }
                      label={headline.headline}
                      variant="outlined"
                    />
                  ))}
                </CardContent>
              </Card>
            ))}
        </Box>
        <TablePagination
          component="div"
          sx={{ marginBottom: 2 }}
          count={searchResult.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[4, 8, 24, 48]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Container>
    </Box>
  )
}

export default Report
