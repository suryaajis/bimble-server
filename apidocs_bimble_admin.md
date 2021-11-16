# `BIMBLE Server`

## LIST OF ADMIN ENDPOINTS

- `GET /admin/users`
- `GET /admin/courses`
- `GET /admin/courses/:courseId`
- `POST /admin/users`
- `PUT /admin/courses/:courseId`
- `PATCH /admin/courses/:courseId`
- `GET /admin/categories`
- `POST /admin/categories`
- `DELETE /admin/categories/:categoryId`
- `DELETE /admin/comments/:commentId`
- `POST /admin//videos/:courseId`
- `GET /admin/videos/:videoId`
- `PATCH /admin/videos/:videoId`
- `DELETE /admin/videos/:videoId`

&nbsp;

## RESTful endpoints

&nbsp;

### `GET /admin/users`

_Request Header_

```
{
  "access_token": "<your access token>"
}
```

_Request Body_

```
not needed
```

_Response (200 - OK)_

```
[
    {
        "id": 1,
        "name": "admin",
        "email": "admin@gmail.com",
        "password": "$2b$08$4mdzYhzpfCTwo9XLkm4O3OpmZya5GTzWIQuRbwOnnEhy2tf8A30Za",
        "role": "Admin",
        "createdAt": "2021-11-15T13:51:31.720Z",
        "updatedAt": "2021-11-15T13:51:31.720Z"
    },
    {
        "id": 2,
        "name": "kosasih",
        "email": "kosasih@gmail.com",
        "password": "$2b$08$4mdzYhzpfCTwo9XLkm4O3OpmZya5GTzWIQuRbwOnnEhy2tf8A30Za",
        "role": "Admin",
        "createdAt": "2021-11-15T13:51:31.720Z",
        "updatedAt": "2021-11-15T13:51:31.720Z"
    },
    ...
]
```

_Response (500 - Internal Server Error)_

```
{
  "message": "Internal Server Error"
}
```
---
&nbsp;

### `GET /admin/courses`

_Request Header_

```
{
  "access_token": "<your access token>"
}
```

_Request Query_

```
{
  "search": "<your search>"
  "page": "<your page>"
}
```

_Request Body_

```
not needed
```

_Response (200 - OK)_
> without request query
```
[
    {
        "id": 24,
        "name": "Konflik dan Integrasi Sosial",
        "description": "Konflik sosial merupakan konflik yang terjadi akibat adanya perbedaan kepentingan sosial dari pihak yang berkonflik. Integrasi sosial adalah proses penyesuaian unsur-unsur yang berbeda dalam masyarakat sehingga menjadi satu kesatuan.",
        "price": 355000,
        "thumbnailUrl": "https://i.ytimg.com/vi/hgvZeHkFg9E/hqdefault.jpg?s…QCAokN4AQ==&rs=AOn4CLBNFG6WY9Pv5MdeSeSr5XU_k-YE_Q",
        "difficulty": "hard",
        "status": "active",
        "CategoryId": 8,
        "Category": {
            "name": "Sosiologi"
        }
    },
    {
        "id": 23,
        "name": "Mobilitas Sosial di Masyarakat",
        "description": "Mobilitas sosial adalah perpindahan posisi seseorang atau sekelompok orang dari lapisan yang satu ke lapisan yang lain.",
        "price": 345000,
        "thumbnailUrl": "https://i.ytimg.com/vi/mp_-PusiTZk/hqdefault.jpg?s…RUAAIhCGAE=&rs=AOn4CLCFQ8iVO1HFH-VP6z42cEKH_9rngg",
        "difficulty": "medium",
        "status": "active",
        "CategoryId": 8,
        "Category": {
            "name": "Sosiologi"
        }
    },
    ...
]
```

