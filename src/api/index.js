import axios from 'axios'

export const getPPT = url => {
  return axios.get(url).then(res => res.data)
}