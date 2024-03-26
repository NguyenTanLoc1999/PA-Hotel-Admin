// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import {styled} from '@mui/material/styles'
import Typography from '@mui/material/Typography'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports
import PageHeader from 'src/@core/components/page-header'

import {Box, Button, CardContent, Collapse, Divider, IconButton, MenuItem, Paper, SelectChangeEvent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material'
import React, {ChangeEvent, useState} from 'react'
import {dashboardSampleV0_4MealDetailData} from '../../../@fake-db/sampledata_meal_detail'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {utils, writeFile} from 'xlsx'
import * as XLSX from "xlsx";

const LinkStyled = styled(Link)(({theme}) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

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

const formatMoney = (money: number) => {
  return money.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}
const formatPercentage = (percen: number) => {
  return percen.toString() + "%"
}

const Row = (props: any) => {
  const {row} = props;
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [openBreak, setOpenBreak] = useState(false);
  const [openLunch, setOpenLunch] = useState(false);
  const [openDinner, setOpenDinner] = useState(false);
  const [objBreak, setObjBreak] = useState<any>([]);
  const [objLunch, setObjLunch] = useState<any>([]);
  const [objDinner, setObjDinner] = useState<any>([]);

  return (
    <React.Fragment>
      <TableRow>
        <TableCell width={'50px'}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => {
              setOpen(!open)
              if (open === false) {
                setOpen2(false)
                setOpenBreak(false)
                setOpenLunch(false)
                setOpenDinner(false)
              }
            }}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell width={'120px'}>
          {row.report_date}
        </TableCell>
        <TableCell width={'100px'} />
        <TableCell width={'100px'} />
        <TableCell width={'100px'} align='center'>{row.total.adults_actual.count}</TableCell>
        <TableCell width={'100px'} align='center'>{row.total.children_actual.count}</TableCell>
        <TableCell width={'100px'} align='center'>{formatMoney(row.total.adults_actual.sales)}</TableCell>
        <TableCell width={'100px'} align='center'>{row.total.children_actual.sales}</TableCell>
        <TableCell width={'100px'} align='center'>{row.total.total_actual.count}</TableCell>
        <TableCell width={'100px'} align='center'>{formatPercentage(row.total.total_actual.percentage_count)}</TableCell>
        <TableCell width={'100px'} align='center'>{formatMoney(row.total.total_actual.sales)}</TableCell>
        <TableCell width={'100px'} align='center'>{formatPercentage(row.total.total_actual.percentage_sales)}</TableCell>
      </TableRow>
      {
        row.outlet.map((item: any, index: any) => {


          return (
            <React.Fragment key={index}>
              <TableRow >
                <TableCell colSpan={12} style={{padding: '0'}}>
                  <Collapse in={open} timeout="auto" unmountOnExit>
                    <Table>
                      <TableBody>
                        <TableRow>
                          <TableCell width={'50px'} />
                          <TableCell width={'120px'} align='center'>
                            <IconButton
                              aria-label="expand row"
                              size="small"
                              onClick={() => {
                                setOpen2(!open2)
                                if (open2 === false) {
                                  setOpenBreak(false)
                                  setOpenLunch(false)
                                  setOpenDinner(false)
                                }
                                const objArrayBreak: any = [];
                                Object.keys(item.breakfast.records).forEach(key => objArrayBreak.push({
                                  time: key,
                                  record: item.breakfast.records[key]
                                }))
                                setObjBreak(objArrayBreak)
                                const objArrayLunch: any = [];
                                Object.keys(item.lunch.records).forEach(key => objArrayLunch.push({
                                  time: key,
                                  record: item.lunch.records[key]
                                }))
                                setObjLunch(objArrayLunch)

                                const objArrayDinner: any = [];
                                Object.keys(item.dinner.records).forEach(key => objArrayDinner.push({
                                  time: key,
                                  record: item.dinner.records[key]
                                }))
                                setObjDinner(objArrayDinner)
                              }}
                            >
                              {open2 ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                            </IconButton>
                          </TableCell>
                          <TableCell width={'100px'} align='center'>{item.outlet_code}</TableCell>
                          <TableCell width={'100px'} />
                          <TableCell width={'100px'} align='center'>{item.total.adults_actual.count}</TableCell>
                          <TableCell width={'100px'} align='center'>{item.total.children_actual.count}</TableCell>
                          <TableCell width={'100px'} align='center'>{formatMoney(item.total.adults_actual.sales)}</TableCell>
                          <TableCell width={'100px'} align='center'>{item.total.children_actual.sales}</TableCell>
                          <TableCell width={'100px'} align='center'>{item.total.total_actual.count}</TableCell>
                          <TableCell width={'100px'} align='center'>{formatPercentage(item.total.total_actual.percentage_count)}</TableCell>
                          <TableCell width={'100px'} align='center'>{formatMoney(item.total.total_actual.sales)}</TableCell>
                          <TableCell width={'100px'} align='center'>{formatPercentage(item.total.total_actual.percentage_sales)}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </Collapse>
                </TableCell>
              </TableRow>


              <TableRow>
                <TableCell colSpan={12} style={{padding: '0'}}>
                  <Collapse in={open2 && open} timeout="auto" unmountOnExit>
                    <Table>
                      <TableBody>
                        <TableRow>
                          <TableCell width={'50px'} />
                          <TableCell width={'110px'} />
                          <TableCell width={'110px'} align='center'>
                            <IconButton
                              aria-label="expand row"
                              size="small"
                              onClick={() => setOpenBreak(!openBreak)}
                            >
                              {openBreak ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                            </IconButton>
                          </TableCell>
                          <TableCell width={'100px'} align='center'>Breakfast</TableCell>
                          <TableCell width={'100px'} align='center'>{item.breakfast.total.adults_actual.count}</TableCell>
                          <TableCell width={'100px'} align='center'>{item.breakfast.total.children_actual.count}</TableCell>
                          <TableCell width={'100px'} align='center'>{formatMoney(item.breakfast.total.adults_actual.sales)}</TableCell>
                          <TableCell width={'100px'} align='center'>{item.breakfast.total.children_actual.sales}</TableCell>
                          <TableCell width={'100px'} align='center'>{item.breakfast.total.total_actual.count}</TableCell>
                          <TableCell width={'100px'} align='center'>{formatPercentage(item.breakfast.total.total_actual.percentage_count)}</TableCell>
                          <TableCell width={'100px'} align='center'>{formatMoney(item.breakfast.total.total_actual.sales)}</TableCell>
                          <TableCell width={'100px'} align='center'>{formatPercentage(item.breakfast.total.total_actual.percentage_sales)}</TableCell>
                        </TableRow>
                        {
                          <TableRow key={index}>
                            <TableCell align='right' colSpan={12} style={{padding: '0'}}>
                              <Collapse in={openBreak && open && open2} timeout="auto" unmountOnExit>
                                <Table>
                                  <TableHead sx={{background: '#00CFE8'}}>
                                    <TableRow>
                                      <TableCell />
                                      <TableCell />
                                      <TableCell />

                                      <TableCell align='center' sx={{textTransform: 'none'}}>Room</TableCell>
                                      <TableCell align='center' sx={{textTransform: 'none'}}>Guest Names</TableCell>
                                      <TableCell align='center' sx={{textTransform: 'none'}}>Count</TableCell>
                                      <TableCell align='center' sx={{textTransform: 'none'}}>Pax</TableCell>
                                      <TableCell align='center' sx={{textTransform: 'none'}}>Time</TableCell>
                                      <TableCell align='center' sx={{textTransform: 'none'}}>Pkg.Code</TableCell>
                                      <TableCell align='center' sx={{textTransform: 'none'}}>Remark</TableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    {
                                      objBreak.map((data: any, inB: any) => {
                                        return (
                                          <TableRow key={inB}>
                                            <TableCell />
                                            <TableCell />
                                            <TableCell />
                                            <TableCell align='center'>{data.record.room}</TableCell>
                                            <TableCell align='center'>{data.record.guest_names}</TableCell>
                                            <TableCell align='center'>{data.record.count}</TableCell>
                                            <TableCell align='center'>{data.record.pax}</TableCell>
                                            <TableCell align='center'>{data.time}</TableCell>
                                            <TableCell align='center'>{data.record.package_code}</TableCell>
                                            <TableCell align='center'>{data.record.remark}</TableCell>
                                          </TableRow>
                                        )
                                      })
                                    }
                                  </TableBody>
                                </Table>
                              </Collapse>
                            </TableCell>
                          </TableRow>
                        }
                      </TableBody>
                    </Table>
                  </Collapse>
                </TableCell>
              </TableRow>


              <TableRow>
                <TableCell colSpan={12} style={{padding: '0'}}>
                  <Collapse in={open2 && open} timeout="auto" unmountOnExit>
                    <Table>
                      <TableBody>
                        <TableRow>
                          <TableCell width={'50px'} />
                          <TableCell width={'110px'} />
                          <TableCell width={'110px'} align='center'>
                            <IconButton
                              aria-label="expand row"
                              size="small"
                              onClick={() => setOpenLunch(!openLunch)}
                            >
                              {openLunch ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                            </IconButton>
                          </TableCell>
                          <TableCell width={'100px'} align='center'>Lunch</TableCell>
                          <TableCell width={'100px'} align='center'>{item.lunch.total.adults_actual.count}</TableCell>
                          <TableCell width={'100px'} align='center'>{item.lunch.total.children_actual.count}</TableCell>
                          <TableCell width={'100px'} align='center'>{formatMoney(item.lunch.total.adults_actual.sales)}</TableCell>
                          <TableCell width={'100px'} align='center'>{item.lunch.total.children_actual.sales}</TableCell>
                          <TableCell width={'100px'} align='center'>{item.lunch.total.total_actual.count}</TableCell>
                          <TableCell width={'100px'} align='center'>{formatPercentage(item.lunch.total.total_actual.percentage_count)}</TableCell>
                          <TableCell width={'100px'} align='center'>{formatMoney(item.lunch.total.total_actual.sales)}</TableCell>
                          <TableCell width={'100px'} align='center'>{formatPercentage(item.lunch.total.total_actual.percentage_sales)}</TableCell>
                        </TableRow>
                        {
                          <TableRow key={index}>
                            <TableCell align='right' colSpan={12} style={{padding: '0'}}>
                              <Collapse in={openLunch && open && open2} timeout="auto" unmountOnExit>
                                <Table>
                                  <TableHead sx={{background: '#00CFE8'}}>
                                    <TableRow>
                                      <TableCell />
                                      <TableCell />
                                      <TableCell />

                                      <TableCell align='center' sx={{textTransform: 'none'}}>Room</TableCell>
                                      <TableCell align='center' sx={{textTransform: 'none'}}>Guest Names</TableCell>
                                      <TableCell align='center' sx={{textTransform: 'none'}}>Count</TableCell>
                                      <TableCell align='center' sx={{textTransform: 'none'}}>Pax</TableCell>
                                      <TableCell align='center' sx={{textTransform: 'none'}}>Time</TableCell>
                                      <TableCell align='center' sx={{textTransform: 'none'}}>Pkg.Code</TableCell>
                                      <TableCell align='center' sx={{textTransform: 'none'}}>Remark</TableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    {
                                      objLunch.map((data: any, inB: any) => {
                                        return (
                                          <TableRow key={inB}>
                                            <TableCell />
                                            <TableCell />
                                            <TableCell />
                                            <TableCell align='center'>{data.record.room}</TableCell>
                                            <TableCell align='center'>{data.record.guest_names}</TableCell>
                                            <TableCell align='center'>{data.record.count}</TableCell>
                                            <TableCell align='center'>{data.record.pax}</TableCell>
                                            <TableCell align='center'>{data.time}</TableCell>
                                            <TableCell align='center'>{data.record.package_code}</TableCell>
                                            <TableCell align='center'>{data.record.remark}</TableCell>
                                          </TableRow>
                                        )
                                      })
                                    }
                                  </TableBody>
                                </Table>
                              </Collapse>
                            </TableCell>
                          </TableRow>
                        }
                      </TableBody>
                    </Table>
                  </Collapse>
                </TableCell>
              </TableRow>


              <TableRow>
                <TableCell colSpan={12} style={{padding: '0'}}>
                  <Collapse in={open2 && open} timeout="auto" unmountOnExit>
                    <Table>
                      <TableBody>
                        <TableRow>
                          <TableCell width={'50px'} />
                          <TableCell width={'110px'} />
                          <TableCell width={'110px'} align='center'>
                            <IconButton
                              aria-label="expand row"
                              size="small"
                              onClick={() => setOpenDinner(!openDinner)}
                            >
                              {openDinner ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                            </IconButton>
                          </TableCell>
                          <TableCell width={'100px'} align='center'>Dinner</TableCell>
                          <TableCell width={'100px'} align='center'>{item.dinner.total.adults_actual.count}</TableCell>
                          <TableCell width={'100px'} align='center'>{item.dinner.total.children_actual.count}</TableCell>
                          <TableCell width={'100px'} align='center'>{formatMoney(item.dinner.total.adults_actual.sales)}</TableCell>
                          <TableCell width={'100px'} align='center'>{item.dinner.total.children_actual.sales}</TableCell>
                          <TableCell width={'100px'} align='center'>{item.dinner.total.total_actual.count}</TableCell>
                          <TableCell width={'100px'} align='center'>{formatPercentage(item.dinner.total.total_actual.percentage_count)}</TableCell>
                          <TableCell width={'100px'} align='center'>{formatMoney(item.dinner.total.total_actual.sales)}</TableCell>
                          <TableCell width={'100px'} align='center'>{formatPercentage(item.dinner.total.total_actual.percentage_sales)}</TableCell>
                        </TableRow>
                        {
                          <TableRow key={index}>
                            <TableCell align='right' colSpan={12} style={{padding: '0'}}>
                              <Collapse in={openDinner && open && open2} timeout="auto" unmountOnExit>
                                <Table>
                                  <TableHead sx={{background: '#00CFE8'}}>
                                    <TableRow>
                                      <TableCell />
                                      <TableCell />
                                      <TableCell />

                                      <TableCell align='center' sx={{textTransform: 'none'}}>Room</TableCell>
                                      <TableCell align='center' sx={{textTransform: 'none'}}>Guest Names</TableCell>
                                      <TableCell align='center' sx={{textTransform: 'none'}}>Count</TableCell>
                                      <TableCell align='center' sx={{textTransform: 'none'}}>Pax</TableCell>
                                      <TableCell align='center' sx={{textTransform: 'none'}}>Time</TableCell>
                                      <TableCell align='center' sx={{textTransform: 'none'}}>Pkg.Code</TableCell>
                                      <TableCell align='center' sx={{textTransform: 'none'}}>Remark</TableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    {
                                      objDinner.map((data: any, inB: any) => {
                                        return (
                                          <TableRow key={inB}>
                                            <TableCell />
                                            <TableCell />
                                            <TableCell />
                                            <TableCell align='center'>{data.record.room}</TableCell>
                                            <TableCell align='center'>{data.record.guest_names}</TableCell>
                                            <TableCell align='center'>{data.record.count}</TableCell>
                                            <TableCell align='center'>{data.record.pax}</TableCell>
                                            <TableCell align='center'>{data.time}</TableCell>
                                            <TableCell align='center'>{data.record.package_code}</TableCell>
                                            <TableCell align='center'>{data.record.remark}</TableCell>
                                          </TableRow>
                                        )
                                      })
                                    }
                                  </TableBody>
                                </Table>
                              </Collapse>
                            </TableCell>
                          </TableRow>
                        }
                      </TableBody>
                    </Table>
                  </Collapse>
                </TableCell>
              </TableRow>


            </React.Fragment>
          )
        })
      }
    </React.Fragment>
  )
}

const PeriodDetail = () => {
  // ** State

  const onGetExporProduct = (title?: string, worksheetname?: string) => {


    const dataToExport = dashboardSampleV0_4MealDetailData.map((row: any) => ({
      Date: row.report_date,
      RVC: "",
      Period: "",
      CountAdults: row.total.adults_actual.count,
      CountChildren: row.total.children_actual.count,
      SalesAdults: row.total.adults_actual.sales,
      SalesChildren: row.total.children_actual.sales,
      Count: row.total.total_actual.count,
      Count_Percentage: row.total.total_actual.percentage_count,
      Sales: row.total.total_actual.sales,
      Sales_Percentage: row.total.total_actual.percentage_sales,
    }));

    const objRVC = dashboardSampleV0_4MealDetailData.map((data: any) => {
      return (
        data.outlet.map((test: any) => ({
          Date: "",
          RVC: test.outlet_code,
          Period: "",
          CountAdults: test.total.adults_actual.count,
          CountChildren: test.total.children_actual.count,
          SalesAdults: test.total.adults_actual.sales,
          SalesChildren: test.total.children_actual.sales,
          Count: test.total.total_actual.count,
          Count_Percentage: test.total.total_actual.percentage_count,
          Sales: test.total.total_actual.sales,
          Sales_Percentage: test.total.total_actual.percentage_sales,
        }))
      )
    })
    console.log('objRVC', objRVC);

    console.log('dataToExport', dataToExport);

    //Create Excel workbook and worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils?.json_to_sheet(dataToExport);
    XLSX.utils.book_append_sheet(workbook, worksheet, worksheetname);
    // Save the workbook as an Excel file
    XLSX.writeFile(workbook, `${title}.xlsx`);

  }

  return (
    <Grid container spacing={6}>
      <PageHeader
        title={
          <Typography variant='h4'>
            <LinkStyled href='https://mui.com/material-ui/react-table/' target='_blank'>
              Period Detail
            </LinkStyled>
          </Typography>
        }
      />
      <Grid item xs={12}>
        <Card sx={{marginBottom: '8px'}}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'row',
              '& > *': {maxWidth: 500, mt: theme => `${theme.spacing(4)} !important`, mb: theme => `${theme.spacing(4)} !important`},
              paddingLeft: '1.5rem',
              paddingRight: '1.5rem',
            }}
          >
            <Button className='btn-icon' variant='contained' color='primary' onClick={() => onGetExporProduct("PeriodDetail", "PeriodDetailExport")}>
              <Icon icon='tabler:download' fontSize={20} />
            </Button>
          </Box>
        </Card>
        <Card sx={{marginBottom: '4px'}}>
          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'row',
            '& > *': {maxWidth: 500, mt: theme => `${theme.spacing(2)} !important`, mb: theme => `${theme.spacing(2)} !important`},
            paddingLeft: '1.5rem',
            paddingRight: '1.5rem',
            background: "#7367F0",
          }}>
            <Typography sx={{
              color: 'white',
              fontWeight: '700'
            }}>Expected and Actual Meal Count and Sales</Typography>
          </Box>
        </Card>
        <Card>
          {/* <CardHeader title='Basic Table' /> */}
          <TableContainer component={Paper}>
            <Table style={{tableLayout: "fixed"}} sx={{minWidth: 650}} aria-label='collapsible table'>
              <TableHead sx={{background: '#00CFE8'}}>
                <TableRow>
                  <TableCell style={{width: "50px"}} />
                  <TableCell style={{width: "120px"}} sx={{textTransform: 'none'}}>Date</TableCell>
                  <TableCell style={{width: "100px"}} sx={{textTransform: 'none'}} align='center'>RVC</TableCell>
                  <TableCell style={{width: "100px"}} sx={{textTransform: 'none'}} align='center'>Period</TableCell>
                  <TableCell style={{width: "100px"}} sx={{textTransform: 'none'}} align='center'>A. Count</TableCell>
                  <TableCell style={{width: "100px"}} sx={{textTransform: 'none'}} align='center'>C. Count</TableCell>
                  <TableCell style={{width: "100px"}} sx={{textTransform: 'none'}} align='center'>A. Sales</TableCell>
                  <TableCell style={{width: "100px"}} sx={{textTransform: 'none'}} align='center'>C. Sales</TableCell>
                  <TableCell style={{width: "100px"}} sx={{textTransform: 'none'}} align='center'>Count</TableCell>
                  <TableCell style={{width: "100px"}} sx={{textTransform: 'none'}} align='center'>Count%</TableCell>
                  <TableCell style={{width: "100px"}} sx={{textTransform: 'none'}} align='center'>Sales</TableCell>
                  <TableCell style={{width: "100px"}} sx={{textTransform: 'none'}} align='center'>Sales%</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dashboardSampleV0_4MealDetailData.map((row, index) => (
                  <Row key={index} row={row} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Grid>

    </Grid>
  )
}

export default PeriodDetail
