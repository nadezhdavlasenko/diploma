$(document).ready(function(){
    var symptoms = new Map();
    symptoms.set("тошнота, рвота", 1);
    symptoms.set("головная боль", 2);
    symptoms.set("слабость, усталость", 1);
    symptoms.set("жар", 2);
    symptoms.set("сыпь, кровоточение, инфекции", 2);
    symptoms.set("диарея", 6);
    symptoms.set("лейкопения", 6);
    symptoms.set("смерть", 8);
    var dosages = [1,2,1,2,2,6,6,8];



     $( "form" ).submit(function( event ) {
        //var dosage = document.getElementById('dosage');
         var dosage = $("input:first").val();

            if (dosage >= 1 && dosage< 2) {

                $("span").text("Костномозговая форма лучевой болезни\n" +
                    "\n" +
                    "Лёгкая форма (I степень) — прогноз абсолютно благоприятный.").show();
            } else if(dosage >= 2 && dosage < 4){
                $("span").text("Костномозговая форма лучевой болезни\n" +
                    "\n" +
                    "Форма средней тяжести (II степень) — прогноз относительно благоприятный.").show();
            } else if (dosage >=4 && dosage < 6){
                $("span").text("Костномозговая форма лучевой болезни\n" +
                    "\n" +
                    "Тяжёлая форма (III степень) лучевой болезни — прогноз сомнительный").show();
            } else if (dosage >= 6 && dosage < 10){
                $("span").text("Костномозговая форма лучевой болезни\n" +
                    "\n" +
                    "Крайне тяжёлая (смертельная) форма (IV степень) лучевой болезни — прогноз неблагоприятный.").show();
            } else if (dosage >= 10 && dosage <20){
                $("span").text("Кишечная форма лучевой болезни - прогноз абсолютно неблагоприятный. Изменения в кишечнике приводят к смерти в течение нескольких дней (обычно на 10—14-е сутки), до развития глубоких нарушений в органах кроветворения.").show();
            } else if (dosage >= 20 && dosage < 80){
                $("span").text("Токсемическая (сосудистая) форма лучевой болезни - прогноз абсолютно неблагоприятный.").show();

            } else if (dosage >= 80){
                $("span").text("Церебральная форма лучевой болезни - прогноз абсолютно неблагоприятный.").show();

            }


         var chances = [];
                $("#symptoms").find("tr").each(function(i){
                    chances.push(dosage/dosages[i]);
                    $(this).find("td:eq(1)").html(dosage/dosages[i]);

                });


         event.preventDefault();

     });


    var ctx = document.getElementById("myChart").getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["тошнота, рвота", "головная боль", "слабость, усталость", "жар", "сыпь, кровоточение, инфекции", "диарея", "лейкопения", "смерть"],
            datasets: [{
                label: 'Доза, при которых возникает симптом лучевой болезни',
                data: dosages,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }



    });

});

function getSymptom() {
     var dosage = document.getElementById('dosage');

    console.log(dosage);
    alert(dosage);

}


// function addData(chart, label, data) {
//     chart.data.labels.push(label);
//     chart.data.datasets.forEach((dataset) => {
//         dataset.data.push(data);
// });
//     chart.update();
// }
//
// function removeData(chart) {
//     chart.data.labels.pop();
//     chart.data.datasets.forEach((dataset) => {
//         dataset.data.pop();
// });
//     chart.update();
// }