<?php
		
		if(isset($_POST['registration']) && !empty($_POST['registration'])) {
		   $regstration = $_POST['registration']; 
			$name= $_POST['name']; 
			$email= $_POST['email'];
			$links = $_POST['links']; 
			switch($name) {
				case 'Andy' : 		echo "Andy Posted";break;
				case 'blah' : echo "blah Posted";break;
				
			}
		}

		
?>