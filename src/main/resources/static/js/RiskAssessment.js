$(document).ready(function(){
    var data = [
        [ "Киев", "Вода", "Cs-137", "90","","","","",""],
        ["2017", 10, 11, 12, 13],
        ["2018", 20, 11, 14, 13],
        ["2019", 30, 15, 12, 13]
    ];

    var container = document.getElementById('myTable');
    var hot = new Handsontable(container, {
        data: data,
        colHeaders: ['Город', 'Види ризику', 'Найменування радіонукліда', 'Питома активність радіонукліда',
            'Ефективна доза, Зв', 'Індивідуальний ризик, осіб', 'Колективна доза, людЗв', 'Колективний радіаційний ризик, осіб',
            'Збиток, у.о.'],
        rowHeaders: true,
        filters: true,
        dropdownMenu: true,
        minSpareRows: 1,
        afterChange: function( changes, source ) {

            if (arguments[1] != "loadData") {

                if (!changes) {
                    return;
                }

                changedRowStartingZero = changes[0][0];
                changedRow = changedRowStartingZero;

                console.log(changes);

                var currentRow = changedRow;


                var city = hot.getDataAtCell(currentRow, 0);
                var typeOfRisk = hot.getDataAtCell(currentRow, 1);
                var radionuclide = hot.getDataAtCell(currentRow, 2);
                var spesialActivity = hot.getDataAtCell(currentRow, 3);

            //     jQuery.ajax({
            //         url: '/riskAssessment/calculate', //Controller to Get the
            //         //JsonResult From -- Json(jsonData, JsonRequestBehavior.AllowGet);
            //         type: "GET",
            //         dataType: "json",
            //         contentType: 'application/json; charset=utf-8', // dataType and contentType should be json
            //         async: true,
            //         processData: false,
            //         cache: false,
            //         success: function (data) {      // on Success send the Json data
            //         // to the table by using loaddata function""
            //         //alert(data);
            //         hot.loadData(data);
            //         exampleConsole.innerHTML = 'Data loaded';
            //     },
            //     error: function (xhr) {
            //         alert('error');
            //     }
            // })

                // var totalCost = netTrade + deliveryCost + fees;
                // var netProfit = net - totalCost;
                // var percentProfit = netProfit / net;
                //
                //
                // hot.setDataAtCell(currentRow, 12, totalCost);
                //
                //
                // hot.setDataAtCell(currentRow, 13, netProfit);
                //
                //
                // hot.setDataAtCell(currentRow, 14, percentProfit);

            }
        }
    });



});