_Response (200 - OK)_
> with request query page = 1
```
{
    "totalCourse": 24,
    "course": [
        {
            "id": 24,
            "name": "Konflik dan Integrasi Sosial",
            "description": "Konflik sosial merupakan konflik yang terjadi akibat adanya perbedaan kepentingan sosial dari pihak yang berkonflik. Integrasi sosial adalah proses penyesuaian unsur-unsur yang berbeda dalam masyarakat sehingga menjadi satu kesatuan.",
            "price": 355000,
            "thumbnailUrl": "https://i.ytimg.com/vi/hgvZeHkFg9E/hqdefault.jpg?s…QCAokN4AQ==&rs=AOn4CLBNFG6WY9Pv5MdeSeSr5XU_k-YE_Q",
            "difficulty": "hard",
            "status": "active",
            "CategoryId": 8,
            "Category": {
                "name": "Sosiologi"
            }
        },
        {
            "id": 23,
            "name": "Mobilitas Sosial di Masyarakat",
            "description": "Mobilitas sosial adalah perpindahan posisi seseorang atau sekelompok orang dari lapisan yang satu ke lapisan yang lain.",
            "price": 345000,
            "thumbnailUrl": "https://i.ytimg.com/vi/mp_-PusiTZk/hqdefault.jpg?s…RUAAIhCGAE=&rs=AOn4CLCFQ8iVO1HFH-VP6z42cEKH_9rngg",
            "difficulty": "medium",
            "status": "active",
            "CategoryId": 8,
            "Category": {
                "name": "Sosiologi"
            }
        },
    ...
    ]
}
```

_Response (200 - OK)_
> with request query search = "konflik" 
```
[
    {
        "id": 24,
        "name": "Konflik dan Integrasi Sosial",
        "description": "Konflik sosial merupakan konflik yang terjadi akibat adanya perbedaan kepentingan sosial dari pihak yang berkonflik. Integrasi sosial adalah proses penyesuaian unsur-unsur yang berbeda dalam masyarakat sehingga menjadi satu kesatuan.",
        "price": 355000,
        "thumbnailUrl": "https://i.ytimg.com/vi/hgvZeHkFg9E/hqdefault.jpg?s…QCAokN4AQ==&rs=AOn4CLBNFG6WY9Pv5MdeSeSr5XU_k-YE_Q",
        "difficulty": "hard",
        "status": "active",
        "CategoryId": 8,
        "Category": {
            "name": "Sosiologi"
        }
    }
]
```

_Response (200 - OK)_
>  with request query page = 1 & search = "konflik" 
```
{
    "totalCourse": 1,
    "course": [
        {
            "id": 24,
            "name": "Konflik dan Integrasi Sosial",
            "description": "Konflik sosial merupakan konflik yang terjadi akibat adanya perbedaan kepentingan sosial dari pihak yang berkonflik. Integrasi sosial adalah proses penyesuaian unsur-unsur yang berbeda dalam masyarakat sehingga menjadi satu kesatuan.",
            "price": 355000,
            "thumbnailUrl": "https://i.ytimg.com/vi/hgvZeHkFg9E/hqdefault.jpg?s…QCAokN4AQ==&rs=AOn4CLBNFG6WY9Pv5MdeSeSr5XU_k-YE_Q",
            "difficulty": "hard",
            "status": "active",
            "CategoryId": 8,
            "Category": {
                "name": "Sosiologi"
            }
        }
    ],
    "totalPage": 1,
    "currentPage": 1
}
```

_Response (500 - Internal Server Error)_

```
{
  "message": "Internal Server Error"
}
```
---
&nbsp;

### `GET /admin/courses/:courseId`

_Request Header_

```
{
  "access_token": "<your access token>"
}
```

_Request Query_

```
{
  "courseId": "<courseId>"
}
```

_Request Body_

```
not needed
```

_Response (200 - OK)_

