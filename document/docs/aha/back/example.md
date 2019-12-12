---
title: 小红椒后端交接文档
author: JXians   
date: 2019-12-11

---

## 一、流程引擎

运行环境：Java1.8、MySQL5.7

### 1、前言现状

​	现在的OA系统中的流程实现都很单一，为了让OA系统中的流程更灵活多变，公司决定编写一套流程引擎。

目前流程引擎设计与初步后端代码实现已完成，待实战调试。

### 2、实现思路

** 主要表设计：

* 流程定义表（ProcessDefinition）

* 节点分组表（ProcessActivityGroup）

* 节点表（ProcessActivity）

* 行为表（ProcessAction）

* 资产定义表（ProcessAssetDesc）

* 资产表（ProcessAsset）

* 流程实例表（Process）

* 附件表（Annex）

* 流程实例日志表（ProcessLog）

* 表结构表（Tableschema）

* 表数据表（TableData）

* 表数据批次表（TableBatch）

* 表批次数据表（TableBatchData）

** 代码实现流程图——流程定义：

* **代码包：zyxhj.flow.service/FlowService**

![](/aha/back/流程定义.png)

** 代码实现流程图——流程实例（不完整）：

* **代码包：zyxhj.flow.service/ProcessService**

![](/aha/back/流程实例.png)

**流程实例运行核心代码（execAction）：**

````java
@POSTAPI(//
    path = "execAction", //
    des = "执行action", //
    ret = "受影响行数"//
)
public int execAction(//
    @P(t = "流程实例行为编号，") Long processId, //
    @P(t = "节点行为编号，") Long activityId, //
    @P(t = "action行为编号，") Long actionId, //
    @P(t = "节点分组编号，", r = false) Long activityGroupId, //
    @P(t = "使用者编号，") Long userId, //
    @P(t = "行为类型，") String type//
) throws Exception {
    int ret = 0;
    try (DruidPooledConnection conn = ds.getConnection()) {
        // processActionIF 是 判断实例、节点、action是否存在
        ProcessAction action = processActionIF(processId, activityId, actionId, type);
        if (action != null) {
            User user = userRepository.get(conn, EXP.INS().key("id", userId));

            // 目标节点
            String defaultTarget = null;

            // 判断rule
            JSONArray rules = action.rules;

            for (int i = 0; i < rules.size(); i++) {

                JSONObject jo = rules.getJSONObject(i);
                String exp = jo.getString("exp");
                String targetType = jo.getString("targetType");
                String target = jo.getString("target");

                // 是节点还是节点分组
                if (targetType.equals("activity")) {

                    // 普通节点还是节点分组内节点
                    ProcessActivity activity = flowService.getPDActivityById(action.pdId, activityId);
                    if (activity != null) {
                        if (activity.activityGroupId == 0 || activity.activityGroupId == null) {

                            System.out.println("进入普通节点");
                            // 执行表达式 得到下一目标节点
                            if (exp.equals("expDefault")) {
                                // 默认case
                                defaultTarget = target;
                            } else {
                                // 其它case，先判断表达式，然后执行
                            }
                            // 修改action中的ext数据
                            ret = editActionExt(actionId, activityId, new Byte("1"));

                        } else {

                            System.out.println("进入节点分组内节点");

                            // 修改action中的ext数据
                            List<ProcessAction> palist = getProcessActionsInActivity(activityId);
                            Long currId = null;
                            for (ProcessAction p : palist) {
                                if (p.type.equals(type)) {
                                    currId = p.id;
                                    break;
                                }
                            }
                            System.out.println("currId" + currId);

                            int edit = editActionExt(currId, activityId, new Byte("1"));
                            System.out.println("修改action状态" + edit);

                            // 查询当前节点分组中所有节点是否全部执行完毕
                            ret = ifActivityAction(activityGroupId);
                            System.out.println("当前节点分组编号：" + activityGroupId);

                            int subSize = flowService.getSubActivity(activityGroupId).size();
                            if (ret == subSize) {
                                System.out.println("所有操作均完成");
                                // 得到相应操作的节点分组action
                                ProcessAction paglist = processActionRepository.get(conn,
                                                                                    EXP.INS().key("owner_id", activityGroupId).andKey("type", type));
                                JSONArray ja = paglist.rules;
                                for (int x = 0; x < ja.size(); x++) {
                                    JSONObject jo1 = ja.getJSONObject(i);
                                    String exp1 = jo1.getString("exp");
                                    String target1 = jo1.getString("target");
                                    if (exp1.equals("expDefault")) {
                                        // 默认case
                                        defaultTarget = target1;
                                        break;
                                    } else {
                                        // 其它case，先判断表达式，然后执行
                                    }
                                }
                            } else {
                                System.out.println("操作未完成");
                                defaultTarget = activityGroupId.toString();
                            }
                            System.out.println("分组内节点跳转目标" + defaultTarget);
                        }
                    }

                } else if (targetType.equals("activityGroup")) {
                    //						target = jo.getString("target");

                    System.out.println("进入节点分组");
                    // 执行表达式 得到下一目标节点
                    if (exp.equals("expDefault")) {
                        // 默认case
                        defaultTarget = target;
                    } else {
                        // 其它case，先判断表达式，然后执行
                    }
                    ret = 2;
                }
            }

            System.out.println("------------------" + defaultTarget);
            // 流程实例跳转到下一目标节点
            Process renew = new Process();
            if (defaultTarget == null) {
                renew.currActivityId = 0L;
            } else {
                renew.currActivityId = Long.decode(defaultTarget);
            }

            processRepository.update(conn, EXP.INS().key("id", processId), renew, true);
            // 记录日志
            createProcessLog(processId, "action操作", user.id, user.name, action.type, action.label, activityId, "");
        } else {
            throw new ServerException(BaseRC.SERVER_DEFAULT_ERROR, "没找到对应流程节点的行为Action");
        }
    } catch (Exception e) {
        e.printStackTrace();
    }
    return ret;
}
````

