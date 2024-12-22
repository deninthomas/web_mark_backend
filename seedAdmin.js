const Admin = require('./models/Admin');
(async () => {
  const adminExists = await Admin.findOne({ email: 'admin@example.com' });
  if (!adminExists) {
    const bcrypt = require('bcrypt');
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await Admin.create({ name: 'Admin', email: 'admin@example.com', password: hashedPassword });
    console.log('Admin user seeded');
  }
})();