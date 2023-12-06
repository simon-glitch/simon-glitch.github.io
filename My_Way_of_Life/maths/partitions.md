
# Ordered Partitions
Given n **ordered** objects, how many ways are there to separate them into any number of groups?

* 2 groups = ((n-1) choose 1) * 1^(n-1)
* 3 groups = ((n-1) choose 2) * 2^(n-1)
* 4 groups = ((n-1) choose 3) * 3^(n-1)
* ...
* k groups = ((n-1) choose (k-1)) * (k-1)^(n-1)

## Formula
(n choose any) = sum {i from 1 to n-1} of {
    ((n-1) chooose i) * i^(n-1)
}

# Unordered Partitions
(n choose any) = sum {i from 1 to n-1} of {
    ((n-1) chooose i)
}
which just = 2^(n-1) - 1



