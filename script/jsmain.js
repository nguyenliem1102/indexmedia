var myUrl = "http://nguyenliem.bl.ee/";
var countImg = 0;
var countErr = 0;
var listImgsLoad=0;
var indexCount = 0;
var imgLinks = new Array();
$(document).ready(function() {
	myUrl = document.URL;
	myUrl = myUrl.substring(0,myUrl.lastIndexOf("/") + 1);
	
	getPage("index2.html");
	
	// click Post SERVER
	$("#postall").click(function(){
		callAjax();
	});
});

function getPage(requestURL) {
	//var  requestURL = myUrl + "index2.html"
	_tickHTTP = new XMLHttpRequest();
	_tickHTTP.open('POST', requestURL, true);
	_tickHTTP.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	_tickHTTP.onreadystatechange = AjaxTickCompplete;
	_tickHTTP.send();
}
    	
function AjaxTickCompplete()
{
   if (_tickHTTP.readyState == 4 && _tickHTTP.status == 200) {
		text = _tickHTTP.responseText;
		// get Images Link
		imgLinks = getImg(text);
		
		// Get Image Info
		getImgInfo(imgLinks);

	}
}

function getImg(text) {
		// remove start string
		text = text.substring(text.indexOf("<IMG"), text.lenght);
		var resImg = text.split("<IMG ");
		resImg = resImg.clean("");
		var links = new Array();

		// get link
		for(var i = 0; i < resImg.length; i++) {
			var resSRC = resImg[i].split('SRC="'); 
			resSRC = resSRC.clean("");
			var s1 = "\" ";
			// The path of Images
			var aPath = resSRC[0].substring(0, resSRC[0].indexOf(s1));
			aPath = myUrl + aPath;
			links.push(aPath);
		}
		return links;
		
}

function callAjax() {
	
    $.ajax({
		url: 'server.php',
		type: 'POST',
		async: true,
		data: {registration: "success", name: "Andy", email: "nguyenliem1102@gmail.com", links: imgLinks},
		success:function(response){
		   $("#postall").html("Result: " + response);
	   },
	   error: function (msg) {
            alert('failure');
            alert(msg);
        }
	});   
}

// Clean Array
Array.prototype.clean = function(deleteValue) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == deleteValue) {         
      this.splice(i, 1);
      i--;
    }
  }
  return this;
};

// get Image Info
function getImgInfo(imgLinks) {
	var imgLoaders = new limgloader(imgLinks);
	imgLoaders.loaded = finishLoadImg;
}

function finishLoadImg() {
	console.log("Load Image finished");
}

function limgloader(imgLinks) {
	limg = this;
	listImgsLoad = imgLinks.length;
	total_imgs.innerHTML = listImgsLoad;

	loadImages();	
	
	function loadImages() {
		for(var i = 0; i < listImgsLoad; i++) {
			if(i == indexCount) {
				var img1 = new Image();
				img1.src = imgLinks[i];		
				// run complete 		
				img1.onload = imgComplete;	
				img1.onerror = imgError;
			
			}
		}
	}
	 
	
	function processIndexCount() {
		//increase count index
		indexCount++;
		// Add to show
		index_Count.innerHTML = indexCount;
		//recall
		loadImages();
	}
	
	function imgComplete(){
		 processIndexCount();
		// add to Table
		addTable(this);
		countImg++;
		if(countImg == listImgsLoad) {
			limg.loaded();
		}
		
	}

	function imgError(){
		processIndexCount();
		countErr++;
		console.log("Total Errors: " + countErr + " " + this);
	}
	
	function addTable(img) {
		var tr1 = document.createElement("tr");
		var col1 = document.createElement("td");
		var col2 = document.createElement("td");
		var col3 = document.createElement("td");
		var col4 = document.createElement("td");		
		tableImg.appendChild(tr1);
		tr1.appendChild(col1);
		tr1.appendChild(col2);
		tr1.appendChild(col3);
		tr1.appendChild(col4);
		col1.appendChild(img);
		
		// split Name
		var nameImg = img.src.substring(img.src.lastIndexOf("/")+1,img.src.length);
		col2.innerHTML = nameImg;
		col3.innerHTML = img.width;
		col4.innerHTML = img.height;
		
		// Css 
		col2.classList.add("col2");
		col3.classList.add("col3");
		col4.classList.add("col4");
		
	}
}

