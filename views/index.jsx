// eslint-disable-next-line
const React = require('react')

function Index({data, error}) {
  if (error) {
    return <div>upsss, something went wrong!</div>
  }
  if (data) {
    return <div>
      <h1>You authenticated! here is your data: </h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <p>want to logout?</p>
      <a href="/logout">logout</a>
    </div>
  }

  return <div>
    <h1>hello world!</h1>
    <p>We learn oauth using github oauth</p>
    <a href="/login">Goto login page</a>
  </div>
}


module.exports = Index