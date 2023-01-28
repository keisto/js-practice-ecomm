const layout = require('../layout')
const { getError } = require('../../../views/helpers')

module.exports = ({ errors }) => {
  return layout({
    content: `
    <div>
      <form method="post">
        <input type="text" placeholder="Email" name="email"/>
        ${getError(errors, 'email')}
        <input type="password" placeholder="Password" name="password">
        ${getError(errors, 'password')}
        <button type="submit">Sign In</button>
      </form>
    </div>
  `,
  })
}
