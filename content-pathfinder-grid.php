<?php
/**
 * The template for displaying featured posts on the front page
 *
 * @package WordPress
 * @subpackage Twenty_Fourteen
 * @since Twenty Fourteen 1.0
 */
?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<a class="post-thumbnail" href="<?php the_permalink(); ?>">
	<?php
		// Output the featured image.
		if ( has_post_thumbnail() ) :
			//if ( 'grid' == get_theme_mod( 'featured_content_layout' ) ) {
				//the_post_thumbnail('thumbnail');
			//} else {
				the_post_thumbnail( 'thumbnail' );
//			}
		endif;
	?>
	</a>

	<header class="entry-header">
		<?php if ( in_array( 'category', get_object_taxonomies( get_post_type() ) ) && twentyfourteen_categorized_blog() ) : ?>
		<div class="entry-meta">
			<span class="cat-links"><?php echo get_the_category_list( _x( ', ', 'Used between list items, there is a space after the comma.', 'twentyfourteen' ) ); ?></span>
		</div><!-- .entry-meta -->
        
		<?php endif; 
        echo '<div class="main-grid-entry">';
        the_title( '<h1 class="entry-title"><a href="' . esc_url( get_permalink() ) . '" rel="bookmark">','</a></h1>' ); 
        the_excerpt();
        $categories =  get_the_category(get_the_ID() );
                    echo "</div>";
                    echo "<div class='more-posts'><h3 class='page-title' >More posts in <i>" . $categories[0]->name . "</i></h3>";
                    echo "<ul>";
                        $catPosts = new WP_Query('category_name='. $categories[0]->name ); //.'&showposts=5'

                        while ($catPosts->have_posts()) : $catPosts->the_post()  ;
                           // $catPosts->the_post();
                           
                                 echo '<li><a href="'. get_the_permalink() .'" rel="bookmark">'. get_the_title() . '</a></li>'; 
                        endwhile; 
                    echo "</ul></div>";
                    wp_reset_postdata();
        ?>
        
	</header><!-- .entry-header -->
</article><!-- #post-## -->
