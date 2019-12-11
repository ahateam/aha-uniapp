let OSS = require('ali-oss');


let client = new OSS({
    region: 'oss-ap-southeast-2',
    //云账号AccessKey有所有API访问权限，建议遵循阿里云安全最佳实践，部署在服务端使用RAM子账号或STS，部署在客户端使用STS。
    accessKeyId: 'LTAI4FqngBZhahjCXBPUDwSu',
    accessKeySecret: 'n1AjWfS1Jfdcl5ks8REHsIgHf3RT07',
    bucket: 'durian-im'
});

export default client
