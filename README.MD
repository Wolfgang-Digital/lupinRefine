# LUPIN-APP

## ROLE BASED AUTHENTICATION ON DIFFERENT PAGES
 * Role value is already stored in session.user.role, and we have an authenticationRedirector which checks the session.user.role.
 * for each page we create, we first import getServerSidePropsWithAuth function from the redirector,
 * then export it as getServerSideProps
 * the roles we provide in the array to the getServerSidePropsWithAuth represents all the roles which are allowed to open that specific page. 
 ```
 import { getServerSidePropsWithAuth } from "@pages/authenticationRedirector";
 export const getServerSideProps = getServerSidePropsWithAuth(["admin"]);
 ```
 * if the user doesn't have one of the allowedRoles for that page, he will be redirected to the dashboard page.
 * don't forget to add "admin" role to the array of the public routes like dashboard or timesheet.

## HIDING ROUTES ON THE SIDEBAR BASED ON AUTHENTICATED ROLE
 * on _app.page.tsx we have resourceRoleMapper object 
 ```
{
admin: [
	"Dashboard",
	"Timesheet",
	"Reports",
	"Users",
	"Client Overview",
	"Job List",
	"Admin",
	],
user: [
	"Dashboard",
	"Timesheet"
	]
},
```
  * each role is a key and the values are the allowedRoutes of the roles.
  * role is stored in user.user_role on database.

## How to authenticate in feature branches

 * first authenticate in staging
 * make a request to api/setAuthForSite?site=[your-feature-branch-url]
     https://staging--vocal-kitten-3c63a8.netlify.app/api/setAuthForSite?site=https://feature-branch-auth--vocal-kitten-3c63a8.netlify.app


