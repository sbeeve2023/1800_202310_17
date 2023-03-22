function writeReview() {
    console.log("In here");
    let Rating = document.querySelector('input[name="rating"]:checked').value;
    let Comment = document.getElementById("comment").value;
    console.log(Rating);
    console.log(Comment);
    
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var currentUser = db.collection("users").doc(user.uid)
            var userID = user.uid;
            //get the document for current user.
            currentUser.get()
                .then(userDoc => {
                    var userEmail = userDoc.data().email;
                    db.collection("reviews").add({
                        rating: Rating,
                        comment: Comment,
                        userID: userID,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp()
                    }).then(() => {
                        window.location.href = "main.html"; //new line added
                    })
                })
        } else {
            console.log("No user is signed in");
            window.location.href = 'main.html';
        }
    });
}