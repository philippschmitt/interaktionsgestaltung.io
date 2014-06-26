console.log('Wer das liest, muss sich bewerben!'); // Du musst!
console.log(' '); // Leerzeile
console.log(' '); // Leerzeile

var recalc = true;
		
$(document).ready(function(){

	// Sticky Scroll + Sticky Menu
	// mobile
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		// deaktiviert
		
	// desktop
	} else {
	
		// STICKY SCROLL
		$(".text").stick_in_parent();
		
		setTimeout(function(){
			$(document.body).trigger("sticky_kit:recalc");
		},5000);
		
		
		$( window ).load(function() {
			$(document.body).trigger("sticky_kit:recalc");
			recalc = false;
			// Handler for .load() called.
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
	}
	

	function setActive(_name){
	        $('.mmenu.active').removeClass('active');
	        $('#menu_kontakt').removeClass('active');
	        //console.log(_name);
	
	        switch(_name){
	          case 'hochschule':
	            $('#menu_hochschule').addClass('active');
	          break;
	
	          case 'studium':
	            $('#menu_studium').addClass('active');
	          break;
	
	          case 'bewerbung':
	            $('#menu_bewerbung').addClass('active');
	          break;
	
	          case 'studentenleben':
	            $('#menu_studentenleben').addClass('active');
	          break;
	
	          case 'kontakt':
	            $('#menu_kontakt').addClass('active');
	          break;
	        }
	      }
	
	       $('#studium').waypoint(function() {
	          setActive('studium');
	      }, { offset: '20px' });
	
	      $('#studentenleben').waypoint(function() {
	        setActive('studentenleben');
	      }, { offset: '20px' });
	
	      $('#studentenleben').waypoint(function(direction) {
	        if(direction === 'up'){
	          setActive('studium');
	        }
	      }, { offset: '50%' });
	
	      $('#hochschule').waypoint(function() {
	        setActive('hochschule');
	      }, { offset: '20px' });
	
	      $('#hochschule').waypoint(function(direction) {
	        if(direction === 'up'){
	          setActive('studentenleben');
	        }
	      }, { offset: '50%' });
	
	       $('#bewerbung').waypoint(function() {
	        setActive('bewerbung');
	      }, { offset: '20px' });
	
	       $('#bewerbung').waypoint(function(direction) {
	        if(direction === 'up'){
	          setActive('hochschule');
	        }
	      }, { offset: '50%' });
	
	       $('#kontakt').waypoint(function() {
	        setActive('kontakt');
	      }, { offset: '20px' });
	
	       $('#kontakt').waypoint(function(direction) {
	        if(direction === 'up'){
	          setActive('bewerbung');
	        }
	      }, { offset: '50%' });
	
	
		   // Videos einpassen
		   $('figure').fitVids();	

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





