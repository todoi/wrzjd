#!/bin/bash
# Basic while loop

counter=1
while [ $counter -lt 3 ]
do
    echo $counter
    curl http://www.erdangjiade.com/jquery/28/2818/demo/images/hb_$counter.png > petal$counter.png
    ((counter++))
done

echo All done
