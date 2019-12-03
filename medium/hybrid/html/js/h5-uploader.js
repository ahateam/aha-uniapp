let mask = document.querySelector(".mask");
let fileDom = document.querySelector(".file");
let title = document.querySelector(".title");
let tis = document.querySelector(".tis");
let progress = document.querySelector(".tis-progress");
let cancel = document.querySelector(".cancel-btn");


let createUpload = (file, url, key = 'file', header = {}, data = {}) => {
	console.log(`
	上传地址:${url}\n
	请求头:${JSON.stringify(header)}\n
	参数:${JSON.stringify(data)}
	`);
	if (!url) {
		return;
	}
	tis.style.display = 'flex';

	let formData = new FormData();
	formData.append(key, file);

	for (let keys in data) {
		formData.append(keys, data[keys]);
	}

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);

	for (let keys in header) {
		xhr.setRequestHeader(keys, header[keys]);
	}
	xhr.upload.addEventListener("progress", function(event) {
		if (event.lengthComputable) {
			let percent = Math.ceil(event.loaded * 100 / event.total) + "%";
			progress.innerText = `努力上传中..${percent}`;
		}
	}, false);

	xhr.ontimeout = function() {
		// xhr请求超时事件处理
		progress.innerText = '请求超时';
		setTimeout(() => {
			tis.style.display = 'none';
			plus.webview.currentWebview().close();
		}, 1000);
	};

	xhr.onreadystatechange = (ev) => {

		if (xhr.readyState == 4) {
			console.log('status：' + xhr.status);

			if (xhr.status == 200) {
				progress.innerText = '上传成功';
				console.log('返回数据：' + xhr.responseText);

				title.innerText = `${file.name}:${xhr.responseText}`;

			} else {
				progress.innerText = '上传失败了';
			}

			setTimeout(() => {
				tis.style.display = 'none';
				plus.webview.currentWebview().close();
			}, 1000);

		}
	};
	xhr.send(formData);

	cancel.addEventListener("click", () => {
		xhr.abort();
		plus.webview.currentWebview().close();
	});
}


mask.addEventListener("click", () => {
	plus.webview.currentWebview().close();
});

document.addEventListener('UniAppJSBridgeReady', () => {

	let {
		url,
		key,
		header,
		formData
	} = plus.webview.currentWebview();

	fileDom.addEventListener('change', (event) => {
		let file = fileDom.files[0];
		if (file.size > (1024 * 1024 * 10)) {
			plus.nativeUI.toast('单个文件不能超过10M,请重新上传');
			return;
		}

		console.log(file.name);

		let tiemr = new Date()
		let address = tiemr.getFullYear() + "" + (tiemr.getMonth() + 1) + "" + tiemr.getDate();
		address = 'image/' + address + '/'
		let str = file.name.substr(file.name.lastIndexOf('.'))
		let nameStr = address + tiemr.getTime() + str
		formData = {
			name: nameStr,
			'key': nameStr,
			'policy': 'eyJleHBpcmF0aW9uIjoiMjAyMi0wMS0wMVQxMjowMDowMC4wMDBaIiwiY29uZGl0aW9ucyI6W1siY29udGVudC1sZW5ndGgtcmFuZ2UiLDAsMTA0ODU3NjAwMF1dfQ==',
			'OSSAccessKeyId': 'LTAIJ9mYIjuW54Cj',
			'success_action_status': '200',
			//让服务端返回200,不然，默认会返回204
			'signature': 'kgQ5n4s0oKpFHp35EI12CuTFvVM=',
		}

		createUpload(file, url, key, header, formData);
	}, false);
});
