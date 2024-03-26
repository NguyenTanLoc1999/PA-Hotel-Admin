// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import {styled} from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'

// ** Custom Components Imports
import PageHeader from 'src/@core/components/page-header'

import {Box, Button, CardContent, Divider, MenuItem, Paper, SelectChangeEvent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material'
import {ChangeEvent, useState} from 'react'

const LinkStyled = styled(Link)(({theme}) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      width: 250,
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP
    }
  }
}


const createData = (code: string, totalRoom: number, roomRevenue: string, FB: string) => {
  return {code, totalRoom, roomRevenue, FB}
}

const formattedNumber = (number: number) => {
  return number.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
}

const rows = [
  createData('ALL', 744, formattedNumber(234458.70), formattedNumber(609316.22)),
  createData('SPH', 788, formattedNumber(250458.90), formattedNumber(600000.52)),
  createData('PP02', 556, formattedNumber(202625.70), formattedNumber(520600.12)),
  createData('SR01', 305, formattedNumber(95825.30), formattedNumber(210000.63)),
  createData('SR02', 356, formattedNumber(125535.56), formattedNumber(240522.55))
]

const PeriodDetail = () => {
  // ** State
  const [chooseCodes, setChooseCodes] = useState<string[]>(['SPH'])

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    setChooseCodes(event.target.value as string[])
  }

  const total = (array: any) => {
    let sum = 0;
    for (let i = 0; i < array.length; i++) {
      sum += array[i].totalRoom
    }
    return sum
  }
  const totalRoomRevenue = (array: any) => {
    let sum = 0;
    for (let i = 0; i < array.length; i++) {
      sum += parseFloat(array[i].roomRevenue.replace(/[$,]/g, ''))
    }
    return formattedNumber(sum)
  }
  const totalFB = (array: any) => {
    let sum = 0;
    for (let i = 0; i < array.length; i++) {
      sum += parseFloat(array[i].FB.replace(/[$,]/g, ''))
    }
    return formattedNumber(sum)
  }
  return (
    <Grid container spacing={6}>
      <PageHeader
        title={
          <Typography variant='h4'>
            <LinkStyled href='https://mui.com/material-ui/react-table/' target='_blank'>
              At a Glance Report
            </LinkStyled>
          </Typography>
        }
      />
      <Grid item xs={12}>
        <Card>
          {/* <CardHeader title='Basic Table' /> */}
          <TableContainer component={Paper}>
            <Table stickyHeader sx={{minWidth: 650}} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell>Property</TableCell>
                  <TableCell align='center'>Total Room in Hotel</TableCell>
                  <TableCell align='center'>Room Revenue</TableCell>
                  <TableCell align='center'>F&B Revenue</TableCell>
                  {/* <TableCell align='right'>Protein (g)</TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.filter((el) => chooseCodes.find((code) => el.code === code)).map(row => (
                  <TableRow
                    key={row.code}
                  >
                    <TableCell component='th' scope='row'>
                      {row.code}
                    </TableCell>
                    <TableCell align='center'>{row.totalRoom}</TableCell>
                    <TableCell align='center'>{row.roomRevenue}</TableCell>
                    <TableCell align='center'>{row.FB}</TableCell>
                  </TableRow>
                ))}
                <TableRow sx={{background: 'gray'}}>
                  <TableCell component='th' scope='row' sx={{fontWeight: '700'}}>
                    Grand Total
                  </TableCell>
                  <TableCell align='center' sx={{fontWeight: '700'}}>{total(rows.filter((el) => chooseCodes.find((code) => el.code === code)))}</TableCell>
                  <TableCell align='center' sx={{fontWeight: '700'}}>{totalRoomRevenue(rows.filter((el) => chooseCodes.find((code) => el.code === code)))}</TableCell>
                  <TableCell align='center' sx={{fontWeight: '700'}}>{totalFB(rows.filter((el) => chooseCodes.find((code) => el.code === code)))}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Grid>

    </Grid>
  )
}

export default PeriodDetail
