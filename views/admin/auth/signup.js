const layout = require('../layout')
const { getError } = require('../../../views/helpers')

module.exports = ({ req, errors }) => {
  return layout({
    content: `
    <div>
       ${req.session.userId}
      <form method="post">
        <input type="text" placeholder="Email" name="email"/>
        ${getError(errors, 'email')}
        <input type="password" placeholder="Password" name="password">
        ${getError(errors, 'password')}
        <input type="password" placeholder="Password Confirmation" name="passwordConfirmation">
        ${getError(errors, 'passwordConfirmation')}
        <button type="submit">Sign Up</button>
      </form>
    </div>
  `,
  })
}
