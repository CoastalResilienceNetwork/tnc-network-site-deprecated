function loadSiteData() {
    $.ajax({
        url: 'sites.json',
        dataType: 'json',
        cache: false,
        success: showSiteData,
        error: function(resp) {
            alert('Error getting site data');
        }
    });
}

function showSiteData(siteData) {
    var template = $('#template-site-blocks').html();
    var output = _.template(template, siteData);
    $('#site-blocks').html(output);
}

