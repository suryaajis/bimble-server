# Developer Notes

1. Lakukan `npm install` untuk membuat folder node_modules
2. Jika ingit restart database lakukan command `npm run init-db:dev`


# Endpoint Server

CUSTOMER
[x] POST /public/register
[x] POST /public/login
[ ] GET /public/users/:userId
[ ] PUT /public/users/:userId
[ ] GET /public/courses
[ ] GET /public/courses/:courseId
[ ] GET /public/userCourse
[ ] GET /public/userCourses/:courseId
[ ] POST /public/userCourses
[ ] POST /ovo/charge
[ ] POST /ovo/status

ADMIN
[ ] GET /admin/register
[ ] GET /admin/login
[ ] GET /admin/users
[ ] PUT /admin/users/:userId
[ ] GET /admin/courses
[ ] GET /admin/courses/:courseId
[ ] POST /admin/courses
[ ] PUT /admin/courses/:courseId
[ ] PATCH /admin/courses/:courseId (soft delete)
[ ] GET /admin/categories
[ ] POST /admin/categories
[ ] PATCH /admin/categories/:categoryId
[ ] DELETE /admin/categories/:categoryId