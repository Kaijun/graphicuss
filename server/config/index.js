
export const apiConfig = {
  version: 1,
  path : 'api',
}

export const dbConfig = {
  url: 'mongodb://localhost:27017/e-discuss',
}

export const authConfig = {
  jwtSecret: 'what does the fox say!',
  expiresIn: 365*(24*3600*1000) //in ms days*(hours*secends*1000)
}
