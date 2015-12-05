#A simplified MEAN Seed that is kind of Nice.
This example uses [Materialize](http://materializecss.com/) as a framework + UI package, however [Bootstrap](http://getbootstrap.com/) is also a recommended package.

##Stack Used
* Node.js
* Express
* Angular
* Mongoose (A MongoDB Plugin)

##Usage 
Open up your terminal, navigate to a safe directory, and perform the following commands to get started. Note: Do not input the `$`'s in your commands.

```
$ git clone https://github.com/moskalyk/MeanSeed
$ cd MeanSeed
$ cd public
$ sudo bower install
$ cd ..
$ sudo npm install
$ sudo node server.js
```

Go to localhost:1330 in your browser.

To change the main page, go into views/login.html for the html, or controllers/loginController.js for the javascript.

##What is `npm install`?
[NPM](https://www.npmjs.com/) is a package manager for Node.js server packages. In order to download the files locally to your project, navigate to where you see the `package.json` file, and run `npm install` (you might need sudo). This will download all the dependencies from that file (i.e. packages) into a node_modules folder.

##What is `bower install`?
[Bower](http://bower.io/) is a package manager for (mostly) client side packages - great for Javascript or CSS files (i.e. [Jquery](https://jquery.com/) or [Angular](https://angularjs.org/). It works by fetching and installing packages from the web. Bower keeps track of these packages in a manifest file, bower.json. Similiar to NPM, in order to download the files locally to your project, navigate to where you see the `bower.json` file, and run `bower install`. This will download all the dependencies (i.e. package titles) into a bower_components folder.

###Bower
- Angular - v1.4.3
- Angular Route - v1.4.3
- Jquery - v2.1.4
- Materialize -v0.97.0

###NPM
- [body-parser](https://github.com/expressjs/body-parser):Request body parsing middleware for Node.js. - (v1.0)
- [compression](https://github.com/expressjs/compression):Gzip compression middleware for Node.js. - (v1.5.1)
- [express](http://expressjs.com/): Fast, unopinionated, minimalist web framework for Node.js - (v4.0)
- [mongoose](http://mongoosejs.com/): Elegant mongodb object modeling for Node.js. - (v*.*)
- [morgan](https://github.com/expressjs/morgan):HTTP request logger middleware for Node.js. - (v1.0)

#TODOs
###Create Different Branches for versions
- Full
- Simple
- Login/Passport Strategy (Using Passport.js with locally encrypted passwords)
- Server Optimized (Using Node Cluster, Redis, etc.)

###NPM
- Cluster / Look into Pm2
- Redis / Redis-Session
- Passport
