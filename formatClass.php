<?php 

class Format {
	function Format($s) {
		$this->source = $s;
	}

	function apply($a) {
		$ret = $this->source;
		for ($i=1; $i <= count($a); ++$i) { 
			$ret = str_replace('{$'.$i.'}', $a[$i-1], $ret);
		}
		return $ret;
	}
}

$f = new Format('Error {$1}: {$2}');
echo $f->apply(['30', 'User not found']);

?>