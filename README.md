# Crypto Tools List Web App

Welcome to the CryptoTools website repo.

The website provides links to helpful crypto tools for investors.

## Architecture

The website uses:
1. Next.js for the front and back end, utilising the built in Next.js API routes
2. React-Query for asynchronous data fetching
3. MongoDB Atlas database for persistence

Other technology used includes:
4. [Google ReCaptcha](https://www.google.com/recaptcha/about/) is used for bot detection. You will need to sign up and get some api keys
5. The application uses [Cloudinary](https://cloudinary.com/) for image hosting. Sign up for a free API account and preset
6. [Tailwind CSS](https://tailwindcss.com/) is used for styling
7. JWT public/private key based authentication for the admin
8. [MailChimp](https://mailchimp.com/) API integrtion for handling email list signups 
9. Nodemailer API integration to handle email suggestion link from users to admin


## Functionality

1. User can search for and find crypto tools 
2. User can suggest new projects to add to the website
3. User can sign up for the email list
4. Admin can perform CRUD operations via the GUI

## Environment Variables

Populate the environment variables in `.env.example` and rename the file `.env`.

## Installing and Starting

Install dependencies:
`npm install'

Run the front end locally:
`npm run dev`


## Demo


### Mobile Design
##### Home Page

##### Admin Page


### Desktop Design
##### Home Page

##### Admin Page










