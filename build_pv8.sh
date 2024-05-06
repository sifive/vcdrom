#!/bin/bash
set -e
debug=false
donpm=false
npmcmd="i"

while getopts djnN flag
do
    case "${flag}" in
        d) debug=true ;;
        n) 
            donpm=true
            npmcmd="i" ;;
        N) 
            donpm=true
            npmcmd="update" ;;
    esac
done

if ! [ -d node_modules ] || ${donpm} ; then
    npm ${npmcmd}
fi

mkdir -p app

cp node_modules/vcd-stream/out/vcd.wasm app

#./node_modules/.bin/markdown-to-html -s help_pv8.md \
#  -o app/help.html \
#  --title "SiFive Freedom Studio Pipeline Viewer Help" \

cp src/vcdrom_pv8.html app/index.html
cp src/*.woff2 app

if [ "${debug}" == "true" ]
then
    # When debugging don't tersify and do generate source maps.
    ./node_modules/.bin/browserify -d ./lib/vcdrom_pv8.js > app/vcdrom_pv8.js
else
    ./node_modules/.bin/browserify ./lib/vcdrom_pv8.js | ./node_modules/.bin/terser --compress -o app/vcdrom_pv8.js
fi
