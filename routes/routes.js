import Controller from "../controllers/controllers.js";

import express from 'express'

import isValidUser from "../middlewares/validate.js";

const router = express.Router()
console.log(Controller.insert_post)

router.get('/Login',Controller.login_get)
router.get('/dashboard',Controller.dashboard_get)
router.get('/G2_Test',isValidUser,Controller.g2_test_get)
router.get('/G_Test',isValidUser,Controller.g_test_get)
router.get('/signupform',Controller.signupform_get)
router.get('/loginform',Controller.loginform_get)
router.get('/edit/:licenceno',Controller.edit_get)
router.get('/logout',Controller.logout_get)
router.post('/insert',Controller.insert_post)
router.post('/G_Test',Controller.gtest_post)
router.post('/edit/:licenceno',Controller.edit_post)
router.post('/Login',Controller.login_post)
router.post('/signup',Controller.signup_post)
export default router
