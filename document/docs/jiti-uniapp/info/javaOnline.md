---
title: 后端上线说明
author: 郑兴江    
date: 2019-9-28

---

# 集体经济上线

## 测试服

### 端口号配置，一般情况下在 xhj.cn.start 包下的 JITIVerticle.java 中配置

```java
// 集体经济项目端口号为8080
public int port() {
	return 8080;
}
```



### 接口开放，将需要开放出去的接口类添加 JITIVerticle.java 中的 init 函数中

```java
protected void init() throws Exception {
    							//接口类			  //接口调用名
	initCtrl(ctrlMap, Singleton.ins(ORGController.class, "org"));
}
```



### 数据库配置
#### 服务器中的项目数据库配置文件放在根目录config文件夹下，一般情况不需要修改，测试服数据库使用的是temptest

```properties
# rdsDefault.prop（关系型数据库）
#外网地址
url:jdbc:mysql://rm-bp1p284w3qc3j9o96xo.mysql.rds.aliyuncs.com:3306/temptest?useUnicode=true&characterEncoding=utf-8

#内网地址
#url:jdbc:mysql://rm-bp1p284w3qc3j9o96.mysql.rds.aliyuncs.com:3306/temptest?useUnicode=true&characterEncoding=utf-8
```



### 项目打包

#### 1、集体经济项目打包之前需要先将项目依赖的zero包重新打包

#### 2、首先clean项目将本地包清除，然后重新打包项目



### 项目包上线

上线项目包为包名带有fat的fat-jar包

##### 项目地址

```java
// 1、测试服服务器地址：47.99.209.235
// 2、项目地址 /var/jar/jititest
```

##### 操作顺序

```java
// 1、运行stop.sh文件停止项目运行，sh stop.sh
// 2、将服务器上的项目包拷贝到本地做备份（测试服基本不需要）
// 3、删除日志文件nohup.out
// 4、将项目包拷贝到项目jititest目录下
// 5、运行start.sh文件启动项目
// 6、查看nohup.out文件，项目是否启动失败（正确显示端口号则为启动成功）
```



## 正式服

### 1、端口号配置 (同测试服)

### 2、接口开放 (同测试服)

### 3、数据库配置
#### 服务器中的项目数据库配置文件放在根目录config文件夹下，一般情况不需要修改，测试服数据库使用的是jiti

```properties
# rdsDefault.prop（关系型数据库）
#外网地址
url:jdbc:mysql://rm-bp1p284w3qc3j9o96xo.mysql.rds.aliyuncs.com:3306/jiti?useUnicode=true&characterEncoding=utf-8

#内网地址
#url:jdbc:mysql://rm-bp1p284w3qc3j9o96.mysql.rds.aliyuncs.com:3306/jiti?useUnicode=true&characterEncoding=utf-8
```

### 4、项目打包 (同测试服)

### 5、项目包上线

上线项目包为包名带有fat的fat-jar包

##### 项目地址

```java
// 1、测试服服务器地址：47.99.212.32
// 2、项目地址 /var/jar
```

##### 操作顺序

```java
// 1、运行stop.sh文件停止项目运行，sh stop.sh
// 2、将服务器上的项目包拷贝到本地做备份
// 3、删除日志文件nohup.out
// 4、将项目包拷贝到项目jititest目录下
// 5、运行start.sh文件启动项目
// 6、查看nohup.out文件，项目是否启动失败（正确显示端口号则为启动成功）
```



## 记录上线日志
### 每提交一次均填写日志
