import Table from './components/Table'
import { Divider, Stack } from '@mui/material'

export default function Clients() {
  return (
    <div>
        <h3 className='text-xl'>Clients</h3>
        <Divider className='pt-1' />
        <Stack className='mt-2'>
            <Table />
        </Stack>
    </div>
  )
}