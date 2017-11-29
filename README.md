# the-show

The Show is a web application with a landing page displaying the current year's theme. From here, users are able to navigate to view the current year's winning advertisements which are filtered by company and category.
The Admin will be directed to the admin dahsboard which will have the ability to upload a CSV of all the data used for the event including media URLs. The Admin will have additional ability to invite agencies to edit their own user accounts which will have a profile page. Admins will also be able to disable user accounts. 
The profile view will list all of their ads for the current year, the option for that agency's user to edit their username/password, upload a logo, and add links to their social media and website. 
All ads will have a clickable link that redirects to the Ad view. This page will display information about who created the ad, the category, and award received. 

## Built With
 
Node, ExpressJS, AngularJS, JavaScript, PostgreSQL, Passport, NodeMailer, Angular Route, AngularJS Material, HTML5, CSS3

## Getting Started

### Prerequisites
 
- [Node.js](https://nodejs.org/en/)
 
### Installing
 
1. Fork and clone or download the repository
2. Run the database.sql script
3. npm install
4. Create a .env file and include a gmail email address and password: "GMAIL_UN=[username here]" and "GMAIL_PW=[password here]"
 
## Documentation
 
[Scope for The Show](https://docs.google.com/document/d/1F3_L0C9H7oaSyulgAbpf9wVwdLsBiu3qhKeQZ3LmJv8/edit?usp=sharing)
 
### Completed Features

- New-Year View: Upload CSV, background image, update year, and set media directory for use of admin
- Admin Dashboard: Management of and email communication to users for Agency profiles
- Agency Profiles: Display agency description, logo, website and social media URLs as well as list each agency's awarded ads 
- Year-Home View: Filter winners by company or category; Displays award, category, organization, agency, and credits
- User authentication: Admin users and Agency users login and register using Passport
 
### Next Steps
 
- Swipe/Page turn function between original landing page and our views
- Image, Video, and Audio file conversion to uniform size and format
 
## Authors
 
[Alicia Wilking](https://github.com/AliciaKay), [Xiong Vang](https://github.com/XiongVang), [Hunter Rancourt](https://github.com/skwid138), [Sam Martorana](https://github.com/carnationcrab), and [Sarah Cooke](https://github.com/marshcooke)