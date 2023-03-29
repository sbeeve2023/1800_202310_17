db.collection("reviews").get().then(function(querySnapshot) {      
    querySnapshot.forEach(function (doc) {
        db.collection("users").doc(doc.data().userID).get().then(function (user) {
            var userName = user.data().name;
            var comment = doc.data().comment;
            var date = doc.data().timestamp.toDate().toLocaleDateString();
            var rating = doc.data().rating;
            var content = document.getElementById('template').content.cloneNode(true);
            content.getElementById('name').innerHTML = userName;
            content.getElementById('date').innerHTML = date;
            content.getElementById('comment').innerHTML = comment;
            content.getElementById('rating').innerHTML = rating + "/5";

            console.log(content.innerHTML);
           
            document.getElementById("reviews").appendChild(content);
        })
        

    });
});