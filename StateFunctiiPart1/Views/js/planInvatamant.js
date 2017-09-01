 $('#btnLogout').click(function () {
        sessionStorage.removeItem('accesToken');
        window.location.href = "Login.html";
});

function search() {

    var input, filter, table, tr, td, td2, td3, td4, td5, td6, td8, i;
    input = document.getElementById("searchbar");
    filter = input.value.toUpperCase();
    table = document.getElementById("planuriTable");
    tr = table.getElementsByTagName("tr");


    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        td2 = tr[i].getElementsByTagName("td")[1];
        td3 = tr[i].getElementsByTagName("td")[2];
        td4 = tr[i].getElementsByTagName("td")[3];
        td5 = tr[i].getElementsByTagName("td")[4];
        td6 = tr[i].getElementsByTagName("td")[5];
        td8 = tr[i].getElementsByTagName("td")[7];
        if (td) {
            if ((td.innerHTML.toUpperCase().indexOf(filter) > -1) || (td2.innerHTML.toUpperCase().indexOf(filter) > -1) ||
                (td3.innerHTML.toUpperCase().indexOf(filter) > -1) || (td4.innerHTML.toUpperCase().indexOf(filter) > -1)
                || (td5.innerHTML.toUpperCase().indexOf(filter) > -1) || (td6.innerHTML.toUpperCase().indexOf(filter) > -1)
                || (td8.innerHTML.toUpperCase().indexOf(filter) > -1)) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}
function planuriList() {

    var id;
    var id1 = sessionStorage.getItem("id1");
    if (id = id1) {
        $.ajax({
            url: '/api/PlanInvatamant/' + id1,
            type: 'GET',
            dataType: 'json',
            success: function (response) {
                planuriListSuccess(response);
                //alert(id);
            },
            error: function () {
                alert("Planurile de invatamant nu pot fi obtinute");
            }
        });
    }
}
function planuriListSuccess(response) {

    $.each(response, function (index, plan) {

        planAddRow(plan);
    });
}
function planAddRow(plan) {

    if ($("#planuriTable tbody").length == 0) {
        $("#planuriTable").append("<tbody></tbody>");
    }

    $("#planuriTable tbody").append(
        planBuildTableRow(plan));
}
function planBuildTableRow(plan) {
    var ret = "<tr>" +
        "<td>" + plan.unitpos + "</td>" +
        "<td>" + plan.cod + "</td>" +
        "<td>" + plan.sectiune + "</td>" +
        "<td>" + plan.unitform + "</td>" +
        "<td>" +plan.secom+"</td>" +
        "<td>" + plan.nume + "</td>" +
        "<td>" + plan.Facultate + "</td>" +
        "<td>" + plan.Scurt + "</td>" +
        "</tr>";

    var table = "#planuriTable";
    //$('#maxRows').on('change', function () {
        $('.pagination').html('');
        var trnum = 0;
        //var maxRows = parseInt($(this).val());
        var maxRows = 19;
        var totalRows = $("#planuriTable tbody tr").length;
        $('#planuriTable >tbody > tr').each(function () {
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
            console.log(pagenum);
            for (var i = 1; i <= pagenum;) {
                $('.pagination').append('<li data-page="' + i + '">\<span>' + i++ + '<span class="sr-only">(current)</span> </span>\</li>').show();
            }
        }
        $($('.pagination li:first-child')).addClass('active')
        $($('.pagination li')).on('click', function () {
            var pageNum = $(this).attr('data-page');
            var trIndex = 0;
            $($('.pagination li')).removeClass('active');
            $($(this)).addClass('active');
            $('#planuriTable > tbody > tr').each(function () {
                trIndex++
                if (trIndex > (maxRows * pageNum) || trIndex <= ((maxRows * pageNum) - maxRows)) {
                    $($(this)).hide();
                } else {
                    $($(this)).show();

                }

            });
        });
    //});
    return ret;
}

$(document).ready(function () {
    planuriList();

    noBack();
    window.onload = noBack;
    window.onpageshow = function (evt) { if (evt.persisted) noBack() }
    window.onunload = function () { void (0) }
});

function noBack() {
    window.history.forward();
}