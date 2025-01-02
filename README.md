Admin APIs
Login

Endpoint: POST /api/admin/login
Description: Admin login to obtain JWT token.
Request Body:
json
Copy code
{
  "email": "string",
  "password": "string"
}
Response:
json
Copy code
{
  "token": "string"
}
Add Mentor

Endpoint: POST /api/admin/mentors
Description: Create a new mentor.
Request Body:
json
Copy code
{
  "name": "string",
  "email": "string",
  "phone": "string",
  "password": "string"
}
Response: Mentor details.
Add Project

Endpoint: POST /api/admin/projects
Description: Create a new project.
Request Body:
json
Copy code
{
  "title": "string",
  "description": "string"
}
Response: Project details.
Assign Project to Mentor

Endpoint: POST /api/admin/projects/assign
Description: Assign a project to a mentor.
Request Body:
json
Copy code
{
  "projectId": "string",
  "mentorId": "string"
}
Response: Confirmation message.
Delete Mentor

Endpoint: DELETE /api/admin/mentors/:mentorId
Description: Delete a mentor by ID.
Response: Confirmation message.
Delete Project

Endpoint: DELETE /api/admin/projects/:projectId
Description: Delete a project by ID.
Response: Confirmation message.
Mentor APIs
Login

Endpoint: POST /api/mentor/login
Description: Mentor login to obtain JWT token.
Request Body:
json
Copy code
{
  "email": "string",
  "password": "string"
}
Response:
json
Copy code
{
  "token": "string"
}
Get Assigned Projects

Endpoint: GET /api/mentor/projects
Description: Fetch all projects assigned to the logged-in mentor.
Headers:
Authorization: Bearer <token>
Response: Array of projects.
Edit Submission

Endpoint: PUT /api/mentor/projects/submission
Description: Update a submission’s status, marks, or comments.
Request Body:
json
Copy code
{
  "projectId": "string",
  "submissionId": "string",
  "status": "string",
  "marks": "number",
  "comments": "string"
}
Response: Confirmation message.



If (const response = await axios.post('http://localhost:5000/api/admin/login', { email, password }); Needed
)
