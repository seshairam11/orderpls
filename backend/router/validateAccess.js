const express = require('express');
const { validateUserAccess } = require('../controllers/OPEmployeesLoginControllers');
const { createHotelUser } = require('../controllers/OPHotelSignupControllers')
const { validateHotelAccess } = require('../controllers/OPHotelLoginControllers')
const { editHotelUserProfile } = require('../controllers/OPHotelEditUserProfile');
const { addEmployees } = require('../controllers/OPAddEmployeesControllers');
const { viewEmployees } = require('../controllers/OPViewEmployeesControllers');
const { deleteEmployees } = require('../controllers/OPDeleteEmployeesControllers');
const { viewMenu } = require('../controllers/OPViewMenuCardControllers');
const { deleteMenu } = require('../controllers/OPDeleteMenuCardControllers');
const { addMenu } = require('../controllers/OPAddMenuCardControllers');
const { addBench } = require('../controllers/OPAddBenchControllers');
const { viewBench } = require('../controllers/OPViewBenchControllers');
const { deleteBench } = require('../controllers/OPDeleteBenchControllers');
const router = express.Router()

router.route('/loginemployees').post(validateUserAccess);
router.route('/signuprestauant').post(createHotelUser);
router.route('/loginrestauant').post(validateHotelAccess);
router.route('/editrestauantprofile').post(editHotelUserProfile);
router.route('/addemployees').post(addEmployees);
router.route('/viewemployees').post(viewEmployees);
router.route('/deleteemployees').post(deleteEmployees);
router.route('/viewmenu').post(viewMenu);
router.route('/deletemenu').post(deleteMenu);
router.route('/addmenu').post(addMenu);
router.route('/addbench').post(addBench);
router.route('/addbench').post(addBench);
router.route('/viewbench').post(viewBench);
router.route('/deletebench').post(deleteBench);

module.exports = router;