require('dotenv').config()

const get = (path) => {
    const url = path;
    const options = {
      method: 'GET',
    };
  
    return window.fetch(url, options)
    .then(async (res) => {
      const contentTypeHeader = res.headers.get('Content-Type');
      const contentType = contentTypeHeader ? contentTypeHeader.split(';')[0] : null;
  
      return res.json()
    })
    .catch( e => {
      console.log(e)
    })
  };


  export const getRefreshToken = (refresh_token) => {
    return get(process.env.REACT_APP_BACK_END_URL + "/refresh_token?refresh_token=" + refresh_token)
  }