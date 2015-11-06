<?php
/**
 * Template Name: Posts in Page with Slider
 *
 * @package WordPress
 * @subpackage Twenty_Fourteen
 * @since Twenty Fourteen 1.0
 */

wp_enqueue_script( "jquery-ui-slider");
wp_enqueue_script( "jquery-ui-datepicker");
wp_enqueue_script( "difflib", get_template_directory_uri() . '/js/diff_match_patch.js');
wp_enqueue_script( "rangeJS", get_template_directory_uri() . '/js/revisionslider.js');

wp_enqueue_style( "rangeCSS", get_template_directory_uri() . '/css/revisionslider.css');
wp_enqueue_style( "diffCSS", get_template_directory_uri() . '/css/diffview.css');
wp_enqueue_style("jquery-ui-css", "https://code.jquery.com/ui/1.11.4/themes/ui-lightness/jquery-ui.min.css");
      
wp_localize_script( 'rangeJS', 'ajax_object',
                   array( 'ajax_url' => admin_url( 'admin-ajax.php' ), 
                      'rev_url' => 'index.php', 
                      'postID' => get_the_ID(),
                      'revisions' => wp_get_post_revisions(get_the_ID()),
                     'post_type' =>  get_post_type( get_the_ID() )
                    ) 
);


              
the_content(); 
?>
		
