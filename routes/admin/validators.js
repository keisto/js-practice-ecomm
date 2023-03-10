const { check } = require('express-validator')
const usersRepo = require('../../repositories/users')

module.exports = {
  requireTitle: check('title')
    .trim()
    .isLength({ min: 3, max: 32 })
    .withMessage('Must be between 3 and 32 characters'),
  requirePrice: check('price')
    .trim()
    .toFloat()
    .isFloat({ min: 1 })
    .withMessage('Must be 1 dollar or more'),
  requireEmail: check('email')
    .trim()
    .normalizeEmail()
    .isEmail()
    .custom(async (email) => {
      const existingUser = await usersRepo.getOneBy({ email })
      if (existingUser) {
        throw new Error('Email in use')
      }

      return true
    }),
  requirePassword: check('password').trim().isLength({ min: 4, max: 24 }),
  requirePasswordConfirmation: check('passwordConfirmation')
    .trim()
    .isLength({ min: 4, max: 24 })
    .custom((passwordConfirmation, { req }) => {
      if (req.body.password !== passwordConfirmation) {
        throw new Error('Passwords do not match')
      }

      return true
    }),
  requireEmailExists: check('email')
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage('Must provide a valid email')
    .custom(async (email) => {
      const user = await usersRepo.getOneBy({ email })

      if (!user) {
        throw new Error(`User not found with this email: ${email}`)
      }

      return true
    }),
  requireValidPasswordForUser: check('password')
    .trim()
    .custom(async (password, { req }) => {
      const user = await usersRepo.getOneBy({ email: req.body.email })
      if (!user) {
        throw new Error('Invalid password.') // because we are in our password checker
      }
      const validPassword = await usersRepo.comparePasswords(
        user.password,
        password
      )
      if (!validPassword) {
        throw new Error('Invalid password.')
      }

      return true
    }),
}
