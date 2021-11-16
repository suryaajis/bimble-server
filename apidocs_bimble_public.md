# BIBMBLE Server

# RESTfull endpoints

#### POST /public/register
#### POST /public/login
#### POST /public/googleLogin
#### GET /public/courses
#### GET /public/categories
#### GET /public/courses/:courseId
#### GET /public/ratings/:courseId
#### GET /public/users
#### PUT /public/users
#### GET /public/userCourse
#### GET /public/userCourses/:courseId
#### POST /public/userCourses/:courseId
#### POST /public/comments/:videoId
#### GET /public/ratingUser/:courseId
#### POST /public/ratings/:courseId

## POST /public/register

_Request Params_
```
not needed
```

_Request Header_
```
{
    access_token : <access_token user login>
}
```

_Request Body_
```
not needed
```

_Response (200 - Success)_
```
[
    {
        "id": 1,
        "title": "Ngoding bareng haji lagi",
        "content": "aku mengoding bareng bapak haji yow",
        "imgUrl": "1",
        "CategoryId": 1,
        "AuthorId": 1,
        "status": "active",
        "createdAt": "2021-09-28T20:20:35.352Z",
        "updatedAt": "2021-09-28T20:20:35.352Z"
    },
    {
        "id": 3,
        "title": "Aku gatidur:((",
        "content": "semangat ngoding biar cepet kaya",
        "imgUrl": "https://ngoding.com",
        "CategoryId": 1,
        "AuthorId": 1,
        "status": "active",
        "createdAt": "2021-09-28T20:24:27.098Z",
        "updatedAt": "2021-09-28T20:34:50.339Z"
    }
]

```

_Response (401 - Unauthenticated)_
```
{
    "message": [ "401 Unauthenticated access" ]
}
```

_Response (500 - Internal Error)_
```
{
    "message": [ "500 Internal Error" ]
}
```