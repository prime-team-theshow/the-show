# the-show

The Show is a web application with a landing page displaying the current year's theme. From here, users are able to navigate to view the current year's winning advertisements which are filtered by company and category.
The Admin will be directed to the admin dahsboard which will have the ability to upload a CSV of all the data used for the event including media URLs. The Admin will have additional ability to invite agencies to edit their own user accounts which will have a profile page. Admins will also be able to disable user accounts. 
The profile view will list all of their ads for the current year, the option for that agency's user to edit their username/password, upload a logo, and add links to social media and their website. 
All ads will have a clickable link that redirects to the Ad view. This page will display information about who created the ad, the category, and award received. 

[ ] Link to the live version of the app if it's hosted on Heroku.

## Built With
 
Node, ExpressJS, AngularJS, JavaScript, PostgreSQL, NodeMailer, Filestack (Stretch)

## Getting Started
 
[ ] These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.
 
### Prerequisites
 
[ ] Link to software that is required to install the app (e.g. node).
 
- [Node.js](https://nodejs.org/en/)
- List other prerequisites here
 
 
### Installing
 
[ ] Steps to get the development environment running.
 
```sql
CREATE TABLE "users" (
  "id" serial primary key,
  "username" varchar(80) not null UNIQUE,
  "password" varchar(240) not null
);
```
 
## Screen Shot
 
[ ] Include one or two screen shots of your project here (optional). Remove if unused.
 
## Documentation
 
Scope for The Show: https://docs.google.com/document/d/1F3_L0C9H7oaSyulgAbpf9wVwdLsBiu3qhKeQZ3LmJv8/edit?usp=sharing
 
### Completed Features
 
High level list of items completed.
 
- [ ] Year-Home View: filter winners by company or category
- [ ] Admin View: Upload CSV & media, Agency profile & user management
- [ ] Ads: Display award, category, organization, agency, people credited
- [ ] Agency Profile: list of ads by agency 
 
### Next Steps
 
Features that you would like to add at some point in the future.
 
- [ ] Swipe/Page turn function between landing page and our views
- [ ] Image, Video, and Audio file conversion 
 
## Deployment
 
- [ ] Add additional notes about how to deploy this on a live system
 
## Authors
 
Alicia Wilking, Xiong Vang, Hunter Rancourt, Sam Martorana, and Sarah Cooke

## Acknowledgments

* Hat tip to anyone who's code was useds