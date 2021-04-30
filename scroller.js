// scroller.js
// Message scroller with back and next functionality.
// Requires: Font Awesome

function Scroller( el, messages ) {
    this.el = el;
    this.messages = messages;
    this.messageCount = messages.length;
    this.messageIndex = this.messageCount - 1;
}

Scroller.prototype.render = function() {
    this.el.innerHTML = "<a href='#' class='fas fa-arrow-left'></a>" +
        "<span class='message' style='margin: 0 1em 0 1em'></span>" +
        "<a href='#' class='fas fa-arrow-right'></a>";
    this.setupListeners();
    this.showMessage();
};

Scroller.prototype.setupListeners = function() {
    var self = this;
    this.el.querySelector( ".fa-arrow-left" ).addEventListener( "click", function( event ) {
        self.navigateLeft();
        event.preventDefault();
    } );
    this.el.querySelector( ".fa-arrow-right" ).addEventListener( "click", function( event ) {
        self.navigateRight();
        event.preventDefault();
    } );
};

Scroller.prototype.showMessage = function() {
    this.el.querySelector( ".fa-arrow-left" ).style.display = ( this.messageIndex === 0 ) ? "none" : "";
    this.el.querySelector( ".fa-arrow-right" ).style.display = ( this.messageIndex === this.messageCount - 1 ) ? "none" : "";
    this.el.querySelector( ".message" ).innerHTML = this.messages[ this.messageIndex ];
};

Scroller.prototype.navigateLeft = function() {
    this.messageIndex--;
    this.showMessage();
};

Scroller.prototype.navigateRight = function() {
    this.messageIndex++;
    this.showMessage();
};
