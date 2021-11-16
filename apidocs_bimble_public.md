# BIBMBLE Server

# RESTfull endpoints

<!-- #### POST /public/register -->
<!-- #### POST /public/login -->
<!-- #### POST /public/googleLogin -->
<!-- #### GET /public/courses -->
<!-- #### GET /public/categories -->
<!-- #### GET /public/courses/:courseId -->
<!-- #### GET /public/ratings/:courseId -->
<!-- #### GET /public/users -->
<!-- #### PUT /public/users -->
#### GET /public/userCourse
#### GET /public/userCourses/:courseId
<!-- #### POST /public/userCourses/:courseId -->
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
not needed
```

_Request Body_
```
{
    "name": STRING,
    "email": STRING,
    "password": STRING 
}
```

_Response (201 - Success)_
```
{
  "name": <name user>,
  "email": <email user>,
  "role": <user role>
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Email can't be empty"
}

OR

{
  "message": "Name can't be empty"
}

OR

{
  "message": "Password can't be empty"
}

OR 

{
  "message": "Wrong email format"
}
```

_Response (500 - Internal Error)_
```
{
    "message": [ "500 Internal Error" ]
}
```

## POST /public/login

_Request Params_
```
not needed
```

_Request Header_
```
not needed
```

_Request Body_
```
{
    "email": STRING,
    "password": STRING 
}
```

_Response (200 - Success)_
```
{
  "access_token": <access_token user>,
  "role": <role user>
}
```

_Response (401 - Unauthorized)_
```
{
  "message": "Invalid email/password"
}
```

_Response (500 - Internal Error)_
```
{
    "message": [ "500 Internal Error" ]
}
```

## POST /public/googleLogin

_Request Params_
```
not needed
```

_Request Header_
```
not needed
```

_Request Body_
```
{
    "idToken": <idToken from google>, 
}
```

_Response (200 - Success)_
```
{
  "access_token": <access_token user>,
  "role": <role user>
}
```

_Response (500 - Internal Error)_
```
{
    "message": [ "500 Internal Error" ]
}
```

## GET /public/courses

_Request Params_
```
not needed
```

_Request Header_
```
not needed
```

_Request Body_
```
not needed
```

_Response (200 - Success)_
```
[
  {
    "id": <course id>,
    "name": <course name>,
    "description": <description course>,
    "price": <price course>,
    "thumbnailUrl": <thumbnailUrl course>,
    "difficulty": <difficulty course>,
    "status": "active",
    "CategoryId": <category id course>,
    "Category": {
      "name": <category name course>
    }
  },
  {
    "id": <course id>,
    "name": <course name>,
    "description": <description course>,
    "price": <price course>,
    "thumbnailUrl": <thumbnailUrl course>,
    "difficulty": <difficulty course>,
    "status": "active",
    "CategoryId": <category id course>,
    "Category": {
      "name": <category name course>
    }
  }
]
```

_Response (500 - Internal Error)_
```
{
    "message": [ "500 Internal Error" ]
}
```

## GET /public/categories

_Request Params_
```
not needed
```

_Request Header_
```
not needed
```

_Request Body_
```
not needed
```

_Response (200 - Success)_
```
[
  {
    "id": <category id>,
    "name": <category name>
  },
  {
    "id": <category id>,
    "name": <category name>
  },
  {
    "id": <category id>,
    "name": <category name>
  }
]
```

_Response (500 - Internal Error)_
```
{
    "message": [ "500 Internal Error" ]
}
```

## GET /public/courses/:courseId

_Request Params_
```
{
    courseId: <course id>
}
```

_Request Header_
```
not needed
```

_Request Body_
```
not needed
```

_Response (200 - Success)_
```
{
    "id": <course id>,
    "name": <course name>,
    "description": <description course>,
    "price": <price course>,
    "thumbnailUrl": <thumbnailUrl course>,
    "difficulty": <difficulty course>,
    "status": "active",
    "CategoryId": <category id course>,
    "Category": {
      "id": <category id course>
      "name": <category name course>
    },
    "Videos": [
        {
            "id": <video id course>,
            "name": <video name course>,
            "videoUrl": <video url course>,
            "CourseId": <course id video>,
            "Comments": [
                {
                    "id": <comment id video>,
                    "comment": <comment video>,
                    "User": {
                        "name": <name user>
                    }
                }
            ]
        }
    ]
}
```

_Response (404 - Not Found)_
```
{
  "message": "Course Not Found"
}
```

_Response (500 - Internal Error)_
```
{
    "message": [ "500 Internal Error" ]
}
```

## GET /public/ratings/:courseId

_Request Params_
```
{
    courseId: <course id>
}
```

_Request Header_
```
not needed
```

_Request Body_
```
not needed
```

_Response (200 - Success)_
```
{
  "rating": <rating course>
}
```

_Response (404 - Not Found)_
```
{
  "message": "Course Not Found"
}
```

_Response (500 - Internal Error)_
```
{
    "message": [ "500 Internal Error" ]
}
```


## GET /public/users

_Request Params_
```
not needed
```

_Request Header_
```
{
    "access_token": <access_token user login>
}
```

_Request Body_
```
not needed
```

_Response (200 - Success)_
```
{
  "name": <name user>,
  "email": <email user>,
  "role": <role user>
}
```

_Response (401 - Unauthorized)_
```
{
  "message": "Invalid email/password"
}
```

_Response (500 - Internal Error)_
```
{
    "message": [ "500 Internal Error" ]
}
```

## PUT /public/users

_Request Params_
```
not needed
```

_Request Header_
```
{
    "access_token": <access_token user login>
}
```

_Request Body_
```
{
  "name": STRING,
  "email": STRING
}
```

_Response (200 - Success)_
```
{
  "message": "User has been updated"
}
```

_Response (401 - Unauthorized)_
```
{
  "message": "Invalid email/password"
}
```

_Response (500 - Internal Error)_
```
{
    "message": [ "500 Internal Error" ]
}
```


## GET /public/userCourse

_Request Params_
```
not needed
```

_Request Header_
```
{
    "access_token": <access_token user login>
}
```

_Request Body_
```
not needed
```

_Response (200 - Success)_
```
{
  "message": "User has been updated"
}
```

_Response (401 - Unauthorized)_
```
{
  "message": "Invalid email/password"
}
```

_Response (500 - Internal Error)_
```
{
    "message": [ "500 Internal Error" ]
}
```

## GET /public/userCourses/:courseId

_Request Params_
```
{
    "courseId": <course id>
}
```

_Request Header_
```
{
    "access_token": <access_token user login>
}
```

_Request Body_
```
not needed
```

_Response (200 - Success)_
```

