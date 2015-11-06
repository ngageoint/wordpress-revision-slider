<?php
/**
 * Template Name: Custom Fields (Explainer)
 *
 * @package WordPress
 * @subpackage Twenty_Fourteen
 * @since Twenty Fourteen 1.0
 */

wp_enqueue_script( "jquery-ui-slider");
wp_enqueue_script( "jquery-ui-datepicker");
wp_enqueue_script( "difflib", get_template_directory_uri() . '/js/diff_match_patch.js');
wp_enqueue_script( "rangeJS", get_template_directory_uri() . '/js/revisionslider.js');
wp_enqueue_script( "scrollTo", 'http://cdnjs.cloudflare.com/ajax/libs/jquery-scrollTo/2.1.0/jquery.scrollTo.min.js');

add_action('wp_enqueue_scripts', 'load_css_files');

function load_css_files() {
   wp_register_style( 'rangeCSS', get_template_directory_uri() . '/css/revisionslider.css');
    wp_register_style( 'Twenty Fourteen', get_stylesheet_uri(), array( 'rangeCSS' ));
    wp_enqueue_style( "rangeCSS");
    wp_enqueue_style( "diffCSS", get_template_directory_uri() . '/css/diffview.css');
    wp_enqueue_style("jquery-ui-css", "https://code.jquery.com/ui/1.11.4/themes/ui-lightness/jquery-ui.min.css");
}

wp_localize_script( 'rangeJS', 'ajax_object',
                   array( 'ajax_url' => admin_url( 'admin-ajax.php' ), 
                      'rev_url' => 'index.php', 
                      'postID' =>  get_field('story_post_id'),
                      'revisions' => wp_get_post_revisions( get_field('story_post_id')),
                     'post_type' =>  get_post_type(  get_field('story_post_id') )
                    ) 
);

get_header(); ?>

 <!-- Text -->

<?php

if(get_field('background_explainer')){
 $background =   get_field('background_explainer'); 
}
            if(get_field('story_post_id')){
                //echo "i have a story post id, it's " . get_field('story_post_id');
                query_posts('p='. get_field('story_post_id') );
                while (have_posts()): the_post();
                
                ?>
<div id="main-content" class="main-content">


 
	<div id="primary" class="content-area">
        
       <?php  the_title( '<h1 class="entry-title">', '</h1>' ); ?>
		<div id="content" class="site-content pathfinder-3col" role="main">
            
            <div id="left-col" class="pathfinder-column">
                <div id="background-explainer">
                
               
                    <h2 class="page-title background-title">Background</h2>
                   <?php  //if the field is not empty
                        echo '<p>' . $background . '</p>'; //display it
                    ?>
                </div  >
                <div id="latest-posts">
                    <h2 class="page-title background-title">latestxxxxxxxxxxxxxxx posts</h2>
                
                </div>
            </div>
                
           
            
            <article id="post-<?php the_ID(); ?>" <?php post_class('pathfinder-column'); ?>>
                <div class="entry-content">
			<?php
                  
                   the_content();
                ?>
             </div>
       
          
            </article>
            
             <div id="revChanger" class="pathfinder-column">
                 <div class="rev-select-box">
                <form> 
                    <span class='ui-icon ui-icon-triangle-1-w' style='display:inline-block;'></span>
                    <select id='revSelect'></select>
                    <span class='ui-icon ui-icon-triangle-1-e' style='display:inline-block;'></span>
                </form>
                     </div>
                <div id='slider-vertical'></div>
            </div>
		</div><!-- #content -->
       
	</div><!-- #primary -->
     
</div><!-- #main-content -->

<?php   endwhile; // */
         
            }
                    ?>

<?php
get_sidebar();
get_footer();
