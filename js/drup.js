var target;
var msg;
var filelist;
function setMain(t) {
	var main = document.getElementById("main");
	main.innerHTML = t;
}
function setInfo(t) {
	var main = document.getElementById("msg");
	main.innerHTML = t;
}
function setImg(f) {
	var reader = new FileReader();
	reader.onload = function(e) {

		var html = "File name : " + f.name + "<br><img src=\""
				+ e.target.result + "\"><br>";
		document.getElementById("imgs").innerHTML += html;
	};
	reader.readAsDataURL(f);

}

function showimg(a) {
	$('#imgs').removeClass("hide");
	[].forEach.call(filelist, function(f, index) {
		if (index == a.getAttribute("index")) {
			var reader = new FileReader();
			reader.onload = function(e) {

				var html = "File name : " + f.name + "<br><img src=\""
						+ e.target.result + "\"><br>";
				document.getElementById("imgs").innerHTML += html;
			};
			reader.readAsDataURL(f);
		}
	});
}
function pop(a) {
	[].forEach.call(filelist, function(f, index) {
		if (index == a.getAttribute("index")) {
			var reader = new FileReader();
			reader.onload = function(e) {

				var html = "<img src=\"" + e.target.result + "\"><br>";
				$('.modal-body').html(html);
			};
			reader.readAsDataURL(f);
		}
	});
}

function upload(a) {
	var xhr = new XMLHttpRequest();
	var fd = new FormData();
	[].forEach.call(filelist, function(f, index) {
		console.log(index);

		if (index == a.getAttribute("index")) {

			console.log(index);
			fd.append('files[]', f);
			console.log(fd);
			$('#progress').show();
			$('.bar').width("0%");

		}
	});
	xhr.upload.onprogress = function(e) {
		console.log($('#progress'));
		console.log(e.loaded / e.total);
	};
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && xhr.status == 200) {
			$('.bar').width("100%");
			$('#progress').fadeOut(4000);
		}
		;
	};
	xhr.open('POST', 'http://127.0.0.1/bootstrap/upload');
	xhr.send(fd);

}

function drup() {
	target = document.getElementById("main");
	var area = document.getElementById("area");
	document.getElementById("info").className = "hide";
	document.getElementById("imgs").className = "hide";
	$('#progress').hide();
	area.addEventListener("dragenter", handleDragEnter, false);
	target.addEventListener("dragover", handleDragOver, false);
	target.addEventListener("dragleave", handleDragLeave, false);
	target.addEventListener("drop", handleDrop, false);

}
function handleDragEnter(e) {
	main.className = "dragover";
	e.stopPropagation();
	e.preventDefault();
}
function handleDragOver(e) {
	var msg = "Drop it.";
	setMain(msg);
	e.stopPropagation();
	e.preventDefault();
}
function handleDragLeave(e) {
	var msg = "Drag and drop your files here.";
	setMain(msg);
	e.stopPropagation();
	e.preventDefault();
}
function handleDrop(e) {
	filelist = e.dataTransfer.files;
	if (filelist) {
		document.getElementById("main").className = "hide";
		document.getElementById("info").className = "";
		msg = '<div class="alert alert-success fade in"><button type="button" class="close" data-dismiss="alert">&times;</button>'
				+ "Total input files number : " + filelist.length + "</div>";
		setInfo(msg);
		[].forEach
				.call(
						filelist,
						function(f, index) {
							msg += '<div class="well">File name : ' + f.name
									+ "<br>";
							msg += "File type : " + f.type + "<br>";
							msg += "File size : " + f.size + "<br>";
							msg += "<p align=\"right\">";
							if (f.type.toString().indexOf("image") != -1) {
								msg += "<span style=\"margin-right: 10px;\"><a class=\"btn btn-primary\" index=\""
										+ index
										+ "\" onclick=\"showimg(this);\">显示图片</a></span>";
								msg += "<span  style=\"margin-right: 10px;\"><a class=\"btn btn-primary\" href=\"#myModal\" role=\"button\" data-toggle=\"modal\" onclick=\"pop(this);\" index=\""
										+ index + "\">弹出预览</a></span>";
							}
							msg += "<span><a class=\"btn btn-primary\" onclick=\"upload(this);\" index=\""
									+ index + "\">上传文件</a></span>";

							msg += "</p></div>";
						});

	}

	e.stopPropagation();
	e.preventDefault();
}
window.addEventListener("load", drup, false);