function loadSkeleton(){
    console.log($('#footerPlaceholder').load('./text/footer.html'));
    console.log($('#header').load('./text/header.html'));
    console.log($('#loggedin').load('./text/header-loggedin.html'));
}
loadSkeleton();