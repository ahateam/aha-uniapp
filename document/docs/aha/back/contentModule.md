---
title: 内容模块文档/三方登录
author: 魏元
date: 2019-12-11

---

***

## 使用技术

***

* MySql
* TableStore

* java

***

## 前言

1.内容模块主要是用户发布文章，帖子及其他文字图片视频

2.评论主要是用户在内容下发布的文字

3.回复主要是用户在评论下发布的文字

4.点赞主要是用户对内容，评论，回复进行点赞

## 数据库实体设计

内容实体：

```java
/**
* 所属模块
*/
@RDSAnnID
@RDSAnnField(column = RDSAnnField.ID)
public String orgModule;
/**
 * 编号
 */
@RDSAnnID
@RDSAnnField(column = RDSAnnField.ID)
public Long id;

/**
 * 创建时间
 */
@RDSAnnField(column = RDSAnnField.TIME)
public Date createTime;

/**
 * 更新时间
 */
@RDSAnnField(column = RDSAnnField.TIME)
public Date updateTime;

/**
 * 类型
 */
@RDSAnnField(column = RDSAnnField.BYTE)
public Byte type;

/**
 * 状态
 */
@RDSAnnField(column = RDSAnnField.BYTE)
public Byte status;

/**
 * 权利（会员，付费，等）
 */
@RDSAnnField(column = RDSAnnField.BYTE)
public Byte power;
/**
 * 标题
 */
@RDSAnnField(column = RDSAnnField.TEXT_NAME)
public String title;

/**
 * 上传用户编号
 */
@RDSAnnField(column = RDSAnnField.ID)
public Long upUserId;

/**
 * 上传专栏编号
 */
@RDSAnnField(column = RDSAnnField.ID)
public Long upChannelId;

/**
 * 标签
 */
@RDSAnnField(column = RDSAnnField.SHORT_TEXT)
public JSONObject tags;
/**
 * 数据
 */
@RDSAnnField(column = RDSAnnField.TEXT)
public String data;

/**
 * 私密信息
 */
@RDSAnnField(column = RDSAnnField.SHORT_TEXT)
public String proviteData;

/**
 * 扩展信息，可用JSON格式自行扩展
 */
@RDSAnnField(column = RDSAnnField.SHORT_TEXT)
public String ext;

@RDSAnnField(column = RDSAnnField.SHORT_TEXT)
public User user;//用户信息
/**
 * 浏览量
 */
@RDSAnnField(column = RDSAnnField.ID)
public Integer pageView;

/**
 * 分享量
 */
@RDSAnnField(column = RDSAnnField.ID)
public Integer shareNumber;
/**
 * 真浏览量
 */
@RDSAnnField(column = RDSAnnField.ID)
public Integer truePageView;
/**
 * 是否显示浏览量
 */
@RDSAnnField(column = RDSAnnField.BYTE)
public Byte isPageView;
/*
 * 作者
 */
@RDSAnnField(column = RDSAnnField.TEXT_TITLE)
public String contentAuthor;
/*
 * 来源
 */
@RDSAnnField(column = RDSAnnField.SHORT_TEXT)
public String contentSource;
/*
 * 摘要
 */
@RDSAnnField(column = RDSAnnField.SHORT_TEXT)
public String contentRemark;
/*
 * mp3
 */
@RDSAnnField(column = RDSAnnField.SHORT_TEXT)
public String mp3Src;

@AnnDicField(alias = "不显示")
public static final Byte ISPAGEVIEW_NO = 0;
@AnnDicField(alias = "显示")
public static final Byte ISPAGEVIEW_YES = 1;


@AnnDicField(alias = "免费")
public static final Byte RIGHT_FREE = 0;
@AnnDicField(alias = "付费")
public static final Byte RIGHT_PAY = 1;
@AnnDicField(alias = "会员")
public static final Byte RIGHT_MEMBER = 2;
@AnnDicField(alias = "会员付费")
public static final Byte RIGHT_MEMBER_PAY = 3;

@AnnDicField(alias = "图文")
public static final Byte TYPE_ALUMB = 5;
@AnnDicField(alias = "音频")
public static final Byte TYPE_AUDIO = 1;
@AnnDicField(alias = "短视频")
public static final Byte TYPE_VIDEO_CLIP = 2;
@AnnDicField(alias = "视频")
public static final Byte TYPE_VIDEO = 3;
@AnnDicField(alias = "直播")
public static final Byte TYPE_LIVE = 4;
@AnnDicField(alias = "纯文本")
public static final Byte TYPE_H5 = 0;
@AnnDicField(alias = "帖子")
public static final Byte TYPE_POST = 6;
@AnnDicField(alias = "集合")
public static final Byte TYPE_SET = 7;
@AnnDicField(alias = "活动")
public static final Byte TYPE_ACTIVITY = 8;

@AnnDicField(alias = "待审核")
public static final Byte STATUS_DRAFT = 1;
@AnnDicField(alias = "未通过审核")
public static final Byte STATUS_NORMAL = 2;
@AnnDicField(alias = "已关闭")
public static final Byte STATUS_CLOSED = 3;
@AnnDicField(alias = "已发布")
public static final Byte STATUS_DELETED = 4;
@AnnDicField(alias = "评论封禁")
public static final Byte STATUS_CLOSEREPLY = 5;

```

