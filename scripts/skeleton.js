firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            $('#header').load('./text/header-loggedin.html');
            $('#footerPlaceholder').load('./text/footer.html');
            currentUser = db.collection("users").doc(user.uid);
            //get the document for current user.
            currentUser.get().then(userDoc => {
                document.getElementById('profile').src = userDoc.data().profilePic;
            })
        } else {
            // No user is signed in.
            $('#header').load('./text/header.html');
            $('#footerPlaceholder').load('./text/footer.html');
        }
    });