/*globals jQuery, window, document, FastClick */
(function ($, window, document) {
    'use strict';

    window.SWISS = window.SWISS || {
        $window: null,
        $body: null,

        init: function () {
            this.$window = $(window);
            this.$body = $('body');
            this.$head = $('.js-sec-head');

            this.headerMenuMobile();
            this.headerSticky();
            this.heroCarousel();
            this.scrollTo();
            this.cookies();
            //this.maps();
        },

        /**
         * Header menu mobile
         */
        headerMenuMobile: function () {
            var that = this;

            that.$btnMenuTrigger = $('.js-trigger-nav-main');

            // Open menu
            that.$btnMenuTrigger.on('click', function (event) {
                event.preventDefault();

                $(this).toggleClass('is-active');

                that.$head.toggleClass('is-menu-opened');
            });
        },

        headerSticky: function () {
            var that = this,
                funcStart;

            function funcStart() {
                var $scrollTop = $(window).scrollTop();

                if ($scrollTop >= 50) {
                    that.$head.addClass('is-sticky');
                } else {
                    that.$head.removeClass('is-sticky');
                }
            }

            funcStart();
            $(window).on('scroll', function () {
                funcStart();
            });
        },

        heroCarousel: function () {
            var that = this,
                $carousel = $('.js-carousel-hero'),
                $carouselItems = $carousel.find('.js-carousel-items');

            $carouselItems.slick({
                arrows: false,
                dots: true,
                infinite: true,
                slidesToShow: 1,
                autoplay: true,
                autoplaySpeed: 3000,
                pauseOnHover: false,
                pauseOnFocus: false,
                pauseOnDotsHover: false,
                customPaging : function(slider, i) {
                    // var thumb = $(slider.$slides[i]).data('thumb');
                    return '<a>' + i + '</a>';
                }
            });
        },

        cookies: function() {
            function setCookie(c_name, value, exdays) {
                var exdate = new Date();
                exdate.setDate(exdate.getDate() + exdays);
                var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
                document.cookie = c_name + "=" + c_value;
            }

            function getCookie(c_name) {
                var i, x, y, ARRcookies = document.cookie.split(";");
                for (i = 0; i < ARRcookies.length; i++) {
                    x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
                    y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
                    x = x.replace(/^\s+|\s+$/g, "");
                    if (x == c_name) {
                        return unescape(y);
                    }
                }
            }

            var cookies = getCookie('.js-cookies'),
                $cookiesBody = $('.js-cookies');

            if (parseInt(cookies) !== 1) {
                $cookiesBody.addClass('is-active');
            }

            $('.js-close-cookies').click(function () {
                $('.js-cookies').fadeOut();
                setCookie('.js-cookies', 1, 365);
            });
        },

        /**
         * Scroll to
         */
        scrollTo: function () {
            var that = this;

            $('.js__scroll-to').on('click', function (event) {
                event.preventDefault();

                var $this = $(this),
                    $href = $(this).attr('href'),
                    $el = $($href),
                    $offsetElement = null,
                    offest = $(this).attr('data-offset');

                if ($el.length) {
                    $offsetElement = $el.offset().top;

                    $('html, body').animate({
                        scrollTop: $offsetElement
                    }, 600);

                    that.$header.removeClass('is-menu-opened');
                }
            });
        }
    };

    $(document).ready(function () {
        window.SWISS.init();
    });
}(jQuery, window, document));
