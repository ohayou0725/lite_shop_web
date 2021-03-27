module.exports = {
  'mock': {
    baseUrl: '/dev-api',
    mockUrl: 'https://mock.xwhx.top'
  },
  'local': {
    baseUrl: 'http://localhost:9090',
    mockUrl: 'http://localhost:3210'
  },
  'development': {
    baseUrl: 'http://192.168.50.156:9090',
    mockUrl: 'https://api.xwhx.top'
  },
  'production': {
    baseUrl: 'http://42.192.44.114:9090',
    mockUrl: 'https://api.xwhx.top'
  }
}
