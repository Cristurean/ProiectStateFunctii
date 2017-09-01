let options = '';
let options1 = '';
var option1;
var valoareSelectata = '';
var valoareSelectataTitlu = '';
//var idPozitia = 0;
var idPozitia1 = 0;
var idTitlu1 = 0;
var options2 = '';
var options3 = '';

$("#selectedValue").append(function () {
    $.ajax({
        url: '/api/Pozitia/',
        type: 'GET',
        dataType: 'json',
        success: function (response) {
            options = ' <option selected="selected">' + "Select position" + '</option>';
            for (var i = 0; i < response.length; i++) {

                options += '<option  value="' + response[i] + '">' + response[i] + '</option>';
                $("#selectedValue").html(options);
            }
          
        },
        error: function () {
            alert("Valorile pozitiilor nu pot fi returnata!");
        }
    });
});
function selectPozitia1(value) {
    value = $("#selectedValue1 option:selected").text();
    var idPozitia = 0;
        $.ajax({
            url: '/api/Pozitia1?nume=' + value,
            type: 'GET',
            dataType: 'json',
            success: function (response1) {
                idPozitia = response1;
            },
            error: function () {
                alert("Id-ul unei pozitii nu este obtinut!");
            }
        });  
        alert("Actualizare Pozitia");
        return idPozitia;
}

function selectPozitia(value) {
    $.ajax({
        url: '/api/Pozitia1?nume=' + value,
        type: 'GET',
        dataType: 'json',
        success: function (response1) {
            idPozitia1 = response1;
        },
        error: function () {
            alert("Id-ul unei pozitii nu este obtinut!");
        }
    });
}
$("#selectedValue1").append(function () {
    $.ajax({
        url: '/api/Pozitia/',
        type: 'GET',
        dataType: 'json',
        success: function (response) {
            for (var i = 0; i < response.length; i++) {
                options2 += '<option id="' + i +'" value="' + response[i] + '">' + response[i] + '</option>';
            }
            $("#selectedValue1").html(options2);
            
        },
        error: function () {
            alert("Valorile pozitiilor nu pot fi returnata!");
        }
    });
});

