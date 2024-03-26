// ** Next Import
import Link from 'next/link'
import dynamic from 'next/dynamic'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import {styled} from '@mui/material/styles'
import Typography from '@mui/material/Typography'

// ** Custom Components Imports
import PageHeader from 'src/@core/components/page-header'

// ** Hooks
import {useSettings} from 'src/@core/hooks/useSettings'

// ** Styled Components
import RechartsWrapper from 'src/@core/styles/libs/recharts'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Third Party Imports
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps, Legend} from 'recharts'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import {Card, CardContent, CardHeader, Box, Divider, MenuItem, SelectChangeEvent} from '@mui/material'
import {useEffect, useState} from 'react'
import moment from 'moment'
import CustomTextField from 'src/@core/components/mui/text-field'
import CustomChip from 'src/@core/components/mui/chip'

const dataFake = [
  {
    "Date": "01-Feb-2020",
    "Total Occ.": 166,
    "Arr. Rooms": 109,
    "Dep. Rooms": 66,
    "Room Revenue": 11396,
    "Average Rate": 69,
    "Day Use Rooms": 2,
    "No Show Rooms": 0,
    "Adl. & Chl.": 303
  },
  {
    "Date": "02-Feb-2020",
    "Total Occ.": 172,
    "Arr. Rooms": 91,
    "Dep. Rooms": 85,
    "Room Revenue": 11786,
    "Average Rate": 69,
    "Day Use Rooms": 2,
    "No Show Rooms": 0,
    "Adl. & Chl.": 283
  },
  {
    "Date": "03-Feb-2020",
    "Total Occ.": 132,
    "Arr. Rooms": 77,
    "Dep. Rooms": 117,
    "Room Revenue": 7260,
    "Average Rate": 55,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 190
  },
  {
    "Date": "04-Feb-2020",
    "Total Occ.": 118,
    "Arr. Rooms": 56,
    "Dep. Rooms": 70,
    "Room Revenue": 6208,
    "Average Rate": 53,
    "Day Use Rooms": 4,
    "No Show Rooms": 0,
    "Adl. & Chl.": 172
  },
  {
    "Date": "05-Feb-2020",
    "Total Occ.": 103,
    "Arr. Rooms": 75,
    "Dep. Rooms": 90,
    "Room Revenue": 6208,
    "Average Rate": 60,
    "Day Use Rooms": 8,
    "No Show Rooms": 0,
    "Adl. & Chl.": 152
  },
  {
    "Date": "06-Feb-2020",
    "Total Occ.": 100,
    "Arr. Rooms": 54,
    "Dep. Rooms": 57,
    "Room Revenue": 5399,
    "Average Rate": 54,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 144
  },
  {
    "Date": "07-Feb-2020",
    "Total Occ.": 116,
    "Arr. Rooms": 58,
    "Dep. Rooms": 42,
    "Room Revenue": 6193,
    "Average Rate": 53,
    "Day Use Rooms": 3,
    "No Show Rooms": 0,
    "Adl. & Chl.": 179
  },
  {
    "Date": "08-Feb-2020",
    "Total Occ.": 112,
    "Arr. Rooms": 80,
    "Dep. Rooms": 84,
    "Room Revenue": 5536,
    "Average Rate": 49,
    "Day Use Rooms": 0,
    "No Show Rooms": 1,
    "Adl. & Chl.": 173
  },
  {
    "Date": "09-Feb-2020",
    "Total Occ.": 94,
    "Arr. Rooms": 46,
    "Dep. Rooms": 64,
    "Room Revenue": 4975,
    "Average Rate": 53,
    "Day Use Rooms": 4,
    "No Show Rooms": 0,
    "Adl. & Chl.": 130
  },
  {
    "Date": "10-Feb-2020",
    "Total Occ.": 88,
    "Arr. Rooms": 42,
    "Dep. Rooms": 48,
    "Room Revenue": 4566,
    "Average Rate": 52,
    "Day Use Rooms": 1,
    "No Show Rooms": 0,
    "Adl. & Chl.": 121
  },
  {
    "Date": "11-Feb-2020",
    "Total Occ.": 104,
    "Arr. Rooms": 61,
    "Dep. Rooms": 45,
    "Room Revenue": 5706,
    "Average Rate": 55,
    "Day Use Rooms": 1,
    "No Show Rooms": 1,
    "Adl. & Chl.": 151
  },
  {
    "Date": "12-Feb-2020",
    "Total Occ.": 122,
    "Arr. Rooms": 77,
    "Dep. Rooms": 59,
    "Room Revenue": 6359,
    "Average Rate": 52,
    "Day Use Rooms": 1,
    "No Show Rooms": 1,
    "Adl. & Chl.": 180
  },
  {
    "Date": "13-Feb-2020",
    "Total Occ.": 136,
    "Arr. Rooms": 80,
    "Dep. Rooms": 66,
    "Room Revenue": 6830,
    "Average Rate": 50,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 206
  },
  {
    "Date": "14-Feb-2020",
    "Total Occ.": 139,
    "Arr. Rooms": 88,
    "Dep. Rooms": 85,
    "Room Revenue": 7242,
    "Average Rate": 52,
    "Day Use Rooms": 2,
    "No Show Rooms": 4,
    "Adl. & Chl.": 213
  },
  {
    "Date": "15-Feb-2020",
    "Total Occ.": 439,
    "Arr. Rooms": 412,
    "Dep. Rooms": 111,
    "Room Revenue": 23903,
    "Average Rate": 54,
    "Day Use Rooms": 18,
    "No Show Rooms": 0,
    "Adl. & Chl.": 794
  },
  {
    "Date": "16-Feb-2020",
    "Total Occ.": 377,
    "Arr. Rooms": 46,
    "Dep. Rooms": 108,
    "Room Revenue": 20117,
    "Average Rate": 53,
    "Day Use Rooms": 1,
    "No Show Rooms": 2,
    "Adl. & Chl.": 677
  },
  {
    "Date": "17-Feb-2020",
    "Total Occ.": 357,
    "Arr. Rooms": 41,
    "Dep. Rooms": 61,
    "Room Revenue": 19177,
    "Average Rate": 54,
    "Day Use Rooms": 1,
    "No Show Rooms": 0,
    "Adl. & Chl.": 648
  },
  {
    "Date": "18-Feb-2020",
    "Total Occ.": 330,
    "Arr. Rooms": 21,
    "Dep. Rooms": 48,
    "Room Revenue": 19094,
    "Average Rate": 58,
    "Day Use Rooms": 2,
    "No Show Rooms": 0,
    "Adl. & Chl.": 609
  },
  {
    "Date": "19-Feb-2020",
    "Total Occ.": 403,
    "Arr. Rooms": 167,
    "Dep. Rooms": 94,
    "Room Revenue": 24392,
    "Average Rate": 61,
    "Day Use Rooms": 0,
    "No Show Rooms": 2,
    "Adl. & Chl.": 698
  },
  {
    "Date": "20-Feb-2020",
    "Total Occ.": 166,
    "Arr. Rooms": 31,
    "Dep. Rooms": 267,
    "Room Revenue": 11786,
    "Average Rate": 71,
    "Day Use Rooms": 0,
    "No Show Rooms": 3,
    "Adl. & Chl.": 275
  },
  {
    "Date": "21-Feb-2020",
    "Total Occ.": 115,
    "Arr. Rooms": 54,
    "Dep. Rooms": 105,
    "Room Revenue": 10154,
    "Average Rate": 88,
    "Day Use Rooms": 7,
    "No Show Rooms": 1,
    "Adl. & Chl.": 179
  },
  {
    "Date": "22-Feb-2020",
    "Total Occ.": 80,
    "Arr. Rooms": 32,
    "Dep. Rooms": 67,
    "Room Revenue": 5406,
    "Average Rate": 68,
    "Day Use Rooms": 1,
    "No Show Rooms": 0,
    "Adl. & Chl.": 134
  },
  {
    "Date": "23-Feb-2020",
    "Total Occ.": 56,
    "Arr. Rooms": 17,
    "Dep. Rooms": 41,
    "Room Revenue": 3869,
    "Average Rate": 69,
    "Day Use Rooms": 1,
    "No Show Rooms": 1,
    "Adl. & Chl.": 84
  },
  {
    "Date": "24-Feb-2020",
    "Total Occ.": 46,
    "Arr. Rooms": 17,
    "Dep. Rooms": 27,
    "Room Revenue": 895,
    "Average Rate": 19,
    "Day Use Rooms": 3,
    "No Show Rooms": 0,
    "Adl. & Chl.": 65
  },
  {
    "Date": "25-Feb-2020",
    "Total Occ.": 43,
    "Arr. Rooms": 8,
    "Dep. Rooms": 11,
    "Room Revenue": 2226,
    "Average Rate": 52,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 57
  },
  {
    "Date": "26-Feb-2020",
    "Total Occ.": 79,
    "Arr. Rooms": 43,
    "Dep. Rooms": 7,
    "Room Revenue": 3901,
    "Average Rate": 49,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 120
  },
  {
    "Date": "27-Feb-2020",
    "Total Occ.": 44,
    "Arr. Rooms": 1,
    "Dep. Rooms": 46,
    "Room Revenue": 2039,
    "Average Rate": 46,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 56
  },
  {
    "Date": "28-Feb-2020",
    "Total Occ.": 44,
    "Arr. Rooms": 11,
    "Dep. Rooms": 5,
    "Room Revenue": 2053,
    "Average Rate": 47,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 57
  },
  {
    "Date": "29-Feb-2020",
    "Total Occ.": 27,
    "Arr. Rooms": 3,
    "Dep. Rooms": 18,
    "Room Revenue": 987,
    "Average Rate": 37,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 37
  },
  {
    "Date": "01-Mar-2020",
    "Total Occ.": 47,
    "Arr. Rooms": 2,
    "Dep. Rooms": 5,
    "Room Revenue": 1696,
    "Average Rate": 36,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 56
  },
  {
    "Date": "02-Mar-2020",
    "Total Occ.": 49,
    "Arr. Rooms": 3,
    "Dep. Rooms": 5,
    "Room Revenue": 2139,
    "Average Rate": 44,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 58
  },
  {
    "Date": "03-Mar-2020",
    "Total Occ.": 56,
    "Arr. Rooms": 4,
    "Dep. Rooms": 0,
    "Room Revenue": 2483,
    "Average Rate": 44,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 68
  },
  {
    "Date": "04-Mar-2020",
    "Total Occ.": 44,
    "Arr. Rooms": 0,
    "Dep. Rooms": 3,
    "Room Revenue": 1661,
    "Average Rate": 38,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 53
  },
  {
    "Date": "05-Mar-2020",
    "Total Occ.": 34,
    "Arr. Rooms": 1,
    "Dep. Rooms": 3,
    "Room Revenue": 1147,
    "Average Rate": 34,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 42
  },
  {
    "Date": "06-Mar-2020",
    "Total Occ.": 38,
    "Arr. Rooms": 2,
    "Dep. Rooms": 2,
    "Room Revenue": 1366,
    "Average Rate": 36,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 45
  },
  {
    "Date": "07-Mar-2020",
    "Total Occ.": 37,
    "Arr. Rooms": 3,
    "Dep. Rooms": 2,
    "Room Revenue": 1378,
    "Average Rate": 37,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 46
  },
  {
    "Date": "08-Mar-2020",
    "Total Occ.": 37,
    "Arr. Rooms": 4,
    "Dep. Rooms": 2,
    "Room Revenue": 1444,
    "Average Rate": 39,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 48
  },
  {
    "Date": "09-Mar-2020",
    "Total Occ.": 37,
    "Arr. Rooms": 3,
    "Dep. Rooms": 6,
    "Room Revenue": 1588,
    "Average Rate": 43,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 45
  },
  {
    "Date": "10-Mar-2020",
    "Total Occ.": 37,
    "Arr. Rooms": 5,
    "Dep. Rooms": 2,
    "Room Revenue": 1765,
    "Average Rate": 48,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 46
  },
  {
    "Date": "11-Mar-2020",
    "Total Occ.": 46,
    "Arr. Rooms": 1,
    "Dep. Rooms": 4,
    "Room Revenue": 2103,
    "Average Rate": 46,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 49
  },
  {
    "Date": "12-Mar-2020",
    "Total Occ.": 36,
    "Arr. Rooms": 0,
    "Dep. Rooms": 6,
    "Room Revenue": 1536,
    "Average Rate": 43,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 36
  },
  {
    "Date": "13-Mar-2020",
    "Total Occ.": 46,
    "Arr. Rooms": 0,
    "Dep. Rooms": 1,
    "Room Revenue": 1680,
    "Average Rate": 37,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 46
  },
  {
    "Date": "14-Mar-2020",
    "Total Occ.": 30,
    "Arr. Rooms": 0,
    "Dep. Rooms": 0,
    "Room Revenue": 1007,
    "Average Rate": 34,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 30
  },
  {
    "Date": "15-Mar-2020",
    "Total Occ.": 33,
    "Arr. Rooms": 1,
    "Dep. Rooms": 1,
    "Room Revenue": 1323,
    "Average Rate": 40,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 34
  },
  {
    "Date": "16-Mar-2020",
    "Total Occ.": 40,
    "Arr. Rooms": 0,
    "Dep. Rooms": 1,
    "Room Revenue": 1597,
    "Average Rate": 40,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 40
  },
  {
    "Date": "17-Mar-2020",
    "Total Occ.": 26,
    "Arr. Rooms": 0,
    "Dep. Rooms": 0,
    "Room Revenue": 880,
    "Average Rate": 34,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 26
  },
  {
    "Date": "18-Mar-2020",
    "Total Occ.": 40,
    "Arr. Rooms": 9,
    "Dep. Rooms": 0,
    "Room Revenue": 1735,
    "Average Rate": 43,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 47
  },
  {
    "Date": "19-Mar-2020",
    "Total Occ.": 48,
    "Arr. Rooms": 1,
    "Dep. Rooms": 1,
    "Room Revenue": 2231,
    "Average Rate": 46,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 56
  },
  {
    "Date": "20-Mar-2020",
    "Total Occ.": 76,
    "Arr. Rooms": 3,
    "Dep. Rooms": 1,
    "Room Revenue": 3666,
    "Average Rate": 48,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 85
  },
  {
    "Date": "21-Mar-2020",
    "Total Occ.": 37,
    "Arr. Rooms": 1,
    "Dep. Rooms": 2,
    "Room Revenue": 1613,
    "Average Rate": 44,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 47
  },
  {
    "Date": "22-Mar-2020",
    "Total Occ.": 28,
    "Arr. Rooms": 2,
    "Dep. Rooms": 10,
    "Room Revenue": 962,
    "Average Rate": 34,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 29
  },
  {
    "Date": "23-Mar-2020",
    "Total Occ.": 57,
    "Arr. Rooms": 0,
    "Dep. Rooms": 1,
    "Room Revenue": 2798,
    "Average Rate": 49,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 58
  },
  {
    "Date": "24-Mar-2020",
    "Total Occ.": 227,
    "Arr. Rooms": 1,
    "Dep. Rooms": 1,
    "Room Revenue": 15304,
    "Average Rate": 67,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 227
  },
  {
    "Date": "25-Mar-2020",
    "Total Occ.": 55,
    "Arr. Rooms": 2,
    "Dep. Rooms": 2,
    "Room Revenue": 2450,
    "Average Rate": 45,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 56
  },
  {
    "Date": "26-Mar-2020",
    "Total Occ.": 44,
    "Arr. Rooms": 0,
    "Dep. Rooms": 1,
    "Room Revenue": 1695,
    "Average Rate": 39,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 44
  },
  {
    "Date": "27-Mar-2020",
    "Total Occ.": 37,
    "Arr. Rooms": 2,
    "Dep. Rooms": 1,
    "Room Revenue": 1429,
    "Average Rate": 39,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 38
  },
  {
    "Date": "28-Mar-2020",
    "Total Occ.": 31,
    "Arr. Rooms": 0,
    "Dep. Rooms": 2,
    "Room Revenue": 1126,
    "Average Rate": 36,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 31
  },
  {
    "Date": "29-Mar-2020",
    "Total Occ.": 44,
    "Arr. Rooms": 0,
    "Dep. Rooms": 0,
    "Room Revenue": 1928,
    "Average Rate": 44,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 44
  },
  {
    "Date": "30-Mar-2020",
    "Total Occ.": 50,
    "Arr. Rooms": 2,
    "Dep. Rooms": 0,
    "Room Revenue": 3767,
    "Average Rate": 75,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 52
  },
  {
    "Date": "31-Mar-2020",
    "Total Occ.": 43,
    "Arr. Rooms": 0,
    "Dep. Rooms": 2,
    "Room Revenue": 1885,
    "Average Rate": 44,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 43
  },
  {
    "Date": "01-Apr-2020",
    "Total Occ.": 31,
    "Arr. Rooms": 1,
    "Dep. Rooms": 0,
    "Room Revenue": 1140,
    "Average Rate": 37,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 32
  },
  {
    "Date": "02-Apr-2020",
    "Total Occ.": 36,
    "Arr. Rooms": 1,
    "Dep. Rooms": 1,
    "Room Revenue": 1536,
    "Average Rate": 43,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 36
  },
  {
    "Date": "03-Apr-2020",
    "Total Occ.": 34,
    "Arr. Rooms": 0,
    "Dep. Rooms": 0,
    "Room Revenue": 1240,
    "Average Rate": 36,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 34
  },
  {
    "Date": "04-Apr-2020",
    "Total Occ.": 26,
    "Arr. Rooms": 0,
    "Dep. Rooms": 0,
    "Room Revenue": 903,
    "Average Rate": 35,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 26
  },
  {
    "Date": "05-Apr-2020",
    "Total Occ.": 26,
    "Arr. Rooms": 1,
    "Dep. Rooms": 1,
    "Room Revenue": 902,
    "Average Rate": 35,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 27
  },
  {
    "Date": "06-Apr-2020",
    "Total Occ.": 26,
    "Arr. Rooms": 0,
    "Dep. Rooms": 0,
    "Room Revenue": 902,
    "Average Rate": 35,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 27
  },
  {
    "Date": "07-Apr-2020",
    "Total Occ.": 25,
    "Arr. Rooms": 0,
    "Dep. Rooms": 1,
    "Room Revenue": 844,
    "Average Rate": 34,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 25
  },
  {
    "Date": "08-Apr-2020",
    "Total Occ.": 46,
    "Arr. Rooms": 0,
    "Dep. Rooms": 0,
    "Room Revenue": 2152,
    "Average Rate": 47,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 46
  },
  {
    "Date": "09-Apr-2020",
    "Total Occ.": 24,
    "Arr. Rooms": 0,
    "Dep. Rooms": 1,
    "Room Revenue": 844,
    "Average Rate": 35,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 24
  },
  {
    "Date": "10-Apr-2020",
    "Total Occ.": 30,
    "Arr. Rooms": 1,
    "Dep. Rooms": 0,
    "Room Revenue": 1113,
    "Average Rate": 37,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 31
  },
  {
    "Date": "11-Apr-2020",
    "Total Occ.": 33,
    "Arr. Rooms": 0,
    "Dep. Rooms": 0,
    "Room Revenue": 1239,
    "Average Rate": 38,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 34
  },
  {
    "Date": "12-Apr-2020",
    "Total Occ.": 25,
    "Arr. Rooms": 0,
    "Dep. Rooms": 0,
    "Room Revenue": 902,
    "Average Rate": 36,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 26
  },
  {
    "Date": "13-Apr-2020",
    "Total Occ.": 41,
    "Arr. Rooms": 0,
    "Dep. Rooms": 1,
    "Room Revenue": 1920,
    "Average Rate": 47,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 41
  },
  {
    "Date": "14-Apr-2020",
    "Total Occ.": 43,
    "Arr. Rooms": 0,
    "Dep. Rooms": 0,
    "Room Revenue": 1349,
    "Average Rate": 31,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 43
  },
  {
    "Date": "15-Apr-2020",
    "Total Occ.": 37,
    "Arr. Rooms": 0,
    "Dep. Rooms": 0,
    "Room Revenue": 1612,
    "Average Rate": 44,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 37
  },
  {
    "Date": "16-Apr-2020",
    "Total Occ.": 24,
    "Arr. Rooms": 0,
    "Dep. Rooms": 0,
    "Room Revenue": 844,
    "Average Rate": 35,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 24
  },
  {
    "Date": "17-Apr-2020",
    "Total Occ.": 29,
    "Arr. Rooms": 0,
    "Dep. Rooms": 0,
    "Room Revenue": 1054,
    "Average Rate": 36,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 29
  },
  {
    "Date": "18-Apr-2020",
    "Total Occ.": 26,
    "Arr. Rooms": 2,
    "Dep. Rooms": 0,
    "Room Revenue": 978,
    "Average Rate": 38,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 29
  },
  {
    "Date": "19-Apr-2020",
    "Total Occ.": 26,
    "Arr. Rooms": 2,
    "Dep. Rooms": 2,
    "Room Revenue": 953,
    "Average Rate": 37,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 28
  },
  {
    "Date": "20-Apr-2020",
    "Total Occ.": 26,
    "Arr. Rooms": 0,
    "Dep. Rooms": 0,
    "Room Revenue": 953,
    "Average Rate": 37,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 28
  },
  {
    "Date": "21-Apr-2020",
    "Total Occ.": 24,
    "Arr. Rooms": 0,
    "Dep. Rooms": 2,
    "Room Revenue": 844,
    "Average Rate": 35,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 24
  },
  {
    "Date": "22-Apr-2020",
    "Total Occ.": 62,
    "Arr. Rooms": 1,
    "Dep. Rooms": 1,
    "Room Revenue": 2005,
    "Average Rate": 32,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 62
  },
  {
    "Date": "23-Apr-2020",
    "Total Occ.": 51,
    "Arr. Rooms": 0,
    "Dep. Rooms": 0,
    "Room Revenue": 2448,
    "Average Rate": 48,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 51
  },
  {
    "Date": "24-Apr-2020",
    "Total Occ.": 24,
    "Arr. Rooms": 0,
    "Dep. Rooms": 0,
    "Room Revenue": 845,
    "Average Rate": 35,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 24
  },
  {
    "Date": "25-Apr-2020",
    "Total Occ.": 36,
    "Arr. Rooms": 0,
    "Dep. Rooms": 0,
    "Room Revenue": 1350,
    "Average Rate": 37,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 36
  },
  {
    "Date": "26-Apr-2020",
    "Total Occ.": 29,
    "Arr. Rooms": 0,
    "Dep. Rooms": 0,
    "Room Revenue": 1055,
    "Average Rate": 36,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 29
  },
  {
    "Date": "27-Apr-2020",
    "Total Occ.": 32,
    "Arr. Rooms": 0,
    "Dep. Rooms": 0,
    "Room Revenue": 1181,
    "Average Rate": 37,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 32
  },
  {
    "Date": "28-Apr-2020",
    "Total Occ.": 32,
    "Arr. Rooms": 3,
    "Dep. Rooms": 0,
    "Room Revenue": 1220,
    "Average Rate": 38,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 35
  },
  {
    "Date": "29-Apr-2020",
    "Total Occ.": 54,
    "Arr. Rooms": 2,
    "Dep. Rooms": 0,
    "Room Revenue": 2708,
    "Average Rate": 50,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 59
  },
  {
    "Date": "30-Apr-2020",
    "Total Occ.": 49,
    "Arr. Rooms": 0,
    "Dep. Rooms": 0,
    "Room Revenue": 2277,
    "Average Rate": 46,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 54
  },
  {
    "Date": "01-May-2020",
    "Total Occ.": 37,
    "Arr. Rooms": 0,
    "Dep. Rooms": 4,
    "Room Revenue": 1454,
    "Average Rate": 39,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 38
  },
  {
    "Date": "02-May-2020",
    "Total Occ.": 41,
    "Arr. Rooms": 1,
    "Dep. Rooms": 2,
    "Room Revenue": 1602,
    "Average Rate": 39,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 42
  },
  {
    "Date": "03-May-2020",
    "Total Occ.": 35,
    "Arr. Rooms": 0,
    "Dep. Rooms": 1,
    "Room Revenue": 1320,
    "Average Rate": 38,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 35
  },
  {
    "Date": "04-May-2020",
    "Total Occ.": 38,
    "Arr. Rooms": 0,
    "Dep. Rooms": 0,
    "Room Revenue": 1566,
    "Average Rate": 41,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 38
  },
  {
    "Date": "05-May-2020",
    "Total Occ.": 54,
    "Arr. Rooms": 4,
    "Dep. Rooms": 0,
    "Room Revenue": 2545,
    "Average Rate": 47,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 54
  },
  {
    "Date": "06-May-2020",
    "Total Occ.": 60,
    "Arr. Rooms": 0,
    "Dep. Rooms": 0,
    "Room Revenue": 2899,
    "Average Rate": 48,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 60
  },
  {
    "Date": "07-May-2020",
    "Total Occ.": 34,
    "Arr. Rooms": 2,
    "Dep. Rooms": 0,
    "Room Revenue": 1609,
    "Average Rate": 47,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 36
  },
  {
    "Date": "08-May-2020",
    "Total Occ.": 36,
    "Arr. Rooms": 2,
    "Dep. Rooms": 3,
    "Room Revenue": 1739,
    "Average Rate": 48,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 38
  },
  {
    "Date": "09-May-2020",
    "Total Occ.": 33,
    "Arr. Rooms": 0,
    "Dep. Rooms": 0,
    "Room Revenue": 1613,
    "Average Rate": 49,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 35
  },
  {
    "Date": "10-May-2020",
    "Total Occ.": 22,
    "Arr. Rooms": 0,
    "Dep. Rooms": 6,
    "Room Revenue": 815,
    "Average Rate": 37,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 22
  },
  {
    "Date": "11-May-2020",
    "Total Occ.": 29,
    "Arr. Rooms": 0,
    "Dep. Rooms": 0,
    "Room Revenue": 1229,
    "Average Rate": 42,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 29
  },
  {
    "Date": "12-May-2020",
    "Total Occ.": 29,
    "Arr. Rooms": 0,
    "Dep. Rooms": 0,
    "Room Revenue": 1229,
    "Average Rate": 42,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 29
  },
  {
    "Date": "13-May-2020",
    "Total Occ.": 22,
    "Arr. Rooms": 0,
    "Dep. Rooms": 0,
    "Room Revenue": 815,
    "Average Rate": 37,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 22
  },
  {
    "Date": "14-May-2020",
    "Total Occ.": 40,
    "Arr. Rooms": 0,
    "Dep. Rooms": 0,
    "Room Revenue": 1794,
    "Average Rate": 45,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 40
  },
  {
    "Date": "15-May-2020",
    "Total Occ.": 22,
    "Arr. Rooms": 0,
    "Dep. Rooms": 0,
    "Room Revenue": 815,
    "Average Rate": 37,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 22
  },
  {
    "Date": "16-May-2020",
    "Total Occ.": 22,
    "Arr. Rooms": 0,
    "Dep. Rooms": 0,
    "Room Revenue": 815,
    "Average Rate": 37,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 22
  },
  {
    "Date": "17-May-2020",
    "Total Occ.": 22,
    "Arr. Rooms": 0,
    "Dep. Rooms": 0,
    "Room Revenue": 815,
    "Average Rate": 37,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 22
  },
  {
    "Date": "18-May-2020",
    "Total Occ.": 22,
    "Arr. Rooms": 0,
    "Dep. Rooms": 0,
    "Room Revenue": 815,
    "Average Rate": 37,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 22
  },
  {
    "Date": "19-May-2020",
    "Total Occ.": 22,
    "Arr. Rooms": 0,
    "Dep. Rooms": 0,
    "Room Revenue": 815,
    "Average Rate": 37,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 22
  },
  {
    "Date": "20-May-2020",
    "Total Occ.": 30,
    "Arr. Rooms": 0,
    "Dep. Rooms": 0,
    "Room Revenue": 1152,
    "Average Rate": 38,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 30
  },
  {
    "Date": "21-May-2020",
    "Total Occ.": 27,
    "Arr. Rooms": 0,
    "Dep. Rooms": 0,
    "Room Revenue": 1026,
    "Average Rate": 38,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 27
  },
  {
    "Date": "22-May-2020",
    "Total Occ.": 23,
    "Arr. Rooms": 2,
    "Dep. Rooms": 1,
    "Room Revenue": 897,
    "Average Rate": 39,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 25
  },
  {
    "Date": "23-May-2020",
    "Total Occ.": 26,
    "Arr. Rooms": 0,
    "Dep. Rooms": 2,
    "Room Revenue": 999,
    "Average Rate": 38,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 26
  },
  {
    "Date": "24-May-2020",
    "Total Occ.": 21,
    "Arr. Rooms": 0,
    "Dep. Rooms": 0,
    "Room Revenue": 788,
    "Average Rate": 38,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 21
  },
  {
    "Date": "25-May-2020",
    "Total Occ.": 28,
    "Arr. Rooms": 0,
    "Dep. Rooms": 0,
    "Room Revenue": 1202,
    "Average Rate": 43,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 28
  },
  {
    "Date": "26-May-2020",
    "Total Occ.": 28,
    "Arr. Rooms": 0,
    "Dep. Rooms": 0,
    "Room Revenue": 1202,
    "Average Rate": 43,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 28
  },
  {
    "Date": "27-May-2020",
    "Total Occ.": 34,
    "Arr. Rooms": 0,
    "Dep. Rooms": 0,
    "Room Revenue": 1611,
    "Average Rate": 47,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 34
  },
  {
    "Date": "28-May-2020",
    "Total Occ.": 26,
    "Arr. Rooms": 0,
    "Dep. Rooms": 0,
    "Room Revenue": 999,
    "Average Rate": 38,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 26
  },
  {
    "Date": "29-May-2020",
    "Total Occ.": 21,
    "Arr. Rooms": 0,
    "Dep. Rooms": 0,
    "Room Revenue": 788,
    "Average Rate": 38,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 21
  },
  {
    "Date": "30-May-2020",
    "Total Occ.": 21,
    "Arr. Rooms": 0,
    "Dep. Rooms": 0,
    "Room Revenue": 788,
    "Average Rate": 38,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 21
  },
  {
    "Date": "31-May-2020",
    "Total Occ.": 21,
    "Arr. Rooms": 0,
    "Dep. Rooms": 0,
    "Room Revenue": 787,
    "Average Rate": 37,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 21
  },
  {
    "Date": "01-Jun-2020",
    "Total Occ.": 28,
    "Arr. Rooms": 0,
    "Dep. Rooms": 0,
    "Room Revenue": 1203,
    "Average Rate": 43,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 28
  },
  {
    "Date": "02-Jun-2020",
    "Total Occ.": 28,
    "Arr. Rooms": 0,
    "Dep. Rooms": 0,
    "Room Revenue": 1203,
    "Average Rate": 43,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 28
  },
  {
    "Date": "03-Jun-2020",
    "Total Occ.": 34,
    "Arr. Rooms": 0,
    "Dep. Rooms": 0,
    "Room Revenue": 1558,
    "Average Rate": 46,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 34
  },
  {
    "Date": "04-Jun-2020",
    "Total Occ.": 26,
    "Arr. Rooms": 0,
    "Dep. Rooms": 0,
    "Room Revenue": 1000,
    "Average Rate": 38,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 26
  },
  {
    "Date": "05-Jun-2020",
    "Total Occ.": 21,
    "Arr. Rooms": 0,
    "Dep. Rooms": 0,
    "Room Revenue": 790,
    "Average Rate": 38,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 21
  },
  {
    "Date": "06-Jun-2020",
    "Total Occ.": 26,
    "Arr. Rooms": 0,
    "Dep. Rooms": 0,
    "Room Revenue": 1000,
    "Average Rate": 38,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 26
  },
  {
    "Date": "07-Jun-2020",
    "Total Occ.": 21,
    "Arr. Rooms": 0,
    "Dep. Rooms": 0,
    "Room Revenue": 790,
    "Average Rate": 38,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 21
  },
  {
    "Date": "08-Jun-2020",
    "Total Occ.": 21,
    "Arr. Rooms": 0,
    "Dep. Rooms": 0,
    "Room Revenue": 790,
    "Average Rate": 38,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 21
  },
  {
    "Date": "09-Jun-2020",
    "Total Occ.": 54,
    "Arr. Rooms": 0,
    "Dep. Rooms": 0,
    "Room Revenue": 790,
    "Average Rate": 15,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 54
  },
  {
    "Date": "10-Jun-2020",
    "Total Occ.": 67,
    "Arr. Rooms": 0,
    "Dep. Rooms": 0,
    "Room Revenue": 1558,
    "Average Rate": 23,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 67
  },
  {
    "Date": "11-Jun-2020",
    "Total Occ.": 59,
    "Arr. Rooms": 0,
    "Dep. Rooms": 0,
    "Room Revenue": 1000,
    "Average Rate": 17,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 59
  },
  {
    "Date": "12-Jun-2020",
    "Total Occ.": 21,
    "Arr. Rooms": 0,
    "Dep. Rooms": 0,
    "Room Revenue": 790,
    "Average Rate": 38,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 21
  },
  {
    "Date": "13-Jun-2020",
    "Total Occ.": 26,
    "Arr. Rooms": 0,
    "Dep. Rooms": 0,
    "Room Revenue": 1000,
    "Average Rate": 38,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 26
  },
  {
    "Date": "14-Jun-2020",
    "Total Occ.": 21,
    "Arr. Rooms": 0,
    "Dep. Rooms": 0,
    "Room Revenue": 790,
    "Average Rate": 38,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 21
  },
  {
    "Date": "15-Jun-2020",
    "Total Occ.": 21,
    "Arr. Rooms": 0,
    "Dep. Rooms": 0,
    "Room Revenue": 790,
    "Average Rate": 38,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 21
  },
  {
    "Date": "16-Jun-2020",
    "Total Occ.": 21,
    "Arr. Rooms": 0,
    "Dep. Rooms": 0,
    "Room Revenue": 790,
    "Average Rate": 38,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 21
  },
  {
    "Date": "17-Jun-2020",
    "Total Occ.": 39,
    "Arr. Rooms": 0,
    "Dep. Rooms": 0,
    "Room Revenue": 1768,
    "Average Rate": 45,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 39
  },
  {
    "Date": "18-Jun-2020",
    "Total Occ.": 46,
    "Arr. Rooms": 0,
    "Dep. Rooms": 0,
    "Room Revenue": 2266,
    "Average Rate": 49,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 46
  },
  {
    "Date": "19-Jun-2020",
    "Total Occ.": 21,
    "Arr. Rooms": 0,
    "Dep. Rooms": 0,
    "Room Revenue": 790,
    "Average Rate": 38,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 21
  },
  {
    "Date": "20-Jun-2020",
    "Total Occ.": 4,
    "Arr. Rooms": 0,
    "Dep. Rooms": 1,
    "Room Revenue": 103,
    "Average Rate": 26,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 4
  },
  {
    "Date": "21-Jun-2020",
    "Total Occ.": 4,
    "Arr. Rooms": 0,
    "Dep. Rooms": 0,
    "Room Revenue": 103,
    "Average Rate": 26,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 4
  },
  {
    "Date": "22-Jun-2020",
    "Total Occ.": 4,
    "Arr. Rooms": 0,
    "Dep. Rooms": 0,
    "Room Revenue": 103,
    "Average Rate": 26,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 4
  },
  {
    "Date": "23-Jun-2020",
    "Total Occ.": 4,
    "Arr. Rooms": 0,
    "Dep. Rooms": 0,
    "Room Revenue": 103,
    "Average Rate": 26,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 4
  },
  {
    "Date": "24-Jun-2020",
    "Total Occ.": 17,
    "Arr. Rooms": 0,
    "Dep. Rooms": 0,
    "Room Revenue": 926,
    "Average Rate": 54,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 17
  },
  {
    "Date": "25-Jun-2020",
    "Total Occ.": 9,
    "Arr. Rooms": 0,
    "Dep. Rooms": 0,
    "Room Revenue": 313,
    "Average Rate": 35,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 9
  },
  {
    "Date": "26-Jun-2020",
    "Total Occ.": 4,
    "Arr. Rooms": 0,
    "Dep. Rooms": 0,
    "Room Revenue": 103,
    "Average Rate": 26,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 4
  },
  {
    "Date": "27-Jun-2020",
    "Total Occ.": 4,
    "Arr. Rooms": 0,
    "Dep. Rooms": 0,
    "Room Revenue": 103,
    "Average Rate": 26,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 4
  },
  {
    "Date": "28-Jun-2020",
    "Total Occ.": 4,
    "Arr. Rooms": 0,
    "Dep. Rooms": 0,
    "Room Revenue": 103,
    "Average Rate": 26,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 4
  },
  {
    "Date": "29-Jun-2020",
    "Total Occ.": 4,
    "Arr. Rooms": 0,
    "Dep. Rooms": 0,
    "Room Revenue": 103,
    "Average Rate": 26,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 4
  },
  {
    "Date": "30-Jun-2020",
    "Total Occ.": 4,
    "Arr. Rooms": 0,
    "Dep. Rooms": 0,
    "Room Revenue": 103,
    "Average Rate": 26,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 4
  },
  {
    "Date": "01-Jul-2020",
    "Total Occ.": 29,
    "Arr. Rooms": 0,
    "Dep. Rooms": 0,
    "Room Revenue": 1375,
    "Average Rate": 47,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 29
  },
  {
    "Date": "02-Jul-2020",
    "Total Occ.": 10,
    "Arr. Rooms": 1,
    "Dep. Rooms": 0,
    "Room Revenue": 377,
    "Average Rate": 38,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 11
  },
  {
    "Date": "03-Jul-2020",
    "Total Occ.": 4,
    "Arr. Rooms": 0,
    "Dep. Rooms": 1,
    "Room Revenue": 101,
    "Average Rate": 25,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 4
  },
  {
    "Date": "04-Jul-2020",
    "Total Occ.": 11,
    "Arr. Rooms": 0,
    "Dep. Rooms": 0,
    "Room Revenue": 101,
    "Average Rate": 9,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 11
  },
  {
    "Date": "05-Jul-2020",
    "Total Occ.": 5,
    "Arr. Rooms": 1,
    "Dep. Rooms": 0,
    "Room Revenue": 214,
    "Average Rate": 43,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 6
  },
  {
    "Date": "06-Jul-2020",
    "Total Occ.": 5,
    "Arr. Rooms": 0,
    "Dep. Rooms": 0,
    "Room Revenue": 214,
    "Average Rate": 43,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 6
  },
  {
    "Date": "07-Jul-2020",
    "Total Occ.": 7,
    "Arr. Rooms": 2,
    "Dep. Rooms": 0,
    "Room Revenue": 306,
    "Average Rate": 44,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 10
  },
  {
    "Date": "08-Jul-2020",
    "Total Occ.": 19,
    "Arr. Rooms": 0,
    "Dep. Rooms": 1,
    "Room Revenue": 961,
    "Average Rate": 51,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 21
  },
  {
    "Date": "09-Jul-2020",
    "Total Occ.": 5,
    "Arr. Rooms": 0,
    "Dep. Rooms": 1,
    "Room Revenue": 161,
    "Average Rate": 32,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 7
  },
  {
    "Date": "10-Jul-2020",
    "Total Occ.": 5,
    "Arr. Rooms": 0,
    "Dep. Rooms": 0,
    "Room Revenue": 161,
    "Average Rate": 32,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 7
  },
  {
    "Date": "11-Jul-2020",
    "Total Occ.": 10,
    "Arr. Rooms": 0,
    "Dep. Rooms": 0,
    "Room Revenue": 372,
    "Average Rate": 37,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 12
  },
  {
    "Date": "12-Jul-2020",
    "Total Occ.": 3,
    "Arr. Rooms": 0,
    "Dep. Rooms": 2,
    "Room Revenue": 69,
    "Average Rate": 23,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 3
  },
  {
    "Date": "13-Jul-2020",
    "Total Occ.": 3,
    "Arr. Rooms": 0,
    "Dep. Rooms": 0,
    "Room Revenue": 69,
    "Average Rate": 23,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 3
  },
  {
    "Date": "14-Jul-2020",
    "Total Occ.": 3,
    "Arr. Rooms": 0,
    "Dep. Rooms": 0,
    "Room Revenue": 69,
    "Average Rate": 23,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 3
  },
  {
    "Date": "15-Jul-2020",
    "Total Occ.": 28,
    "Arr. Rooms": 0,
    "Dep. Rooms": 0,
    "Room Revenue": 1342,
    "Average Rate": 48,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 28
  },
  {
    "Date": "16-Jul-2020",
    "Total Occ.": 23,
    "Arr. Rooms": 0,
    "Dep. Rooms": 0,
    "Room Revenue": 1335,
    "Average Rate": 58,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 23
  },
  {
    "Date": "17-Jul-2020",
    "Total Occ.": 3,
    "Arr. Rooms": 0,
    "Dep. Rooms": 0,
    "Room Revenue": 69,
    "Average Rate": 23,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 3
  },
  {
    "Date": "18-Jul-2020",
    "Total Occ.": 8,
    "Arr. Rooms": 0,
    "Dep. Rooms": 0,
    "Room Revenue": 280,
    "Average Rate": 35,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 8
  },
  {
    "Date": "19-Jul-2020",
    "Total Occ.": 3,
    "Arr. Rooms": 0,
    "Dep. Rooms": 0,
    "Room Revenue": 69,
    "Average Rate": 23,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 3
  },
  {
    "Date": "20-Jul-2020",
    "Total Occ.": 3,
    "Arr. Rooms": 0,
    "Dep. Rooms": 0,
    "Room Revenue": 69,
    "Average Rate": 23,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 3
  },
  {
    "Date": "21-Jul-2020",
    "Total Occ.": 3,
    "Arr. Rooms": 0,
    "Dep. Rooms": 0,
    "Room Revenue": 69,
    "Average Rate": 23,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 3
  },
  {
    "Date": "22-Jul-2020",
    "Total Occ.": 16,
    "Arr. Rooms": 0,
    "Dep. Rooms": 0,
    "Room Revenue": 892,
    "Average Rate": 56,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 16
  },
  {
    "Date": "23-Jul-2020",
    "Total Occ.": 3,
    "Arr. Rooms": 0,
    "Dep. Rooms": 0,
    "Room Revenue": 69,
    "Average Rate": 23,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 3
  },
  {
    "Date": "24-Jul-2020",
    "Total Occ.": 3,
    "Arr. Rooms": 0,
    "Dep. Rooms": 0,
    "Room Revenue": 69,
    "Average Rate": 23,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 3
  },
  {
    "Date": "25-Jul-2020",
    "Total Occ.": 8,
    "Arr. Rooms": 0,
    "Dep. Rooms": 0,
    "Room Revenue": 280,
    "Average Rate": 35,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 8
  },
  {
    "Date": "26-Jul-2020",
    "Total Occ.": 3,
    "Arr. Rooms": 0,
    "Dep. Rooms": 0,
    "Room Revenue": 69,
    "Average Rate": 23,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 3
  },
  {
    "Date": "27-Jul-2020",
    "Total Occ.": 106,
    "Arr. Rooms": 0,
    "Dep. Rooms": 0,
    "Room Revenue": 12945,
    "Average Rate": 122,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 106
  },
  {
    "Date": "28-Jul-2020",
    "Total Occ.": 106,
    "Arr. Rooms": 0,
    "Dep. Rooms": 0,
    "Room Revenue": 12945,
    "Average Rate": 122,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 106
  },
  {
    "Date": "29-Jul-2020",
    "Total Occ.": 120,
    "Arr. Rooms": 1,
    "Dep. Rooms": 0,
    "Room Revenue": 13801,
    "Average Rate": 115,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 121
  },
  {
    "Date": "30-Jul-2020",
    "Total Occ.": 106,
    "Arr. Rooms": 0,
    "Dep. Rooms": 1,
    "Room Revenue": 12945,
    "Average Rate": 122,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 106
  },
  {
    "Date": "31-Jul-2020",
    "Total Occ.": 3,
    "Arr. Rooms": 0,
    "Dep. Rooms": 0,
    "Room Revenue": 69,
    "Average Rate": 23,
    "Day Use Rooms": 0,
    "No Show Rooms": 0,
    "Adl. & Chl.": 3
  }
]

