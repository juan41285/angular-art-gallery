# Angular Art Gallery

Latest trends in Front-End development with a touch of the best practises.

## Features
* [Masonry 3](http://masonry.desandro.com/) for mason blocking images.
* [Bootstrap 3](https://github.com/twitter/bootstrap/tree/3.0.0-wip) for responsive layout.
* [ngCookies](https://github.com/angular/code.angularjs.org/tree/master/1.1.5) for stateful experience.
* [Angular Imgur API](https://github.com/gigablox/angular-imgur-api) for dynamic images.
* [Angular-Masonry](https://github.com/passy/angular-masonry) directive.

## Getting Started
Clone the repository  
`git clone git@github.com:gigablox/angular-art-gallery.git`    

### Compiled Examples
These are ready to go for development and production environments. 

`/examples/development`  
`/examples/production`

### Build Your Own
This AngularJS project is wrapped in commonly used front end development tools to save you time. Development and production environments are configured to inject static assets managed by bower. Production build concats and compresses.
#### Install the dependencies  
`cd angular-art-gallery`  
`npm install`  
`bower install`  

#### Get an Imgur API key
[Get an Imgur API key](https://api.imgur.com/) and add it to your `app.config`  

<pre>
$imgurGlobalProvider.options({
  apiKey:'1234567890abcdefgh',
  account:'YourAccountName'
});
</pre>

#### Build your app with Grunt Tasks
`grunt package:dev`  
`grunt package:dev:watch`  
`grunt package:prod`  

#### Point your doc-root
`/build/development`  
`/build/production`

#### pushState Support
Nginx pushState `server{}` rules  
<pre>
### Need this for $locationProvider.html5Mode(true);
location / {
   try_files $uri /index.html;
}
</pre>

Apache pushState `.htaccess` rules  
<pre>
### Need this for $locationProvider.html5Mode(true);
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_URI} !index
RewriteRule (.*) index.html [L]
</pre>

Here are more complete rules for both [Nginx]() and [Apache]()

## License
Copyright (c) 2013 Daniel Kanze (@gigablox) Licensed under the MIT License.
