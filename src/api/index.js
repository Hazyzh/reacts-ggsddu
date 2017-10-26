import axios from 'axios'

axios.interceptors.response.use(
    response => {
        if(response.status == 200){
          if(response.data.code != 0) {
            return Promise.reject(response.data.message)
          }
          return response.data
        }
    }
  )

export default axios
