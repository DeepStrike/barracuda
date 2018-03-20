var lines = document.querySelectorAll('.line-reveal__elem');

for (var i = 0; i < lines.length; i++) {
	(function(line, time) {
		setTimeout(function() {
			line.classList.add('show');
		}, time)
	})(lines[i], i * 500);
}

;(function(window) {

  'use strict';

  function init() {
    [].slice.call(document.querySelectorAll('.pagination')).forEach(function(nav) {

      var navItems = [].slice.call(nav.querySelectorAll('.pagination__item')),
        itemsTotal = navItems.length,
        setCurrent = function(item) {
          // return if already current
          if( item.classList.contains('pagination__item--current') ) {
            return false;
          }
          // remove current
          var currentItem = nav.querySelector('.pagination__item--current');
          currentItem.classList.remove('pagination__item--current');
          

          // set current
          item.classList.add('pagination__item--current');

          //----------------------------------------
          // Slider purrent
          var slideActive = document.querySelector('.flex-active');
          const next = item.dataset.slide;
          const current = slideActive.dataset.slide;

          if (next !== current) {
            var el = document.querySelector('.promo__img-wrap')
                             .querySelectorAll(`.img-inner[data-slide=\"${next}\"]`);

            // el[0].classList.add('flex-preStart');

            slideActive.classList.add('animate-end');
            
           
            el[0].classList.remove('animate-start');
            el[0].classList.add('flex-active');
            slideActive.classList.add('animate-start');
            slideActive.classList.remove('animate-end', 'flex-active');
          }
        };


      
      navItems.forEach(function(item) {
        item.addEventListener('click', function(e) { 
          setCurrent(item); }, 
          false);
      });

    });
  }

  init();

})(window);



