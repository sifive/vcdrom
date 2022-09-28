#!/bin/bash

debug=false

while getopts d flag
do
    case "${flag}" in
        d) 
            debug=true ;;
    esac
done

rm -rf app
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

cp pul/pul.html app

if [ "${debug}" == "true" ]
then
    # When debugging don't tersify and do generate source maps.
    ./node_modules/.bin/browserify -d ./lib/vcdrom.js >app/vcdrom.js
else
    ./node_modules/.bin/browserify ./lib/vcdrom.js | ./node_modules/.bin/terser --compress -o app/vcdrom.js
fi

