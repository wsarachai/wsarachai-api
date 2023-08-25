docker build -t wsarachai/itscidev-wordpress .
docker push wsarachai/itscidev-wordpress

docker run -d --rm -p 3333:80 --name wordpress --network local-net wsarachai/itscidev-wordpress

kubectl exec -it wordpress-deployment-5884f47cb4-lmd2f -- /bin/bash
kubectl cp wordpress-deployment-5884f47cb4-lmd2f:/var/www/html/wp-config.php .
kubectl cp wordpress-deployment-5884f47cb4-lmd2f:/var/www/html/wp-config.php ~/wp-config.php

// The URL where the WordPress application files are accessible
`define( 'WP_SITEURL', 'http://www.sarachai.com/blog' );`
// URL where the front end is accessible
`define( 'WP_HOME', 'http://www.sarachai.com/blog' );`

`$_SERVER['REQUEST_URI'] = str_replace("/wp-admin/", "/blog/wp-admin/", $\_SERVER['REQUEST_URI']);`