```
{
    "id": 24,
    "name": "Konflik dan Integrasi Sosial",
    "description": "Konflik sosial merupakan konflik yang terjadi akibat adanya perbedaan kepentingan sosial dari pihak yang berkonflik. Integrasi sosial adalah proses penyesuaian unsur-unsur yang berbeda dalam masyarakat sehingga menjadi satu kesatuan.",
    "price": 355000,
    "thumbnailUrl": "https://i.ytimg.com/vi/hgvZeHkFg9E/hqdefault.jpg?s…QCAokN4AQ==&rs=AOn4CLBNFG6WY9Pv5MdeSeSr5XU_k-YE_Q",
    "difficulty": "hard",
    "status": "active",
    "CategoryId": 8,
    "createdAt": "2021-11-16T04:21:41.140Z",
    "updatedAt": "2021-11-16T04:21:41.140Z",
    "Category": {
        "id": 8,
        "name": "Sosiologi"
    },
    "Videos": [
        {
            "id": 64,
            "name": "Konflik dan Integrasi Sosial - Pengertian dan Teori",
            "videoUrl": "https://www.youtube.com/embed/hgvZeHkFg9E",
            "CourseId": 24
        },
        {
            "id": 65,
            "name": "Konflik dan Integrasi Sosial - Faktor Penyebab",
            "videoUrl": "https://www.youtube.com/embed/9DvB4Dx_hAk",
            "CourseId": 24
        },
        {
            "id": 66,
            "name": "Konflik dan Integrasi Sosial - Jenis jenis Konflik Sosial",
            "videoUrl": "https://www.youtube.com/embed/jxDOU5FgVcU",
            "CourseId": 24
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

_Response (500 - Internal Server Error)_

```
{
  "message": "Internal Server Error"
}
```
---
&nbsp;

### `POST /admin/courses`

_Request Header_

```
{
  "access_token": "<your access token>"
}
```

_Request Body_

```
{
  "name": "<string>",
  "description": "<text>"
  "price": "<integer>"
  "thumbnailUrl": "<string>"
  "difficulty": "<string>"
  "CategoryId": "<integer>"
  "Videos": [
    {
      name: "<video1_name>"
      videoUrl: "<video1_URL>"
    },
    {
      name: "<video2_name>"
      videoUrl: "<video2_URL>"
    },
    {
      name: "<video3_name>"
      videoUrl: "<video3_URL>"
    },
  ]
}
```

_Response (200 - OK)_

```
{
    "course": {
        "id": 25,
        "name": "Belajar Coding Untuk Anak",
        "description": "Belajar Programming untuk Anak | Belajar Scratch Programming | Tutorial Coding untuk Anak",
        "price": 125000,
        "thumbnailUrl": "http://img.youtube.com/vi/3VZ-2ryeLV8/maxresdefault.jpg",
        "difficulty": "easy",
        "status": "active",
        "CategoryId": 7,
        "updatedAt": "2021-11-16T08:24:06.777Z",
        "createdAt": "2021-11-16T08:24:06.777Z"
    },
    "videos": [
        {
            "id": 70,
            "name": "Belajar Programming untuk Anak Part 1 wZ9oh",
            "videoUrl": "https://ik.imagekit.io/k6nbxr4qece/Belajar_Programming_untuk_Anak_Part_1_wZ9oh_1Q8.mp4",
            "CourseId": 33,
            "createdAt": "2021-11-16T08:24:06.780Z",
            "updatedAt": "2021-11-16T08:24:06.780Z"
        },
        {
            "id": 71,
            "name": "Belajar Programming untuk Anak Part 2",
            "videoUrl": "https://ik.imagekit.io/k6nbxr4qece/Belajar_Programming_untuk_Anak_Part_2_so9scd3R1.mp4",
            "CourseId": 33,
            "createdAt": "2021-11-16T08:24:06.780Z",
            "updatedAt": "2021-11-16T08:24:06.780Z"
        },
        {
            "id": 72,
            "name": "Belajar Programming untuk Anak Part 3",
            "videoUrl": "https://ik.imagekit.io/k6nbxr4qece/Belajar_Programming_untuk_Anak_Part_3_6-RMRVmNk.mp4",
            "CourseId": 33,
            "createdAt": "2021-11-16T08:24:06.780Z",
            "updatedAt": "2021-11-16T08:24:06.780Z"
        }
    ]
}
```

_Response (400 - Bad Request)_

```
{
    "message": "Name can't be empty"
}

OR

{
    "message": "Description can't be empty"
}

OR

{
    "message": "Price can't be empty"
}

OR

{
    "message": "Thumbnail URL can't be empty"
}

OR

{
    "message": "Difficulty can't be empty"
}

OR

{
    "message": "Category can't be empty"
}

```
_Response (401 - Unauthorized)_

```
{
    "message": "Invalid email/password"
}
```

_Response (403 - Forbidden)_

```
{
    "message": "You're not authorized"
}

```

_Response (500 - Internal Server Error)_

```
{
  "message": "Internal Server Error"
}
```
---
&nbsp;

### `PUT /admin/courses/:courseId`

_Request Header_

```
{
  "access_token": "<your access token>"
}
```
_Request Query_

```
{
  "courseId": "<courseId>"
}
```
_Request Body_

```
{
  "name": "<string>",
  "description": "<text>"
  "price": "<integer>"
  "thumbnailUrl": "<string>"
  "difficulty": "<string>"
  "CategoryId": "<integer>"
}
```

_Response (200 - OK)_

```
{
    "id": 25,
    "name": "Belajar Coding Untuk Anak",
    "description": "Belajar Programming untuk Anak | Belajar Scratch Programming | Tutorial Coding untuk Anak",
    "price": 250000,
    "thumbnailUrl": "http://img.youtube.com/vi/3VZ-2ryeLV8/maxresdefault.jpg",
    "difficulty": "hard",
    "status": "active",
    "CategoryId": 8,
    "createdAt": "2021-11-16T08:39:15.601Z",
    "updatedAt": "2021-11-16T09:11:24.603Z"
}
```
_Response (400 - Bad Request)_

```
{
    "message": "Name can't be empty"
}