** 批次数据导入处理流程图（初步设计）：

* **代码包：zyxhj.flow.service/TableService**

![](/aha/back/表格引擎-批次.png)

### 3、代码地址

````http
 https://github.com/ahateam/zero/tree/dev 
````

### 4、备注

````properties
技术开发：张宇、郑兴江
技术维护：张宇、郑兴江
联系方式：18685644226(QQ)
项目保管：小红椒-刘滔
项目地址： https://github.com/ahateam/zero/tree/dev
是否维护：否/是
停止维护：2019/12/11
````

## 二、工具类

### 1、榴莲项目合同生成工具类

​	**代码包：zyxhj.utils/ExportOfficeUtils**

​	**Word、PDF文档生成SDK**

````xml
<!-- docx4j 生成PDF使用 -->
<dependency>
    <groupId>org.docx4j</groupId>
    <artifactId>docx4j</artifactId>
    <version>3.3.7</version>
</dependency>
<dependency>
    <groupId>org.apache.xmlgraphics</groupId>
    <artifactId>batik-util</artifactId>
    <version>1.10</version>
</dependency>
<dependency>
    <groupId>org.docx4j</groupId>
    <artifactId>docx4j-export-fo</artifactId>
    <version>3.3.6</version>
</dependency>

<!-- freemarker -->
<dependency>
    <groupId>org.freemarker</groupId>
    <artifactId>freemarker</artifactId>
    <version>2.3.23</version>
</dependency>
<dependency>
    <groupId>org.xhtmlrenderer</groupId>
    <artifactId>flying-saucer-pdf</artifactId>
    <version>9.1.19</version>
</dependency>
````

* ** word文档生成

  使用方法：

  ```java
  ExportOfficeUtils.generateWORD(templateName, map, OutputFilePath);
  
  /**
    * 根据模板生成word文档
    * 
    * @param templateName   模板名称
    * @param dataMap        模板需求数据
    * @param OutputFilePath 生成文件存放地址
    */
  public static void generateWORD(String templateName, Map<String, Object> dataMap, String OutputFilePath) {
      try {
          // Configuration 用于读取ftl文件
          Configuration configuration = getConfiguration();
          // 输出文档路径及名称
          File outFile = new File(OutputFilePath);
          Template template = configuration.getTemplate(templateName, "utf-8");
          Writer out = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(outFile), "utf-8"), 10240);
          template.process(dataMap, out);
          out.close();
      } catch (Exception e) {
          e.printStackTrace();
      }
  }
  ```

