var blurbs = [
    "This website doesn't use cookies.",
];
var random = Math.floor(Math.random() * blurbs.length);
document.getElementById("footer-blurb").innerHTML = blurbs[random];
