$(document).ready(function() {

    $('.header-toolbar__menu li a').click(function() {
        $('.header-toolbar__menu li a').removeClass('active-menu-item');
        $(this).addClass('active-menu-item');
    });

    $('.auto-btn').click(function() {
        $(this).addClass('active-auto-btn');
        $('.auto-input').val('');
    });

    $('.auto-input').keyup(function() {
        $('.auto-btn').removeClass('active-auto-btn');
    });

    $('.has-submenus > ul').prepend('<li class="submenus-back"><a href="javascript:;">Вернуться</a></li>')

    var level = 0;
    $('.has-submenus > a').click(function() {
        var q = level += 100;
        $('.dropdown-menu-nav').css('-webkit-transform', 'translateX(-' + q + '%)');
        $(this).next().addClass('activeSub');
    });


    $(document).on('click', '.submenus-back', function() {
        var b = level -= 100;
        $('.dropdown-menu-nav').css('-webkit-transform', 'translateX(-' + b + '%)');
        $(this).parent().removeClass('activeSub');
    });


    $('.dropdown-click-toggle').click(function() {
        $(this).next().toggle();
    });

    $('.token-btn').click(function() {
        var token = $(this).data('token');
        var tokenId = $('.token-btn[data-token="' + token + '"]');
        $('.token-btn').removeClass('token-btn--selected');
        tokenId.addClass('token-btn--selected');
        $('.modal-overlay').removeClass('modal-overlay-active');
    });


    $('<button class="btn-type go-back"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M7.5328 15.5001L2.47446 10.4418C2.2328 10.2001 2.2328 9.8001 2.47446 9.55843L7.5328 4.5001C7.77446 4.25843 8.17446 4.25843 8.41613 4.5001C8.6578 4.74176 8.6578 5.14176 8.41613 5.38343L3.79946 10.0001L8.41613 14.6168C8.6578 14.8584 8.6578 15.2584 8.41613 15.5001C8.29946 15.6251 8.1328 15.6834 7.97446 15.6834C7.81613 15.6834 7.6578 15.6251 7.5328 15.5001Z" fill="#B2B2B2"/> <path d="M3.05835 10.625C2.71668 10.625 2.43335 10.3417 2.43335 10C2.43335 9.65833 2.71668 9.375 3.05835 9.375H17.0833C17.425 9.375 17.7083 9.65833 17.7083 10C17.7083 10.3417 17.425 10.625 17.0833 10.625H3.05835Z" fill="#B2B2B2"/> </svg></button>').prependTo('.modal-level-1 .modal-heading');

    $('.modal-level-btn').click(function() {
        $(this).parent().hide();
        $(this).parent().next().show();
    });

    $(document).on('click', '.go-back', function() {
        $(this).parent().parent().hide();
        $(this).parent().parent().prev().show();
    });

    var _clicked = false;
    $('[data-modal]').click(function(e) {
        e.stopPropagation();
        if (!_clicked) {
            _clicked = true;
            $('<a href="javascript:;" class="btn-type close-modal"> <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M7.94006 7L13.4667 1.47333C13.5759 1.3458 13.633 1.18175 13.6265 1.01396C13.6201 0.846179 13.5505 0.68702 13.4318 0.56829C13.313 0.449561 13.1539 0.380005 12.9861 0.373525C12.8183 0.367044 12.6543 0.424115 12.5267 0.533333L7.00006 6.06L1.4734 0.526666C1.34786 0.40113 1.1776 0.330605 1.00006 0.330605C0.822529 0.330605 0.652266 0.40113 0.52673 0.526666C0.401194 0.652202 0.330669 0.822465 0.330669 0.999999C0.330669 1.17753 0.401194 1.3478 0.52673 1.47333L6.06006 7L0.52673 12.5267C0.456942 12.5864 0.400262 12.66 0.360247 12.7427C0.320231 12.8254 0.297744 12.9155 0.294198 13.0073C0.290652 13.0991 0.306122 13.1907 0.339638 13.2762C0.373155 13.3618 0.423994 13.4395 0.488963 13.5044C0.553933 13.5694 0.631631 13.6202 0.717181 13.6538C0.802732 13.6873 0.894286 13.7027 0.986099 13.6992C1.07791 13.6957 1.168 13.6732 1.25071 13.6332C1.33342 13.5931 1.40697 13.5365 1.46673 13.4667L7.00006 7.94L12.5267 13.4667C12.6543 13.5759 12.8183 13.633 12.9861 13.6265C13.1539 13.62 13.313 13.5504 13.4318 13.4317C13.5505 13.313 13.6201 13.1538 13.6265 12.986C13.633 12.8183 13.5759 12.6542 13.4667 12.5267L7.94006 7Z" fill="#B2B2B2"/></svg></a>').appendTo('.modal-heading');
        }

        $('.modal-level-0').show();
        $('.modal-level:not(.modal-level-0').hide();


        var link = $(this).data('modal');
        $('.modal-overlay' + link + '').addClass('modal-overlay-active');

    });


    $(document).on('click', '.close-modal', function() {
        $('.modal-overlay').removeClass('modal-overlay-active');
    })


    $('.setting-btn > .btn-type').click(function() {
        $(this).parent().toggleClass('setting-btn-active');
    });


    $('.transaction-output-preview').click(function() {
        $(this).parent().toggleClass('transaction-preview-active');
        $(this).next().slideToggle('fast');
    });


    $('.router-toggle-btn').click(function() {
        $(this).toggleClass('router-active');
        $(this).next().slideToggle('fast');
    });


    $._f_do_action = function(url) {
        if (url['a']) {
            if (url['a'] === 'route') {
                $('.route-section').hide();
                $('.' + url['s']).show();
            }
        }
    };

    $._f_parse_url = function(url) {
        var in_url = [];
        var in_url_str = url.replace('?', '').split('&');
        $.each(in_url_str, function(key, val) {
            var v = val.split('=');
            in_url[v[0]] = v[1];
        });
        $._f_do_action(in_url);
    };
    $._f_parse_url(window.location.search);

    $(document).on('click', '[data-router-link]', function(e) {
        e.preventDefault();
        $._f_parse_url(e.target.search);
    });


    var tabs = $(".tabs .tab-anchor");
    tabs.click(function(e) {
        e.preventDefault();
        var content = this.hash;
        tabs.removeClass("active");
        $(this).addClass("active");
        $(".tab-content-wrap").find('.tab-content').hide();
        $(content).fadeIn(200);
    });


    $(".slider-ui").ionRangeSlider({
        type: "single",
        grid: false,
        step: 10,
        onChange: function(data) {
            $('#slider_1_val').text(data.from);
            $('#slider_1').val(data.from);
            $('#slider_1').attr('value', data.from);
        }
    });


    $(document).mouseup(function(a) {
        var b = $(".modal-container-box");
        b.is(a.target) || 0 !== b.has(a.target).length || $(".modal-overlay").removeClass("modal-overlay-active")
    });

    $(document).mouseup(function(a) {
        var b = $(".setting-btn");
        b.is(a.target) || 0 !== b.has(a.target).length || $('.setting-btn').removeClass('setting-btn-active')
    });

    $(document).mouseup(function(e) {
        var container = $(".settings-dropdown");
        container.is(e.target) || 0 !== container.has(e.target).length || container.hide()
    });

    $(window).scroll(function() {
        if ($(this).scrollTop() > 40) {
            $('.header-toolbar').addClass("header-toolbar--scrolled");
        } else {
            $('.header-toolbar').removeClass("header-toolbar--scrolled");
        }
    });




    var bar_ctx = document.getElementById('barChart').getContext('2d');

    var background_1 = bar_ctx.createLinearGradient(0, 0, 0, 180);
    background_1.addColorStop(0, '#FF0052');
    background_1.addColorStop(1, '#6D00F3');


    var barChart = new Chart(bar_ctx, {
        type: 'bar',
        family: 'Nunito Sans',

        data: {
            labels: ['0.0000', '0.0002', '0.0004', '0.0006', '0.0008', '0.0010', '0.0012', '0.0014'],
            datasets: [{
                backgroundColor: background_1,
                data: [2, 0.5, 1, 0.5, 1, 1.2, 1.8, 1.2],
            }, {
                backgroundColor: background_1,
                data: [1.5, 1, .5, 1, 0.5, 1.3, 1.8, 0.5],
            }, {
                backgroundColor: background_1,
                data: [1.9, 1.2, 1.6, 1.2, 2.2, 1.4, 2.2, 1.2],
            }, {
                backgroundColor: background_1,
                data: [1, 1.8, 2.2, 1.8, 1.2, 0.3, 1.8, 1.2],
            }, {
                backgroundColor: background_1,
                data: [1.2, 2.2, 1.4, 1.8, 1.2, 0.3, 1.8, 1.2],
            }, {
                backgroundColor: background_1,
                data: [1.2, 2.2, 1.4, 1.8, 1.2, 0.3, 1.8, 1.2],
            }, {
                backgroundColor: background_1,
                data: [1.5, 1, .5, 1, 0.5, 1.3, 1.8, 0.5],
            }, {
                backgroundColor: background_1,
                data: [0.5, 1, 1.2, 1.8, 1.2, 0.3, 1.8, 1.2],
            }],
        },

        options: {
            categoryPercentage: 1.0,
            barPercentage: 0.5,

            plugins: {
                legend: {
                    display: false,
                    labels: false,
                },
                tooltip: {
                    displayColors: false
                },

                zoom: {
                    pan: {
                        enabled: true,
                        mode: 'x'
                    },
                    zoom: {
                        enabled: true,
                        mode: 'x',
                    }
                }

            },

            scales: {
                y: {
                    display: false,
                    beginAtZero: true,
                    grid: {
                        display: false
                    }
                },
                x: {
                    display: true,
                    beginAtZero: true,
                    grid: {
                        display: false
                    }
                }
            },
        },

        plugins: [{
            id: 'custom_canvas_background_color',
            beforeDraw: (chart) => {
                const { ctx } = chart;
                ctx.save();
                ctx.globalCompositeOperation = 'destination-over';
                ctx.fillStyle = 'rgba(109, 0, 243, 0.1)';
                ctx.fillRect(0, -29, chart.width, chart.height);
                ctx.restore();
            }
        }]

    });


    $('#refresh').click(function() {
        barChart.resetZoom();
    });

    $('#zoom_in').click(function() {
        barChart.zoom(1.1);
    });
    $('#zoom_out').click(function() {
        barChart.zoom(0.9);
    });



});