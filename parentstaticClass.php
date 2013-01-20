<?php 

class User {
	static $num = 0;	// declare a static variable

	function User($name) {
		$this->name = $name;
		++User::$num;	// use the static variable
	}

	function getActions() {
		return array('login', 'logout', 'showHomePage');
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

	function getActions() {
		$a = array('showSystemLog', 'showLoggedInUsers');
		$u = parent::getActions(); // get the user (parent class) actions
		return array_merge($u, $a);
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

/*$me = new Admin('Admin');
$actions = $me->getActions();
for($a = 0; $a < count($actions); ++$a) {
	print $actions[$a] . '<br />';
}*/

$users = ['Gilly', 'Ardo', 'James'];
for($i = 0; $i < count($users); ++$i) {
	$user = $users[$i];
	${$user} = new User($user);
}
print 'The number of User objects is '.User::$num;