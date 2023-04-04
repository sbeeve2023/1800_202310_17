db.collection("reviews").orderBy("timestamp", "desc").get().then(function(querySnapshot) {  
    querySnapshot.forEach(function (doc) {
        db.collection("users").doc(doc.data().userID).get().then(function (user) {
            var userName = user.data().name;
            var comment = doc.data().comment;
            var date = doc.data().timestamp.toDate().toLocaleDateString();
            var rating = doc.data().rating;
            var profile = user.data().profilePic;
            var content = document.getElementById('template').content.cloneNode(true);
            content.getElementById('name').innerHTML = userName;
            content.getElementById('date').innerHTML = date;
            content.getElementById('comment').innerHTML = comment;
            content.getElementById('rating').innerHTML = rating + "/5";
            content.getElementById('image').src = profile;
           
            document.getElementById("reviews").appendChild(content);
        })
        

    });
});