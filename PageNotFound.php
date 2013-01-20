<?php
	function cb() {}
?>
<?php
	$site = $_REQUEST['site'];
	header('HTTP/1.1 404 Not Found');
?>
<html><head></head><body>
<?php
	$header = file_get_contents('header.html');
	print $header;
?>
The page could not be found <?php echo $site; ?>
<?php
	$footer = file_get_contents('footer.html');
	print $footer;
?>
</body></html>
<?php cb(); ?>