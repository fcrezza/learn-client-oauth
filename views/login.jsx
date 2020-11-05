// eslint-disable-next-line
const React = require('react')

function Login({error}) {
  return <div>
    <h1>Login</h1>
    <p>Try login using github</p>
    <a href={`https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&redirect_uri=http://localhost:3000/login/oauth`}>Login with github</a>
    {error ? <p style={{
      color: 'red'
    }}>you rejected</p> : null}
  </div>
}

module.exports = Login