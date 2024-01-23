const scrollDuration = 1000; // miliseconds
const scrollSpeed = 5; // seconds

document.addEventListener("DOMContentLoaded", function () {
  var exploreButton = document.getElementById("explore-button");
  var titleNewsletterButton = document.getElementById(
    "newsletter-title-button"
  );

  exploreButton.addEventListener("click", function () {
    var exploreSection = document.getElementById("main");
    exploreSection.scrollIntoView({ behavior: "smooth" });
  });

  titleNewsletterButton.addEventListener("click", function () {
    var newsletterSection = document.getElementById("newsletter-section");
    newsletterSection.scrollIntoView({ behavior: "smooth" });
  });
});
