//Sets the header and footer based on if you are logged in or not
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    $("#header").load("./text/header-loggedin.html");
    $("#footerPlaceholder").load("./text/footer.html");
    currentUser = db.collection("users").doc(user.uid);
    //get the document for current user.
    currentUser.get().then((userDoc) => {
      document.getElementById("profile").src = userDoc.data().profilePic;
      document.getElementById("name").innerHTML = userDoc.data().name;
    });
  } else {
    // No user is signed in.
    $("#header").load("./text/header.html");
    $("#footerPlaceholder").load("./text/footer.html");
  }
});
