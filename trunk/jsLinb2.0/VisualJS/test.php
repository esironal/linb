<?php
include_once('../phpLinb/linb.php');
$io = LINB::SC('IO');
$template = $io->getString("template/single.html");

$clsName=$_POST['clsName'];
$clsName=get_magic_quotes_gpc()?stripslashes($clsName):$clsName;
$content=$_POST['content'];
$content=get_magic_quotes_gpc()?stripslashes($content):$content;

$template = LINB::parseTemplate($template, array("clsName" => $clsName, "content"=>$content));
echo $template;
?>