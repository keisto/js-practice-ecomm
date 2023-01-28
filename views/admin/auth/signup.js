const layout = require('../layout')

module.exports = ({ req }) => {
  return layout({
    content: `
    <div>
       ${req.session.userId}
      <form method="post">
        <input type="text" placeholder="Email" name="email"/>
        <input type="password" placeholder="Password" name="password">
        <input type="password" placeholder="Password Confirmation" name="passwordConfirmation">
        <button type="submit">Sign Up</button>
      </form>
    </div>
  `,
  })
}
