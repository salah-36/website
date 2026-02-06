// ===================================
// SUPMTI Meknès - JavaScript Functions
// ===================================

$(document).ready(function() {
    
    // ===== Navbar Scroll Effect =====
    $(window).scroll(function() {
        if ($(this).scrollTop() > 50) {
            $('.navbar').addClass('scrolled');
        } else {
            $('.navbar').removeClass('scrolled');
        }
    });

    // ===== Smooth Scroll for Navigation Links =====
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        
        var target = $(this.getAttribute('href'));
        
        if(target.length) {
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 70
            }, 1000);
            
            // Close mobile menu after clicking
            if ($('.navbar-collapse').hasClass('show')) {
                $('.navbar-toggler').click();
            }
        }
    });

    // ===== Active Navigation Link on Scroll =====
    $(window).on('scroll', function() {
        var scrollPos = $(window).scrollTop() + 100;
        
        $('section').each(function() {
            var section = $(this);
            var sectionTop = section.offset().top;
            var sectionBottom = sectionTop + section.outerHeight();
            var sectionId = section.attr('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
                $('.nav-link').removeClass('active');
                $('.nav-link[href="#' + sectionId + '"]').addClass('active');
            }
        });
    });

    // ===== Counter Animation for Statistics =====
    var counterStarted = false;
    
    function startCounter() {
        if (counterStarted) return;
        counterStarted = true;
        
        $('.counter').each(function() {
            var $this = $(this);
            var target = parseInt($this.attr('data-target'));
            var duration = 2000;
            var increment = target / (duration / 16);
            var current = 0;
            
            var timer = setInterval(function() {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                $this.text(Math.floor(current));
            }, 16);
        });
    }

    // ===== Trigger Counter When Statistics Section is Visible =====
    $(window).on('scroll', function() {
        var statisticsSection = $('#statistics');
        if (statisticsSection.length) {
            var sectionTop = statisticsSection.offset().top;
            var sectionBottom = sectionTop + statisticsSection.outerHeight();
            var scrollPos = $(window).scrollTop() + $(window).height();
            
            if (scrollPos > sectionTop + 100) {
                startCounter();
            }
        }
    });

    // ===== Scroll Animations for Elements =====
    function checkScroll() {
        $('.animate-on-scroll').each(function() {
            var element = $(this);
            var elementTop = element.offset().top;
            var elementBottom = elementTop + element.outerHeight();
            var viewportTop = $(window).scrollTop();
            var viewportBottom = viewportTop + $(window).height();
            
            if (elementBottom > viewportTop && elementTop < viewportBottom - 100) {
                var animation = element.attr('data-animation') || 'animate__fadeInUp';
                var delay = element.attr('data-delay') || 0;
                
                setTimeout(function() {
                    element.addClass('animate__animated ' + animation);
                    element.addClass('animated');
                }, delay);
            }
        });
    }

    // Run on scroll and on load
    $(window).on('scroll', checkScroll);
    checkScroll();

    // ===== Scroll to Top Button =====
    $(window).scroll(function() {
        if ($(this).scrollTop() > 300) {
            $('#scrollTop').addClass('show');
        } else {
            $('#scrollTop').removeClass('show');
        }
    });

    $('#scrollTop').click(function() {
        $('html, body').animate({
            scrollTop: 0
        }, 800);
        return false;
    });

    // ===== Hero Carousel Auto-play Control =====
    var heroCarousel = $('#heroCarousel');
    
    heroCarousel.on('slid.bs.carousel', function() {
        // Add animation classes to captions when slide changes
        var activeSlide = $(this).find('.carousel-item.active');
        var caption = activeSlide.find('.carousel-caption');
        
        caption.find('h1').removeClass('animate__fadeInDown').addClass('animate__fadeInDown');
        caption.find('p').removeClass('animate__fadeInUp').addClass('animate__fadeInUp');
        caption.find('.btn').removeClass('animate__fadeInUp').addClass('animate__fadeInUp');
    });

    // ===== Feedback Carousel Settings =====
    $('#feedbackCarousel').carousel({
        interval: 5000,
        pause: 'hover'
    });

    // ===== Prevent Default for Empty Links =====
    $('a[href="#"]').click(function(e) {
        e.preventDefault();
    });

    // ===== Add Hover Effect to Formation Cards =====
    $('.formation-card').hover(
        function() {
            $(this).find('.card-icon').addClass('animate__animated animate__pulse');
        },
        function() {
            $(this).find('.card-icon').removeClass('animate__animated animate__pulse');
        }
    );

    // ===== Lazy Load Images (Optional Enhancement) =====
    function lazyLoadImages() {
        $('img[data-src]').each(function() {
            var $img = $(this);
            var src = $img.attr('data-src');
            
            if (isElementInViewport($img[0])) {
                $img.attr('src', src).removeAttr('data-src');
                $img.addClass('animate__animated animate__fadeIn');
            }
        });
    }

    function isElementInViewport(el) {
        var rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    $(window).on('scroll resize', lazyLoadImages);
    lazyLoadImages();

    // ===== Navbar Collapse on Mobile =====
    $('.navbar-nav>li>a').on('click', function() {
        if ($(window).width() < 992) {
            $('.navbar-collapse').collapse('hide');
        }
    });

    // ===== Form Validation (if you add a contact form later) =====
    $('form').on('submit', function(e) {
        var isValid = true;
        
        $(this).find('input[required], textarea[required]').each(function() {
            if ($(this).val() === '') {
                isValid = false;
                $(this).addClass('is-invalid');
            } else {
                $(this).removeClass('is-invalid');
            }
        });
        
        if (!isValid) {
            e.preventDefault();
            alert('Veuillez remplir tous les champs obligatoires.');
        }
    });

    // ===== Typing Effect for Hero Section (Optional Enhancement) =====
    function typeWriter(element, text, speed) {
        var i = 0;
        element.text('');
        
        function type() {
            if (i < text.length) {
                element.text(element.text() + text.charAt(i));
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // ===== Partner Logos Animation =====
    $('.partner-card').each(function(index) {
        $(this).css('animation-delay', (index * 0.1) + 's');
    });

    // ===== Testimonial Star Rating Hover Effect =====
    $('.stars i').hover(
        function() {
            $(this).addClass('animate__animated animate__pulse');
        },
        function() {
            $(this).removeClass('animate__animated animate__pulse');
        }
    );

    // ===== Dynamic Year in Footer =====
    var currentYear = new Date().getFullYear();
    $('.footer-bottom p').html($('.footer-bottom p').html().replace('2024', currentYear));

    // ===== Preloader (Optional) =====
    $(window).on('load', function() {
        $('#preloader').fadeOut('slow', function() {
            $(this).remove();
        });
    });

    // ===== Add Smooth Entrance Animation to All Cards on Load =====
    setTimeout(function() {
        $('.formation-card, .stat-card, .feedback-card, .partner-card').each(function(index) {
            var $this = $(this);
            setTimeout(function() {
                $this.css('opacity', '1');
            }, index * 100);
        });
    }, 500);

    // ===== Navbar Background Change on Scroll =====
    $(window).scroll(function() {
        var scroll = $(window).scrollTop();
        
        if (scroll >= 100) {
            $('.navbar').css({
                'background': 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
                'box-shadow': '0 10px 25px rgba(0, 0, 0, 0.15)'
            });
        } else {
            $('.navbar').css({
                'background': 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
                'box-shadow': '0 4px 6px rgba(0, 0, 0, 0.1)'
            });
        }
    });

    // ===== Social Media Share Buttons (Optional Enhancement) =====
    $('.social-share').click(function(e) {
        e.preventDefault();
        var platform = $(this).data('platform');
        var url = window.location.href;
        var shareUrl = '';
        
        switch(platform) {
            case 'facebook':
                shareUrl = 'https://www.facebook.com/sharer/sharer.php?u=' + url;
                break;
            case 'twitter':
                shareUrl = 'https://twitter.com/intent/tweet?url=' + url;
                break;
            case 'linkedin':
                shareUrl = 'https://www.linkedin.com/shareArticle?url=' + url;
                break;
        }
        
        if (shareUrl) {
            window.open(shareUrl, '_blank', 'width=600,height=400');
        }
    });

    // ===== Interactive Statistics Cards =====
    $('.stat-card').click(function() {
        $(this).addClass('animate__animated animate__tada');
        setTimeout(() => {
            $(this).removeClass('animate__animated animate__tada');
        }, 1000);
    });

    // ===== Formation Cards Click to Expand (Optional) =====
    $('.formation-card .btn').click(function(e) {
        e.preventDefault();
        var card = $(this).closest('.formation-card');
        
        // Toggle expanded class
        card.toggleClass('expanded');
        
        // Change button text
        if (card.hasClass('expanded')) {
            $(this).text('Réduire');
        } else {
            $(this).text('En savoir plus');
        }
    });

    // ===== Parallax Effect for Hero Section =====
    $(window).scroll(function() {
        var scroll = $(window).scrollTop();
        $('.carousel-item.active img').css({
            'transform': 'translateY(' + (scroll * 0.5) + 'px)'
        });
    });

    // ===== Add Animation to Elements on Hover =====
    $('.hvr-grow').hover(
        function() {
            $(this).addClass('animate__animated animate__pulse');
        },
        function() {
            $(this).removeClass('animate__animated animate__pulse');
        }
    );

    // ===== Intersection Observer for Better Performance (Modern Approach) =====
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = $(entry.target);
                    const animation = element.attr('data-animation') || 'animate__fadeInUp';
                    const delay = element.attr('data-delay') || 0;
                    
                    setTimeout(function() {
                        element.addClass('animate__animated ' + animation);
                        element.addClass('animated');
                    }, delay);
                    
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        $('.animate-on-scroll').each(function() {
            observer.observe(this);
        });
    }

    // ===== Enhanced Mobile Menu =====
    $('.navbar-toggler').click(function() {
        $(this).toggleClass('active');
    });

    // ===== Console Welcome Message =====
    console.log('%c🎓 Bienvenue sur SUPMTI Meknès! ', 
        'background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); color: white; font-size: 20px; padding: 10px; border-radius: 5px;');
    console.log('%cExcellence en Formation | Innovation & Technologie', 
        'color: #fbbf24; font-size: 14px; font-weight: bold;');

    // ===== Add Loading Animation to Images =====
    $('img').on('load', function() {
        $(this).addClass('animate__animated animate__fadeIn');
    });

    // ===== Keyboard Navigation Support =====
    $(document).keydown(function(e) {
        // Left arrow - previous carousel slide
        if (e.keyCode == 37) {
            $('.carousel').carousel('prev');
        }
        // Right arrow - next carousel slide
        if (e.keyCode == 39) {
            $('.carousel').carousel('next');
        }
        // Escape key - close mobile menu
        if (e.keyCode == 27) {
            if ($('.navbar-collapse').hasClass('show')) {
                $('.navbar-toggler').click();
            }
        }
    });

    // ===== Print Statistics to Console (Debug/Info) =====
    console.log('📊 SUPMTI Statistics:', {
        formations: 15,
        laureats: 2500,
        nationalites: 12
    });

    // ===== Easter Egg - Konami Code =====
    var konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    var konamiIndex = 0;
    
    $(document).keydown(function(e) {
        if (e.keyCode === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                activateEasterEgg();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });

    function activateEasterEgg() {
        $('body').addClass('animate__animated animate__flash');
        alert('🎉 Vous avez découvert le code secret de SUPMTI! Excellence unlocked! 🎓');
        setTimeout(function() {
            $('body').removeClass('animate__animated animate__flash');
        }, 1000);
    }

}); // End of document ready

// ===== Window Load Events =====
$(window).on('load', function() {
    // Trigger initial scroll check
    $(window).trigger('scroll');
    
    // Add loaded class to body
    $('body').addClass('loaded');
    
    // Initialize all tooltips (if using Bootstrap tooltips)
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});

// ===== Utility Functions =====

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Apply throttle to scroll events for better performance
$(window).on('scroll', throttle(function() {
    // Scroll-dependent functions are already attached
}, 100));
