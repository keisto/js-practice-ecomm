const layout = require('../layout')
const { getError } = require('../../helpers')

module.exports = ({ errors }) => {
  return layout({
    content: `
    <form method="post">
      <input type="text" placeholder="Title" name="title" />
      <input type="text" placeholder="Price" name="price" step="0.01" />
      <input type="file" name="image">
      <button type="submit">Submit</button>
    </form>
  `,
  })
}
