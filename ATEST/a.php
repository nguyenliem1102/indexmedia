

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
function crawl_page($url, $depth = 5)
{
    static $seen = array();
    if (isset($seen[$url]) || $depth === 0) {
        return;
    }

    $seen[$url] = true;

    $dom = new DOMDocument('1.0');
    @$dom->loadHTMLFile($url);

    $anchors = $dom->getElementsByTagName('a');
    
    /*foreach ($anchors as $element) {
        $href = $element->getAttribute('href');
        if (0 !== strpos($href, 'http')) {
            $path = '/' . ltrim($href, '/');
            if (extension_loaded('http')) {
                $href = http_build_url($url, array('path' => $path));
            } else {
                $parts = parse_url($url);
                $href = $parts['scheme'] . '://';
                if (isset($parts['user']) && isset($parts['pass'])) {
                    $href .= $parts['user'] . ':' . $parts['pass'] . '@';
                }
                $href .= $parts['host'];
                if (isset($parts['port'])) {
                    $href .= ':' . $parts['port'];
                }
                $href .= $path;
            }
        }
        crawl_page($href, $depth - 1);
    }*/
    //echo "URL:",$url,PHP_EOL,"CONTENT:",PHP_EOL,$dom->saveHTML(),PHP_EOL,PHP_EOL;
    echo $dom->saveHTML();
}
crawl_page("http://www.php.net/manual/en/tutorial.firstpage.php", 1);

    ?>
</body>
</html>