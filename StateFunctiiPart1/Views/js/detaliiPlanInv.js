$('#btnLogout').click(function () {

    sessionStorage.removeItem('accesToken');
    window.location.href = "Login.html"

});

function search() {

    var input, filter, table, tr, td, td2, td3, td4, td5, td6, td7, td8, td9, td10, td11, td12, td13, td14, td15, td16, td17, i;
    input = document.getElementById("searchbar");
    filter = input.value.toUpperCase();
    table = document.getElementById("detaliiTable");
    tr = table.getElementsByTagName("tr");


    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
        td2 = tr[i].getElementsByTagName("td")[2];
        td3 = tr[i].getElementsByTagName("td")[3];
        td4 = tr[i].getElementsByTagName("td")[4];
        td5 = tr[i].getElementsByTagName("td")[5];
        td6 = tr[i].getElementsByTagName("td")[6];
        td7 = tr[i].getElementsByTagName("td")[7];
        td8 = tr[i].getElementsByTagName("td")[8];
        td9 = tr[i].getElementsByTagName("td")[9];
        td10 = tr[i].getElementsByTagName("td")[10];
        td11 = tr[i].getElementsByTagName("td")[11];
        td12 = tr[i].getElementsByTagName("td")[12];
        td13 = tr[i].getElementsByTagName("td")[13];
        td14 = tr[i].getElementsByTagName("td")[14];
        td15 = tr[i].getElementsByTagName("td")[15];
        td16 = tr[i].getElementsByTagName("td")[16];
        td17 = tr[i].getElementsByTagName("td")[17];
        if (td) {
            if ((td.innerHTML.toUpperCase().indexOf(filter) > -1) || (td2.innerHTML.toUpperCase().indexOf(filter) > -1) ||
                (td3.innerHTML.toUpperCase().indexOf(filter) > -1) || (td4.innerHTML.toUpperCase().indexOf(filter) > -1) ||
                (td5.innerHTML.toUpperCase().indexOf(filter) > -1) || (td6.innerHTML.toUpperCase().indexOf(filter) > -1) ||
                (td7.innerHTML.toUpperCase().indexOf(filter) > -1) || (td8.innerHTML.toUpperCase().indexOf(filter) > -1) ||
                (td9.innerHTML.toUpperCase().indexOf(filter) > -1) || (td10.innerHTML.toUpperCase().indexOf(filter) > -1) ||
                (td11.innerHTML.toUpperCase().indexOf(filter) > -1) || (td12.innerHTML.toUpperCase().indexOf(filter) > -1) ||
                (td13.innerHTML.toUpperCase().indexOf(filter) > -1) || (td14.innerHTML.toUpperCase().indexOf(filter) > -1) ||
                (td15.innerHTML.toUpperCase().indexOf(filter) > -1) || (td16.innerHTML.toUpperCase().indexOf(filter) > -1) ||
                (td17.innerHTML.toUpperCase().indexOf(filter) > -1)) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}


function detaliiList() {

    var id;
    var id1 = sessionStorage.getItem("id1");
    if (id = id1) {
        $.ajax({
            url: '/api/DetaliiPlanInv/' + id1,
            type: 'GET',
            dataType: 'json',
            success: function (response) {
                detaliiListSuccess(response);
                //alert(id);
            },
            error: function () {
                alert("Detaliile planurilor de invatamant nu pot fi obtinute!!");
            }
        });
    }
}

function detaliiListSuccess(response) {

    $.each(response, function (index, detaliu) {

        detaliuAddRow(detaliu);
    });
}
function detaliuAddRow(detaliu) {

    if ($("#detaliiTable tbody").length == 0) {
        $("#detaliiTable").append("<tbody></tbody>");
    }

    $("#detaliiTable tbody").append(
        detaliuBuildTableRow(detaliu));
}
function detaliuBuildTableRow(detaliu) {
    var ret = "<tr>" +
        "<td>" + detaliu.id + "</td>" +
        "<td>" + detaliu.cod + "</td>" +
        "<td>" + detaliu.formainv + "</td>" +
        "<td>" + detaliu.an + "</td>" +
        "<td>" + detaliu.semestru + "</td>" +
        "<td>" + detaliu.tipdiscip + "</td>" +
        "<td>" + detaliu.cod_disc + "</td>" +
        "<td>" + detaliu.limbapred + "</td>" +
        "<td>" + detaliu.formapred + "</td>" +
        "<td>" + detaliu.numarore + "</td>" +
        "<td>" + detaliu.tipunitst + "</td>" +
        "<td>" + detaliu.ordine + "</td>" +
        "<td>" + detaliu.catedra + "</td>" +
        "<td>" + detaliu.CicluStudii + "</td>" +
        "<td>" + detaliu.TipDisciplina + "</td>" +
        "<td>" + detaliu.LimbaPredare + "</td>" +
        "<td>" + detaliu.CSLP + "</td>" +
        "<td>" + detaliu.FormaStudiu + "</td>" +
        "<td>" +
        "</tr>";
   /* $('.pagination').html('');
    var trnum = 0;
    var maxRows = 19;
    var totalRows = $("#detaliiTable tbody tr").length;
    $('#detaliiTable >tbody > tr').each(function () {
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
        $('#detaliiTable > tbody > tr').each(function () {
            trIndex++
            if (trIndex > (maxRows * pageNum) || trIndex <= ((maxRows * pageNum) - maxRows)) {
                $($(this)).hide();
            } else {
                $($(this)).show();

            }

        });
    });*/
    return ret;
}

$(document).ready(function () {

    detaliiList();

    noBack();
    window.onload = noBack;
    window.onpageshow = function (evt) { if (evt.persisted) noBack() }
    window.onunload = function () { void (0) }
});

function noBack() {
    window.history.forward()
}


