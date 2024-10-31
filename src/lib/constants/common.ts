import moment from 'moment'

//is midnight if the time is equal or after 00:00:00
export const isMidnight = moment().isSameOrAfter(moment().endOf('day'))
