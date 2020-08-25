$(function () {
  console.log($(".mobile-container").css("box-shadow"));

  /* mobile menu click listener */
  $(".mobileMenu").click(() => {
    $(".mobileLinks").toggle(1000);

    if (!$(".mobileMenu").hasClass("animated")) {
      $(".mobile-container").addClass("animate");
      $(".mobile-container").css({
        "right": "2.5%",
        position: "fixed",
      });

      $(".secondTitle").css("margin-top","145px")

      $(".mobileMenu").css({
        background: "var(--gradient-neu-conc-third-color)",
        "box-shadow": "var(--shadow-neu-down-third-color)",
      });
    } else {

      $(".animate").css({"animation":"back"})


    }
  });

  /* ajax petition */
  $.ajax({
    url: "https://api.covid19api.com/summary",
    type: "GET",
    data: {},

    /* before send animation */
    beforeSend: () => {
      $(".spinner-grow").show();
      $(".dataDate").text("loading...");
      $(".data").text("loading...");
    },

    /* completed (stop loading animation) */
    complete: () => {
      $(".spinner-grow").hide();
    },

    success: (data) => {
      /* initial setup */
      $(".data").html(
        `${data.Global.TotalConfirmed.toLocaleString("en")} <em>ppl.<em>`
      );

      /* date display */
      $(".dataDate").text(data.Date.slice(0, 10).replace(/-/g, "/"));

      /* confirmed click listener */
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
            `${data.Global.TotalRecovered.toLocaleString("en")} <em>ppl.<em>`
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
            `${data.Global.TotalDeaths.toLocaleString("en")} <em>ppl.<em>`
          );
          $(".data").fadeIn("slow");
        });
      });
    },

    /* error (display message) */
    error: (jqXHR, textStatus, errorThrown) => {
      $(".data").text(
        "There has been a problem, please refresh your browser or try again later."
      );
      $(".dataDate").text("ERROR!");
    },
  });
});
