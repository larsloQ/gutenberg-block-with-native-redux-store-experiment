<?php

namespace Yours\Demo;

class NativeReduxBlock
{
    private static $instance;
    private static $blocknamespace = "yours-demo";
    private static $blockname      = "native-redux-block-demo";

    public static function instance()
    {
        if (!isset(self::$instance) && !(self::$instance instanceof NativeReduxBlock)) {
            self::$instance = new NativeReduxBlock;
            add_action('init', array(self::$instance, 'enqueue_gutenberg_scripts'));
            add_action('rest_api_init', array(self::$instance, 'register_rest_routes'));
        }
        return self::$instance;
    }

    /*
    {YOUR_WORDPRESS_URL}/wp-json/native/redux/demo/route 
     */
    public function register_rest_routes()
    {
        register_rest_route("/native/redux/", "demo/route", array(
            'methods'             => 'GET',
            'args'                => array(),
            'callback'            => array(self::$instance, "receive_items"),
            /* this is public, no permission */
            'permission_callback' => function () {return true;}, 
        ));
    }

    /*
    access this rest-route like so
    {YOUR_WORDPRESS_URL}/wp-json/native/redux/demo/route 
    we are using this route inside of the action with wp-apifetch
    do you query or similar
     */
    public function receive_items($params)
    {
        // $args                   = [];
        // $args['post_type']      = 'any';
        // $args['post_status']    = 'any';
        // $args['posts_per_page'] = -1; 
        // $terms                  = is_string($params['term_ids']) ? explode(",", $params['term_ids']) : $params['term_ids'];
        // $args['tax_query']      = array(
        //     array(
        //         'taxonomy' => $params['tax'],
        //         'field'    => 'id', //change to name or slug if necessary
        //         'terms'    => $terms, // before (wordpress 5.4) it was a string
        //     ),
        // );
        // $loop = new \WP_Query($args);
        // if (!$loop->have_posts()) {
        //     return [];
        // }
        // return rest_ensure_response($loop->posts);

        /* return just so mock data */
        $data=[
        	"apples" => random_int(0, 1000),
        	"bananas" => random_int(0, 1000),
        	"grapes" => random_int(0, 1000),
        ];
        return rest_ensure_response($data);

    }

    /* register block */
    public static function enqueue_gutenberg_scripts()
    {
        if (!function_exists('register_block_type')) {
            return;
        }
        // Enqueue assets blocks
        $block_path = '/assets/js/editor.blocks.js';
        $style_path = '/assets/css/blocks.editor.css';

        $name     = "editor-js-block-" . self::$blockname;
        $fullname = self::$blocknamespace . '/' . self::$blockname;

        // Enqueue the bundled block JS file
        wp_register_script(
            'js-' . $name,
            plugins_url($block_path, __FILE__),
            ['wp-i18n', 'wp-element', 'wp-editor', 'wp-blocks', 'wp-components'],
            filemtime(plugin_dir_path(__FILE__) . $block_path)
        );
        // register editor styles
        wp_register_style(
            'css-' . $name,
            plugins_url($style_path, __FILE__),
            [],
            filemtime(plugin_dir_path(__FILE__) . $style_path)
        );
        // Register Block
        register_block_type($fullname, array(
            'editor_script'   => 'js-' . $name,
            'editor_style'    => 'css-' . $name,
            'render_callback' => array(self::$instance, 'block_render'),
            'attributes'      => [
                'lat' => [
                    'type'    => 'number',
                    'default' => 40.416775,
                ],
                'lng' => [
                    'type'    => 'number',
                    'default' => -3.703790,
                ],
            ],
        ));
    }

    /* no frontend for now*/
    private function enqueue_frontend_scripts() {}


    public function block_render($attributes, $content)
    {
        return "<h1>DEMO OF REDUX NATIVE BLOCK</h1>";
    }

}