OR

{
    "message": "Description can't be empty"
}

OR

{
    "message": "Price can't be empty"
}

OR

{
    "message": "Thumbnail URL can't be empty"
}

OR

{
    "message": "Difficulty can't be empty"
}

OR

{
    "message": "Category can't be empty"
}

```
_Response (401 - Unauthorized)_

```
{
    "message": "Invalid email/password"
}
```

_Response (403 - Forbidden)_

```
{
    "message": "You're not authorized"
}
```
_Response (404 - Not Found)_

```
{
    "message": "Course Not Found"
}
```
_Response (500 - Internal Server Error)_

```
{
  "message": "Internal Server Error"
}
```
---
&nbsp;

### `PATCH /admin/courses/:courseId`

_Request Header_

```
{
  "access_token": "<your access token>"
}
```
_Request Query_

```
{
  "courseId": "<courseId>"
}
```
_Request Body_

```
{
  "status": "<string>",
}
```

_Response (200 - OK)_

```
{
    "id": 25,
    "name": "Belajar Coding Untuk Anak",
    "description": "Belajar Programming untuk Anak | Belajar Scratch Programming | Tutorial Coding untuk Anak",
    "price": 250000,
    "thumbnailUrl": "http://img.youtube.com/vi/3VZ-2ryeLV8/maxresdefault.jpg",
    "difficulty": "hard",
    "status": "active",
    "CategoryId": 8,
    "createdAt": "2021-11-16T08:39:15.601Z",
    "updatedAt": "2021-11-16T09:11:24.603Z"
}
```
_Response (400 - Bad Request)_

```
{
    "message": "Status can't be empty"
}

```
_Response (401 - Unauthorized)_

```
{
    "message": "Invalid email/password"
}
```

_Response (403 - Forbidden)_

```
{
    "message": "You're not authorized"
}
```
_Response (404 - Not Found)_

```
{
    "message": "Course Not Found"
}
```
_Response (500 - Internal Server Error)_

```
{
  "message": "Internal Server Error"
}
```
---
&nbsp;

### `GET /admin/categories`

_Request Header_

```
{
  "access_token": "<your access token>"
}
```

_Request Body_

```
not needed
```

_Response (200 - OK)_

```
[
    {
        "id": 1,
        "name": "Matematika",
        "createdAt": "2021-11-16T04:21:41.134Z",
        "updatedAt": "2021-11-16T04:21:41.134Z"
    },
    {
        "id": 2,
        "name": "Fisika",
        "createdAt": "2021-11-16T04:21:41.134Z",
        "updatedAt": "2021-11-16T04:21:41.134Z"
    },
    ...
]
```
_Response (500 - Internal Server Error)_

```
{
  "message": "Internal Server Error"
}
```
---
&nbsp;

### `POST /admin/categories`

_Request Header_

```
{
  "access_token": "<your access token>"
}
```

_Request Body_

```
{
  "name": "<string>",
}
```

_Response (200 - OK)_

```
{
    "id": 9,
    "name": "astrologi",
    "updatedAt": "2021-11-16T09:47:56.642Z",
    "createdAt": "2021-11-16T09:47:56.642Z"
}
```

_Response (400 - Bad Request)_

```
{
    "message": "Name can't be empty"
}

```
_Response (401 - Unauthorized)_

```
{
    "message": "Invalid email/password"
}
```

_Response (403 - Forbidden)_

```
{
    "message": "You're not authorized"
}