* ** PDF文档生成

  使用方法：

  ````java
  ExportOfficeUtils.generateWORD(templateName, map, WORDoutputFilePath);
  
  /**
    * 生成pdf文档
    * 
    * @param templateName 模版文件
    * @param obj          数据
    * @param os           输出流
    * @throws Exception 
    */
  public static void generatePDF(String templateName, Map<String, Object> dataMap, String PDFoutputFilePath)
      throws Exception {
      // 合并模板和数据模型 word doc os = ftl + obj
      String generate = ExportOfficeUtils.generate(templateName, dataMap);
      ByteArrayInputStream in = new ByteArrayInputStream(generate.getBytes());
      // 文字处理对象
      WordprocessingMLPackage wordMLPackage = WordprocessingMLPackage.load(in);
      // wordMLPackage -> pdf os
      FOSettings foSettings = Docx4J.createFOSettings();
      Mapper fontMapper = new IdentityPlusMapper();
      //字体处理
      fontMapper.put("华文楷体", PhysicalFonts.get("STKaiti"));
      fontMapper.put("隶书", PhysicalFonts.get("LiSu"));
      fontMapper.put("宋体", PhysicalFonts.get("SimSun"));
      fontMapper.put("微软雅黑", PhysicalFonts.get("Microsoft Yahei"));
      fontMapper.put("黑体", PhysicalFonts.get("SimHei"));
      fontMapper.put("楷体", PhysicalFonts.get("KaiTi"));
      fontMapper.put("新宋体", PhysicalFonts.get("NSimSun"));
      fontMapper.put("华文行楷", PhysicalFonts.get("STXingkai"));
      fontMapper.put("华文仿宋", PhysicalFonts.get("STFangsong"));
      fontMapper.put("仿宋", PhysicalFonts.get("FangSong"));
      fontMapper.put("幼圆", PhysicalFonts.get("YouYuan"));
      fontMapper.put("华文宋体", PhysicalFonts.get("STSong"));
      fontMapper.put("华文中宋", PhysicalFonts.get("STZhongsong"));
      fontMapper.put("等线", PhysicalFonts.get("SimSun"));
      fontMapper.put("等线 Light", PhysicalFonts.get("SimSun"));
      fontMapper.put("华文琥珀", PhysicalFonts.get("STHupo"));
      fontMapper.put("华文隶书", PhysicalFonts.get("STLiti"));
      fontMapper.put("华文新魏", PhysicalFonts.get("STXinwei"));
      fontMapper.put("华文彩云", PhysicalFonts.get("STCaiyun"));
      fontMapper.put("方正姚体", PhysicalFonts.get("FZYaoti"));
      fontMapper.put("方正舒体", PhysicalFonts.get("FZShuTi"));
      fontMapper.put("华文细黑", PhysicalFonts.get("STXihei"));
      fontMapper.put("宋体扩展",PhysicalFonts.get("simsun-extB"));
      fontMapper.put("仿宋_GB2312",PhysicalFonts.get("FangSong_GB2312"));
      fontMapper.put("新細明體",PhysicalFonts.get("SimSun"));
      //解决宋体（正文）和宋体（标题）的乱码问题
      PhysicalFonts.put("PMingLiU", PhysicalFonts.get("SimSun"));
      PhysicalFonts.put("新細明體", PhysicalFonts.get("SimSun"));
  
      wordMLPackage.setFontMapper(fontMapper);
  
      foSettings.setWmlPackage(wordMLPackage);
      foSettings.setApacheFopMime("application/pdf");
      Docx4J.toPDF(wordMLPackage, new FileOutputStream(PDFoutputFilePath));
  }
  ````

* ** 图片转码

  ````java
  /**
    * 图片转码(如无法完成BASE64包的导入，查看编辑器是否开发BASE64包的使用)
    */
  public static String getImageStr(String imgpath) {
      InputStream in = null;
      byte[] data = null;
      try {
          in = new FileInputStream(imgpath);
          data = new byte[in.available()];
          in.read(data);
          in.close();
      } catch (Exception e) {
          e.printStackTrace();
      }
      BASE64Encoder encoder = new BASE64Encoder();
      return encoder.encode(data);
  }
  ````

**模板制作**

````properties
1、打开word文档
2、在需要填充数据的地方添加变量————${变量名}
3、将word文档另存为XML格式
4、使用XML工具打开XML文件，查找添加的所有变量是否被分隔开，如果被分隔开，直接删除中间代码，保存XML文件
5、更改XML文件后缀为.ftl——模板制作完成
6、将.ftl文件放到工具类所在项目的src/main/resources/template目录下
````

### 2、文件上传服务器与服务器下载文件