const ITEM_HEIGHT = 36
const ITEM_PADDING_TOP = 0
const MenuProps = {
  PaperProps: {
    style: {
      width: 150,
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP
    }
  }
}

const CustomTooltip = (props: TooltipProps<any, any>) => {
  // ** Props
  const {active, payload} = props
  console.log('payload', payload);

  if (active && payload) {
    return (
      <div className='recharts-custom-tooltip'>
        <Typography>{`Date: ${props.label}`}{ }</Typography>
        <Divider />
        <Typography sx={{fontSize: theme => theme.typography.body2.fontSize}}>{`${payload?.[0]?.name}: `}{`${payload?.[0]?.value}`}</Typography>
        <Typography sx={{fontSize: theme => theme.typography.body2.fontSize}}>{`${payload?.[1]?.name}: `}{`${payload?.[1]?.value}`}</Typography>
        <Typography sx={{fontSize: theme => theme.typography.body2.fontSize}}>{`${payload?.[2]?.name}: `}{`${payload?.[2]?.value}`}</Typography>
      </div>
    )
  }

  return null
}

const LinkStyled = styled(Link)(({theme}) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const month = [
  'This Month',
  '3 Month',
  '6 Month',
]

const Recharts = () => {
  // ** Hooks
  const {settings} = useSettings()

  const [chooseMonth, setChooseMonth] = useState<string>('This Month')
  const [data, setData] = useState<any>(dataFake)
  const handleChange = (event: SelectChangeEvent<unknown>) => {
    setChooseMonth(event.target.value as string)
  }

  useEffect(() => {
    const thisMonthStart = "01-Feb-2020"
    const thisMonthEnd = "29-Feb-2020"
    const threeMonthEnd = "30-Apr-2020"
    if (chooseMonth === 'This Month') {
      const temp = dataFake.filter((item, index) => (new Date(item.Date).getTime() >= new Date(thisMonthStart).getTime()
        && new Date(item.Date).getTime() <= new Date(thisMonthEnd).getTime()))
      console.log('temp', temp);
      setData(temp)
    } else if (chooseMonth === '3 Month') {
      const temp = dataFake.filter((item, index) => (new Date(item.Date).getTime() >= new Date(thisMonthStart).getTime()
        && new Date(item.Date).getTime() <= new Date(threeMonthEnd).getTime()))
      console.log('temp3', temp);
      setData(temp)
    } else {
      setData(dataFake)
    }
  }, [chooseMonth])
  return (
    <RechartsWrapper>
      <DatePickerWrapper>
        <Grid container spacing={6}>
          <PageHeader
            title={
              <Typography variant='h4'>
                <LinkStyled href='#' target='_blank'>
                  Reservation Forecast
                </LinkStyled>
              </Typography>
            }
          // subtitle={
          //   <Typography sx={{color: 'text.secondary'}}>Redefined chart library built with React and D3</Typography>
          // }
          />
          <Grid item xs={12}>
            <Card>

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
                <CardHeader
                  title='Reservation Forecast LineChart'
                  subheaderTypographyProps={{sx: {color: theme => `${theme.palette.text.disabled} !important`}}}
                  sx={{
                    flexDirection: ['column', 'row'],
                    alignItems: ['flex-start', 'center'],
                    '& .MuiCardHeader-action': {mb: 0},
                    '& .MuiCardHeader-content': {mb: [2, 0]}
                  }}

                />
                <CustomTextField
                  select
                  fullWidth
                  label='Choose month'
                  value=''
                  id='select-uncontrolled'
                  placeholder='Choose month'
                  SelectProps={{
                    MenuProps,
                    value: chooseMonth,
                    onChange: e => handleChange(e),
                  }}
                >
                  {month.map(code => (
                    <MenuItem key={code} value={code}>
                      {code}
                    </MenuItem>
                  ))}
                </CustomTextField>
              </Box>
              <CardContent>
                <Box sx={{height: 400}}>
                  <ResponsiveContainer>
                    <LineChart width={800} height={400} data={data}>
                      <CartesianGrid stroke="#f5f5f5" />
                      <XAxis dataKey='Date' reversed={false}
                        tickFormatter={(Date) => moment(Date).format('DD-MM')}
                        domain={['auto', 'auto']} />
                      <YAxis orientation={'left'} />
                      <Tooltip content={CustomTooltip} />
                      <Legend verticalAlign="top" height={36} />
                      <Line type="monotone" dataKey='Total Occ.' stroke='#ff9f43' />
                      <Line type="monotone" dataKey='Arr. Rooms' stroke='#9f87ff' />
                      <Line type="monotone" dataKey='Dep. Rooms' stroke='#f8d3ff' />
                    </LineChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>
          </Grid>

        </Grid>
      </DatePickerWrapper>
    </RechartsWrapper>
  )
}

export default Recharts
