$(function () {

  /* Initial chart */
  var ctx = document.getElementById("myChart").getContext("2d");
  var myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: [],
      datasets: [
        {
          label: "Active",
          data: [],
          borderColor: "#fda866",
          backgroundColor: "#fda866",
        },
        {
          label: "Confirmed",
          data: [],
          borderColor: "#e3c138",
          backgroundColor: "#e3c138",
        },
        {
          label: "Recovered",
          data: [],
          borderColor: "#08771b",
          backgroundColor: "#08771b",
        },
        {
          label: "Deaths",
          data: [],
          borderColor: "#ec0f16",
          backgroundColor: "#ec0f16",
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: "Cases by Month",
        fontSize: 20,
        fontColor: "#151413",
        padding: 20,
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              callback: function (value, index, values) {
                return `${value.toLocaleString("en")} ppl.`;
              },
            },
          },
        ],
        xAxes: [
          {
            gridLines: {
              display: false,
            },
          },
        ],
      },
      elements: {
        line: {
          fill: false,
        },
      },
      tooltips: {
        xPadding: 10,
        yPadding: 10,
        bodySpacing: 20,
        mode: "x",
        callbacks: {
          label: function (tooltipItem, data) {
            return `${parseInt(
              data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]
            ).toLocaleString()} ppl.`;
          },
        },
      },
    },
  });

  /* Countries Ajax pettition */
  $.ajax({
    url: "https://api.covid19api.com/countries",
    type: "GET",
    data: {},
    beforeSend: () => {
      $(".initialOption").text("Loadin..");
    },
    success: (data) => {
      $(".initialOption").text("Choose...");


      /*  */
      let countries = {};
      data.forEach((element) => {
        countries[element.Country] = element.Slug;
      });

      const key = Object.keys(countries).sort();

      key.forEach((element) => {
        $("#inputGroupSelect01").append(
          `<option value="${countries[element]}">${element}</option>`
        );
      });
    },
    error: (jqXHR, textStatus, errorThrown) => {
      $(".initialOption").text("ERROR");
    },
  });

  /* change select listener */
  $(".custom-select").on("change", () => {
    console.log("listener change working");
    /* data display ajax petition */

    if ($("#inputGroupSelect01 :selected").val() == "Choose...") return;

    $.ajax({
      url: `https://api.covid19api.com/dayone/country/${$(
        "#inputGroupSelect01 :selected"
      ).val()}`,
      type: "GET",
      data: {},
      beforeSend: () => {},
      complete: () => {},

      success: (data) => {
        console.log("data: ", data);

        /* desktop data display */

        console.log("window width", $(window).width());

        if (data.length == 0) {
          console.log("data == 0");

          $(".errorTitle").text(
            `There is no data for ${$("#inputGroupSelect01 :selected").text()}`
          );

          $("#myChart").removeClass("d-md-block");

          $(".errorRow").show();
        } else if (!$("#myChart").hasClass("d-md-block")) {
          $("#myChart").addClass("d-md-block");
          $(".errorRow").hide();
        }
        const dataPerMonth = {};

        data.forEach((element) => {
          if (dataPerMonth[element.Date.slice(0, 7)]) {
            dataPerMonth[element.Date.slice(0, 7)].Active += element.Active;
            dataPerMonth[element.Date.slice(0, 7)].Deaths += element.Deaths;
            dataPerMonth[element.Date.slice(0, 7)].Confirmed +=
              element.Confirmed;
            dataPerMonth[element.Date.slice(0, 7)].Recovered +=
              element.Recovered;
          } else {
            dataPerMonth[element.Date.slice(0, 7)] = {
              Date: element.Date.slice(0, 4),
              Active: element.Active,
              Deaths: element.Deaths,
              Confirmed: element.Confirmed,
              Recovered: element.Recovered,
            };
          }
        });

        if (myChart.data.labels.length > 0) {
          myChart.data.labels = [];

          myChart.data.datasets[0].data = [];
          myChart.data.datasets[1].data = [];
          myChart.data.datasets[2].data = [];
          myChart.data.datasets[3].data = [];
        }

        function pushData(item) {
          myChart.data.datasets[0].data.push(dataPerMonth[item].Active);
          myChart.data.datasets[1].data.push(dataPerMonth[item].Confirmed);
          myChart.data.datasets[2].data.push(dataPerMonth[item].Recovered);
          myChart.data.datasets[3].data.push(dataPerMonth[item].Deaths);
          myChart.update();
        }

        Object.keys(dataPerMonth).forEach((element) => {
          console.log("chart lables: ", myChart.data.labels);

          switch (element.slice(5, 7)) {
            case "01":
              myChart.data.labels.push(`Jan - ${dataPerMonth[element].Date}`);
              pushData(element);
              break;
            case "02":
              myChart.data.labels.push(`Feb - ${dataPerMonth[element].Date}`);
              pushData(element);
              break;
            case "03":
              myChart.data.labels.push(`Mar - ${dataPerMonth[element].Date}`);
              pushData(element);
              break;
            case "04":
              myChart.data.labels.push(`Apr - ${dataPerMonth[element].Date}`);
              pushData(element);
              break;
            case "05":
              console.log("dias");
              myChart.data.labels.push(`May - ${dataPerMonth[element].Date}`);
              pushData(element);
              break;
            case "06":
              myChart.data.labels.push(`Jun - ${dataPerMonth[element].Date}`);
              pushData(element);
              break;
            case "07":
              myChart.data.labels.push(`Jul - ${dataPerMonth[element].Date}`);
              pushData(element);
              break;
            case "08":
              myChart.data.labels.push(`Aug - ${dataPerMonth[element].Date}`);
              pushData(element);
              break;
            case "09":
              myChart.data.labels.push(`Sept - ${dataPerMonth[element].Date}`);
              pushData(element);
              break;
            case "10":
              myChart.data.labels.push(`Oct - ${dataPerMonth[element].Date}`);
              pushData(element);
              break;
            case "11":
              myChart.data.labels.push(`Nov - ${dataPerMonth[element].Date}`);
              pushData(element);
              break;
            case "12":
              myChart.data.labels.push(`Dec - ${dataPerMonth[element].Date}`);
              pushData(element);
              break;
          }

          console.log(dataPerMonth);
        });

        /* mobile view */

        console.log(
          "last element",
          data[data.length - 1].Date.slice(0, 10).replace(/-/g, "/")
        );

        $(".dataDate").text(
          data[data.length - 1].Date.slice(0, 10).replace(/-/g, "/")
        );

        const totalCasesByMonth = {};

        data.forEach((element) => {
          if (totalCasesByMonth.Deaths) {
            totalCasesByMonth["Deaths"] += element.Deaths;
            console.log(typeof element.Deaths, "muertes: ", element.Deaths);
            totalCasesByMonth["Confirmed"] += element.Confirmed;
            totalCasesByMonth["Recovered"] += element.Recovered;
          } else {
            totalCasesByMonth["Deaths"] = element.Deaths;
            totalCasesByMonth["Confirmed"] = element.Confirmed;
            totalCasesByMonth["Recovered"] = element.Recovered;
          }
        });

        $(".data").html(
          `${totalCasesByMonth.Confirmed.toLocaleString("en")} <em>ppl.<em>`
        );

        $(".confirmed-option").click(() => {
          $(".confirmed-option").addClass("selected");
          $(".text-confirmed > a").css("color", "var(--confirmed)");
          $(".text-recovered > a").removeAttr("style");
          $(".text-deaths > a").removeAttr("style");

          $(".recovered-option").removeClass("selected");
          $(".deaths-option").removeClass("selected");

          $(".data").fadeOut("slow", () => {
            $(".data").html(
              `${totalCasesByMonth.Confirmed.toLocaleString("en")} <em>ppl.<em>`
            );
            $(".data").fadeIn("slow");
          });
        });

        /* recovered click listener */
        $(".recovered-option").click(() => {
          $(".recovered-option").addClass("selected");
          $(".text-recovered > a").css("color", "var(--recovered)");
          $(".text-confirmed > a").removeAttr("style");
          $(".text-deaths > a").removeAttr("style");

          $(".confirmed-option").removeClass("selected");
          $(".deaths-option").removeClass("selected");

          $(".data").fadeOut("slow", () => {
            $(".data").html(
              `${totalCasesByMonth.Recovered.toLocaleString("en")} <em>ppl.<em>`
            );
            $(".data").fadeIn("slow");
          });
        });

        /* deaths click listener */
        $(".deaths-option").click(() => {
          $(".deaths-option").addClass("selected");
          $(".text-deaths > a").css("color", "var(--deaths)");
          $(".text-confirmed > a").removeAttr("style");
          $(".text-recovered > a").removeAttr("style");

          $(".confirmed-option").removeClass("selected");
          $(".recovered-option").removeClass("selected");

          $(".data").fadeOut("slow", () => {
            $(".data").html(
              `${totalCasesByMonth.Deaths.toLocaleString("en")} <em>ppl.<em>`
            );
            $(".data").fadeIn("slow");
          });
        });

        console.log("mobile refined data: ", totalCasesByMonth);
      },
      error: (jqXHR, textStatus, errorThrown) => {
        $(".errorTitle").text(
          "There has been a problem, please refresh your browser or try again later."
        );
        $("#myChart").removeClass("d-md-block");
        $(".errorRow").show();
      },
    });
  });
});
