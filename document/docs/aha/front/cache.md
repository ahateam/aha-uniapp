---

title: uni-app——缓存
author: 李金泉   
date: 2019-12-12

---

## 异步缓存与同步缓存



- #### [uni.setStorage(OBJECT)](https://uniapp.dcloud.io/api/storage/storage?id=setstorage)

将数据存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容，这是一个异步接口。

- **OBJECT 参数说明**

| 参数名   | 类型     | 必填 | 说明                                                         |
| -------- | -------- | ---- | ------------------------------------------------------------ |
| key      | String   | 是   | 本地缓存中的指定的 key                                       |
| data     | Any      | 是   | 需要存储的内容，只支持原生类型、及能够通过 JSON.stringify 序列化的对象 |
| success  | Function | 否   | 接口调用成功的回调函数                                       |
| fail     | Function | 否   | 接口调用失败的回调函数                                       |
| complete | Function | 否   | 接口调用结束的回调函数（调用成功、失败都会执行）             |

- **示例**

  - 1.缓存字符串

  ```js
  //存
  uni.setStorage({
      key: 'storageKey',
      data: 'hello',
      success: function () {
          console.log('success');
      }
  });
  
  //取
  uni.getStorage({
  	key: 'storage_key',
      success: function (res) {
          console.log(res.data); // 控制台输出为'hello'
      }
  })
  
  
  
  ```

  - 2.缓存一个json对象

  ```js
  //存
  let obj = {
  	name: '张三',
  	sex: '男'
  }
  uni.setStorage({
      key: 'storageKey',
      data: obj,
      success: function () {
          console.log('success');
      }
  });
  
  //取
  uni.getStorage({
  	key: 'storage_key',
      success: function (res) {
          console.log(res.data); // 控制台输出为 {name:'张三',sex:'男'}
      }
  })
  ```

  - 清除缓存

  ```js
  uni.clearStorage()
  ```



- #### [uni.setStorageSync(KEY,DATA)](https://uniapp.dcloud.io/api/storage/storage?id=setstoragesync)

将 data 存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容，这是一个同步接口。

**参数说明**

| 参数名 | 类型   | 必填 | 说明                                                         |
| ------ | ------ | ---- | ------------------------------------------------------------ |
| key    | String | 是   | 本地缓存中的指定的 key                                       |
| data   | Any    | 是   | 需要存储的内容，只支持原生类型、及能够通过 JSON.stringify 序列化的对象 |

- 示例

  - 缓存字符串

  ```js
  uni.setStorageSync('storage_key', 'hello');
  
  console.log(uni.getStorageSync('storage_key')) //输出为'hello'
  ```

  - 缓存对象

  ```js
  let obj = {
  	name: '张三',
  	sex: '男'
  }
  
  uni.setStorageSync('storage_key', obj);
  
  console.log(uni.getStorageSync('storage_key')) // 输出为 {name:'张三',sex:'男'}
  ```

  - 清除缓存

  ```js
  uni.clearStorageSync()
  ```

  

> 对于app的用户登录等需要长期保存的信息，需要用缓存的方法储存在本地缓存中

