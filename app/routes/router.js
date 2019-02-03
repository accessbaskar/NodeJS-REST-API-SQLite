Login Service

POST validateUser Login user and password validation

http://localhost:3000/api/user/validateUser

Input Body Json
{"name": "first","pwd": "123"}

Output Json
{
    "id": 2,
    "name": "first",
    "address": "secound",
    "dob": "1900",
    "email": "xyz",
    "pwd": "123",
    "mobileno": "99999999"
}


Get all User

localhost:3000/api/user/

Output 

Json of All the User.

Get User by ID

localhost:3000/api/user/{1}

Output

Json of the user.

Create New User

localhost:3000/api/user/create

Input Body Json

{"name":"test","address":"test","dob":"1999","email":"xyz","pwd":"8685", "mobile":"9877787787"}

Output

Status code 201

