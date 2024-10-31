const BASE_URL = `${import.meta.env.PUBLIC_API_ROUTE}:${
  import.meta.env.PUBLIC_API_PORT
}/api`

export const REGISTER = `${BASE_URL}/user`
export const USER = `${BASE_URL}/user`
export const STARTING_GAME = `${BASE_URL}/game/starting`
export const START_GAME = `${BASE_URL}/game/start`
