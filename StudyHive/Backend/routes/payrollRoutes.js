import authorizeRoles from '../middleware/roleAuth.js';


router.get('/payroll-data', authorizeRoles('admin', 'tutor'),authenticateToken, (req, res) =>  {
res.send("Welcome to StudyHive Payroll!");

});