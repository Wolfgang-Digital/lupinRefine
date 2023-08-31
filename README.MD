# LUPIN-APP



This [refine](https://github.com/pankod/refine) project was generated with [superplate](https://github.com/pankod/refine).

## How to authenticate in feature branches

 * first authenticate in staging
 * change your base url with feature branch url 
   it should change from 
     https://staging--vocal-kitten-3c63a8.netlify.app/dashboard?state=blabla 
     to
     https://feature-branch-auth--vocal-kitten-3c63a8.netlify.app/dashboard?state=blabla
 * copy __Secure-next-auth.session-token cookie value from staging cookies
 * open your feature branch in browser and add this to the end of the url "api/setAuthCookie?cookie={your-cookie}"
 * replace {your-cookie} with the cookie value you copied earlier
 * your link should look like this now
 * https://feature-branch-name--vocal-kitten-3c63a8.netlify.app/api/setAuthCookie?cookie={your-cookie}
 * just hit enter and you should be logged in