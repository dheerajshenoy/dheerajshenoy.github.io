#!/bin/sh

folders=(css js)

for i in ${folders[@]}; do
    files=$(find $i ! -name "*.min.*" -not -path "./css" -not -path "./js")
    echo $files
    for file in ${files[@]}; do
        fname="${file%.*}.min.js"
        echo $file
        minify $file > $fname
    done
done
