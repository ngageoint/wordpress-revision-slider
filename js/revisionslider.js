//revisionslider.js
 jQuery(document).ready(function() {    
     if(typeof(ajax_object) !== "undefined"){
      // if(ajax_object.post_type === 'post') {
           
        var keys = Object.keys(ajax_object.revisions) ;   
         console.log(keys,keys.length); 
         
         if(keys.length <= 1) return; 
         
        var currentPostContent = ajax_object.revisions[keys[keys.length-1]].post_content; 
         var oldPostIndex = keys.length-1;
        var dmp = new diff_match_patch();
        var FADE_TIME = 1000; 
        var GUTTER = 10; 
        var adminBarHeight =  jQuery("#wpadminbar").height() || 0; 
           
     console.log("oldPostIndex", oldPostIndex); 
        var $masthead = jQuery("#masthead");
        var mastheadHeight = $masthead.height();  
        var headerHeight =     jQuery("#site-header").height(); 
        
        var $body = jQuery("body");
        var $window = jQuery(window); 
        //$body.append( "<div id='revChanger'><form> <span class='ui-icon ui-icon-triangle-1-w' style='display:inline-block;'></span><select id='revSelect'></select><span class='ui-icon ui-icon-triangle-1-e' style='display:inline-block;'></span></form><div id='slider-vertical'></div></div>" );
           
        var $slider = jQuery( "#slider-vertical" ); 
        var $select = jQuery("#revSelect"); 
        var $revs = jQuery("#revChanger"); 
        var $changeList; 
         var windowOffset = (jQuery(window).height() / 2)*-1;
          

         
          $slider.slider({
            orientation: "vertical",
          
            min: 0,
            max: keys.length-1,
            value: keys.length-1,
            start: function( event, ui ) {
                //currentPostContent = ajax_object.revisions[keys[ui.value]].post_content;
                oldPostIndex = ui.value;
            },
         
            stop: function( event, ui ) {  
            
                $select.prop("selectedIndex", ui.value);
                $select.change();
            }
        })
         
        var vals = keys.length-1;
        var counter = 0; 
            // Space out values
             for (var i = vals; i >= 0; i--) {
            // for (var i = 0; i <= vals; i++) {  
                var jsDate = new Date(ajax_object.revisions[keys[i]].post_date.replace(/-/g,'/')) ;
                var d = jQuery.datepicker.formatDate('dd M yy', jsDate)
                var lbl = jQuery('<div class="callout right" id="callout-' + counter + '"><b>Revision ' + i + ':</b> <br/>'+ d +'<br/>' + ("0" +String(jsDate.getHours())).slice(-2) +  ("0" +String(jsDate.getMinutes())).slice(-2) + '</div>').css({position: 'absolute', left: '12px', top: (counter/vals*100)+'%', marginTop: "-22px"});
                $slider.append(lbl);
                  
                console.log(lbl.css("top"));  
                var opt = jQuery('<option>'+ d +'</option>');
                $select.append(opt);
                counter++; 
              }
         
      //  $revs.css({top: adminBarHeight + mastheadHeight + headerHeight + GUTTER + 'px', left:jQuery("article").width() - $select.width()} );
            
       $select.change(function(){
              
             document.updateArticleToRevision(this.selectedIndex); 
            $slider.slider({value: this.selectedIndex});
       });
    jQuery(".callout").click(function(){
        var id = jQuery(this).prop("id");
        id = id.substring(id.indexOf("-")+1,id.length);
        
        $select.prop("selectedIndex", id); // keys.length-1-id
    });
         
    jQuery("#revChanger span.ui-icon").click(function(){
        var selInd = $select.prop("selectedIndex");
 
        if(jQuery(this).hasClass("ui-icon-triangle-1-w")){ //next
           if(selInd+1 < $select.prop("length") )
                $select.prop("selectedIndex", selInd+1);
            else return; 
        }else{      // prev
            if( selInd > 0)
                $select.prop("selectedIndex", selInd-1);
            else return; 
        }
        $select.change(); 
        $slider.slider('value',keys.length-1-$select.prop("selectedIndex"));
    });
         
    this.updateArticleToRevision = function(idx){
       
        console.log(oldPostIndex, idx); 
       // console.log(ajax_object.revisions[keys[oldPostIndex]].post_content)
        //console.log(ajax_object.revisions[keys[idx]].post_content); 
        
        var diffs = dmp.diff_main(ajax_object.revisions[keys[oldPostIndex]].post_content, ajax_object.revisions[keys[idx]].post_content); 
        
        dmp.diff_cleanupSemantic(diffs); 
        
        jQuery('.entry-content').html(dmp.diff_prettyHtml(diffs)); 


         oldPostIndex = idx; 
        
        
        var changes = []; 
        var changeIndex = 0;
        if($changeList){
            $changeList.stop();
            $changeList.clearQueue(); 
        }
       $changeList = jQuery('.revDelete,  .revInsert');
        $changeList.stop();
        $changeList.clearQueue(); 
        
        $changeList.each( function(i, el){
           el = jQuery(el); 
            console.log("changlist el", el);
            if(!jQuery.trim(el.html())==''){
                console.log("adding ", el.html());
                changes.push(el);       
            }
       }); 
         currentPostContent = ajax_object.revisions[keys[idx]].post_content;
    
     //   console.log("changes", changes); 
       console.log("changes.length", changes.length);  
    if(changes.length > 0){
           fadeAndHighlight();

          //  jQuery('body').animate({scrollTop:jQuery('.revDelete').offset().top},250, function(){
           /* jQuery('.revDelete, .revDelete > *').fadeOut(FADE_TIME, function(){
                var myParent = jQuery(this).parent();
                if(myParent.prop('tagName') === 'LI' && myParent.has('.revInsert').length === 0 ){
                    myParent.remove(); 
                }
            }); // */
           // }); 
           // jQuery('.revInsert, .revInsert > *').fadeIn(FADE_TIME);

            var curTop = document.scrollTop;
            function fadeAndHighlight(){

                var $me = changes[changeIndex]; 
                //console.log("scrolling", $me.html() );
                var nextTop = $me.offset().top - mastheadHeight - adminBarHeight; 

                if(nextTop != curTop){
                    console.log("scrolling")
                    //jQuery('html, body').animate({scrollTop:curTop },250, fadeInOut)
                    jQuery('html, body').scrollTo($me, 250, {onAfter: fadeInOut, offset:{top:windowOffset}}); 
                }else{
                    console.log("not scrolling"); 
                    fadeInOut();
                }

                function fadeInOut(){
                     //console.log($me, jQuery(this)); 
                    if($me.hasClass("revDelete")){
                       $me.fadeOut(FADE_TIME, function(){
                           //console.log("fade out", $me, jQuery(this), $me.parent().prop("tagName") ); 
                            var myParent = $me.parent();
                            if(myParent.prop('tagName') === 'LI' && myParent.has('.revInsert').length === 0 ){
                                myParent.remove(); 
                               changes.splice(changeIndex); 
                            }
                           nextChange();
                        });
                    }
                    else if($me.hasClass("revInsert")){
                        console.log("gonna fade in ", $me.html()); 
                        $me.fadeIn(FADE_TIME, function(){
                            console.log("done fading", $me.html()); 
                            nextChange();
                        });
                    } // */ 
                }
                function nextChange(){
                    if(changeIndex < changes.length-1){
                        changeIndex++; 
                        fadeAndHighlight();
                   }else{
                       curTop = nextTop; 
                   }
                }
            }
        }
     }
    
    
   
diff_match_patch.prototype.diff_prettyHtml = function(diffs) {
  var html = [];
 
  for (var x = 0; x < diffs.length; x++) {
    var op = diffs[x][0];    // Operation (insert, delete, equal).
    var text = diffs[x][1]; 
      console.log( op, "change #", x , " text: ", text); 
    switch (op) {
      case DIFF_INSERT:
            if(text.indexOf("<li>") !== -1){
                var $text = jQuery(text).wrapInner('<ins class="revInsert"></ins>')    
                console.log("INS $text.html()",  $text.prop('outerHTML'), text );
                html[x] = $text.prop('outerHTML');//'<b>INS</b><ins class="revInsert">' + text + '</ins><b>/INS</b>';
            }
            else{
                html[x] = '<ins class="revInsert">' + text + '</ins>';
            }
        break;
      case DIFF_DELETE:
            if(text.indexOf("<li>") !== -1){
                var $text = jQuery(text).wrapInner('<del class="revDelete"></del>')    
                console.log("DEL $text.html()", $text.prop('outerHTML'), text );
                html[x] = $text.prop('outerHTML');
            }else{
                html[x] = '<del class="revDelete">' + text + '</del>';
            }
        break;
      case DIFF_EQUAL:
        if(text.indexOf("li>") === -1)
            html[x] = '<span>' + text + '</span>';
        else
            html[x] = text; 
        break;
    }
  }
  return html.join('');
};
     
var timer; 
         
    /*updateRevisionSlider = function(){
          var myTop;   
        
       if( $body.hasClass("masthead-fixed") ){
            myTop = adminBarHeight + mastheadHeight +  GUTTER;
            $revs.css({top: myTop + 'px', height: $window.height() - myTop - mastheadHeight - GUTTER}  );  
            //clearTimeout(); 
       
            timer = false;
        }else{
             myTop = adminBarHeight + GUTTER + mastheadHeight + headerHeight - $window.scrollTop()
             $revs.css({top: myTop + 'px', position:"fixed", height: $window.height() - myTop - mastheadHeight - GUTTER }  );
            if(!timer){
                timer = setTimeout(updateRevisionSlider, 500); 
               
            }
        }// *
       
    }
    $window.scroll(updateRevisionSlider);
        
    updateRevisionSlider(); */
      //  } // end the 2 main ifs 
     } // end the 2 main ifs */
  
  });