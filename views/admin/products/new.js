const layout = require('../layout')
const { getError } = require('../../helpers')

module.exports = ({ errors }) => {
  return layout({
    content: `
    <form method="post" enctype="multipart/form-data">
      <input type="text" placeholder="Title" name="title" />
      ${getError(errors, 'title')}
      <input type="number" placeholder="Price" name="price" step="0.01" />
      ${getError(errors, 'price')}
      <input type="file" name="image">
      <button type="submit">Submit</button>
    </form>
  `,
  })
}
