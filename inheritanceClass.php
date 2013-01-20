<?php 

class User {
	function User($name) {
		$this->name = $name;
	}

	function getName() {
		return $this->name;
	}

	function homePage() {
		$msg = 'Welcome ' . $this->getName();
		return '<html><head><title>'.$msg.'</title></head><body>'.$msg.'</body></html>';
	}
}

class Admin extends User {
	function Admin($name) {
		$this->name = $name;
	}

	function homePage() {
		$msg = 'Welcome ' . $this->getName() . ' (Administrator)';
		return '<html><head><title>'.$msg.'</title></head><body>'.$msg.'</body></html>';
	}

	function logPage($log) {
		$logHtml = '';
		for($l = 0; $l < count($log); ++$l) {
			$logHtml .= $log[$l].'<br />';
		}
		return '<html><head><title>System Log</title></head><body>'.$logHtml.'</body></html>';
	}
}

/*$me = new User('guest');
print $me->homePage();*/

$me = new Admin('Admin');
//print $me->homePage();
/*$log = array('Error #30: User not found', 'Error #31: Invalid password');
print $me->logPage($log);*/

$page = '';
$links = '<p><a href="inheritanceClass.php?action=home">Home</a> | <a href="inheritanceClass.php?action=log">Log</a></p>';

switch($_GET['action'])
{
	case 'log':
		$log = ['Error #30: User not found', 'Error #31: Invalid password'];
		$page = $me->logPage($log);
	break;

	case 'home':
	default:
		$page = $me->homePage();
	break;
}

print($page . $links);

?>