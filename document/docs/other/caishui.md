---
title: 财税云第一次前端对接文档
author: cometang
date: 2019-9-25

---



## 财政云前端团队合作--计划安排

- 9/25——9/26  熟悉目前前端代码的用法
- 国庆节前将流程图模块相关的页面完成，并尽量完成流程图相关的接口对接
- 前端页面均优先采用默认的bootstrap 的ui组件去完成，尽快能够跑通一个初始版本
- 页面样式优化可以放到下一个迭代版本种做



## 基础框架

```
底层框架不变，将前端部分直接改写vue的写法，在模板引擎中让整个项目通用vue
```

- vuejs 
- bootstrap UI       （只用前端UI组件，尽量减少使用bootstrap的js文件）
- jquery ajax（ajax前后端接口对接）

### 基础对接代码示例

```
下面的均已经与杨洋沟通过，如果写的不太清晰的请直接询问杨洋即可
已完成:
数据双向绑定
vue生命周期钩子
ajax请求及回调(后端每个接口的返回值需要增加请求的状态：如code 之类的)
```

```html
<!DOCTYPE html>
<html lang="zh" xmlns:th="http://www.thymeleaf.org" xmlns:shiro="http://www.pollix.at/thymeleaf/shiro">
<head>
    <th:block th:include="include :: header('表单引擎页面')"/>
</head>
<body >

<div id="app">
    <input type="text " v-model="processName">
    <button @click="btn">创建流程定义</button>
    <div style="margin: 20px 0;">
        <div class="row" >
            <div class="col-md-10 col-md-offset-1">
                <table class="table table-bordered table-hover">
                    <thead>
                    <th>编号</th>
                    <th>标题</th>
                    <td>操作</td>
                    </thead>
                    <tbody >
                        <tr v-for="(item,index) in list" :key="index">
                            <td>{{item.id}}</td>
                            <td>{{item.title}}</td>
                            <td>
                                <button class="danger" @click="delBtn(item)">
                                    删除
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

</div>

<div th:include="include :: footer"></div>

</body>
</html>
```

```js
<script th:inline="javascript">
    new Vue({
        el:'#app',
        data(){
          return {
              processName:'',
              data:'11111',
              list:[]
          }
        },
        methods:{
            //添加流程定义
            btn(){
                var that = this
                var cnt = {
                    moduleKey:'create',
                    title:this.processName,
                    tags:{},
                    lanes:{},
                }
                $.ajax({
                    url:'/system/tbFlow/createPD',
                    type:'post',
                    data:cnt,
                    success:(res)=>{
                    this.processName =''
                    this.getProcessList();
                    }
                })
            },
            //请求流程定义列表
            getProcessList() {
                    var data = {
                        moduleKey:'create',
                    }
                $.ajax({
                    url:"/system/tbFlow/getPDList",
                    type:'post',
                    data:data,
                    success:(res)=>{
                        console.log('-----------------')
                        console.log(res)
                        this.list = res;
                        console.log(this.list)
                    }
                })
            },
            //删除一个流程定义
            delBtn(item){
                console.log(item)
                let data ={
                    pdId:item.id,
                }
                $.ajax({
                    url:'/system/tbFlow/delPD',
                    type:'post',
                    data:data,
                    success:(res)=>{
                        if(res>0){
                            this.getProcessList();
                        }
                }
                })
            }

        },
        mounted(){
           this.getProcessList()
        }
    })
</script>
```

#### 注意事项

	- js中的mounted() 钩子中是进入页面就立即运行的，所以一般用来请求页面的默认值
	- 所有的公用方法尽量的抽离到methods中去形成单独的方法
	- 在使用ajax之后 写回调的success中请使用箭头函数即：success:(res)=>{}  ；否则this的作用域会发生改变
	- 所有的变量的都需要在data中进行初始化赋值



## 流程图引擎模块注意事项

```
目前进度：后端已经跑通流程引擎模块的所有接口，等待前端进入后开始跑完整的流程
```

#### 1.已有流程列表页

- 创建好的流程定义的列表--每一个流程定义都支持 ：再次编辑+删除
- 新增流程定义的入口 --按钮



#### 2.创建流程定义页

```
注意事项：一定要清晰地在页面中表示 节点的action动作跳转  节点分组与节点 节点与所需资源  节点的权限 
```

- 创建节点/节点分组  (注:节点分组中可以有多个子节点，但是有分组的子节点无跳转功能)
- 创建节点所需要的资源 （注：所需要的资源可以有表单/表格等 ）
- 创建节点所对应的权限 （注：节点的权限对应的是：部门/角色/职务/个人）
- 创建节点的action动作 （注：注意分组中的节点没有action  顶层节点的action不同的分支可以任意指向另一顶层节点）



#### 4. 使用流程（创建流程实例）页

	- 用户使用已经创建好的流程实例的页面
	- 注意每个activity 的具体操作的页面体现
	- 注意activity下的aciton的权限以及资源的管理