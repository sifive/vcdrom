#!/bin/bash

mkdir -p app

cp node_modules/codemirror/lib/codemirror.css app

cp node_modules/vcd-stream/out/vcd.wasm app

cp src/vcdrom.html app/index.html
cp -r src/favicon app
cp src/vcdrom.css app
cp src/*.woff2 app
cp src/helpUI.css app 
cp src/statusBars.css app 
cp src/bookMarks.css app 
cp src/msgbox.css app 
cp src/sifiveProgressBar.css app
cp src/sifive-logo-white.png app
cp ceg/cegIndex.html app 
cp ceg/style.css app 

# ./node_modules/.bin/browserify app/cegIndex.js | ./node_modules/.bin/terser --compress -o app/cegIndex.js
./node_modules/.bin/browserify ./lib/vcdrom.js | ./node_modules/.bin/terser --compress -o app/vcdrom.js
./node_modules/.bin/browserify ./ceg/ceg.js > app/ceg.js 

