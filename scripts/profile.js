var img = "./images/logo.png"
var imageFile = "./images/logo.png";
var image = document.getElementById('mypic-goes-here');
var currentUser;          //put this right after you start script tag before writing any functions.
function populateUserInfo() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {

            //go to the correct user document by referencing to the user uid
            currentUser = db.collection("users").doc(user.uid)
            //get the document for current user.
            currentUser.get()
                .then(userDoc => {
                    this.imageFile = userDoc.data().profilePic;
                    image.src = imageFile;
                    //get the data fields of the user
                    var userName = userDoc.data().name;
                    var userSchool = userDoc.data().school;
                    var userCity = userDoc.data().city;

                    document.getElementById("user").innerHTML = userName;

                    //if the data fields are not empty, then write them in to the form.
                    if (userName != null) {
                        document.getElementById("nameInput").value = userName;
                    }
                    if (userSchool != null) {
                        document.getElementById("schoolInput").value = userSchool;
                    }
                    if (userCity != null) {
                        document.getElementById("cityInput").value = userCity;
                    }
                })
        } else {
            // No user is signed in.
            console.log("No user is signed in");
        }
    });
}

//call the function to run it 
populateUserInfo();

function editUserInfo() {
    //Enable the form fields
    document.getElementById('personalInfoFields').disabled = false;
}
const fileSelector = document.getElementById('mypic-input');
  fileSelector.addEventListener('change', (event) => {
    this.img = event.target.files[0];
    image.src = URL.createObjectURL(event.target.files[0]);
    console.log(image.src);
  });

function saveUserInfo() {
    firebase.auth().onAuthStateChanged(function (user) {
        var storageRef = storage.ref("images/" + user.uid + ".jpg");
        console.log(img);
        storageRef.put(img)
            .then(function () {
                storageRef.getDownloadURL()
                    .then(function (url) {
                        userName = document.getElementById('nameInput').value;
                        userSchool = document.getElementById('schoolInput').value;
                        userCity = document.getElementById('cityInput').value;

                        db.collection("users").doc(user.uid).update({
                            name: userName,
                            school: userSchool,
                            city: userCity,
                            profilePic: url
                        })
                            .then(function () {
                                document.getElementById('personalInfoFields').disabled = true;
                            })
                    })
            })
    })
}