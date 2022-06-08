$(document).ready(function() {
    
    var videoGames = [
    "Super Mario", "Sonic", "Metal Gear Solid", "Pokemon", "Donkey Kong",
    "Crash Bandicoot", "Days Gone", "Grand Theft Auto", "Red Dead Redemption",
    "Ace Attorney"
    ];

    function createButtons(arrayToUse, classToAdd, areaToAddTo) {
     $(areaToAddTo).empty();

     for (var i = 0; i < arrayToUse.length; i++) {
      var buttons = $("<button>");
      buttons.addClass(classToAdd);
      buttons.attr("data-type", arrayToUse[i]);
      buttons.text(arrayToUse[i]);
      $(areaToAddTo).append(buttons)
     }
    }

    $(document).on("click", ".vg-button", function() {
      $("#video-games").empty();
      $(".vg-button").removeClass("active");
      $(this).addClass("active");

      var type = $(this).attr("data-type");
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=V6UH6Gjv4v5AKDiqd5P6UlRLMgKsJYei&limit=10";

      $.ajax({
        url: queryURL,
        method: "GET"
      })
        .then(function(response) {
        var results = response.data;

        for (var i = 0; i < results.length; i++) {
          var videoGameDiv = $("<div class=\"vg-item\">");

          var rating = results[i].rating;

          var paragraph = $("<p>").text("Rating: " + rating);

          var animated = results[i].images.fixed_height.url;

          var still = results[i].images.fixed_height_still.url;

          var videoGameImage = $("<img>");
          videoGameImage.attr("src", still);
          videoGameImage.attr("data-still", still);
          videoGameImage.attr("data-animate", animated);
          videoGameImage.attr("data-state", "still");
          videoGameImage.addClass("vg-image");

          videoGameDiv.append(paragraph);
          videoGameDiv.append(videoGameImage);

         $("#video-games").append(videoGameDiv);
        }
      });
    });

    $(document).on("click", ".vg-image", function() {
      var state = $(this).attr("data-state");

      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      }
      else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
      }
    });

    $("#add-video-game").on("click", function(event) {
      event.preventDefault();

      var newVideoGame = $("input").eq(0).val();

      if (newVideoGame.length > 2) {
        videoGames.push(newVideoGame);
      }

    createButtons(videoGames, "vg-button", "#vg-buttons");
    });

  createButtons(videoGames, "vg-button", "#vg-buttons");
});

