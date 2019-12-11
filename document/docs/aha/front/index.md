---
title: 前端文档示例
author: cometang   
date: 2019-12-11

---

## 前言现状

### 自动化服务端持续集成部署的好处有哪些？

当我们修改一个需求完成后，将最新的代码push到github的时候，我们线上的版本会自动化完成拉取代码，打包构建，重启服务等流程。

通过这种技术我们可以将本地代码一秒完成线上项目的部署与重启。不再需要大量的人力去做上线部署重复的工作。

### 前端为什么要使用自动化服务端持续集成部署？

众所周知，前端的需求经常发生变更及微小的调整，每一次上线需要经历复杂的固定化的流程：修改代码—代码检测—功能实现测试—构建项目—上传构建完成的项目包—线上测试。

稍微大一点的项目更是涉及庞大的用户人群，稍有不慎，就将酿成上线惨案。一到上线日，忙得鸡飞狗跳最后上线的代码还有可能有着种种出乎自己意料的bug。给团队和项目带来不可估量的损失。

自动化服务端持续集成部署就是将以自动化的方式将以前需要人工一步一步实现的上线流程，通过代码自动化来实现，达到项目上线精准无误差的地步。


## 实现思路
### 自动化服务端持续集成部署所使用的技术点

- github
- github webhook
- docker
- nginx
- Linux

### 自动化服务端持续集成部署 实现思路

![1574956828126](https://user-gold-cdn.xitu.io/2019/11/29/16eb5707bea12627?w=935&h=584&f=png&s=82699)

## 主要代码
```js
//webhook.js 完整版代码
let http = require('http');
let cryto = require('crypto');
let { spawn } = require('child_process'); //开启部署的子进程

let SECRET = '123456';  //与在前后端项目github中设置的Secret相同
//生成签名算法
//根据SECRET字符串使用哈希算法生成十六进制的新的字符串
function sign(body) {
    return `sha1=` + cryto.createHmac('sha1', SECRET).update(body).digest('hex')
}
let server = http.createServer(function (req, res) {
    //判断github发送的是不是post 是不是webhook发送的请求
    console.log('检测到前端后端代码更新，github发来的请求信息如下：')
    console.log('req----hedaers')
    console.log(req.headers['x-github-event'])
    console.log(req.method, req.url);
    if (req.method == 'POST' && req.url == '/webhook') {
        //拿到github传递过来的参数--对请求的github进行简单的验证
        let buffers = [];
        req.on('data', function (buffer) {
            buffers.push(buffer);
        })
        req.on('end', function (buffer) {
            let body = Buffer.concat(buffers);
            //github传的值请求事件类型：push事件
            let event = req.headers['x-github-event'];
            //github传递了请求体body,同时传递了签名，需要验证签名是否正确
            let signatrue = req.headers['x-hub-signature'];
            if (signatrue !== sign(body)) {
                //sign不相等 直接返回错误
                return res.end('Not Allowed');
            }
            //sign相同 执行同意请求
            //设置github请求的请求头，设置返回数据的格式为json
            res.setHeader('Content-Type', 'application/json');
            //返回通知github请求已经成功
            res.end(JSON.stringify({ ok: true }));

            //自动化部署
            if (event == 'push') {
                let payload = JSON.parse(body);
                let name = './' + payload.repository.name + '.sh'
                //开启子进程自动执行对应的sh部署脚本，提交back就执行 sh back.sh 的子进程
                let child = spawn('sh', [name])
                //打印操作日志
                //每当子进程有日志输入的时候，就抛出一个日志，最后一次性输出整个更改日志
                let buffers = []
                child.stdout.on('data', function (buffer) {
                    console.log('启动子进程')
                    buffers.push(buffer)
                })
                child.stdout.on('end', function (buffer) {
                    let log = Buffer.concat(buffers)
                    console.log(log)
                })
            }
        })
    } else {
        res.end('NOT Found');
    }
})

server.listen(4000, () => {
    console.log('webhook服务已经在4000端口启动');
})

```

## 代码地址

- 前端font: https://github.com/cometang/font.git
- 后端back: https://github.com/cometang/back.git
- webhook：https://github.com/cometang/webhook.git

## 备注

```txt
技术开发：cometang
技术维护：cometang
联系方式：1403029829(QQ)
项目保管：cometang
项目地址：github.cometang.io
是否维护：否
停止维护：持续更新
```