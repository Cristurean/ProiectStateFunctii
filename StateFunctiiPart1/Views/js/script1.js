
$('#linkClose').click(function () {
    $('#divError').hide('fade');
});
$('#btnLogin').click(function () {
    var user = { Scurt: $('#txtScurt').val(), Parola: $('#txtParola').val() };
    var selectedValue = document.getElementById("list").value;
    //alert(selectedValue);
    switch (selectedValue) {
        case "Facultate": $.ajax({
            url: 'http://localhost:52158/api/Views/Login/SignIn1',
            type: "POST",
            contentType: 'application/json',
            data:
            JSON.stringify(user),
            success: function (response) {
                if (status == "success")
                sessionStorage.setItem('accesToken', response.access_token);
                //sessionStorage.setItem('Scurt', response.Scurt);
                sessionStorage.setItem("id1", response);
                window.location.href = 'PageAdminPanel.html';
            },
            error: function (error) {
                alert("Utilizator sau parola incorete!");
            }
        });
            break;
        case "Universitate": $.ajax({
            url: 'http://localhost:52158/api/Views/Login/SignIn2',
            type: "POST",
            contentType: 'application/json',
            data:
            JSON.stringify(user),
            success: function (response) {
                if (status == "success")
                    sessionStorage.setItem('accesToken', response.access_token);
                //sessionStorage.setItem('Scurt', response.Scurt);
                sessionStorage.setItem("id2", response);
                window.location.href = "Universitate.html";
            },
            error: function (error) {
                alert("Utilizator sau parola incorete!");
            }
        });
            break;
        case "Departament": $.ajax({
            url: 'http://localhost:52158/api/Views/Login/SignIn3',
            type: "POST",
            contentType: 'application/json',
            data:
            JSON.stringify(user),
            success: function (response) {
                if (status == "success")
                    sessionStorage.setItem('accesToken', response.access_token);
                //sessionStorage.setItem('Scurt', response.Scurt);
                sessionStorage.setItem("id3", response);
                window.location.href = "Data.html";
            },
            error: function (error) {
                alert("Utilizator sau parola incorete!");
            }
        });
    }

});
