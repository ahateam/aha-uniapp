---
title: 后端上线记录
author: 郑兴江    
date: 2019-9-29

---

# 集体经济项目版本上线记录

### 8月5日正式接手集体经济项目，并进行多次代码修改

#### 1、EXP 重构原SQLEx代码

#### 2、修改导入成员功能、导致部分表添加字段，相关代码进行修改

​	**ORGUser表 ：** resourceShares（资源股）、assetShares（资产股）、isOrgUser（是否为组织成员）、	familyRelations（与户主关系）

​	**User表：**sex（性别）

​	**ORG表：** resourceShares（资源股）、assetShares（资产股）

​	**ORGUserImportRecord表：** resourceShares（资源股）、assetShares（资产股）、isORGUser（是否为组织成员）、	familyRelations（与户主关系）、sex（性别）

#### 3、添加省级证书变量

​	资源股 **org_resource_shares**

​	资产股 **org_asset_shares**

#### 4、用户变量

​	与户主关系 **org_family_relations**

​	资源股 **org_user_resource_shares**

​	资产股 **org_user_asset_shares**

## 9月12日

​	1、修改重构导致的BUG：资产分类\分组查询失败

## 9月17日

​	1、登录返回信息添加用户资源股和资产股

## 9月19日

​	1、绑定与解绑手机号添加密码验证

​	2、正式服数据库表ORGExamine中添加资源股与资产股字段

## 9月20日

​	1、修改公告获取失败BUG，添加公告时间倒序输出，并添加分页

## 9月23日

​	1、修改**editVote**（修改投票）接口的返回值为新的vote

## 9月24日

​	1、修改获取是否投票接口（**getVoteByUserRoles**和**getNotVoteByUserRoles**） 

​	2、添加APP版本常量对象APPVERSION

## 9月25日

​	1、添加打印数据导出相关接口（ExportTask导出任务）4个

## 9月27日

​	全面测试APP，上线测试服、

### 正式服上线