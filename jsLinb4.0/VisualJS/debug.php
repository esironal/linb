<?php
include_once('../phpLinb/linb.php');
$io = LINB::SC('IO');

$testTpl=isset($_POST['testTpl'])?$_POST['testTpl']:'';
if(!$testTpl){
    $testTpl="singledebug.html";
}

$template = $io->getString("template/".$testTpl);


$clsName=$_POST['clsName'];
$clsName=get_magic_quotes_gpc()?stripslashes($clsName):$clsName;
$content=$_POST['content'];
$content=get_magic_quotes_gpc()?stripslashes($content):$content;
$theme=$_POST['theme'];
$theme=get_magic_quotes_gpc()?stripslashes($theme):$theme;
$lang=$_POST['lang'];
$lang=get_magic_quotes_gpc()?stripslashes($lang):$lang;

$template = LINB::parseTemplate($template, array("clsName" => $clsName, "content"=>$content, "theme"=>$theme, "lang"=>$lang));
echo $template;
?>