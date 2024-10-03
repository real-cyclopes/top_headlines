import { styled } from '@mui/material/styles'

interface OrderComponentProps {
  value: number
}

const Order = styled(
  'span',
  {},
)<OrderComponentProps>(({ value }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: 'white !important',
  borderRadius: '50%',
  fontWeight: 500,
  minWidth: '24px',
  backgroundColor:
    value > 75
      ? '#19a873'
      : value > 50
      ? '#b9dd25'
      : value > 25
      ? '#ffd700'
      : '#f7040f',
}))

export default Order
