![License](https://img.shields.io/github/license/xHenrySx/API-REST.svg?style=for-the-badge) ![Repo Size](https://img.shields.io/github/languages/code-size/xHenrySx/API-REST.svg?style=for-the-badge) ![TOP_LANGUAGE](https://img.shields.io/github/languages/top/xHenrySx/API-REST.svg?style=for-the-badge) ![FORKS](https://img.shields.io/github/forks/xHenrySx/API-REST.svg?style=for-the-badge&social) ![Stars](https://img.shields.io/github/stars/xHenrySx/API-REST.svg?style=for-the-badge)

# Books API REST

## Table of Contents

- [Description](#description)
- [Screenshots](#screenshots)
- [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Usage](#usage)
- [DOCUMENTATION](#documentation)
  - [BOOKS](#books)
    - [Parameters](#parameters)
      - [title](#title)
      - [author](#author)
      - [year](#year)
      - [pages](#pages)
      - [description](#description)
      - [image](#image)
  - [USERS](#users)
    - [Parameters](#parameters)
      - [username](#username)
      - [email](#email)
      - [password](#password)
      - [roles](#roles)
  - [AUTH](#auth)
    - [sign up](#signup)
    - [sign in](#signin)
- [License](#license)
- [Acknowledgements](#acknowledgements)
- [Contacts](#contacts)

## Description

The book API help to obtain information about a specific book or a lot of books as you want to query.

## Screenshots

## Built With

<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" height="40px" width="40px" /></a><a href="https://nodejs.org/en/"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg" height="40px" width="40px" /></a>

## Getting Started

To start first run the command
`       npm install 
  `

then
to run like a developer just run the command
`       npm run dev
  `
or to build it
`       npm run build && npm run start
  `

### Prerequisites

javascript
node.js
npm

### Usage

ATTENTION:

- Some test only works when is run one time, beacuse it create users and users can be unique.
- The server is listening to port 3000 locally

To run the test:

```cmd
npm run test
```

or

```cmd
mocha
```

## DOCUMENTATION

### BOOKS

The book model is constructed like this:

```json
{
  "title": "String",
  "author": "String",
  "year": "Number",
  "pages": "Number",
  "description": "String",
  "image": "String"
}
```

#### Parameters

##### title

The title of the book.
Type: String.
Required.

##### author

The author of the book.
Type: String.
Required.

##### year

The publishing year of the book.
Type: Number.
Required.

##### pages

The amount of pages of the book.
Type: Number.
Required.

##### description

The description of the book
Type: String
Required

##### image

The url of the book image.
Type: String.
Required

### USERS

The user construction is created like this:

```json
{
  "username": "String",
  "email": "String",
  "password": "String",
  "roles": []
}
```

#### Params

##### username

The user, username.
Type: String.
Required and Unique.

##### email

The user email.
Type: String.
Required and Unique.

##### password

The user password.
Type: String.
Required.

##### roles

The user roles.
Type: Array.
Default role is user.

### AUTH

The authentication is used to sign in or sign up.
The sign up can be performed by anyone as well as the sing in.
But only the admins or moderators previous registerd can add users by the
user class, update, or delete them.

#### sign up

The sign up require:

```json
{
  "username": "somename",
  "email": "email@something.com",
  "password": "password"
}
```

When you sign up as a user it gives you, your user and a token to perform
basic operations to the API, almost every get request.

#### sign in

The sign in require:

```json
{
  "email": "email@something.com",
  "password": "password"
}
```

When you sign in the API return the user and a token to use.
The tokes expires depends on the role:

- admin or moderator: Unlimited for every sign in
- user: 24 hours for every sign in

## License

<a href="https://choosealicense.com/licenses/mit/"><img src="https://raw.githubusercontent.com/johnturner4004/readme-generator/master/src/components/assets/images/mit.svg" height=40 />MIT License</a>

## Acknowledgements

API for a work test. :)

## Contacts

<a href="https://www.linkedin.com/in/henry-saldivar"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" /></a> <a href="mailto:enrisal2000@gmail.com"><img src=https://raw.githubusercontent.com/johnturner4004/readme-generator/master/src/components/assets/images/email_me_button_icon_151852.svg /></a>
