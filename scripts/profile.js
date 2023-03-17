firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        currentUser = db.collection('users').doc(user.uid);
        let info = "User info: "
        currentUser.get()
            .then(userDoc => {
                //get the data fields of the user
                var userName = userDoc.data().name;
                var userSchool = userDoc.data().school;
                var userCity = userDoc.data().country;

                //if the data fields are not empty, then write them in to the form
                if (userName != null) {
                    info = info + " " + userName;
                    console.log(userName);
                }
                if (userSchool != null) {
                    info = info + " " + userSchool;
                    console.log(userSchool);
                }
                if (userCity != null) {
                     info = info + " " + userCity;
                     console.log(userCity);
                }
                document.getElementById("profileElements").innerHTML = info;
            })
    } else {
        console.log("No user");
    }
});


