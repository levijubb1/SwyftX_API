const fetch = require("node-fetch");

const config = {
  KEY: '',
  BASE_ROUT: 'https://api.swyftx.com.au',
  JWT: '',
};

async function getJWT() {
  try {
    const res = await fetch(`${config.BASE_ROUT}/auth/refresh/`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ "apiKey": `${config.KEY}` })
    })
    const data = await res.json()
    console.log('accessToken', data)
    return data
  } catch(err) {
      console.log(err)
    return 0
  }
  
}

async function getBalance() {
  // console.log('config JWT', config.JWT)
  try {
    const res = await fetch(`${config.BASE_ROUT}/user/balance/`, {
      method: 'get',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.JWT.accessToken}`
      }
    })
    const data = await res.json()
    console.log(res)
    console.log('----------------------------------------')
    console.log(data)
  } catch (error) {
    console.log(error)
  }
}

async function doStuff() {
  config.JWT = await getJWT()
  getBalance()
}

doStuff()