---

评论实体（TableStore版）：

```java
/**
* 分片编号，MD5(id)，避免数据热点
*/
@TSAnnID(key = TSAnnID.Key.PK1, type = PrimaryKeyType.STRING)
public String _id;
/**
 * 回复所属对象编号
 */
@TSAnnIndex(type = FieldType.LONG, enableSortAndAgg = true, store = true)
@TSAnnID(key = TSAnnID.Key.PK2, type = PrimaryKeyType.INTEGER)
public Long ownerId;

/**
 * 序列编号（自增）
 */
@TSAnnID(key = TSAnnID.Key.PK3, type = PrimaryKeyType.INTEGER, AUTO_INCREMENT = true)
public Long sequenceId;

/**
 * 创建时间
 */
@TSAnnIndex(type = FieldType.LONG, enableSortAndAgg = true, store = true)
@TSAnnField(column = TSAnnField.ColumnType.INTEGER)
public Date createTime;

/**
 * 状态
 */
@TSAnnIndex(type = FieldType.LONG, enableSortAndAgg = true, store = false)
@TSAnnField(column = TSAnnField.ColumnType.INTEGER)
public Byte status;

/**
 * 上传用户编号
 */
@TSAnnIndex(type = FieldType.LONG, enableSortAndAgg = true, store = true)
@TSAnnField(column = TSAnnField.ColumnType.INTEGER)
public Long upUserId;

/**
 * 被@的用户编号
 */
@TSAnnField(column = TSAnnField.ColumnType.INTEGER)
public Long atUserId;

/**
 * 被@的用户名称
 */
@TSAnnField(column = TSAnnField.ColumnType.STRING)
public String atUserName;

/**
 * 标题
 */
@TSAnnField(column = TSAnnField.ColumnType.STRING)
public String title;

/**
 * 文本（可存html信息）
 */
@TSAnnField(column = TSAnnField.ColumnType.STRING)
public String text;

/**
 * 扩展信息，可用JSON格式自行扩展
 */
@TSAnnField(column = TSAnnField.ColumnType.STRING)
public String ext;

/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////

@AnnDicField(alias = "未审核")
public static final Byte STATUS_UNEXAMINED = 0;

@AnnDicField(alias = "已通过")
public static final Byte STATUS_ACCEPT = 1;

@AnnDicField(alias = "已回绝")
public static final Byte STATUS_REJECT = 2;
```

MySQL版：

```java
@RDSAnnID
@RDSAnnField(column = RDSAnnField.ID)
public Long sequenceId;
/**
	 * 回复所属对象编号
	 */
@RDSAnnField(column = RDSAnnField.ID)
public Long ownerId;
/**
	 * 创建时间
	 */
@RDSAnnField(column = RDSAnnField.TIME)
public Date createTime;
/**
	 * 状态
	 */
@RDSAnnField(column = RDSAnnField.BYTE)
public Byte status;
/**
	 * 上传用户编号
	 */
@RDSAnnField(column = RDSAnnField.ID)
public Long upUserId;
/**
	 * 被@的用户编号
	 */
@RDSAnnField(column = RDSAnnField.ID)
public Long atUserId;
/**
	 * 被@的用户名称
	 */
@RDSAnnField(column = RDSAnnField.TEXT_NAME)
public String atUserName;
/**
	 * 标题
	 */
@RDSAnnField(column = RDSAnnField.TEXT_TITLE)
public String title;
/**
	 * 文本（可存html信息）
	 */
@RDSAnnField(column = RDSAnnField.SHORT_TEXT)
public String text;
/**
	 * 扩展信息，可用JSON格式自行扩展
	 */
@RDSAnnField(column = RDSAnnField.SHORT_TEXT)
public String ext;

@AnnDicField(alias = "已通过")
public static final Byte STATUS_ACCEPT = 0;

@AnnDicField(alias = "未审核")
public static final Byte STATUS_UNEXAMINED = 1;

@AnnDicField(alias = "已回绝")
public static final Byte STATUS_REJECT = 2;
```

