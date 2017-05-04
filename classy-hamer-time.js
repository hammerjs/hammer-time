/* Hammer-time - v0.3.0
 * http://github.com/hammerjs/hammer-time
 *
 * Copyright Alexander Schmitz and other contributors
 * Released under the MIT license
 *
 * Expiramental fastclick based on a partial polyfill of
 * touch-action: none; CSS property
 */

( function() {

	// Detect support for necessary features;
	var touchevents = ( "ontouchstart" in window ) ||
	                  ( window.DocumentTouch && document instanceof DocumentTouch );
	var nativeTouchAction = document.documentElement.style[ "touch-action" ] !== undefined ||
			                            document.documentElement.style[ "-ms-touch-action" ];

// If there is native touch action bail the hammer has already dropped
if ( nativeTouchAction || !touchevents || !MO ) {
	return;
}

//Check if a global Hammer object already exists
window.Hammer = window.Hammer || {};

var timeTouch = /(iP(ad|hone|od))/.test( navigator.userAgent ) && ( "indexedDB" in window || !!window.performance );

window.Hammer.time = {
	getTouchAction: function( element ) {
		var list = element.classList
		return list.contains( this.className.none ) ?
			"none" :
			list.contains( this.className.manipulation ) ? "manipulation" : undefined;
	},
	shouldHammer: function( e ) {
		var parentAction = e.target.hasParent;
		return ( parentAction && ( !timeTouch || Date.now() - e.target.lastStart < 125 ) ) ?
				parentAction : false;
	},
	className: {
		manipulation: "cht-m",
		none: "cht-n"
	},
	touchHandler: function( e ) {
		var hammerType = this.shouldHammer( e );

		// Check both if we should trigger fast click and the time to avoid a double trigger with
		// native fast click
		if ( hammerType === "none" ) {
			this.dropHammer( e );
		} else if ( hammerType === "manipulation" ) {
			var pos = e.target.getBoundingClientRect();
			var scrolled = pos.top !== this.pos.top || pos.left !== this.pos.left;
			!scrolled && this.dropHammer( e );
		}
		this.scrolled = false;
		delete e.target.lastStart;
		delete e.target.hasParent;
	},
	dropHammer: function( e ) {
		if ( e.type === "touchend" ) {
			e.target.focus();

			// Wait for next tic so events fire in proper order
			setTimeout( function() {
				e.target.click();
			}, 0 );
		}

		// Prevent the click which will come after this otherwise but with a 300ms delay
		e.preventDefault();
	},
	touchStart: function( e ) {
		this.pos = e.target.getBoundingClientRect();
		e.target.hasParent = this.hasParent( e.target );
		if ( timeTouch && e.target.hasParent ) {
			e.target.lastStart = Date.now();
		}
	},
	hasParent: function( node ) {
		var touchAction;
		for ( var cur = node; cur && cur.parentNode; cur = cur.parentNode ) {
			touchAction = this.getTouchAction( cur );
			if ( touchAction ) {
				return touchAction;
			}
		}
		return false;
	},
	installStartEvents: function() {
		document.addEventListener( "touchstart", this.touchStart.bind( this ) );
		document.addEventListener( "mousedown", this.touchStart.bind( this ) );
	},
	installEndEvents: function() {
		document.addEventListener( "touchend", this.touchHandler.bind( this ), true );
		document.addEventListener( "mouseup", this.touchHandler.bind( this ), true );
	},
	install: function() {
		this.installEndEvents();
		this.installStartEvents();
	}
};
window.Hammer.time.install();
} )();
