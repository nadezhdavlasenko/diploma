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
        minSpareRows: 1
    });

})