----

回复实体（MySQL版）：

```java
/**
	 * 序列编号（id）
	 */
@RDSAnnID
@RDSAnnField(column = RDSAnnField.ID)
public Long sequenceId;
/**
	 * 回复replyid
	 */
@RDSAnnField(column = RDSAnnField.ID)
public Long replyId;
/**
	 * 创建时间
	 */
@RDSAnnField(column = RDSAnnField.TIME)
public Date createTime;
/**
	 * 状态
	 */
@RDSAnnField(column = RDSAnnField.BYTE)
public Byte status;
/**
	 * 回复用户 id
	 */
@RDSAnnField(column = RDSAnnField.ID)
public Long upUserId;
/**
	 * 回复用户头像
	 */
@RDSAnnField(column = RDSAnnField.SHORT_TEXT)
public String upUserHead;
/**
	 * 回复用户名称
	 */
@RDSAnnField(column = RDSAnnField.SHORT_TEXT)
public String upUserName;
/**
	 * 目标用户 id
	 */
@RDSAnnField(column = RDSAnnField.ID)
public Long toUserId;
/**
	 * 目标用户 名称
	 */
@RDSAnnField(column = RDSAnnField.SHORT_TEXT)
public String toUserName;
/**
	 * 文本（可存html信息）
	 */
@RDSAnnField(column = RDSAnnField.SHORT_TEXT)
public String text;
@RDSAnnField(column = RDSAnnField.SHORT_TEXT)
public String ext;

/////////////////////////////////////////////
@AnnDicField(alias = "已通过")
public static final Byte STATUS_ACCEPT = 0;
@AnnDicField(alias = "未审核")
public static final Byte STATUS_UNEXAMINED = 1;
```

TableStore版：

```java
分片编号，MD5(id)，避免数据热点
*/
@TSAnnID(key = TSAnnID.Key.PK1, type = PrimaryKeyType.STRING)
public String _id;
/**
 * 回复replyid
 */
@TSAnnIndex(type = FieldType.LONG, enableSortAndAgg = true, store = true)
@TSAnnID(key = TSAnnID.Key.PK2, type = PrimaryKeyType.INTEGER)
public Long replyId;

/**
 * 序列编号（自增）
 */
@TSAnnID(key = TSAnnID.Key.PK3, type = PrimaryKeyType.INTEGER, AUTO_INCREMENT = true)
public Long sequenceId;

/**
 * 创建时间
 */
@TSAnnIndex(type = FieldType.LONG, enableSortAndAgg = true, store = true)
@TSAnnField(column = TSAnnField.ColumnType.INTEGER)
public Date createTime;

/**
 * 状态
 */
@TSAnnIndex(type = FieldType.LONG, enableSortAndAgg = true, store = false)
@TSAnnField(column = TSAnnField.ColumnType.INTEGER)
public Byte status;

/**
 * 回复用户 id
 */
@TSAnnIndex(type = FieldType.LONG, enableSortAndAgg = true, store = true)
@TSAnnField(column = TSAnnField.ColumnType.INTEGER)
public Long upUserId;

/**
 * 回复用户头像
 */
@TSAnnField(column = TSAnnField.ColumnType.STRING)
public String upUserHead;
/**
 * 回复用户名称
 */
@TSAnnField(column = TSAnnField.ColumnType.STRING)
public String upUserName;
/**
 * 目标用户 id
 */
@TSAnnIndex(type = FieldType.LONG, enableSortAndAgg = true, store = true)
@TSAnnField(column = TSAnnField.ColumnType.INTEGER)
public Long toUserId;
/**
 * 目标用户 名称
 */
@TSAnnField(column = TSAnnField.ColumnType.STRING)
public String toUserName;

/**
 * 文本（可存html信息）
 */
@TSAnnField(column = TSAnnField.ColumnType.STRING)
public String text;

@AnnDicField(alias = "未审核")
public static final Byte STATUS_UNEXAMINED = 0;
@AnnDicField(alias = "已通过")
public static final Byte STATUS_ACCEPT = 1;
```

