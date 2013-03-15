(function(N) {
    N.Map = function networkMap() {
        var _map;

        function initializeMap(callback) {
            _map = new esri.Map('map', {
                basemap: 'oceans',
                center: [-120.5, 25.5],
                zoom: 3,
                sliderStyle: 'small',
                logo: false
            });

            dojo.connect(_map, 'onLoad', function() {
                dojo.connect(_map.graphics,'onClick', scrollToRegion);
                dojo.connect(_map.graphics, 'onMouseOver', markerMouseOver);
                dojo.connect(_map.graphics, 'onMouseOut', markerMouseOut);

                // Proceed only when the map has loaded, when layers are ready
                callback();
            });

            return this;
        }

        function markerMouseOver(evt) {
            _map.setMapCursor('pointer');
            if (evt.graphic) {
                $(evt.target).tipsy({
                    gravity: 's',
                    title: function() {
                        return evt.graphic.attributes.name
                    }
                });
            }
        }

        function markerMouseOut(evt) {
            _map.setMapCursor('default');
        }

        function scrollToRegion(evt) {
            if (evt.graphic) {
                var $el = evt.graphic.attributes.$el;
                if (!$el.children().hasClass('active')){
                    $el.parent().find('.region-header').siblings().slideUp().removeClass('active');
                    $el.children().slideDown();
                    $el.find('.region-header').first().addClass('active');
                    $.scrollTo($el, 300);
				}
            }
        }

        function addMarker(region, el) {
            var marker = new esri.symbol.PictureMarkerSymbol({
                    "url":"img/map_marker.png",
                    "height":28,  // Scaled image to look nice, beware offsets
                    "width":35,  // below
                    "type":"esriPMS",
                    "xoffset": 7,  // Manual offsets center the 'pin-point' of
                    "yoffset": 14  // the marker to reflect the actual point.
                }),
                point = new esri.geometry.geographicToWebMercator(
                  new esri.geometry.Point(region.location[0],region.location[1])
                ),
                attributes = {name: region.name, $el: $(el)},
                graphic = new esri.Graphic(point, marker, attributes);

            _map.graphics.add(graphic);
        }

        return {
            init: initializeMap,
            addMarker: addMarker,
            esriMap: _map
        }
    }
}(TNC));