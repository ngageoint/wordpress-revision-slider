//revisionslider.js
 jQuery(document).ready(function() {    
     if(typeof(ajax_object) !== "undefined"){
      // if(ajax_object.post_type === 'post') {
           
        var keys = Object.keys(ajax_object.revisions) ;           
        var currentPostContent = ajax_object.revisions[keys[keys.length-1]].post_content; 
        var dmp = new diff_match_patch();
        var FADE_TIME = 500; 
        var GUTTER = 10; 
        var adminBarHeight =  jQuery("#wpadminbar").height() || 0; 
           
     
        var mastheadHeight = jQuery("#masthead").height(); 
        var headerHeight =     jQuery("#site-header").height(); 
        
        var $body = jQuery("body");
        var $window = jQuery(window); 
        $body.append( "<div id='slider-vertical'></div>" );
           
        var $slider = jQuery( "#slider-vertical" ); 
           
          
        $slider.slider({
            orientation: "vertical",
          
            min: 0,
            max: keys.length-1,
            start: function( event, ui ) {
                currentPostContent = ajax_object.revisions[keys[ui.value]].post_content;
            },
         
            stop: function( event, ui ) {
                var diffs = dmp.diff_main(currentPostContent, ajax_object.revisions[keys[ui.value]].post_content);   
                jQuery('.entry-content').html(dmp.diff_prettyHtml(diffs)); 
                jQuery('.revDelete, .revDelete > *').fadeOut(FADE_TIME, function(){
                    var myParent = jQuery(this).parent();
                    if(myParent.prop('tagName') === 'LI' && myParent.has('.revInsert').length === 0 ){
                        myParent.remove(); 
                    }
                }); 
                jQuery('.revInsert, .revInsert > *').fadeIn(FADE_TIME);
                
            }
        }).each(function() { // this each() adds labels to the slider for each revision
              // Get the number of possible values
              var vals = keys.length-1;
          
            // Space out values
              for (var i = 0; i <= vals; i++) {
               
                var d = jQuery.datepicker.formatDate('dd M yy', new Date(ajax_object.revisions[keys[i]].post_date.replace(/-/g,'/')) )
                  
                var el = jQuery('<label>'+ d +'</label>').css('top', (i/vals*100)+'%').css('position', 'absolute').css('left', '12px');

                $slider.append(el);

              }
        });
        $slider.css({top: adminBarHeight + mastheadHeight + headerHeight + GUTTER + 'px', left:jQuery("article").width() - $slider.width()} );
            
           
   
diff_match_patch.prototype.diff_prettyHtml = function(diffs) {
  var html = [];
 
  for (var x = 0; x < diffs.length; x++) {
    var op = diffs[x][0];    // Operation (insert, delete, equal)
    var data = diffs[x][1];  // Text of change.
    var text = data; //  .replace(pattern_amp, '&amp;').replace(pattern_lt, '&lt;').replace(pattern_gt, '&gt;').replace(pattern_para, '&para;<br>');
    switch (op) {
      case DIFF_INSERT:
        html[x] = '<ins class="revInsert">' + text + '</ins>';
        break;
      case DIFF_DELETE:
        html[x] = '<del class="revDelete">' + text + '</del>';
        break;
      case DIFF_EQUAL:
        html[x] = '<span>' + text + '</span>';
        break;
    }
  }
  return html.join('');
};
     
    updateRevisionSlider = function(){
          var myTop;   
        if( $body.hasClass("masthead-fixed") ){
            myTop = adminBarHeight + mastheadHeight +  GUTTER;
            $slider.css({top: myTop + 'px', height: $window.height() - myTop - mastheadHeight - GUTTER}  );  
        }else{
             myTop = adminBarHeight + GUTTER + mastheadHeight + headerHeight - $window.scrollTop()
             $slider.css({top: myTop + 'px', position:"fixed", height: $window.height() - myTop - mastheadHeight - GUTTER }  );
        }// */
    }
    $window.scroll(updateRevisionSlider);
        
        updateRevisionSlider(); 
      //  } // end the 2 main ifs 
     } // end the 2 main ifs 
  
  });