---

点赞实体（TableStore）：

```java
/**
  * 分片编号，MD5(id)，避免数据热点
    */
@TSAnnID(key = TSAnnID.Key.PK1, type = PrimaryKeyType.STRING)
public String _id;
/**
 * 回复所属对象编号
 */
@TSAnnIndex(type = FieldType.LONG, enableSortAndAgg = false, store = false)
@TSAnnID(key = TSAnnID.Key.PK2, type = PrimaryKeyType.INTEGER)
public Long ownerId;

/**
 * 用户id
 */
@TSAnnIndex(type = FieldType.LONG, enableSortAndAgg = false, store = false)
@TSAnnID(key = TSAnnID.Key.PK3, type = PrimaryKeyType.INTEGER)
public Long userId;

/**
 * 评价的值
 */
@TSAnnIndex(type = FieldType.LONG, enableSortAndAgg = false, store = false)
@TSAnnField(column = TSAnnField.ColumnType.INTEGER)
public Byte value;

@AnnDicField(alias = "赞")
public static final Byte VALUE_PRAISE = 0;
@AnnDicField(alias = "踩")
public static final Byte STATUS_DISS = 1;
```

MySQL：

```java
/**
* 回复所属对象编号
*/
@RDSAnnID
@RDSAnnField(column = RDSAnnField.ID)
public Long ownerId;
/**
 * 用户id
 */
@RDSAnnID
@RDSAnnField(column = RDSAnnField.ID)
public Long userId;

/**
 * 评价的值
 */
@RDSAnnField(column = RDSAnnField.BYTE)
public Byte value;

@AnnDicField(alias = "赞")
public static final Byte VALUE_PRAISE = 0;
@AnnDicField(alias = "踩")
public static final Byte STATUS_DISS = 1;
```

---

## 实现思路

#### 内容

* 内容就是除了普通的状态，标题，类型之外，标签使用json数组存储，data字段使用json对象存储

* 音频，视频，图片都是使用了OSS对象存储上传，数据库对返回的地址进行存储

* 其中文本内容使用了编辑器对文本进行处理

* 关于编辑器：

  编辑器文档地址：https://www.kancloud.cn/wangfupeng/wangeditor3/335780

  编辑器注意事项：

  1. 插入的图片要点击100%，否则图片会显示不全

* 接口返回内容时应当返回点赞状态，点赞数量

#### 评论

* 评论目前是对内容下的评论
* 获取某个内容下的评论应当返回该评论的点赞数量，该用户是否对该评论点过赞，该条评论下的回复，该条评论下的回复的点赞数量及用户是否对该回复点过赞，用户名称，用户头像，发布时间
* 根据前端设计要求看是否返回该评论下的回复数量

#### 回复

* 回复是对评论下的回复
* 获取回复也是一样，返回的每一条回复也是要包含点赞数量，用户是否点赞状态，用户名称，用户头像，发布时间

## 相关代码

* TableStore

