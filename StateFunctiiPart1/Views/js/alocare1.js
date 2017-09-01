$('#btnLogout').click(function () {
    sessionStorage.removeItem('accesToken');
    window.location.href = "Login.html"
});
function search() {

    var input, filter, table, tr, td, i;
    input = document.getElementById("searchbar");
    filter = input.value.toUpperCase();
    table = document.getElementById("alocareTable");
    tr = table.getElementsByTagName("tr");


    for (i = 0; i < tr.length; i++) {
        // for (k = 1; k < 6; k++){ 
        td = tr[i].getElementsByTagName("td")[2];


        if (td) {
            if ((td.innerHTML.toUpperCase().indexOf(filter) > -1)) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}
var options = '';
$("#selectDepartament").append(function () {
    var id = sessionStorage.getItem("id1");
    $.ajax({
        url: '/api/SelectDepartament/' +id,
        type: 'GET',
        dataType: 'json',
        success: function (response) {
            options = ' <option selected="selected">' + "Select position" + '</option>';
            for (var i = 0; i < response.length; i++) {

                options += '<option  value="' + response[i] + '">' + response[i] + '</option>';
                $("#selectDepartament").html(options);
            }

        },
        error: function () {
            alert("Departamentele nu pot fi obtinute!");
        }
    });
});
var options3= '';
$("#selectedDepartament1").append(function () {
    var id = sessionStorage.getItem("id1");
    $.ajax({
        url: '/api/SelectDepartament/' + id,
        type: 'GET',
        dataType: 'json',
        success: function (response) {
            //options1 = ' <option selected="selected">' + "Select departament" + '</option>';
            for (var i = 0; i < response.length; i++) {
                options3 += '<option value="' + response[i] + '">' + response[i] + '</option>';
            }
            $("#selectedDepartament1").html(options3);
        },
        error: function () {
            alert("Departamentele nu pot fi obtinute!");
        }
    });
});

var idDep = 0;
function selectDepartament(value) {
    $.ajax({
        url: '/api/SelectDepartament?departament=' + value,
        type: 'GET',
        dataType: 'json',
        success: function (response1) {
            idDep = response1;
        },
        error: function () {
            alert("Id-ul unui departament nu poate fi obtinut!");
        }
    });
}
function selectDepartment1(value) {
    value = $("#selectedDepartament1 option:selected").text();
    var idDep1 = 0;
    $.ajax({
        url: '/api/SelectDepartament?departament=' + value,
        type: 'GET',
        dataType: 'json',
        success: function (response1) {
            idDep1 = response1;
        },
        error: function () {
            alert("Id-ul unui departament nu poate fi obtinut!");
        }
    });
    alert("Actualizare Departament");
    return idDep1;
}
$('#btnSave').click(function () {
    var idD = $("#txtId").val();
    if (!Number(idD)) {
        alert("Trebuie introdus un numar!!!");
    }
    else {
        var alocare = { PiDetail: $("#txtId").val(), Departament: idDep };
        $.ajax({
            url: '/api/PIAlocare',
            type: "POST",
            contentType: 'application/json',
            data:
            JSON.stringify(alocare),
            success: function (response) {
                if (status == "success")
                    sessionStorage.setItem('accesToken', response.access_token);
                $('#txtId').val('');
                $('#txtDep').val('');
                alert("Inserat");
                window.location.reload();
            },
            error: function (error) {
                alert("Inregistrarea exista!");
            }
        });
    }
});
function alocariList() {

    var id;
    var id1 = sessionStorage.getItem("id1");
    if (id = id1) {
        $.ajax({
            url: '/api/PIAlocare/' + id1,
            type: 'GET',
            dataType: 'json',
            success: function (response) {
                alocariListSuccess(response);
                //alert(id);
            },
            error: function () {
                alert("Alocarile nu pot fi afisate!");
            }
        });
    }
}
function alocariListSuccess(response) {

    $.each(response, function (index, alocare) {

        alocareAddRow(alocare);
    });
}
function alocareAddRow(alocare) {

    if ($("#alocareTable tbody").length == 0) {
        $("#alocareTable").append("<tbody></tbody>");
    }

    $("#alocareTable tbody").append(
        alocareBuildTableRow(alocare));
}
function alocareBuildTableRow(alocare) {
    var ret = "<tr>" +
        "<td>" + alocare.id + "</td>" +
        "<td>" + alocare.piDetail + "</td>" +
        "<td>" + alocare.departament + "</td>" +
        "<td>" +
        "<button type='button'" +
        "onclick='alocareGet(this);'" +
        "data-target='#myModal1'" +
        "data-toggle='modal'" +
        "data-id='" + alocare.id + "'" +
        "data-piDetail='" + alocare.piDetail + "'" +
        "data-Departament='" + alocare.departament + "'>" +
        "<span class='glyphicon glyphicon-edit edit-button'></span>" +
        "</button>" +
        "</td>" +
        "<td>" +
        "<button type='button' " +
        "onclick='alocareDelete(this);' " +
        "class='btn btn-default' " +
        "data-id='" + alocare.id + "'>" +
        "<span class='glyphicon glyphicon-remove' />" +
        "</button>" +
        "</td>" +
        "</tr>";
    return ret;
}
function alocareDelete(ctl) {
    var id = $(ctl).data("id");
    var result = confirm("Doriti sa stergeti?");
    if (result) {
        $.ajax({
            url: "/api/PIAlocare/" + id,
            type: 'DELETE',
            success: function (alocare) {
                $(ctl).parents("tr").remove();
                alert("Sters cu succes!");
            },
            error: function () {
                alert("Nu s-a sters");
            }
        });
    }
}
function alocareGet(ctl) {
    //alert($(ctl).data("pidetail"));
    var id1 = $('#txtId1').val($(ctl).data("pidetail"));
    var dep = $('#selectedDepartament1').val($(ctl).data("departament"));
    $('#btnEdit').click(function () {
        var id = $(ctl).data("id");
       // var idDetail = $('#selectedId1 :selected').text();
        var idPiDetail = $('#txtId1').val();
        if (!Number(idPiDetail)) {
            alert("Id-ul detaliilor trebuie sa fie un numar!");
        }
        else {
            var idDepartment = selectDepartment1(this.value);
            var alocare = { PiDetail: $('#txtId1').val(), Departament: idDepartment };
            $.ajax({
                url: '/api/PIAlocare/' + id,
                type: "PUT",
                contentType: 'application/json',
                data: JSON.stringify(alocare),
                success: function (response) {
                    if (status == "success")
                        sessionStorage.setItem('accesToken', response.access_token);
                    $("#txtId1").val('');
                    $("#txtDep1").val('');
                    alert("Actualizat");
                    window.location.reload();
                },
                error: function (error) {
                    alert("Nu s-a actualizat.");
                }
            });
        }
    });
}

$(document).ready(function () {
    alocariList();
    noBack();
    window.onload = noBack;
    window.onpageshow = function (evt) { if (evt.persisted) noBack() }
    window.onunload = function () { void (0) }
});

function noBack() {
    window.history.forward();
}



