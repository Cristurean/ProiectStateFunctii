$('#btnLogout').click(function () {
    sessionStorage.removeItem('accesToken');
    window.location.href = "Login.html"
});
function noBack() {
    window.history.forward()
}
function search() {

    var input, filter, table, tr, td, td2, td3, td4, i;
    input = document.getElementById("searchbar");
    filter = input.value.toUpperCase();
    table = document.getElementById("grupeTable");
    tr = table.getElementsByTagName("tr");


    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
        td2 = tr[i].getElementsByTagName("td")[2];
        td3 = tr[i].getElementsByTagName("td")[3];
        td4 = tr[i].getElementsByTagName("td")[4];
        if (td) {
            if ((td.innerHTML.toUpperCase().indexOf(filter) > -1) || (td2.innerHTML.toUpperCase().indexOf(filter) > -1) ||
                (td3.innerHTML.toUpperCase().indexOf(filter) > -1) || (td4.innerHTML.toUpperCase().indexOf(filter) > -1)) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}
$("#in1").append(function () {
    var options, idd;
    var id1 = sessionStorage.getItem("id1");
    $.ajax({
        url: '/api/CodPi/' + id1,
        type: 'GET',
        dataType: 'json',
        success: function (response) {
            options = ' <option selected="selected">' + "Select code" + '</option>';
            for (var i = 0; i < response.length; i++) {
                options += '<option value="' + response[i] + '">' + response[i] + '</option>';
            }
            $("#in1").html(options);

        },
        error: function () {
            alert("Valorile codurilor planurilor de invatamant nu pot fi obtinute");
        }
    });
});

$("#in2").append(function () {
    var options1;
    var id1 = sessionStorage.getItem("id1");
    $.ajax({
        url: '/api/An/' + id1,
        type: 'GET',
        dataType: 'json',
        success: function (response) {
            options1 = ' <option selected="selected">' + "Select year" + '</option>';
            for (var i = 0; i < response.length; i++) {
                options1 += '<option value="' + response[i] + '">' + response[i] + '</option>';
            }
            $("#in2").html(options1);

        },
        error: function () {
            alert("Valorile anilor nu pot fi obtinute!");
        }
    });
});
$("#mod1").append(function () {
    var op, idd;
    var id1 = sessionStorage.getItem("id1");
    $.ajax({
        url: '/api/CodPi/' + id1,
        type: 'GET',
        dataType: 'json',
        success: function (response) {
            for (var i = 0; i < response.length; i++) {
                op += '<option value="' + response[i] + '">' + response[i] + '</option>';
            }
            $("#mod1").html(op);

        },
        error: function () {
            alert("Id-ul codului planului de invatamant nu poate fi obtinut!");
        }
    });
});

$("#mod2").append(function () {
    var op1;
    var id1 = sessionStorage.getItem("id1");
    $.ajax({
        url: '/api/An/' + id1,
        type: 'GET',
        dataType: 'json',
        success: function (response) {
            for (var i = 0; i < response.length; i++) {
                op1 += '<option value="' + response[i] + '">' + response[i] + '</option>';
            }
            $("#mod2").html(op1);

        },
        error: function () {
            alert("Valorile anilor nu pot fi obtinute!");
        }
    });
});
function selectCod1(value) {
    value = $("#mod1 option:selected").text();
    var result2 = value;
    return result2;
}

//var result1;
function selectAn1(value) {
    value = $("#mod2 option:selected").text();
    var result3;
    $.ajax({
        url: '/api/An?an=' + value,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            result3 = data;
        },
        error: function () {
            alert("Valoare unui anumit an nu este obtinuta!");
        }
    });
    alert("Actualizare An");
    return result3;
}
var result;
function selectCod(value) { result = value; }

var result1;
function selectAn(value) {
    $.ajax({
        url: '/api/An?an=' + value,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            result1 = data;
        },
        error: function () {
            alert("Valoare unui anumit an nu este obtinuta!");
        }
    });
}

function grupeList() {

    var id;
    var id1 = sessionStorage.getItem("id1");
    if (id = id1) {
        $.ajax({
            url: '/api/CrudGrupeAn/' + id1,
            type: 'GET',
            dataType: 'json',
            success: function (response) {
                grupeListSuccess(response);
                //alert(id);
            },
            error: function () {
                alert("Grupele facultatii nu pot fi obtinute!");
            }
        });
    }
}

