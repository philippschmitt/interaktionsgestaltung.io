$(document).ready(function(){

	// Scrollen animieren
	$('a').click(function(e) {
		if( $(this).attr('href').charAt(0) === '#' && ! $(this).hasClass('blockScroll') ) {
			e.preventDefault();
			
			var scrollSpeed = $($(this).attr('href')).offset().top;
				scrollSpeed = Math.abs( scrollSpeed - $(window).scrollTop() ) / 3;
				
				if( scrollSpeed < 1000 ) scrollSpeed = 1000;
				if( scrollSpeed > 3000 ) scrollSpeed = 3000;
					
			
			$( $(this).attr('href') ).animatescroll({
				scrollSpeed: scrollSpeed,
				easing: 'easeInOutQuint'
			});
			
			var _hash = $(this).attr('href');
			
			var wait = setInterval(function() {
				location.hash = _hash;
				clearInterval(wait);
			}, scrollSpeed+10);
			
			return false;
		}
	});
	

	// Slideshow
	$('#slideshow').css({
		height: $(window).height() - $('#caption').outerHeight()
	});
	
	$('#that-is').css({
		lineHeight: $(window).height() - $('#caption').outerHeight()+'px'
	});
	
	var slides = $('#slideshow').find('.slide')
		.css({
			height: $(window).height() - $('#caption').outerHeight()
		});
		
	var textContainer = $('#that-is').find('a');
		
	var activeSlide = 0;
	
	var nextSlide = function () {
	
		// nächste Slide auswählen
		activeSlide++;
		if(activeSlide > slides.length-1) {
			activeSlide = 0;		
		}
		
		$('.activeSlide').removeClass('activeSlide');
		$(slides[activeSlide]).addClass('activeSlide');
		
		textContainer.html( $(slides[activeSlide]).html() );
		textContainer.attr('href', $(slides[activeSlide]).attr('data-link') );
		
	};
	
	// automatisch sliden
	var autoSlideshow = setInterval(nextSlide, 5000);
	
	// DROPDOWN MENU
	// margin-left je nach Breite d. Menüs anpassen
	$('header').find('li.mmenu').each(function() {
		var dd = $(this).find('.dropdown');
		dd.css({
			marginLeft: Math.abs( dd.width() - $(this).width() ) / -2
		});
	});
	
	
	// STICKY MENU
	var windowHeight = 0,
		scrollDistance = 0;
    
	windowHeight = window.innerHeight;
	$(window).scroll(function(){onscroll();});
	
	function onscroll() {
		windowHeight = window.innerHeight;
		scrollDistance = $(window).scrollTop();
		var menu_offset = $('menu').offset().top;
		var menu_height = $('menu').height();
		
		if(scrollDistance > windowHeight){
			
			$('main').css({
				marginTop: menu_height
			});
			
			$('menu').addClass('fix');
			$('menu').removeClass('scroll');
		}else{
			
			$('main').css({
				marginTop: 0
			});
			
			$('menu').addClass('scroll');
			$('menu').removeClass('fix');
		}
	}
    
    
    
    // STAFF PICK NAV
    var pSlider = $('#p-slideshow'),
    	pSlides = pSlider.find('.p-slide'),
    	pActiveSlide = 0,
    	pOffset = 0,
    	pSpeed = 4000;
    	var pAutoSlide;
    	
    	// Breit des Containers anpassen
    	pSlider.find('#p-container').css({
    		width: pSlides.length * pSlider.width()
    	});
    	
    	// Breite der Slides anpassen
    	pSlides.css({
    		width: pSlider.width()
    	});
    	
    	// Durchswitchen
		pSlider.find('a#p-nav').click(function(e) {
			e.preventDefault();
			
			pNextSlide();
			
			// clearInterval(pAutoSlide);
			// pAutoSlide = setInterval(pNextSlide, pSpeed);
						
			return false;
		});
		
		// zum nächsten Projekt sliden
		var pNextSlide = function() {
			
			// Offset verschieben			
			pActiveSlide++;
			if( pActiveSlide === pSlides.length ) pActiveSlide = 0;
			var pOffset = -1 * pActiveSlide * pSlider.width();
			
			// Container verschieben
			pSlider.find('#p-container').css({
				marginLeft: pOffset
			});
		};
		
		// Automatisch abspielen
		// pAutoSlide = setInterval(pNextSlide, pSpeed);
    	
    	/*
	    	pSlider.hover(function() {
	    		clearInterval(pAutoSlide);
	    	}, function() {
	    		pAutoSlide = setInterval(pNextSlide, pSpeed);
	    	});
    	*/
		
		// Resize	
		function resizeContent() {
		
			pActiveSlide = 0;
			pSlider.find('#p-container').css({
				marginLeft: 0
			});
			
			// clearInterval(pAutoSlide);

			$('#slideshow').css({
				height: $(window).height() - $('#caption').outerHeight()
			});
			
			$('#that-is').css({
				lineHeight: $(window).height() - $('#caption').outerHeight()+'px'
			});
			
			slides.css({
				height: $(window).height() - $('#caption').outerHeight()
			});
			
			$('header').find('li.mmenu').each(function() {
				var dd = $(this).find('.dropdown');
				dd.css({
					marginLeft: Math.abs( dd.width() - $(this).width() ) / -2
				});
			});
			
			// Breit des Containers anpassen
			pSlider.find('#p-container').css({
				width: pSlides.length * pSlider.width()
			});
			
			// Breite der Slides anpassen
			pSlides.css({
				width: pSlider.width()
			});
		}
		
		
		$(window).resize( resizeContent );
});