**代码包：zyxhj.utils/JschOpenHandler**

** 使用JSCH实现

````xml
<!-- 文件上传到服务器 -->
<dependency>
    <groupId>com.jcraft</groupId>
    <artifactId>jsch</artifactId>
    <version>0.1.54</version>
</dependency>
<dependency>
    <groupId>org.apache.logging.log4j</groupId>
    <artifactId>log4j-core</artifactId>
    <version>2.12.1</version>
</dependency>
````

**基本属性值**

````java
//默认等待时间
private static final int DEF_WAIT_SECONDS = 60;

private static String HOST = "47.99.209.235";// 服务器地址
private static String USERNAME = "root";// 服务器登录名
private static String PASSWORD = "Aa123456Aa";// 服务器密码
private static final int DEFAULT_PORT = 22;//端口号
````



* **文件上传服务器**

  ````java
  public static void main(String[] args) {
      Session session = openSession(HOST, USERNAME, PASSWORD, DEF_WAIT_SECONDS);
      ChannelShell openChannelShell = openChannelShell(session);
      openChannelShell.setInputStream(System.in);
      openChannelShell.setOutputStream(System.out);
      ChannelSftp openChannelSftp = openChannelSftp(session);
      try {
          // 源文件地址
          String sourcefile = "C:\\Users\\Admin\\Desktop\\集体经济管理员账号.xlsx";
          // 放在服务器的目标位置
          String DST_FILE_PATH = "/var/jar/jititest/file-uploads/1001";
        	// 首先查看下目录，如果不存在，系统会被错，捕获这个错，生成新的目录。
  		openChannelSftp.ls(DST_FILE_PATH); 
          // 上传文件到服务器
          openChannelSftp.put(sourcefile, DST_FILE_PATH, ChannelSftp.OVERWRITE);
          //关闭会话
          disConn(session, openChannelSftp);
      } catch (Exception e) {
  		e.printStackTrace();
      }
  }
  ````

  

* **服务器下载文件**

  ````java
  public static void main(String[] args) {
      Session session = openSession(HOST, USERNAME, PASSWORD, DEF_WAIT_SECONDS);
      ChannelShell openChannelShell = openChannelShell(session);
      openChannelShell.setInputStream(System.in);
      openChannelShell.setOutputStream(System.out);
      ChannelSftp openChannelSftp = openChannelSftp(session);
      try {
          //文件保存位置
          String downloadFileName = "C:/Users/Admin/Desktop/123.xlsx";
          //服务器文件目录
          String downloadfilepath = DST_FILE_PATH;
          //服务器文件
          String downloadfile = "集体经济管理员账号.xlsx";
          
           // 从服务器下载文件
          sftpDownLoadFile(session, downloadFileName, downloadfilepath, downloadfile);
          //关闭会话
          disConn(session, openChannelSftp);
      } catch (Exception e) {
          e.printStackTrace();
      }
  }
  ````

### 3、二维码生成

**代码包：zyxhj.utils/QRCodeUtils**

````xml
<!-- 二维码生成 -->
<dependency>
    <groupId>com.google.zxing</groupId>
    <artifactId>core</artifactId>
    <version>3.3.0</version>
</dependency>
````

**使用方法：**

````java
public void test(){
    String content = "二维码信息";
    String imgPath = "二维码嵌入图片地址"；
    String destPath = "二维码保存地址";
    Boolean needCompress = "是否压缩二维码";
    QRCodeUtil.produceQRCode(content, imgPath, destPath, needCompress);
}
````

### 4、腾讯云TIM

**基本属性值**

````java
//腾讯云TIM——APPID
private static long sdkappid = 1400277699;
//腾讯云TIM——秘钥
private static String key = "281d8830bb13fa0923bc5c34cc13690faac214906fd5342782daba5a3e645f3c";
//userSig有效时间
private static final Long EXPIRETIME = 604800000L;
````

**使用方法：**

````java
public void test(){
    //榴莲项目中的userSig由用户的userId生成
    Long userId = 11111111111L;
    String userSig = TIMUtil.genSig(String.valueOf(userId));
}
````

### 5、备注

````properties
技术开发：郑兴江
技术维护：郑兴江
联系方式：1151484669(QQ)
项目保管：小红椒-刘滔
项目地址： https://github.com/ahateam/zero/tree/dev
是否维护：否/是
停止维护：2019/12/11
````

## 