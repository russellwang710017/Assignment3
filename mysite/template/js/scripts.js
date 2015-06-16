/*
 * Get Viewport Dimensions
 * returns object with viewport dimensions to match css in width and height properties
 * ( source: http://andylangton.co.uk/blog/development/get-viewport-size-width-and-height-javascript )
*/
function updateViewportDimensions() {
	var w=window,d=document,e=d.documentElement,g=d.getElementsByTagName('body')[0],x=w.innerWidth||e.clientWidth||g.clientWidth,y=w.innerHeight||e.clientHeight||g.clientHeight;
	return { width:x,height:y };
}
// setting the viewport width
var viewport = updateViewportDimensions();


/*
 * Throttle Resize-triggered Events
 * Wrap your actions in this function to throttle the frequency of firing them off, for better performance, esp. on mobile.
 * ( source: http://stackoverflow.com/questions/2854407/javascript-jquery-window-resize-how-to-fire-after-the-resize-is-completed )
*/
var waitForFinalEvent = (function () {
	var timers = {};
	return function (callback, ms, uniqueId) {
		if (!uniqueId) { uniqueId = "Don't call this twice without a uniqueId"; }
		if (timers[uniqueId]) { clearTimeout (timers[uniqueId]); }
		timers[uniqueId] = setTimeout(callback, ms);
	};
})();

// how long to wait before deciding the resize has stopped, in ms. Around 50-100 should work ok.
var timeToWaitForLast = 100;

var isMapResizedOnce = false;

/*
 * Put all your regular jQuery in here.
*/
$ = jQuery;
jQuery(document).ready(function($) {
    var menuOpen = false;
    var menuOpening = false;

    $("#menuIcon, #closeMenu").click(function(){
        if(!menuOpening){
            menuOpening = true;
            if(!menuOpen){
                var width = $('body').innerWidth();
                width = width - 299;

                $("#closeMenu").css('display','block');
                $("#menuIcon").css('display','none');
                $("body").animate({'margin-left': "299px", width:width});
                $("footer, header").animate({'width':width});
                $("#menuLeft").animate({'left': 0}, function(){
                    menuOpen = true;
                    menuOpening = false;
                });
            }else{
                $("#closeMenu").css('display','none');
                $("#menuIcon").css('display','block');
                $("body").animate({'margin-left': "0", width:'100%'});
                $("footer, header").animate({'width':'100%'});
                $("#menuLeft").animate({'left': -299}, function(){
                    menuOpen = false;
                    menuOpening = false;
                });
            }
        }
    })

    //Power off, power on button
    $(".power").click(function(){
        if(!$(this).hasClass("on")){
            $(this).addClass("on");
            $("#cockpit-off").addClass('hidden');
            $("#cockpit-on").removeClass('hidden');

        }else{
            $(this).removeClass("on");
            $("#cockpit-off").removeClass('hidden');
            $("#cockpit-on").addClass('hidden');
        }

        if (isMapResizedOnce == false) {
        	$('map').imageMapResize();
        	isMapResizedOnce = true;
        }


    })

    //Notes
    $('.toolbox-add-a-note').click(function(e){
        e.preventDefault();
        $('.note').fadeIn();
        $('.note textarea').focus();
        $('.notes').slideDown();
    })

    //Bookmark
    var bookmark = 'bookmark-' + location.pathname;

    if ( localStorage.getItem(bookmark) ){
        $('.toolbox-bookmark').addClass('added');
    }

    $('.toolbox-bookmark').click(function(e){
        e.preventDefault();
        $(this).toggleClass('added');

        if ( $(this).hasClass('added') ){
            localStorage.setItem(bookmark, 1);
        } else {
            localStorage.removeItem(bookmark);
        }
    })

    //Notes
    var note = 'note-' + location.pathname;

    if ( localStorage.getItem(note) ){
        $('.saved-note').fadeIn().find('.text').text( localStorage.getItem(note) );
    }

    $('.add-notes').click(function(e){
        e.preventDefault();
        $('.note').fadeIn();
        $('.saved-note').fadeOut();
    })

    //Submitting form
    $('.note .close-note, .note button').click(function(e){
        e.preventDefault();
        $(this).closest('.note').fadeOut();
        localStorage.setItem( note, $('.note textarea').val() );
        $('.saved-note').fadeIn().find('.text').text($('.note textarea').val());
    })

    //Closing notes
    $('.close-notes').click(function(e){
        e.preventDefault();
        $('.note').fadeOut();
        $(this).closest('.notes').slideUp();
    })

    //Deleting a saved note
    $('.saved-note .close-note').click(function(e){
        e.preventDefault();
        $(this).closest('.saved-note').fadeOut();
        localStorage.removeItem(note);
    })

    //Scroll content
    $(window).resize(function(){
        $('.scroll-content').height( $(this).height() - $('#header').height() + 'px' );
    })
    $(window).resize();


    //Lightbox
    $(document).delegate('*[data-toggle="lightbox"]', 'click', function(event) {
        event.preventDefault();
        $(this).ekkoLightbox();
    });

    $('[data-toggle="popover"]').popover({trigger: 'click hover','placement': 'bottom', html: true, container: false});

}); /* end of as page load scripts */
