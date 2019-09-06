# GULP Static Starter 
> Starter configuration for static web pages with ecmascript, sass(scss) and pug

Configuration with GULP babel for start to coding fastly and 'professional' (xD)

## Installation

```sh
gi clone https://github.com/bssanchez/gulp-static-starter.git
cd gulp-static-starter
npm install
npm run serve or gulp
```

## Build

For finish you can build the project to build folder, this command proccess sass, scripts, templates and copy node_modules dependencies (not dev) to assets/node_modules.

## Gulp tasks

Yu can excecute the tasks mentioned below:

`scss` => Proccess scss files from ./src/scss/ to ./build/assets/css
`javascript` => Proccess js files from ./src/js/ to ./build/assets/js
`views` => Proccess pug files from ./src/pug/ to ./build/
`copynm` => Copy production dependencies from node_modules to ./build/assets/node_modules

`build` => Proccess all tasks
`default` => Proccess all tasks and launch BrowserSync watching for changes


## Release History

* 1.0.0
    * Work in progress

## Meta

Brandon Sanchez – [@_kid_goth](https://twitter.com/_kid_goth) – bsanchez@mediacode.co

Distributed under the MIT license. See [LICENCE](LICENSE) for more information.

[https://github.com/bssanchez](https://github.com/bssanchez/)