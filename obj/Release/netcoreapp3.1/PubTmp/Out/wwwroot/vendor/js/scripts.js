(function ($) {
    'use strict';
    var SOD = {
        init: function () {
            this.onLoad();
            this.resizeListner();
            this.scrollListner();
            this.scrollTo();
            this.accordion();
            this.selectbox();
            this.slider();
            this.navbar();
            this.productslider();
            this.equalheight();   
            this.tooltip();
            this.hideshow();
            this.datepicker();
            
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

        navbar: function () {
        $(document).ready(function () {
        // Third Level Nav
            $('ul.dropdown-menu [data-toggle=dropdown]').on('click', function(event) {
                event.preventDefault(); 
                event.stopPropagation(); 
                $(this).parent().toggleClass('open');
                $(this).parent().siblings().removeClass('open');
            });
        
       
        });
        },

        productslider: function () {
            $(".product-slide").slick({
                dots: true,
                infinite: true,
                slidesToShow: 5,
                slidesToScroll: 1,
                responsive: [

                    {
                
                      breakpoint: 1024,
                
                      settings: {
                
                        slidesToShow: 3,
                
                        slidesToScroll: 3,
                
                        infinite: true,
                
                        dots: false
                
                      }
                
                    },
                
                    {
                
                      breakpoint: 600,
                
                      settings: {
                
                        slidesToShow: 2,
                
                        slidesToScroll: 2
                
                      }
                
                    },
                
                    {
                
                      breakpoint: 480,
                
                      settings: {
                
                        slidesToShow: 1,
                
                        slidesToScroll: 1
                
                      }
                
                    }
                
                    // You can unslick at a given breakpoint now by adding:
                
                    // settings: "unslick"
                
                    // instead of a settings object
                
                  ]
            });
        },


        resizeListner: function () {
            $(window).on('load resize', function () {
                SOD.settings.windowWidth = $(window).width();
            });
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
            $(".testimonial").slick({
                dots: true,
                infinite: true,
                
            });
        },

        
        tooltip: function () {
            $(document).ready(function(){
                // $('[data-toggle="popover"]').popover();   
               $('[data-toggle="popover"]').popover({
                   placement : 'bottom',
                   html : true,
                   title : '<span style="visibility:hidden;">UserInfo</span><a href="#" class="close" data-dismiss="alert">&times;</a>',
                   
               });
              $(document).on("click", ".popover .close" , function(){
                   $(this).parents(".popover").popover('hide');
               });
           
            });
        },  


        hideshow: function () {
            $(document).ready(function() {
                $('.btn-wrap').click(function() {
                        $('.add--address--section').slideToggle("fast");
                });
            });
        },

       
        datepicker: function () {
            $(function () {
                var bindDatePicker = function() {
                     $(".date").datetimepicker({
                     format:'YYYY-MM-DD',
                         icons: {
                             time: "fa fa-clock-o",
                             date: "fa fa-calendar",
                             up: "fa fa-arrow-up",
                             down: "fa fa-arrow-down"
                         }
                     }).find('input:first').on("blur",function () {
                         // check if the date is correct. We can accept dd-mm-yyyy and yyyy-mm-dd.
                         // update the format if it's yyyy-mm-dd
                         var date = parseDate($(this).val());
             
                         if (! isValidDate(date)) {
                             //create date based on momentjs (we have that)
                             date = moment().format('YYYY-MM-DD');
                         }
             
                         $(this).val(date);
                     });
                 }
                
                var isValidDate = function(value, format) {
                     format = format || false;
                     // lets parse the date to the best of our knowledge
                     if (format) {
                         value = parseDate(value);
                     }
             
                     var timestamp = Date.parse(value);
             
                     return isNaN(timestamp) == false;
                }
                
                var parseDate = function(value) {
                     var m = value.match(/^(\d{1,2})(\/|-)?(\d{1,2})(\/|-)?(\d{4})$/);
                     if (m)
                         value = m[5] + '-' + ("00" + m[3]).slice(-2) + '-' + ("00" + m[1]).slice(-2);
             
                     return value;
                }
                
                bindDatePicker();
              });
        },

       
        equalheight: function () {
            var highestBox = 0;
      
            $('.products__listings .product__wrap .product__description').each(function(){
            if($(this).height() > highestBox) {
            highestBox = $(this).height(); 
            }
      
            });  
            
            $('.products__listings .product__wrap .product__description').height(highestBox);
        },

        selectbox: function () {
            $(document).ready(function() {
  
                $(".js-select2").select2();
                
                $(".js-select2-multi").select2();
                
                $(".large").select2({
                    dropdownCssClass: "big-drop",
                });
            
            });
        },

        

        accordion: function () {
            $('.accordion-item__title').click(function (e) {
                e.preventDefault();
                var $this = $(this);
                if ($this.hasClass("active")) {
                    $this.removeClass("active");
                    $this.siblings(".accordion-item__body").slideUp(200);
                } else {
                    $(".accordion-item__title").removeClass("active");
                    $this.addClass("active");
                    $(".accordion-item__body").slideUp(200);
                    $this.siblings(".accordion-item__body").slideDown(200);
                }
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