```java
/*
* 查询帖子评论详情
*/
public JSONArray getPosting(Long id, Long userId, boolean sort, int count, int offset) throws Exception {
    try (DruidPooledConnection conn = ds.getConnection()) {
        JSONArray ja = postingRepository.getPosting(id, count, offset);
        postingRepository.setShareOrPageview(id, "pageview", count, offset);
        JSONArray returnJson = new JSONArray();
        JSONObject tempJson = null;
        for (int i = 0; i < ja.size(); i++) {
            tempJson = new JSONObject();
            Long postingId = ja.getJSONObject(i).getLong("postingId");
            tempJson.put("posting", ja.get(i));
            tempJson.put("appraiseCount", getAppraiseCount(postingId));
            tempJson.put("isAppraise", getAppraiseStatus(postingId, userId));
            tempJson.put("isFavorite", getFavoriteStatus(id,userId));
            returnJson.add(tempJson);
        }
        return returnJson;
    }
}
/*
 * 获取评论
 */
public JSONArray getReplys(Long ownerId, Long userId, Boolean sort, Long upUserId, Long toUserId, Byte status,
		int count, int offset) throws Exception {
	Query query = TEXP.Bool(TEXP.BOOL_TYPE_AND, Arrays.asList(TEXP.Term("ownerId", ownerId),
			TEXP.Term("upUserId", upUserId), TEXP.Term("status", status)));
	SearchQuery searchQuery = new SearchQuery();
	searchQuery = setTEXPLimitSort(searchQuery, count, offset, sort);
	searchQuery.setQuery(query);
	JSONArray ja = replyRepository.search(client, searchQuery).getJSONArray("list");
	if (ja.size() <= 0) {
		return null;
	}
	JSONArray returnJson = new JSONArray();
	JSONObject tempJson = null;
	Set<Long> set = new HashSet<Long>();
	for (int i = 0; i < ja.size(); i++) {
		tempJson = new JSONObject();
		Long replyId = ja.getJSONObject(i).getLong("sequenceId");
		JSONArray comment = getComments(replyId, sort, toUserId, userId, status, 1, 0);
		tempJson.put("reply", ja.get(i));
		tempJson.put("tempUserId", ja.getJSONObject(i).getLong("upUserId"));
		tempJson.put("appraiseCount", getAppraiseCount(replyId));
		tempJson.put("isAppraise", getAppraiseStatus(replyId, userId));
		tempJson.put("comment", comment);
		set.add(ja.getJSONObject(i).getLong("upUserId"));
		returnJson.add(tempJson);
	}
	return getReplyUser(returnJson, set, count, offset);
}

/* 查询评该论信息的发布者信息 */
public JSONArray getReplyUser(JSONArray json, Set<Long> set, int count, int offset)
		throws SQLException, ServerException {
	DurianUser u = null;
	try (DruidPooledConnection conn = ds.getConnection()) {
		List<DurianUser> user = userRepository.getList(conn, EXP.INS().and(EXP.INS().IN("userId", set.toArray())), count,
				offset);
		for (int j = 0, length = json.size(); j < length; j++) {
			for (int i = 0, index = user.size(); i < index; i++) {
				if (user.get(i).userId.equals(json.getJSONObject(j).getLong("tempUserId"))) {
					u = new DurianUser();
					u.userId = user.get(i).userId;
					u.userName = user.get(i).userName;
					u.userHead = user.get(i).userHead;
					json.getJSONObject(j).put("user", u);
					break;
				}
			}
		}
		return json;
	}
}
/*
 * 获取二级评论回复
 */
public JSONArray getComments(Long replyId, Boolean sort, Long toUserId, Long userId, Byte status, int count,
		int offset) throws Exception {
	Query query = TEXP.Bool(TEXP.BOOL_TYPE_AND, Arrays.asList(TEXP.Term("replyId", replyId),
			TEXP.Term("toUserId", toUserId), TEXP.Term("status", status)));
	SearchQuery searchQuery = new SearchQuery();
	searchQuery = setTEXPLimitSort(searchQuery, count, offset, sort);
	searchQuery.setQuery(query);
	JSONObject j = commentRepository.search(client, searchQuery);
	JSONArray ja = j.getJSONArray("list");
	String commentCount = j.getString("totalCount");
	JSONArray returnJson = new JSONArray();
	JSONObject tempJson = null;
	try (DruidPooledConnection conn = ds.getConnection()) {
		for (int i = 0; i < ja.size(); i++) {
			tempJson = new JSONObject();
			Long commentId = ja.getJSONObject(i).getLong("sequenceId");
			tempJson.put("commentInfo", ja.get(i));
			tempJson.put("appraiseCount", getAppraiseCount(commentId));
			tempJson.put("isAppraise", getAppraiseStatus(commentId, userId));
			tempJson.put("totalCount", commentCount);
			returnJson.add(tempJson);
		}
		return returnJson;
	}
}
/* 获取点赞数 */
public Long getAppraiseCount(Long ownerId) throws Exception {
	SearchQuery searchQuery = new SearchQuery();
	searchQuery.setGetTotalCount(true);
	Query query = TEXP.Bool(TEXP.BOOL_TYPE_AND, Arrays.asList(TEXP.Term("ownerId", ownerId)));
	searchQuery.setQuery(query);
	return appraiseRepository.search(client, searchQuery).getLong("totalCount");

}
/* 获取点赞状态 */
public boolean getAppraiseStatus(Long ownerId, Long userId) throws Exception {
	SearchQuery searchQuery = new SearchQuery();
	searchQuery.setGetTotalCount(true);
	Query query = TEXP.Bool(TEXP.BOOL_TYPE_AND,
			Arrays.asList(TEXP.Term("ownerId", ownerId), TEXP.Term("userId", userId)));
	searchQuery.setQuery(query);
	Long count = appraiseRepository.search(client, searchQuery).getLong("totalCount");
	if (count != null && count > 0) {
		return true;
	} else {
		return false;
	}
}
```

