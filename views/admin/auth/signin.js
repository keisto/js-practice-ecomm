const layout = require('../layout')

module.exports = () => {
  return layout({
    content: `
    <div>
      <form method="post">
        <input type="text" placeholder="Email" name="email"/>
        <input type="password" placeholder="Password" name="password">
        <button type="submit">Sign In</button>
      </form>
    </div>
  `,
  })
}
