# Project Title

## 1. Project Description
State your app in a nutshell, or one-sentence pitch. Give some elaboration on what the core features are.  
This browser based web application to ... 

## 2. Names of Contributors
List team members and/or short bio's here... 
* Hi I'm Jay, I'm excited for this project because reasons.
* Hi my name is Callum and this is our first github project
* Hi my name is Rachelle and im ready to start
* ...
	
## 3. Technologies and Resources Used
List technologies (with version numbers), API's, icons, fonts, images, media or data sources, and other resources that were used.
* HTML, CSS, JavaScript
* Bootstrap 5.0 (Frontend library)
* Firebase 8.0 (BAAS - Backend as a Service)
* Leaflet
* GraphHopper router

## 4. Complete setup/installion/usage
State what a user needs to do when they come to your project.  How do others start using your code or application?
Here are the steps ...
* Open folder with vs code and live server the index.html
* Won't work since it doesn't have our api key in the folder
* 

## 5. Known Bugs and Limitations
Here are some known bugs:
* Can click multiple times on the review page
* which then makes multiple reviews
* ...

## 6. Features for Future
What we'd like to build in the future:
* Favourites
* Tree api data
* ...
	
## 7. Contents of Folder
Content of the project folder:

```
 Top level of project folder: 
├── .gitignore               # Git ignore file
├── index.html               # landing HTML file, this is what users see when you come to url
└── README.md

It has the following subfolders and files:
├── .git                     # Folder for git repo
├── images                   # Folder for images
    /blue.png                #Used in the map key
    /logo.png                #Used in the main page as the logo, also as the default user icon
    /park.png                #Used in the map key and on the map itself
    /water.png               #Used in the map key and on the map itself
├── scripts                  # Folder for scripts
    /skeleton.js             #Loads header and footer
    /review.js               #Used by the review page to see all of the reviews
    /profile.js              #used by the profile page to change profile info
    /map.js                  #Loads all of the map and its data
    /leaflet-routing-machine.js #leafet javascript for routing
    /L.Routing.GraphHopper.js #graphHopper routing used to make the route itself
    /form.js                 #Used to leave review and save it to firestore
    /Control.Geocoder.js     #Used by map.js to find lat and long of location
    /authentication.js       #Used to sign in and sign up
├── styles                   # Folder for styles
    /style.css               #Used by most of site to change the colours
    /review.css              #Used by the form page to style the review 
    /leaflet-routing-machine.css #Used by the map to style the routing
    /Control.Geocoder.css    #Used to make the routing panel look nice
├──index.html                #The home page
├──main.html                 #The main page when you sign in
├──signup.html               #The sign up or sign in page
├──reviews.html              #The page where you can see all the reviews
├──profile.html              #The page where you can change profile info
├──form.html                 #The page where you can leave a review
├──favourites.html           #Didn't end up getting used


```


