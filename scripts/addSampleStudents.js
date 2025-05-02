const { sequelize } = require('../config/database');
const Student = require('../models/student');

async function addSampleStudents() {
  await sequelize.sync({ force: false });

  const students = [
    { studentId: 'S001', firstName: 'John', lastName: 'Doe' },
    { studentId: 'S002', firstName: 'Jane', lastName: 'Smith' },
    { studentId: 'S003', firstName: 'Michael', lastName: 'Johnson' },
  ];

  for (const studentData of students) {
    const [student, created] = await Student.findOrCreate({
      where: { studentId: studentData.studentId },
      defaults: studentData,
    });
    if (created) {
      console.log(`Added student: ${student.firstName} ${student.lastName}`);
    }
  }

  process.exit();
}

addSampleStudents().catch(err => {
  console.error('Error adding sample students:', err);
  process.exit(1);
});
