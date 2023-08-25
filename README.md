# Setting for wordpress
## wp-config.php
```
define('FS_METHOD', 'direct');

// The URL where the WordPress application files are accessible
define( 'WP_SITEURL', '/blog' );
// URL where the front end is accessible
define( 'WP_HOME', '/blog' );

$_SERVER['REQUEST_URI'] = str_replace("/wp-admin/", "/blog/wp-admin/",  $_SERVER['REQUEST_URI']);

```