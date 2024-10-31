import moment from 'moment'

//is midnight if the time is equal or after 02:30:00
export const isMidnight = moment().isSameOrAfter(
  moment().startOf('day').add(2, 'h').add(30, 'm')
)
