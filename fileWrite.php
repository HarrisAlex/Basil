<?php
    $postsFile = fopen("data/posts.json", "w");
    $jsonString = $_GET(['json']);
    $jsonString =  "post = " . $jsonString;
    fwrite($postsFile, $jsonString);
    fclose($postsFile);
?>