* MySQL

```java
//获取评论列表
public JSONArray getReplyList(DruidPooledConnection conn,Long id,Long upUserId,String status,Boolean orderDesc,Long toUserId,Integer count, Integer offset) throws ServerException {
		StringBuffer sql = new StringBuffer("SELECT reply.*,user.id,user.head,user.name,truncate(con.id,0) contentId,con.type,con.title contentTitle,(SELECT count(1) FROM tb_zskp_appraise WHERE owner_id = ");
		sql.append("(reply.sequence_id)");
		sql.append(") as appraiseCount FROM tb_zskt_reply reply INNER JOIN tb_zskt_user user ON reply.up_user_id = user.id INNER JOIN tb_cms_content con on reply.owner_id = con.id WHERE ");
		 
		EXP exp = EXP.INS(false).key("owner_id", id).andKey("reply.up_user_id", upUserId).andKey("reply.to_user_id", toUserId);
		if(orderDesc) {
			exp.append("ORDER BY create_time DESC");
		}else {
			exp.append("ORDER BY create_time asc");
		}
		List<Object> params = new ArrayList<Object>();
		exp.toSQL(sql, params);
		return this.sqlGetJSONArray(conn, sql.toString(), params, count, offset);
	}
//获取评论详情
	public JSONObject getReply(DruidPooledConnection conn,Long id) throws ServerException {
		StringBuffer sql = new StringBuffer("SELECT reply.*,user.id,user.head,user.name ,(SELECT count(1) FROM tb_zskp_appraise WHERE owner_id = ");
		sql.append("(reply.sequence_id)");
		sql.append(") as appraiseCount FROM tb_zskt_reply reply LEFT JOIN tb_zskt_user user ON reply.up_user_id = user.id WHERE reply.sequence_id = ");
		sql.append(id);
		List<Object> params = new ArrayList<Object>();
		return this.sqlGetJSONObject(conn, sql.toString(), params);
	}
//根据状态获取评论
	public JSONArray getReplyListByStatus(DruidPooledConnection conn,Integer count, Integer offset) throws ServerException {
		StringBuffer sql = new StringBuffer("SELECT  con.id conId,trim(con.title) contitle,re.*,user.id,user.name FROM tb_zskt_reply re LEFT JOIN tb_cms_content con ON re.owner_id = con.id LEFT JOIN tb_zskt_user user ON re.up_user_id = user.id WHERE re.status = 1");
		List<Object> params = new ArrayList<Object>();
		return this.sqlGetJSONArray(conn, sql.toString(), params, count, offset);
	}
```

```java
//获取回复列表
public JSONArray getCommentList(DruidPooledConnection conn,Long id,Long upUserId,String status,Boolean orderDesc,Long toUserId,Integer count, Integer offset) throws ServerException {
		StringBuffer sql = new StringBuffer("SELECT comment.*, user.id,user.`name`,user.head ,(SELECT count(1) FROM tb_zskp_appraise WHERE owner_id = ");
		sql.append("(comment.sequence_id)");
		sql.append(") as appraiseCount from tb_zskt_comment comment left join tb_zskt_user user on comment.up_user_id = user.id where ");
		EXP exp = EXP.INS(false).key("reply_id", id).andKey("up_user_id", upUserId).andKey("to_user_id", toUserId);
		if(orderDesc) {
			exp.append("ORDER BY create_time DESC");
		}else {
			exp.append("ORDER BY create_time ASC");
		}
		List<Object> params = new ArrayList<Object>();
		exp.toSQL(sql, params);
		return this.sqlGetJSONArray(conn, sql.toString(), params, count, offset);
	}
//根据状态获取回复
public JSONArray getCommentListByStatus(DruidPooledConnection conn,Integer count, Integer offset) throws ServerException {
	StringBuffer sql = new StringBuffer("SELECT com.*,us.id,us.name FROM tb_zskt_comment com LEFT JOIN tb_zskt_user us on com.up_user_id =us.id  WHERE com.status = 1 ");
	List<Object> params = new ArrayList<Object>();
	return this.sqlGetJSONArray(conn, sql.toString(), params, count, offset);
}
```

