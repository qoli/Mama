<?php
header('Content-Disposition: attachment; filename="mamailoveu.png"');
session_start();

set_time_limit(60);
include 'function.php';


implode_image(ExplodeArray($_SESSION['PhotoList']), 'V');