export default () => {
    if(typeof $vtex == 'function') {
        const $ = $vtex;
        if($('.image-zoom').length) {
            var resetZoom = function () {
                window.LoadZoom = function () {
                    var optionsZoom = {
                        zoomType: 'innerzoom',
                        zoomWidth: $vtex('.image-zoom').width(),
                        zoomHeight: $vtex('.image-zoom').height()
                    };

                    $(".image-zoom").jqzoom(optionsZoom);
                };

                LoadZoom(0);
            };

            resetZoom();
            $(window).resize(() => resetZoom());
        }
    }
}