```

_Response (500 - Internal Server Error)_

```
{
  "message": "Internal Server Error"
}
```
---
&nbsp;

### `DEL /admin/categories/:categoryId`

_Request Header_

```
{
  "access_token": "<your access token>"
}
```
_Request Query_

```
{
  "categoryId": "<categoryId>"
}
```
_Request Body_

```
not needed
```

_Response (200 - OK)_

```
{
    "message": "Course and category with id 9 has been deleted"
}
```

_Response (401 - Unauthorized)_

```
{
    "message": "Invalid email/password"
}
```

_Response (403 - Forbidden)_

```
{
    "message": "You're not authorized"
}
```
_Response (404 - Not Found)_

```
{
    "message": "Category Not Found"
}
```

_Response (500 - Internal Server Error)_

```
{
  "message": "Internal Server Error"
}
```
---
&nbsp;

### `DEL /admin/comments/:commentId`
_Request Header_

```
{
  "access_token": "<your access token>"
}
```
_Request Query_

```
{
  "commentId": "<commentId>"
}
```
_Request Body_

```
not needed
```

_Response (200 - OK)_

```
{
    "message": "Comment has been deleted"
}
```

_Response (401 - Unauthorized)_

```
{
    "message": "Invalid email/password"
}
```

_Response (403 - Forbidden)_

```
{
    "message": "You're not authorized"
}
```
_Response (404 - Not Found)_

```
{
    "message": "Comment Not Found"
}
```

_Response (500 - Internal Server Error)_

```
{
  "message": "Internal Server Error"
}
```
---
&nbsp;


### `POST /admin/videos/:courseId`

_Request Header_

```
{
  "access_token": "<your access token>"
}
```
_Request Query_

```
{
  "courseId": "<courseId>"
}
```
_Request Body_

```
{ 
  Videos : [
    {
      "name": "<string>",
      "video": "<string>",
    }
  ]
}
```

_Response (200 - OK)_

```
{
    "name": "Belajar Programming untuk Anak Part 3",
    "videoUrl": "https://ik.imagekit.io/k6nbxr4qece/Belajar_Programming_untuk_Anak_Part_3_zP79XhasC.mp4",
    "CourseId": 36
}
```

_Response (401 - Unauthorized)_

```
{
    "message": "Invalid email/password"
}
```

_Response (403 - Forbidden)_

```
{
    "message": "You're not authorized"
}

```
_Response (404 - Not Found)_

```
{
    "message": "Course Not Found"
}
```
_Response (500 - Internal Server Error)_

```
{
  "message": "Internal Server Error"
}
```
---
&nbsp;

### `GET /admin/videos/:videoId`

_Request Header_

```
{
  "access_token": "<your access token>"
}
```
_Request Query_

```
{
  "videoId": "<videoId>"
}
```
_Request Body_

```
not needed
```

_Response (200 - OK)_

```
{
    "id": 1,
    "name": "Program Linear Part 1",
    "videoUrl": "https://www.youtube.com/embed/WJr11FExG7s",
    "CourseId": 1,
    "createdAt": "2021-11-16T04:21:41.149Z",
    "updatedAt": "2021-11-16T04:21:41.149Z"
}

```
_Response (401 - Unauthorized)_

```
{
    "message": "Invalid email/password"
}
```

_Response (403 - Forbidden)_

```
{
    "message": "You're not authorized"
}

```
_Response (404 - Not Found)_

```
{
    "message": "Video Not Found"
}
```
_Response (500 - Internal Server Error)_

```
{
  "message": "Internal Server Error"
}
```
---
&nbsp;

### `PATCH /admin/videos/:videoId`

_Request Header_

```
{
  "access_token": "<your access token>"
}
```
_Request Query_

```
{
  "videoId": "<videoId>"
}
```
_Request Body_

```
{
  "name": "<string>",
}
```

_Response (200 - OK)_

```
{
    "id": 1,
    "name": "Program Linier Part Satu"
}
```

_Response (400 - Bad Request)_

```
{
    "message": "Name can't be empty"
}

```
_Response (401 - Unauthorized)_

```
{
    "message": "Invalid email/password"
}
```

_Response (403 - Forbidden)_

```
{
    "message": "You're not authorized"
}

```
_Response (404 - Not Found)_

```
{
    "message": "Video Not Found"
}
```
_Response (500 - Internal Server Error)_

```
{
  "message": "Internal Server Error"
}
```
---
&nbsp;


### `DELETE /admin/videos/:videoId`

_Request Header_

```
{
  "access_token": "<your access token>"
}
```
_Request Query_

```
{
  "videoId": "<videoId>"
}
```
_Request Body_

```
not needed
```

_Response (200 - OK)_

```
{
    "message": "Video has been deleted"
}
```

_Response (400 - Bad Request)_

```
{
    "message": "Name can't be empty"
}

```
_Response (401 - Unauthorized)_

```
{
    "message": "Invalid email/password"
}
```

_Response (403 - Forbidden)_

```
{
    "message": "You're not authorized"
}

```
_Response (404 - Not Found)_

```
{
    "message": "Video Not Found"
}
```
_Response (500 - Internal Server Error)_

```
{
  "message": "Internal Server Error"
}
```
---
&nbsp;



