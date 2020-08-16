$(function () {
  $.ajax({
    url: "https://api.covid19api.com/summary",
    type: "GET",
    data: {},
    beforeSend: () => {},
    complete: () => {},
    success: (data) => {
      console.log(data);
      $(".data").html(
        `${data.Global.TotalConfirmed.toLocaleString("en")} <em>ppl.<em>`
      );

      console.log(data.Date);
      $(".dataDate").text(data.Date.slice(0,10).replace(/-/g,"/")) 

      $(".confirmed-option").click(() => {
        $(".confirmed-option").addClass("selected");
        $(".text-confirmed > a").css("color", "var(--confirmed)");
        $(".text-recovered > a").removeAttr("style");
        $(".text-deaths > a").removeAttr("style");

        $(".recovered-option").removeClass("selected");
        $(".deaths-option").removeClass("selected");

        $(".data").fadeOut("slow", () => {
          $(".data").html(
            `${data.Global.TotalConfirmed.toLocaleString("en")} <em>ppl.<em>`
          );
          $(".data").fadeIn("slow");
        });
      });
      $(".recovered-option").click(() => {
        $(".recovered-option").addClass("selected");
        $(".text-recovered > a").css("color", "var(--recovered)");
        $(".text-confirmed > a").removeAttr("style");
        $(".text-deaths > a").removeAttr("style");

        $(".confirmed-option").removeClass("selected");
        $(".deaths-option").removeClass("selected");

        $(".data").fadeOut("slow", () => {
          $(".data").html(
            `${data.Global.TotalRecovered.toLocaleString("en")} <em>ppl.<em>`
          );
          $(".data").fadeIn("slow");
        });
      });
      $(".deaths-option").click(() => {
        $(".deaths-option").addClass("selected");
        $(".text-deaths > a").css("color", "var(--deaths)");
        $(".text-confirmed > a").removeAttr("style");
        $(".text-recovered > a").removeAttr("style");

        $(".confirmed-option").removeClass("selected");
        $(".recovered-option").removeClass("selected");

        $(".data").fadeOut("slow", () => {
          $(".data").html(
            `${data.Global.TotalDeaths.toLocaleString("en")} <em>ppl.<em>`
          );
          $(".data").fadeIn("slow");
        });
      });
    },
    error: () => {},
  });
});
