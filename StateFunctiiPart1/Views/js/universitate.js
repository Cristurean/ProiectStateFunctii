$('#btnLogout').click(function () {
    sessionStorage.removeItem('accesToken');
    window.location.href = "Login.html"
});