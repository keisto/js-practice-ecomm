module.exports = {
  getError(errors, prop) {
    try {
      return errors.mapped()[prop].msg
    } catch (err) {
      return '' // long hair don't care
    }
  },
}
