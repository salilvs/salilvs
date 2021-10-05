(function ($) {
    'use strict';
    var SOD = {
        init: function () {
            this.onLoad();
            this.scrollListner();
            this.scrollTo();
            this.slider();
            
},
        settings: {
            windowWidth: $(window).width(),
            windowheight: $(window).height(),
            scrollTop: $(window).scrollTop(),
            scrollClassTrigger: 70,
        },
        onLoad: function () {
            $(document).ready(function () {});
        },



        scrollListner: function () {
            $(window).on('load scroll', function () {
                if ($(window).scrollTop() > SOD.settings.scrollClassTrigger) {
                    $('body').addClass('scrolled');
                } else {
                    $('body').removeClass('scrolled');
                }
            });
            $(window).on('mousewheel DOMMouseScroll', function (event) {
                var wd = event.originalEvent.wheelDelta || -event.originalEvent.detail;
                if (wd < 0) {
                    $('body').removeClass('scrollingUp');
                    $('body').addClass('scrollingDown');
                } else {
                    $('body').removeClass('scrollingDown');
                    $('body').addClass('scrollingUp')
                }
            });
            $(window).on('load scroll', function() {
                if ($(window).scrollTop() > SOD.settings.scrollClassTrigger) {
                    $('.site-header').addClass('fixed');
                } else {
                    $('.site-header').removeClass('fixed');
                }
            });
        },

        slider: function () {
            $(".sliderfor").slick({
                dots: true,
                infinite: true,
                arrows:false,
            });
        },

        
        scrollTo: function () {
            $('.navigation__link').bind('click', function (e) {
                e.preventDefault(); // prevent hard jump, the default behavior
                var target = $(this).attr("href"); // Set the target as variable
                // perform animated scrolling by getting top-position of target-element and set it as scroll target
                $('html, body').stop().animate({
                    scrollTop: $(target).offset().top
                }, 600, function () {
                    location.hash = target; //attach the hash (#jumptarget) to the pageurl
                });
                return false;
            });

            $(window).scroll(function () {
                // Assign active class to nav links while scolling
                $('.page-section').each(function (i) {
                    if ($(this).position().top <= scrollTop) {
                        $('.navigation a.active').removeClass('active');
                        $('.navigation a').eq(i).addClass('active');
                    }
                });
            });
        },

        
    };
    SOD.init();
}(jQuery));