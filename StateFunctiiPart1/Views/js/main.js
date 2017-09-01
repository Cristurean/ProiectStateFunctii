$(document).ready(function () {

noBack();
window.onload = noBack;
window.onpageshow = function (evt) { if (evt.persisted) noBack() }
window.onunload = function () { void (0) }
});

function noBack() {
    window.history.forward()
}
$('#btnLogout').click(function () {
    sessionStorage.removeItem('accesToken');
    window.location.href = "Login.html"
});
