// ticker.js
// Controllable message ticker. Requires Font Awesome.

function Ticker( el, messages ) {
    this.el = el;
    this.messages = messages;
    this.messageCount = messages.length;
    this.messageIndex = this.messageCount - 1;
}

Ticker.prototype.render = function() {
    this.el.innerHTML = "<a href='#' class='fas fa-arrow-left'></a>" +
        "<span class='message' style='margin: 0 1em 0 1em'></span>" +
        "<a href='#' class='fas fa-arrow-right'></a>";
    this.backButton = this.el.querySelector( ".fa-arrow-left" );
    this.messageContainer = this.el.querySelector( ".message" );
    this.forwardButton = this.el.querySelector( ".fa-arrow-right" );
    this.setupListeners();
    this.showMessage();
};

Ticker.prototype.setupListeners = function() {
    var self = this;
    this.backButton.addEventListener( "click", function( event ) {
        self.navigateBack();
        event.preventDefault();
    } );
    this.forwardButton.addEventListener( "click", function( event ) {
        self.navigateForward();
        event.preventDefault();
    } );
};

Ticker.prototype.showMessage = function() {
    this.backButton.style.display = ( this.messageIndex === 0 ) ? "none" : "";
    this.forwardButton.style.display = ( this.messageIndex === this.messageCount - 1 ) ? "none" : "";
    this.messageContainer.innerHTML = this.messages[ this.messageIndex ];
};

Ticker.prototype.navigateBack = function() {
    this.messageIndex--;
    this.showMessage();
};

Ticker.prototype.navigateForward = function() {
    this.messageIndex++;
    this.showMessage();
};
