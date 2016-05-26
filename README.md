###Wordpress Revision Slider###

This theme contains modifications to the Wordpress Twenty Fourteen theme which allows revisions to a post to be interactively displayed within the post itself rather than a hidden function. The goal of this software is to get readers comfortable with consuming stories written with version control.  

The main core of this happens in revisionslider.js . Implementation is in single.php and single-revision_slider.php. 

This theme has the following dependencies:

- diff_match_patch.js by Google (https://code.google.com/p/google-diff-match-patch/)
- WordPress JSON API Plugin (https://wordpress.org/plugins/json-api/) 

###Screenshot###
The slider on the right toggles additions and substractions from the story with red and green color codes.    

![slider](https://cloud.githubusercontent.com/assets/5178768/11008503/f80801bc-849e-11e5-95d7-794fa2700261.png)

###Installation Instructions###

This can be installed exactly as all other WordPress themes are installed. 

1. Place the wordpress-revision-slider folder in the `wp-content/themes` directory 
2. Log in to your WordPress Administration Panels.
3. Select the Appearance panel, then Themes.
4. From the Themes panel, activate the "Pathfinder Revision Slider" theme

## Origin
Revision Slider was developed at the National Geospatial-Intelligence Agency (NGA) by a federal government employee in the course of their employment, so it is not subject to copyright protection and is in the public domain. However, the public domain portions are considered improvements to a GPL-covered program. The software use, modification, and distribution rights are stipulated within the GNU General Public License.

###Pull Requests
If you'd like to contribute to this project, please make a pull request. We'll review the pull request and discuss the changes. All pull request contributions to this project will be released under the GPL 2 or later license.  

This project is in alpha and we need your help to improve it. 

Software source code previously released under an open source license and then modified by NGA staff is considered a "joint work" (see 17 USC 101); it is partially copyrighted, partially public domain, and as a whole is protected by the copyrights of the non-government authors and must be released according to the terms of the original open source license.

