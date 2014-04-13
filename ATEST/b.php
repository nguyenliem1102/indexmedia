

<!DOCTYPE html>
<header>
    <meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0; user-scalable=no" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <link style="text/css" href="css/cssmain.css" rel="stylesheet" />
    <script type="text/javascript" src="script/jquery.js"></script>
    <script type="text/javascript" src="script/jsmain.js"></script>
	<script>
		$(document).ready(function() {
			console.log("run here");
		});
	</script>
    
</header>
<body >
<?php

	function getLinks($link)
    {
        /*** return array ***/
        $ret = array();

        /*** a new dom object ***/
        $dom = new domDocument;

        /*** get the HTML (suppress errors) ***/
        @$dom->loadHTML(file_get_contents($link));

        /*** remove silly white space ***/
        $dom->preserveWhiteSpace = false;

        /*** get the links from the HTML ***/
        $links = $dom->getElementsByTagName('a');
    
        /*** loop over the links ***/
        foreach ($links as $tag)
        {
            $ret[$tag->getAttribute('href')] = $tag->childNodes->item(0)->nodeValue;
        }

        return $ret;
    }
    /*** a link to search ***/
    $link = "http://www.phpro.org/examples/Get-Links-With-DOM.html";

    /*** get the links ***/
    
    $urls = getLinks($link);

    /*** check for results ***/
    if(sizeof($urls) > 0)
    {
        foreach($urls as $key=>$value)
        {
            echo $key . ' - '. $value . '<br >';
        }
    }
    else
    {
        echo "No links found at $link";
    }
?>
</body>
</html>