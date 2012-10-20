$(document).on('pageinit', '#infoPage', function() {
    
    console.log("newpage init");
    $.getJSON('../mockup/data.js', function(data) {
        var items = [];
       console.log(data)
        $.each(data.results, function(key, val) {
           
            //generate the node
            console.log(data)
            items.push($('#infoTmpl').render(val));            
            //store the data to the node 
            $('#infoList').data(val.nodeId,val);
            
        });
       
        $("#infoList").append(items).listview("refresh");
    })
    .success(function() { console.log("second success"); })
    .error(function() { console.log('error');})
    .complete(function() { console.log("complete"); 
    });
    
    $('#infoList').delegate('li', 'tap', function (event) {

        var aId =  $(this).attr('id');
        var data =  $('#infoList').data(aId);
        data.pageId = "infoDetails" +aId;
        console.log(data.pageId);

        $(document.body).append($("#infoDetailsTmpl").render(data));
      
        //Grab a reference to that shiney new page
        var newpage = $("#"+data.pageId);
        console.log(newpage);
       // Add auto remove
       newpage.attr( "data-" + $.mobile.ns + "external-page", true ).one( 'pagecreate', $.mobile._bindPageRemove);

    
       // Fisrt solution, i add the $.mobile.initializePage() but then the transition go through the main page
       //$.mobile.initializePage();
       $.mobile.changePage("#"+data.pageId);

       // Second solution, I use the page object to change page but then when i go back from the details view,
       // I go back straight to the welcome page
       //$.mobile.changePage($("#"+data.pageId));
       
       event.stopPropagation();
       event.preventDefault();
    
    });
    
});
