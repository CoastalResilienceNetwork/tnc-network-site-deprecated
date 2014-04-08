(function(N) {
    N.Map = function networkMap() {
        var _map,
            pointSymbol = new esri.symbol.SimpleMarkerSymbol(
                esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, 2,
                new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID,
                    new dojo.Color([105, 105, 105]), 1),
                new dojo.Color([80, 80, 80, 0.35]));

        function initializeMap(callback) {
            _map = new esri.Map('map', {
                basemap: 'oceans',
                center: [-93, 34.5],
                zoom: 4,
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
            if (evt.graphic && evt.graphic.attributes) {
                var el = N.SvgDomWrapper(evt.target);
                $(el).tipsy({
                    gravity: 's',
                    title: function() {
                        return evt.graphic.attributes.name
                    },
                    trigger: 'manual'
                }).tipsy('show');
            }
        }

        function markerMouseOut(evt) {
            _map.setMapCursor('default');
            $(evt.target).tipsy('hide');
        }

        function scrollToRegion(evt) {
            if (evt.graphic && evt.graphic.attributes && evt.graphic.attributes.$el) {
                var $el = evt.graphic.attributes.$el.children('.region-header');
                N.regionExpander($el, {scroll: true, clickToClose: false});
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
                graphic = new esri.Graphic(point, marker, attributes),
                smallPoint = new esri.Graphic(point, pointSymbol);

            _map.graphics.add(graphic);
            _map.graphics.add(smallPoint);
        }

        return {
            init: initializeMap,
            addMarker: addMarker,
            esriMap: _map
        }
    }
}(TNC));