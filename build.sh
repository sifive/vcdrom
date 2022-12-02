#!/bin/bash
debug=false

while getopts dj flag
do
    case "${flag}" in
        d) 
            debug=true ;;
    esac
done

if ! [ -d node_modules ]; then
    npm i
fi

mkdir -p app

cp node_modules/vcd-stream/out/vcd.wasm app

./node_modules/.bin/markdown-to-html -s help_pv2.md \
  -o app/help.html \
  --title "SiFive Freedom Studio Pipeline Viewer Help" \
  
cp -r src/favicon app
cp src/pv.html app/index.html
cp src/*.woff2 app
cp src/*.css app
cp src/*png app

if [ "${debug}" == "true" ]
then
    # When debugging don't tersify and do generate source maps.
    ./node_modules/.bin/browserify -d ./lib/pv2.js >app/vcdrom.js
else
    ./node_modules/.bin/browserify ./lib/vcdrom.js | ./node_modules/.bin/terser --compress -o app/vcdrom.js
fi


