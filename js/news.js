$(function () {

    /* --------------------Mobile Menu Click Listener-------------------- */
  $(".mobileMenu").click(() => {
    console.log($(".mobile-container").attr("class"));

    $(".mobileLinks").toggle(1000);

    if (!$(".mobile-container").hasClass("fow")) {
      $(".mobile-container").addClass("fow");
      $(".mobile-container").css({
        right: "2.5%",
        position: "fixed",
      });

      $(".secondTitle").css("margin-top", "145px");

      $(".mobileMenu").css({
        background: "var(--gradient-neu-conc-third-color)",
        "box-shadow": "var(--shadow-neu-down-third-color)",
      });
    } else {
      console.log("else statement");

      $(".fow").addClass("back");
      $(".fow").removeClass("fow");

      $(".animate").removeAttr("style");
      $(".mobileMenu").removeAttr("style");
      $(".mobile-container").removeAttr("style");
      $(".secondTitle").removeAttr("style");
      $(".mobile-container").removeClass("back");
    }
  });

  /* -----------------------Ajax News Request----------------------- */
  $.ajax({
  
    url: "https://coronavirus-smartable.p.rapidapi.com/news/v1/US/",
    type: "GET",
    headers: {
      "x-rapidapi-host": "coronavirus-smartable.p.rapidapi.com",
		"x-rapidapi-key": "b877e63389mshfb919104da6390ap11a823jsnfe3b9d3f6cc1"
    },
    data: {},
    beforeSend: () => {
      /* -----------------------Show Loading Animation----------------------- */
      $(".spinner-grow").show();
    },
    complete: () => {
      /* -----------------------Hide Loading Aniamtion----------------------- */
      $(".spinner-grow").hide();
    },
    success: (data) => {
      /* -----------------------Data Display----------------------- */
      data.news.forEach((element) => {
        let imageSrc;
        (() => {
          if (element.images == null) {
            imageSrc = "../img/newsImg.png";
          } else {
            imageSrc = element.images[0].url;
            console.log(imageSrc);
          }
        })();

        $("#colNews").append(`

            <div class="neu d-md-flex align-items-md-center ">
              <div class="image col-12 col-md-3 aling-itemes-center justify-content-center">
                <img src="${imageSrc}" alt="" class="img-fluid p-2 image" />
              </div>
              <div class="text col-sm-12 col-md-9 p-3 aling-itemes-center justify-content-center">
              <a href="${element.webUrl}" target="_blank">
              <div class="row">
                <h3 class="text-sm-center text-md-left">${element.title}</h3>
              </div>
              <div class="row">
                <p class="text-justify p-3">
                ${element.excerpt}
                </p>
              </div>
              </a>
              </div>
            </div>

                `);
      });
    },
    error: (jqXHR, textStatus, errorThrown) => {
      $(".errorTitle").text("There has been a problem, please refresh your browser or try again later.")
    },
  });
});
