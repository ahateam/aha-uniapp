/** 获取文件*/
let mask = document.querySelector(".mask");
let fileDom = document.querySelector(".file");
let title = document.querySelector(".title");
let tis = document.querySelector(".tis");
let progress = document.querySelector(".tis-progress");
let cancel = document.querySelector(".cancel-btn");
let percent = 0;
/**oss上传*/
var client = new OSS.Wrapper({
	region: "oss-ap-southeast-2", //阿里云获取
	
	bucket: "durian-file" //要存储的目录名
});
console.log(client)
/**
 * 生成文件名
 * @returns
 */
function timestamp() {
	var time = new Date();
	var y = time.getFullYear();
	var m = time.getMonth() + 1;
	var d = time.getDate();
	// var h = time.getHours();
	// var mm = time.getMinutes();
	// var s = time.getSeconds();
	return "" + y + add0(m) + add0(d)
}

function add0(m) {
	return m < 10 ? '0' + m : m;
}



function upload(file, front) {
	console.log(file)
	console.log(front)

	var fileName = file.name;
	var frontFileName = front + '/' + file.name;
	console.log('-----开始执行-----')
	client.multipartUpload(frontFileName, file).then(function(result) {
		var url = result.res.requestUrls[0];
		var length = url.lastIndexOf('?');
		var fileUrl = url.substr(0, length); //文件最终路径
		var fileSize = file.size
		// fileSize = fileSize / (1024 * 1024)
		if (fileSize / (1024 * 1024) < 0.05) {
			fileSize = fileSize + 'B'
		} else if (fileSize / (1024 * 1024) < 1) {
			fileSize = fileSize / 1024
			fileSize = fileSize.toFixed(2) + 'KB'
		} else {
			fileSize = fileSize / (1024 * 1024)
			fileSize = fileSize.toFixed(2) + 'MB'
		}
		progress.innerText = '上传成功';
		title.innerText = `${frontFileName};;${fileUrl};;${fileSize}`
		setTimeout(() => {
			tis.style.display = 'none';
			plus.webview.currentWebview().close();
		}, 300);

	}).catch(function(err) {
		console.log(err)
		progress.innerText = '上传失败';
		setTimeout(() => {
			tis.style.display = 'none';
			plus.webview.currentWebview().close();
		}, 300);

	});
}




let createUpload = (file, front = '', url, key = 'file', header = {}, data = {}) => {
	console.log(`
	上传前缀:${front}\n
	文件名:${file.name}\n
	参数:${JSON.stringify(data)}
	`);

	tis.style.display = 'flex';

	upload(file, front)


	// let xhr = new XMLHttpRequest();
	// xhr.open("POST", url, true  );

	// for (let keys in header) {
	// 	xhr.setRequestHeader(keys, header[keys]);
	// }
	// xhr.upload.addEventListener("progress", function(event) {
	// 	if(event.lengthComputable){
	// 		let percent = Math.ceil(event.loaded * 100 / event.total) + "%";
	// 		progress.innerText = `努力上传中..${percent}`;
	// 	}
	// }, false);

	// xhr.ontimeout = function(){
	// 	// xhr请求超时事件处理
	// 	progress.innerText = '请求超时';
	// 	setTimeout(()=>{
	// 		tis.style.display = 'none';
	// 		plus.webview.currentWebview().close();
	// 	},1000);
	// };

	// xhr.onreadystatechange = (ev) => {

	// 	if(xhr.readyState == 4) {
	// 		console.log('status：'+xhr.status);

	// 		if (xhr.status == 200) {
	// 			progress.innerText = '上传成功';
	// 			console.log('返回数据：'+xhr.responseText);

	// 			

	// 		}
	// 		else {
	// 			progress.innerText = '上传失败了';
	// 		}

	// 		setTimeout(()=>{
	// 			tis.style.display = 'none';
	// 			plus.webview.currentWebview().close();
	// 		},1000);

	// 	}
	// };
	// xhr.send(formData);

	cancel.addEventListener("click", () => {
		// xhr.abort();
		plus.webview.currentWebview().close();
	});
}


mask.addEventListener("click", () => {
	plus.webview.currentWebview().close();
});

document.addEventListener('UniAppJSBridgeReady', () => {

	let {
		url,
		front,
		key,
		header,
		formData
	} = plus.webview.currentWebview();

	fileDom.addEventListener('change', (event) => {
		let file = fileDom.files[0];
		console.log('--------调用----------')
		if (file.size > (1024 * 1024 * 10)) {
			plus.nativeUI.toast('单个文件不能超过10M,请重新上传');
			return;
		}
		console.log('sadasdasd')
		console.log(front)
		console.log(file.name);

		createUpload(file, front, url, key, header, formData);
	}, false);
});