$("#selectedTitlu").append(function () {
    $.ajax({
        url: '/api/Titlu/',
        type: 'GET',
        dataType: 'json',
        success: function (response) {
            options1 = ' <option selected="selected">' + "Select title" + '</option>';
            for (var i = 0; i < response.length; i++) {
                options1 += '<option value="' + response[i] + '">' + response[i] + '</option>';
            }
            $("#selectedTitlu").html(options1);
        },
        error: function () {
            alert("Valorile titlurilor nu poate fi returnata!");
        }
    });
});
$("#selectedTitlu1").append(function () {
    $.ajax({
        url: '/api/Titlu/',
        type: 'GET',
        dataType: 'json',
        success: function (response) {
            for (var i = 0; i < response.length; i++) {
                options3 += '<option value="' + response[i] + '">' + response[i] + '</option>';
            }
            $("#selectedTitlu1").html(options3);
        },
        error: function () {
           alert("Valorile titlurilor nu poate fi returnata!");
        }
    });
});
function selectTitlu1(value) {
    var idTitlu = 0;
    value = $("#selectedTitlu1 option:selected").text();
    $.ajax({
        url: '/api/Titlu?nume=' + value,
        type: 'GET',
        dataType: 'json',
        success: function (response1) {
            idTitlu = response1;
        },
        error: function () {
            alert("Id-ul unui titlu nu este obtinut!");
        }
    });
    alert("Actualizare Titlu");   
    return idTitlu;
   
}
function selectTitlu(value) {
    $.ajax({
        url: '/api/Titlu?nume=' + value,
        type: 'GET',
        dataType: 'json',
        success: function (response1) {
            idTitlu1 = response1;
        },
        error: function () {
           alert("Id- ul unui titlu nu este obtinut!");
        }
    });
}
function btnSave() {
    //$('#btnSave').click(function () {
    var id2 = sessionStorage.getItem("id2");
    var id3 = sessionStorage.getItem("id3");
    var id;
    var x = $('#txtNume').val();
    var y = $('#txtPren').val();

    if (id = id3) {
        var cadru = null;
        if (x == "" || (/^[a-zA-Z0-9- ]*$/.test(x) == false) || y == "" || (/^[a-zA-Z0-9- ]*$/.test(y) == false)) { alert("Nume sau prenume nu sunt corecte!"); }
        else {
            cadru = {
                nume: $('#txtNume').val(), prenume: $('#txtPren').val(), Departament: id3, Pozitia: idPozitia1, Titlu: idTitlu1, Titular: 1
            };
            $.ajax({
                url: '/api/CadreDidactice2',
                type: "POST",
                contentType: 'application/json',
                data:
                JSON.stringify(cadru),
                success: function (response) {
                    sessionStorage.setItem('accesToken', response.access_token);
                    $('#txtNume').val('');
                    $('#txtPren').val('')
                    //y = null;
                    alert("Inserat");
                    window.location.reload();
                },
                error: function (error) {
                    
                    alert("Nu s-a inserat \n" + "Acest cadru didactic exista deja \n"+" pozitia cadrului didactic trebuie sa fie setata!");
                   
                }
            });
        }
    }
}
function search() {

    var input, filter, table, tr, td, td2, td4, td5, i, k;
    input = document.getElementById("searchbar");
    filter = input.value.toUpperCase();
    table = document.getElementById("cadreTable");
    tr = table.getElementsByTagName("tr");


    for (i = 0; i < tr.length; i++) {
        // for (k = 1; k < 6; k++){ 
        td = tr[i].getElementsByTagName("td")[1];
        td2 = tr[i].getElementsByTagName("td")[2];
        td4 = tr[i].getElementsByTagName("td")[4];
        td5 = tr[i].getElementsByTagName("td")[5];

        if (td || td2 || td4 || td5) {
            if ((td.innerHTML.toUpperCase().indexOf(filter) > -1) || (td2.innerHTML.toUpperCase().indexOf(filter) > -1) ||
                (td4.innerHTML.toUpperCase().indexOf(filter) > -1) || (td5.innerHTML.toUpperCase().indexOf(filter) > -1)) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

$('#btnLogout').click(function () {
    sessionStorage.removeItem('accesToken');
    window.location.href = "Login.html"
});



function cadreList() {
    var id;
    var id3 = sessionStorage.getItem("id3");
    if (id = id3) {
        $.ajax({
            url: '/api/CadreDidactice2/' + id3,
            type: 'GET',
            dataType: 'json',
            success: function (response) {
                cadreListSuccess(response);
       
            },
            error: function () {
                alert("Eroare la incarcare!");
            }
        });
    }
   
}

function cadreListSuccess(response) {
 
    $.each(response, function (index, cadru) {
 
        cadruAddRow(cadru);
    });
}
function cadruAddRow(cadru) {

    if ($("#cadreTable tbody").length == 0) {
        $("#cadreTable").append("<tbody></tbody>");
    }
    else {

        $("#cadreTable tbody").append(
            cadruBuildTableRow(cadru));
    }
}
function cadruBuildTableRow(cadru) {
    var ret = "<tr>" +
        "<td >" + cadru.id + "</td>" +
        "<td>" + cadru.nume + "</td>" +
        "<td >" + cadru.prenume + "</td>" +
        "<td >" + cadru.Departament + "</td>" +
        "<td >" + cadru.Pozitia + "</td>" +
        "<td >" + cadru.Titlu + "</td>" +
        "<td>" + cadru.Titular + "</td>" +
        "<td ><button type='button' onclick='cadruGet(this)' data-id='" + cadru.id + "' data-nume='" + cadru.nume + "' data-prenume='" + cadru.prenume + "' data-pozitia='" + cadru.Pozitia + "' data-titlu='" + cadru.Titlu +"'><span class='glyphicon glyphicon-edit edit-button'></span></button></td>" +
        "<td>" +
        "<button type='button' " +
        "onclick='cadruDelete(this);' " +
        "class='btn btn-default' " +
        "data-id='" + cadru.id + "'>" +
        "<span class='glyphicon glyphicon-remove' />" +
        "</button>" +
        "</td>" +
        "</tr>";
    var table = "#cadreTable";
        $('.pagination').html('');
        var trnum = 0;
        var maxRows = 19;
        var totalRows = $("#cadreTable tbody tr").length;
        $('#cadreTable >tbody > tr').each(function () {
            trnum++;
            if (trnum > maxRows) {
                $($(this)).hide();
            }
            if (trnum <= maxRows) {
                $($(this)).show();
            }
        });
        if (totalRows > maxRows) {
            var pagenum = Math.ceil(totalRows / maxRows);
            for (var i = 1; i <= pagenum;) {
                $($('.pagination').append('<li data-page="' + i + '">\<span>' + i++ + '<span class="sr-only">(current)</span> </span>\</li>')).show();
            }
        }
        $($('.pagination li:first-child')).addClass('active')
        $($('.pagination li')).on('click', function () {
            var pageNum = $(this).attr('data-page');
            var trIndex = 0;
            $($('.pagination li')).removeClass('active');
            $($(this)).addClass('active');
            $('#cadreTable > tbody > tr').each(function () {
                trIndex++
                if (trIndex > (maxRows * pageNum) || trIndex <= ((maxRows * pageNum) - maxRows)) {
                    $($(this)).hide();
                } else {
                    $($(this)).show();

                }

            });
        });
    return ret;
}

$(document).ready(function () {
    cadreList();

    noBack();
    window.onload = noBack;
    window.onpageshow = function (evt) { if (evt.persisted) noBack() }
    window.onunload = function () { void (0) }
});

function noBack() {
    window.history.forward()
}

function cadruDelete(ctl) {
    var id = $(ctl).data("id");
    var id3 = sessionStorage.getItem("id3");
    var idd;
    var result = confirm("Doriti sa stergeti?");
    if (result) {
        if (idd = id3) {
            $.ajax({
                url: "/api/CadreDidactice2/" + id,
                type: 'DELETE',
                success: function (cadru) {
                    $(ctl).parents("tr").remove();

                    alert("Sters cu succes!");
                    window.location.reload();
                },
                error: function () {
                    alert("Nu s-a sters");
                }
            });
        }
    }

}

function cadruGet(ctl)
{
   $('#txtNume1').val($(ctl).data("nume"));
   $('#txtPren1').val($(ctl).data("prenume"));
   $('#selectedValue1').val($(ctl).data("pozitia"));
   $('#selectedTitlu1').val($(ctl).data("titlu"));
   $('#myModal1').modal();
   var id2 = sessionStorage.getItem("id2");
   var id3 = sessionStorage.getItem("id3");
   var idd;
   if (idd = id3) {
       $('#btnEdit').click(function () {
           var id = $(ctl).data("id");
           var x1 = $("#txtNume1").val();
           var y1 = $("#txtPren1").val();
           if ((x1.replace(/\s/g, "") == "") || (y1.replace(/\s/g, "") == "") || (/^[a-zA-Z0-9- ]*$/.test(x1) == false) || (/^[a-zA-Z0-9- ]*$/.test(y1) == false) ) {
               alert("Numele sau prenumele nu sunt corecte!");
           }
           else {
            var idPoz = selectPozitia1(this.value);
           var idTit = selectTitlu1(this.value);
           var cadru = { nume: $("#txtNume1").val(), prenume: $("#txtPren1").val(), Pozitia: idPoz, Titlu: idTit };
           $.ajax({
               url: '/api/CadreDidactice2/' + id,
               type: "PUT",
               contentType: 'application/json',
               data: JSON.stringify(cadru),
               success: function (response) {
                   if (status == "success")
                       sessionStorage.setItem('accesToken', response.access_token);
                   $("#txtNume1").val('');
                   $("#txtPren1").val('');
                   $('#selectedTitlu1').val('');
                   $('#selectedPozitia1').val('');
                   alert("Actualizat");
                   window.location.reload();
               },
               error: function (error) {
                   alert("Nu s-a actualizat. \n" + "Nu s-a facut nicio modificare!");
               }
           });
           
           }
           });
   }
}
