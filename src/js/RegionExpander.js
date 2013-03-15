(function(N){
    N.regionExpander = function($el, scroll) {
        if (!$el.children().hasClass('active')){

            // Remove any current actives
            $('.row.content').find('.region-header')
                .removeClass('active').siblings().slideUp();

            // If this is a nested region, the parents have to be activated
            var isChild = $el.parents().children('.region-header').length > 0;
            if (isChild) {
                $el.parents().children('.region-header')
                    .addClass('active')
                    .siblings().slideDown(function() {
                        if (scroll) {
                            // After the element has expanded fully, scroll the
                            // window to make sure the last child is shown
                            var $dest = $($el.children().last()),
                                top = $dest.offset().top - $dest.height();
                            $('body').animate({scrollTop: top}, 400);
                        }
                    });
            }

            // Apply activation to the selected region
            $el.find('.region-header').first().addClass('active');

            /*$el.children().slideDown(function() {
                if (scroll) {
                    // After the element has expanded fully, scroll the
                    // window to make sure the last child is shown
                    var $dest = $($el.children().last()),
                        top = $dest.offset().top - $dest.height();
                    $('body').animate({scrollTop: top}, 400);
                }

            });*/

        }
    }
})(TNC);