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


    var heatmapData = [];
    var heatmap;


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





                                    // for (var i = 0; i < results.features.length; i++) {
                                    //     var coords = results.features[i].geometry.coordinates;
                                    //     var latLng = new google.maps.LatLng(coords[1], coords[0]);
                                    //     heatmapData.push(latLng);
                                    // }
                                    // var coords = results.features[i].geometry.coordinates;
                                for (var i = 0; i < cities.length; i++) {
                                    if (cities[i]['id'] == cityId) {
                                        var latLng = new google.maps.LatLng(cities[i]['latitude'], cities[i]['longitude']);
                                    }

                                }

                                var weightedLoc = {
                                    location: latLng,
                                    weight: response['individualRisk']/(0.000001),
                                    typeOfRisk: typeOfRisk
                                };


                                for(var i = 0; i < heatmapData.length; i++){
                                    console.log("heatmapData[i]['location']: " +heatmapData[i]['location']);
                                    console.log("weightedLoc['location']: " +weightedLoc['location']);
                                    console.log("heatmapData[i]['typeOfRisk']: " + heatmapData[i]['typeOfRisk']);
                                    console.log("weightedLoc['typeOfRisk']: " + weightedLoc['typeOfRisk']);

                                    if ((heatmapData[i]['location']).toString() === (weightedLoc['location']).toString() &&
                                        (heatmapData[i]['typeOfRisk']).toString() === (weightedLoc['typeOfRisk']).toString()){
                                        console.log("DELETED: " +  heatmapData.splice(i, 1));
                                       // console.log("heatmapData: " + heatmapData[i]['location']);

                                    }
                                }


                                if ((typeof heatmap !== 'undefined' && heatmap !== null)) {
                                    // variable is undefined
                                    heatmap.setMap(null);
                                }

                                    heatmapData.push(weightedLoc);
                                        heatmap = new google.maps.visualization.HeatmapLayer({
                                        data: heatmapData,
                                        dissipating: false,
                                        radius: 1,
                                        opacity: 0.3,
                                        map: map
                                    });

                                var uluru = {lat: 49.11, lng: 34.044};
                                var marker = new google.maps.Marker({
                                    position: uluru,
                                    map: map,
                                    icon: {
                                        path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                                        strokeColor: "green",
                                        scale: 3
                                    }
                                });



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


   // function initMap() {} // now it IS a function and it is in global





});

var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 6,
        center: {lat: 48.865427, lng: 34.196123},
       // mapTypeId: 'terrain'
        //mapTypeId: 'satellite'
    });


    // // Create a <script> tag and set the USGS URL as the source.
    // var script = document.createElement('script');
    //
    // // This example uses a local copy of the GeoJSON stored at
    // // http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojsonp
    // script.src = 'https://developers.google.com/maps/documentation/javascript/examples/json/earthquake_GeoJSONP.js';
    // document.getElementsByTagName('head')[0].appendChild(script);

}