function grupeListSuccess(response) {

    $.each(response, function (index, grupa) {
 
        grupaAddRow(grupa);
    });
}
function grupaAddRow(grupa) {
   
    if ($("#grupeTable tbody").length == 0) {
        $("#grupeTable").append("<tbody></tbody>");
    }

    $("#grupeTable tbody").append(
        grupaBuildTableRow(grupa));
}
function grupaBuildTableRow(grupa) {
    var ret = "<tr>" +
        "<td>" + grupa.id + "</td>" +
        "<td>" + grupa.cod_pi + "</td>" +
        "<td>" + grupa.An + "</td>" +
        "<td>" + grupa.nr_grupe + "</td>" +
        "<td>" + grupa.nr_subgr + "</td>" +
        "<td>" + grupa.Facultate + "</td>" +
        "<td>" +
        "<button type='button'" +
        "onclick='grupaGet(this);'" +
        "data-target='#myModal1'" +
        "data-toggle='modal'"+
        "data-id='" + grupa.id + "'" +
        "data-cod='" + grupa.cod_pi + "'" +
        "data-an='" + grupa.An + "'" +
        "data-nrg='" + grupa.nr_grupe + "'" +
        "data-nrsg='" + grupa.nr_subgr + "'" +
        "<span class='glyphicon glyphicon-edit edit-button'></span>" +
        "</button>" +
        "</td>"+
        "<td>" +
        "<button type='button'" +
        "onclick='grupaDelete(this);'" +
        "class='btn btn-default' " +
        "data-id='" + grupa.id+ "'>" +
        "<span class='glyphicon glyphicon-remove' />" +
        "</button>" +
        "<td>"+
        "</tr>"; 
    $('.pagination').html('');
    var trnum = 0;
    var maxRows = 19;
    var totalRows = $("#grupeTable tbody tr").length;
    $('#grupeTable >tbody > tr').each(function () {
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
        $('#grupeTable > tbody > tr').each(function () {
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
    grupeList();
    noBack();
    window.onload = noBack;
    window.onpageshow = function (evt) { if (evt.persisted) noBack() }
    window.onunload = function () { void (0) }
});
    
//});

function grupaDelete(ctl) {
    var id = $(ctl).data("id");
    var result = confirm("Doriti sa stergeti?");
    if (result) {
        $.ajax({
            url: "/api/CrudGrupeAn/" + id,
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
$('#btnSave').click(function () {
    var id1 = sessionStorage.getItem("id1");
    var nr_gr = $('#txtNrg').val();
    var nr_subgr = $('#txtNrsg').val();
    var number1 = Number(nr_gr);
    var number2 = Number(nr_subgr);
    if (number1 > 30 || number1 < 1 || !number1 || !number2)
    {
        alert("Numerele introduse nu sunt corecte.\n" + "Atentie! Numarul de grupe trebuie sa fie cuprins intre 1 si 30!");
    }
    else
    {
        var cadru = { cod_pi: result, An: result1, nr_grupe: number1, nr_subgr: $('#txtNrsg').val(), Facultate: id1 };
        $.ajax({
            url: '/api/CrudGrupeAn',
            type: "POST",
            contentType: 'application/json',
            data:
            JSON.stringify(cadru),
            success: function (response) {
                if (status == "success")
                    sessionStorage.setItem('accesToken', response.access_token);
                $('#txtCod').val('');
                $('#txtAn').val('');
                $('#txtNrg').val('');
                $('#txtNrsg').val('');

                alert("Inserat");
                window.location.reload();
            },
            error: function (error) {
                alert("Nu s-a inserat.\n" + "Inregistrarea exista deja.\n" + "Faceti o alta introducere sau editati inregistrarea existenta!");
            }
        });
    }
});


 
function grupaGet(ctl) {

    var cod = $('#mod1').val($(ctl).data("cod"));
    console.log(cod);
    var an = $('#mod2').val($(ctl).data("an"));
    var nrgr = $('#txtNr1').val($(ctl).data("nrg"));
    var nrsgr = $('#txtNr_sub1').val($(ctl).data("nrsg"));

    $('#btnEdit').click(function () {

        var id = $(ctl).data("id");
        var x = $('#txtNr1').val();
        var y = $('#txtNr_sub1').val();
        var u = Number(x);
        var v = Number(y);


        if (!u || u < 1 || u > 30 || !v) {
            alert("Numerele introduse nu sunt corecte.\n" + "Atentie! Numarul de grupe trebuie sa fie cuprins intre 1 si 30!");
        } else {
            var res1 =selectCod1(this.value);
            var res2 = selectAn1(this.value);
            var grupa = { cod_pi:res1, an: res2, nr_grupe: $("#txtNr1").val(), nr_subgr: $("#txtNr_sub1").val() };
            $.ajax({
                url: '/api/CrudGrupeAn/' + id,
                type: "PUT",
                contentType: 'application/json',
                data: JSON.stringify(grupa),
                success: function (response) {
                    if (status == "success")
                        sessionStorage.setItem('accesToken', response.access_token);
                    $("#txtCod1").val('');
                    $("#txtAn1").val('');
                    $("#txtNr1").val('');
                    $("#txtNr_sub1").val('');

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
