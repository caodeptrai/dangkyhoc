const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes');
const registrationRoutes = require('./routes/registrationRoutes');
const contactRoutes = require('./routes/contactRoutes');
const chatbotRoutes = require('./routes/chatbotRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const adminCourseRoutes = require('./routes/adminCourseRoutes');
const adminRegistrationRoutes = require('./routes/adminRegistrationRoutes');
const adminContactRoutes = require('./routes/adminContactRoutes');
const instructorRoutes = require('./routes/instructorRoutes');
const adminInstructorRoutes = require('./routes/adminInstructorRoutes');
const forumRoutes = require('./routes/forumRoutes');
const adminForumRoutes = require('./routes/adminForumRoutes');
const settingsRoutes = require('./routes/settingsRoutes');
const adminSettingsRoutes = require('./routes/adminSettingsRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(cors({
  origin: ['http://localhost:4200'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'API is running' });
});

// Public routes
app.use('/api/courses', courseRoutes);
app.use('/api/registrations', registrationRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/chatbot', chatbotRoutes);
app.use('/api/instructors', instructorRoutes);
app.use('/api/forum', forumRoutes);
app.use('/api/settings', settingsRoutes);

// Admin routes
app.use('/api/admin', authRoutes);
app.use('/api/admin/dashboard', dashboardRoutes);
app.use('/api/admin/courses', adminCourseRoutes);
app.use('/api/admin/registrations', adminRegistrationRoutes);
app.use('/api/admin/contacts', adminContactRoutes);
app.use('/api/admin/instructors', adminInstructorRoutes);
app.use('/api/admin/forum', adminForumRoutes);
app.use('/api/admin/settings', adminSettingsRoutes);

app.use(errorHandler);

module.exports = app;
