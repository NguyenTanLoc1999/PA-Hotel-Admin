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

// ** Demo Components Imports
import TableBasic from 'src/views/table/mui/TableBasic'

import CustomTextField from 'src/@core/components/mui/text-field'
import {Box, Button, CardContent, Divider, MenuItem, Paper, SelectChangeEvent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material'
import {ChangeEvent, useState} from 'react'
// ** Custom Component Import
import CustomChip from 'src/@core/components/mui/chip'
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps} from 'recharts'
// ** Icon Imports
import Icon from 'src/@core/components/icon'

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

const codes = [
  'ALL',
  'SPH',
  'PP02',
  'SR01',
  'SR02',
]

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

const CustomTooltip = (data: TooltipProps<any, any>) => {
  const {active, payload} = data

  if (active && payload) {
    return (
      <div className='recharts-custom-tooltip'>
        <Typography>{data.label}</Typography>
        <Divider />
        {data &&
          data.payload &&
          data.payload.map((i: any) => {
            return (
              <Box sx={{display: 'flex', alignItems: 'center', '& svg': {color: i.fill, mr: 2.5}}} key={i.dataKey}>
                <Icon icon='mdi:circle' fontSize='0.6rem' />
                <Typography variant='body2'>{`${i.dataKey} : ${i.payload[i.dataKey]}`}</Typography>
              </Box>
            )
          })}
      </div>
    )
  }

  return null
}

const ActualData = () => {
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
        <Card sx={{marginBottom: '16px'}}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: 'row',
              '& > *': {maxWidth: 500, mt: theme => `${theme.spacing(4)} !important`, mb: theme => `${theme.spacing(4)} !important`},
              paddingLeft: '1.5rem',
              paddingRight: '1.5rem',
            }}
          >
            <CustomTextField
              select
              fullWidth
              label='Choose codes'
              id='select-multiple-chip'
              placeholder='Choose codes'
              SelectProps={{
                MenuProps,
                multiple: true,
                value: chooseCodes,
                onChange: e => handleChange(e),
                renderValue: selected => (
                  <Box sx={{display: 'flex', flexWrap: 'wrap'}}>
                    {(selected as unknown as string[]).map(value => (
                      <CustomChip key={value} label={value} sx={{m: 0.75}} skin='light' color='primary' />
                    ))}
                  </Box>
                )
              }}
            >
              {codes.map(code => (
                <MenuItem key={code} value={code}>
                  {code}
                </MenuItem>
              ))}
            </CustomTextField>
          </Box>
        </Card>

        <Card sx={{marginBottom: '16px'}}>
          <CardHeader
            title='Bar chart'
            sx={{
              flexDirection: ['column', 'row'],
              alignItems: ['flex-start', 'center'],
              '& .MuiCardHeader-action': {mb: 0},
              '& .MuiCardHeader-content': {mb: [2, 0]}
            }}
          // action={
          //   <DatePicker
          //     selectsRange
          //     id='recharts-bar'
          //     endDate={endDate}
          //     selected={startDate}
          //     startDate={startDate}
          //     onChange={handleOnChange}
          //     placeholderText='Click to select a date'
          //     customInput={<CustomInput start={startDate as Date | number} end={endDate as Date | number} />}
          //   />
          // }
          />
          <CardContent>
            <Box sx={{mb: 4, display: 'flex', flexWrap: 'wrap'}}>
              <Box sx={{mr: 6, display: 'flex', alignItems: 'center', '& svg': {mr: 1.5, color: '#826af9'}}}>
                <Icon icon='mdi:circle' fontSize='0.75rem' />
                <Typography variant='body2'>Total Room in Hotel</Typography>
              </Box>
              {/* <Box sx={{mr: 6, display: 'flex', alignItems: 'center', '& svg': {mr: 1.5, color: '#9f87ff'}}}>
                <Icon icon='mdi:circle' fontSize='0.75rem' />
                <Typography variant='body2'>Room Revenue</Typography>
              </Box>
              <Box sx={{mr: 6, display: 'flex', alignItems: 'center', '& svg': {mr: 1.5, color: '#d2b0ff'}}}>
                <Icon icon='mdi:circle' fontSize='0.75rem' />
                <Typography variant='body2'>F&B Revenue</Typography>
              </Box> */}
              {/* <Box sx={{display: 'flex', alignItems: 'center', '& svg': {mr: 1.5, color: '#f8d3ff'}}}>
                <Icon icon='mdi:circle' fontSize='0.75rem' />
                <Typography variant='body2'>Motorola</Typography>
              </Box> */}
            </Box>
            <Box sx={{height: 350}}>
              <ResponsiveContainer>
                <BarChart height={350} data={rows.filter((el) => chooseCodes.find((code) => el.code === code))} barSize={15} margin={{left: -20}}>
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis dataKey='code' reversed={false} />
                  <YAxis orientation={'left'} />
                  <Tooltip content={CustomTooltip} />
                  <Bar dataKey='totalRoom' stackId='a' fill='#826af9' />
                  {/* <Bar dataKey='roomRevenue' stackId='a' fill='#9f87ff' />
                  <Bar dataKey='FB' stackId='a' fill='#d2b0ff' /> */}
                  {/* <Bar dataKey='Motorola' stackId='a' fill='#f8d3ff' radius={[15, 15, 0, 0]} /> */}
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </CardContent>
        </Card>

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

export default ActualData
