---
title: 掌上科普项目后端服务端对接
author: 郑兴江
date: 2019-11-20

---

## 环境说明

CentOS 7.4
nginx-1.14.0
java 8
firewalld

## 准备工作

### 更新yum

``` 
yum -y update
```

### 安装nginx依赖项

``` 
yum install -y wget vim gcc gcc-c++ pcre pcre-devel zlib zlib-devel openssl openssl-devel
```
> 拷贝libldap
> （CentOS默认安装路径不符，可能导致安装失败。因此需要再将libldap拷贝到新目录）

``` 
cp -frp /usr/lib64/libldap* /usr/lib/
```

### 创建web服务用户组
> （nginx，php等不同服务，需要使用相同的用户才能共享文件。因此我们创建web服务统一的用户组及用户：www组及www用户）

``` 
cd /tmp
groupadd www
useradd -g www www
```
### 创建网站静态文件目录及Java服务目录
> /var/www	静态文件目录（由nginx管理）
> /var/jar		Java服务目录（存放可执行jar包）

``` 
mkdir /var/www/
chown -R www:www /var/www

mkdir /var/jar/
chown -R www:www /var/jar

```

### 配置防火墙
> CentOS 7.4 使用firewalld 而不是 iptable
> 启用firewalld

``` 
systemctl start firewalld.service
```
> 打开80端口并重启

``` 
firewall-cmd --permanent --zone=public --add-port=80/tcp
firewall-cmd --reload
```

> firewalld 基本操作命令如下：

``` 
打开80端口	firewall-cmd --permanent --zone=public --add-port=80/tcp
			firewall-cmd --reload

启动			systemctl start firewalld.service
停止			systemctl stop firewalld.service
重启			systemctl restart firewalld.service
自启动		systemctl enable firewalld.service
停止自启动	systemctl disable firewalld.service
查看打开端口	firewall-cmd --zone=public --list-ports

```






## nginx安装和配置
### 安装nginx-1.14.0
> 安装到usr/local目录
``` 
cd /usr/local/
wget http://nginx.org/download/nginx-1.14.0.tar.gz
tar -zxvf nginx-1.14.0.tar.gz
rm nginx-1.14.0.tar.gz
cd nginx-1.14.0
./configure --prefix=/usr/local/nginx --with-http_ssl_module
make
make install
```

### 配置nginx自启动
> 创建nginx服务配置文件
``` 
vim /usr/lib/systemd/system/nginx.service
```
> 编辑如下内容

``` 
[Unit]
Description=nginx
After=network.target
[Service]
Type=forking
ExecStart=/usr/local/nginx/sbin/nginx
ExecReload=/usr/local/nginx/sbin/nginx -s reload
ExecStop=/usr/local/nginx/sbin/nginx -s stop
PrivateTmp=true
[Install]
WantedBy=multi-user.target
```
> 设置nginx自启动

``` 
chmod 754 /usr/lib/systemd/system/nginx.service
systemctl enable nginx.service
systemctl restart nginx.service
```
### nginx配置
> 编辑配置文件( usr/local/nginx/conf/nginx.conf )

``` 
vim usr/local/nginx/conf/nginx.conf
```
> 修改nginx.conf中的用户，设置为web服务用户 www

``` 
user  www;
```
> 修改nginx.conf中的location配置，指向/var/www 目录

``` 
        location / {
            root	/var/www;
            index	index.html index.htm;
        }

        error_page	500 502 503 504  /50x.html;
        location = /50x.html {
            root	/var/www;
        }
```
> 在nginx.conf 配置文件中将api子域名指向8080端口的 java web服务

``` 
        location /api {
            proxy_pass http://localhost:8080;
            proxy_redirect off;
        }
```

> 完整nginx.conf 配置文件参考如下：

``` 
user  www;
worker_processes  1;

events {
    worker_connections  1024;
}

http {
    include       mime.types;
    default_type  application/octet-stream;

    sendfile        on;

    keepalive_timeout  65;

    server {
    
        listen       80;
        server_name  localhost;
        
        location / {
            root	/var/www;
            index	index.html index.htm;
        }
        
        location /api {
            proxy_pass http://localhost:8080;
            proxy_redirect off;
        }
        
        error_page	500 502 503 504  /50x.html;
        location = /50x.html {
            root	/var/www;
        }
    }
}

```

### 启用nginx服务
> nginx常用命令

``` 
启动		service nginx start
重启		service nginx restart
停止		service nginx stop
强制关闭	pkill nginx

```

## Java 8 安装和配置

### 先卸载已有java环境
> 安装之前先检查一下系统有没有自带jdk

``` 
rpm -qa |grep java
rpm -qa |grep jdk
rpm -qa |grep gcj
```
> 如果有安装可以使用如下命令批量卸载所有带有Java的文件 
``` 
rpm -qa | grep java | xargs rpm -e --nodeps 
```
### 安装java 8 
> 安装1.8.0的所有文件

``` 
yum install java-1.8.0-openjdk* -y
```
> 安装后用 java -version命令可查看版本（当前1.8.0_191）

``` 
java -version
openjdk version "1.8.0_191"
OpenJDK Runtime Environment (build 1.8.0_191-b12)
OpenJDK 64-Bit Server VM (build 25.191-b12, mixed mode)
```
### java优化和配置

> 目前还没有配置环境变量和优化 java 内存配置