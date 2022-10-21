<?php
    $postsFile = fopen("data/posts.json", "w");
    echo("WOO");
    fwrite($postsFile, $_GET['json']);
    fclose($postsFile);
?>