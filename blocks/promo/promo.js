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
        };
      
      navItems.forEach(function(item) {
        item.addEventListener('click', function() { setCurrent(item); });
      });
    });
  }

  init();

})(window);