```

_Response (401 - Unauthorized)_
```
{
  "message": "Invalid email/password"
}
```

_Response (404 - Not Found)_
```
{
  "message": "Course Not Found"
}
```

_Response (500 - Internal Error)_
```
{
    "message": [ "500 Internal Error" ]
}
```

## POST /public/userCourses/:courseId

_Request Params_
```
{
    "courseId": <course id>
}
```

_Request Header_
```
{
    "access_token": <access_token user login>
}
```

_Request Body_
```
not needed
```

_Response (200 - Success)_
```
{
  "id": <userCourse id>,
  "UserId": <user id>,
  "CourseId": <course id>,
  "isPaid": false,
  "chargeId": null
}
```

_Response (401 - Unauthorized)_
```
{
  "message": "Invalid email/password"
}
```

_Response (404 - Not Found)_
```
{
  "message": "Course Not Found"
}
```

_Response (500 - Internal Error)_
```
{
    "message": [ "500 Internal Error" ]
}
```

## POST /ovo/charge

_Request Params_
```
not needed
```

_Request Header_
```
{
    "access_token": <access_token user login>
}
```

_Request Body_
```
{
    "userCourseId": <userCourse id>,
    "phoneNumber": <phone number user>
}
```

_Response (200 - Success)_
```
{
  "id": <id>,
  "business_id": <business id>,
  "reference_id": <reference_id>,
  "status": "PENDING",
  "currency": "IDR",
  "charge_amount": <charge amount>,
  "capture_amount": <capture amount>,
  "refunded_amount": null,
  "checkout_method": "ONE_TIME_PAYMENT",
  "channel_code": "ID_OVO",
  "channel_properties": {
    "mobile_number": <mobile number user>
  },
  "actions": null,
  "is_redirect_required": false,
  "callback_url": <callback url xendit>,
  "created": "2021-11-16T05:57:48.131Z",
  "updated": "2021-11-16T05:57:48.131Z",
  "void_status": null,
  "voided_at": null,
  "capture_now": true,
  "customer_id": null,
  "payment_method_id": null,
  "failure_code": null,
  "basket": null,
  "metadata": null
}
```

_Response (401 - Unauthorized)_
```
{
  "message": "Invalid email/password"
}
```

_Response (500 - Internal Error)_
```
{
    "message": [ "500 Internal Error" ]
}
```

## POST /ovo/status <FROM XENDIT>