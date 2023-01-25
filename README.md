# Crypto Stats List Web App

Welcome to the CryptoStatsList website repo.

The website provides links to helpful data dashboard for popular crypto protocols to enable users to do thier own research without just listening to influencers.

## Architecture

The website uses:
1. A Next.js front end using client and server side rendered components
2. An Express.js GraphQL api for the backend  
3. MongoDB Atlas database for persistence

## Functionality

1. Find links to data dashboards of popular cryto projects
2. Fully functional admin panel:
   - JWT based authentication and authorization with Passport.js
   - Create, update and delete new projects
   - Project images hosted with Cloudinary 
   - Make projects active/inactive to show/hide on the front end
3. Server side rendering of home page to enhanced SEO
4. Users can suggest new dashboard links, which emails the admin the information
5. Mobile and desktop optimised
6. Google ReCaptcha for bot detection on email form

## Demo

![](/demo/CryptoStatsDemo.gif)

### Mobile Design
![](/demo/mobile.JPG)&nbsp;&nbsp;
![](/demo/adminmobile.JPG)&nbsp;&nbsp;

### Desktop Design
![](/demo/desktop.JPG)&nbsp;&nbsp;
![](/demo/admindesktop.JPG)









