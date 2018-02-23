$(document).ready(function(){

    var cities;
    var typesOfRisk;
    var radionuclides;

    $.ajax({
        url: "http://localhost:8080/city",
        type: "GET",
        dataType: "json",
        error: function (response) {
            alert(response.responseText);
        },
        success: function (response) {
            console.log(response[1]['name']);
            cities = response;
        }
    });

    $.ajax({
        url: "http://localhost:8080/typeofrisk",
        type: "GET",
        dataType: "json",
        error: function (response) {
            alert(response.responseText);
        },
        success: function (response) {
            console.log(response[0]['type']);
            typesOfRisk = response;
        }
    });

    $.ajax({
        url: "http://localhost:8080/radionuclide",
        type: "GET",
        dataType: "json",
        error: function (response) {
            alert(response.responseText);
        },
        success: function (response) {
            console.log(response[0]['name']);
            radionuclides = response;
        }
    });





    var data = [
         [ "Киев", "Вдыхание воздуха", "Cs-137", "1","","","","",""],
        // ["2017", 10, 11, 12, 13],
        // ["2018", 20, 11, 14, 13],
        // ["2019", 30, 15, 12, 13]
    ];

    var container = document.getElementById('myTable');
    $.when($.ajax('http://localhost:8080/city'), $.ajax('http://localhost:8080/typeofrisk'), $.ajax('http://localhost:8080/radionuclide') ).done(function() {
        console.log("Loaded!");
        var hot = new Handsontable(container, {
            data: data,
            colHeaders: ['Город', 'Види ризику', 'Найменування радіонукліда', 'Питома активність радіонукліда',
                'Ефективна доза, Зв', 'Індивідуальний ризик, осіб', 'Колективна доза, людЗв', 'Колективний радіаційний ризик, осіб',
                'Збиток, у.о.'],
            dataSchema: {city: 'Киев', typeOfRisk: 'Вдыхание воздуха', radionuclide: 'Cs-137', specialActivity:'1', q:'', w:'', e:'', r:'', t:''},
            rowHeaders: true,
            columns: [
                {
                    //data: 'city',
                    type: 'dropdown',

                    source: cities.map(function(value,index) { return value['name']; })

                },
                {
                    type: 'dropdown',
                    //data: 'typeOfRisk',
                    source: typesOfRisk.map(function(value,index) { return value['type']; })
                },
                {
                    type: 'dropdown',
                    //data: 'radionuclide',
                    source: radionuclides.map(function(value,index) { return value['name']; })
                },
                {
                   // data: 'specialActivity'
                },
                {

                    editor: false},
                {

                    editor: false},
                {

                    editor: false},
                {

                    editor: false},
                {

                    editor: false}
            ],
            filters: false,
            dropdownMenu: true,
            minSpareRows: 1,
            afterChange: function (changes, source) {
                if (arguments[1] != "loadData") {

                    if (!changes || changes[0][1] > 3) {
                        return;
                    }

                    console.log(changes[0][1]);

                    changedRowStartingZero = changes[0][0];
                    changedRow = changedRowStartingZero;

                    console.log(changes);

                    var currentRow = changedRow;


                    var city = hot.getDataAtCell(currentRow, 0);
                    var typeOfRisk = hot.getDataAtCell(currentRow, 1);
                    var radionuclide = hot.getDataAtCell(currentRow, 2);
                    var specialActivity = hot.getDataAtCell(currentRow, 3);

                    if (city != null && typeOfRisk != null && radionuclide != null && specialActivity !=null) {


                        var cityId;
                        var typeOfRiskId;
                        var radionuclideId;

                        for (var i = 0; i < cities.length; i++) {
                            if (cities[i]['name'] == city) cityId = cities[i]['id'];

                        }

                        for (var i = 0; i < typesOfRisk.length; i++) {

                            if (typesOfRisk[i]['type'] == typeOfRisk) typeOfRiskId = typesOfRisk[i]['id'];

                        }

                        for (var i = 0; i < radionuclides.length; i++) {

                            if (radionuclides[i]['name'] == radionuclide) radionuclideId = radionuclides[i]['id'];
                        }
                        console.log("cityId:" + cityId + "///" + "type:" + typeOfRiskId + "///" + "radionuclideId:" + radionuclideId);


                        // var cityId = cities.map(function(value,index) { return value['id']; });
                        // alert(cities.indexOf(cities.indexOf(city),'id'));
                        //alert(cityId);

                        var calculateRiskRequestData = [cityId, typeOfRiskId, radionuclideId, specialActivity];
                        var riskCalculationResultData;

                        $.ajax({
                            url: "http://localhost:8080/riskAssessment/calculate",
                            type: "GET",
                            data: {
                                cityId: cityId,
                                riskTypeId: typeOfRiskId,
                                radionuclideId: radionuclideId,
                                specificRadionuclideActivity: specialActivity
                            },
                            // dataType: "json",
                            error: function (response) {
                                alert(response.responseText);
                            },
                            success: function (response) {
                                console.log(response);
                                //riskCalculationResultData = response;
                                hot.setDataAtCell(currentRow, 4, response['effectiveDosage']);
                                hot.setDataAtCell(currentRow, 5, response['individualRisk']);
                                hot.setDataAtCell(currentRow, 6, response['collectiveDosage']);
                                hot.setDataAtCell(currentRow, 7, response['collectiveRadiationRisk']);
                                hot.setDataAtCell(currentRow, 8, response['damageCost']);



                            }
                        });


                    //     jQuery.ajax({
                    //         url: 'http://localhost:8080/riskAssessment/calculate', //Controller to Get the
                    //         //JsonResult From -- Json(jsonData, JsonRequestBehavior.AllowGet);
                    //         type: "GET",
                    //         data: calculateRiskRequestData,
                    //         //dataType: "json",
                    //         contentType: 'application/json; charset=utf-8', // dataType and contentType should be json
                    //         // async: true,
                    //         // processData: false,
                    //         // cache: false,
                    //         success: function (data) {      // on Success send the Json data
                    //         // to the table by using loaddata function""
                    //         //alert(data);
                    //         // hot.loadData(data);
                    //         // exampleConsole.innerHTML = 'Data loaded';
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
                    // $.when($.ajax('http://localhost:8080/riskAssessment/calculate') ).done(function() {
                    //     hot.setDataAtCell(currentRow, 4, riskCalculationResultData[0]['effectiveDosage']);
                    // });

                    }
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



});

