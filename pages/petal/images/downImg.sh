#!/bin/bash
# Basic while loop

counter=1
while [ $counter -lt 10 ]
do
    echo $counter
    curl http://www.17sucai.com/preview/11/2017-11-01/hb/images/hb/petal$counter.png > peta$counter.png
    ((counter++))
done

echo All done
