// ** Mock Adapter
import mock from 'src/@fake-db/mock'

// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation: VerticalNavItemsType = [
  //addnew
  {
    sectionTitle: 'Hotel Administration'
  },
  {
    path: '/hotel/actual-data',
    //action: 'read',
    //subject: 'acl-page',
    icon: 'tabler:table',
    title: 'Actual Data'
  },
  {
    path: '/hotel/reservation-forecast',
    //action: 'read',
    //subject: 'acl-page',
    icon: 'tabler:shield',
    title: 'Reservation Forecast'
  },
  {
    path: '/hotel/period-detail',
    //action: 'read',
    //subject: 'acl-page',
    icon: 'tabler:layout-grid',
    title: 'Period Detail'
  }
]

mock.onGet('/api/vertical-nav/data').reply(() => {
  return [200, navigation]
})
