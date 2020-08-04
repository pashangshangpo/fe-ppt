import axios from 'axios'

export const getPPT = url => {
  return axios.get(url).then(res => res.data)
}

export const getImageVideoUrl = (url, imageLength) => {
  return axios
    .get(url, {
      responseType: 'blob'
    })
    .then(res => res.data)
    .then(res => res.slice(imageLength))
    .then(video => URL.createObjectURL(video))
}