# 微信登录

## APP端

1. 先去微信开放平台申请账号，之后向微信申请一个应用，成功以后会获得appid与appserkey
2. 获得以上2个数据后使用HBuild打包把数据填入HBuild，调用uniapp的方法前端就可调用微信登陆获取用户信息与openid

注意事项：

* 在微信开放平台申请安卓应用应当先生成一个安卓证书，申请的时候需要用到，
* 申请安卓证书教程附上教程网站：https://ask.dcloud.net.cn/article/35777
* 申请时把安卓证书的相关参数填入
* 打包时也要使用自有证书打包，填入证书相关参数，打包完便可使用微信登陆功能

## 小程序端

1. 先去微信公众平台申请一个小程序，获得appid等相关参数
2. 填入HBuilder开发工具运行，调用uniapp方法可调起微信登录，前端可获取code，前端将code传到后台
3. 后台code请求微信服务器，微信服务器返回openid，后台openid传到前端，前端可凭openid获取用户信息
4. 信息传入后台完成微信登录

# 手机验证码登录

1. 搞个阿里云账号，去阿里云短信服务充值一波，阿里云短信控制台创建一个短信签名，创建短信模板
2. 阿里云短信服务java SDK引入项目
3. 在代码中填入阿里云的2个密钥
4. 提供发送短信接口，把验证码及手机号码做缓存，方便后续判断
5. 对登录的验证码，手机号码做判断

* 发送验证码相关代码

  ```java
  /**
   * 发送短信验证码
   */
  public class SendSms {
  	 //产品名称:云通信短信API产品,开发者无需替换
      static final String product = "Dysmsapi";
      //产品域名,开发者无需替换
      static final String domain = "dysmsapi.aliyuncs.com";
  
      //SMS_165341505注册
      // TODO 此处需要替换成开发者自己的AK(在阿里云访问控制台寻找)
      static final String accessKeyId = "？？？？？";
      static final String accessKeySecret = "？？？？？";
  	public static SendSmsResponse sendSms(String phone,int num,String TemplateCod) throws ClientException {
          //可自助调整超时时间
          System.setProperty("sun.net.client.defaultConnectTimeout", "10000");
          System.setProperty("sun.net.client.defaultReadTimeout", "10000");
          //初始化acsClient,暂不支持region化
          IClientProfile profile = DefaultProfile.getProfile("cn-hangzhou", accessKeyId, accessKeySecret);
          DefaultProfile.addEndpoint("cn-hangzhou", "cn-hangzhou", product, domain);
          IAcsClient acsClient = new DefaultAcsClient(profile);
          //组装请求对象-具体描述见控制台-文档部分内容
          SendSmsRequest request = new SendSmsRequest();
          //必填:待发送手机号
          request.setPhoneNumbers(phone);
          //必填:短信签名-可在短信控制台中找到
          request.setSignName("？？？");
          //必填:短信模板-可在短信控制台中找到
          request.setTemplateCode(TemplateCod);
          //可选:模板中的变量替换JSON串,如模板内容为"亲爱的${name},您的验证码为${code}"时,此处的值为
          request.setTemplateParam("{\"code\":\""+num+"\"}");
          //选填-上行短信扩展码(无特殊需求用户请忽略此字段)
          //request.setSmsUpExtendCode("90997");
          //可选:outId为提供给业务方扩展字段,最终在短信回执消息中将此值带回给调用者
          request.setOutId("yourOutId");
          //hint 此处可能会抛出异常，注意catch
          SendSmsResponse sendSmsResponse = acsClient.getAcsResponse(request);
          return sendSmsResponse;
  	 }
  }
  ```

  * 阿里云短信SDK

    ```xml
    <dependency>
        <groupId>com.aliyun</groupId>
        <artifactId>aliyun-java-sdk-core</artifactId>
        <version>4.4.5</version>
    </dependency>
    <dependency>
        <groupId>com.aliyun</groupId>
        <artifactId>aliyun-java-sdk-dysmsapi</artifactId>
        <version>1.1.0</version>
    </dependency>
    ```

    