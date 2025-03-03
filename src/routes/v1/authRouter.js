import express from 'express'
import passport from '../../config/passport'
import { registerUser, loginUser, logoutUser } from '~/controllers/authControler'
import { userValidation } from '~/validations/userValidation'
import { authMiddleware } from '~/middlewares/authMiddleware'
import { session } from 'passport'

const router = express.Router()

router.post('/login', userValidation, loginUser)

router.post('/register', userValidation, registerUser)

router.get('/logout', authMiddleware, logoutUser)

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'], session: false }))

router.get('/google/callback', passport.authenticate('google', { session: false }), (req, res) => {
    console.log('req.user:', req.user)
    res.send('Login with google successfully')
    // res.redirect('/');
})


export default router