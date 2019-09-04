/*左侧导航栏菜单生成的内容*/
const  menu =[
    {
        path:'/dashboard',
        title:'首页',
        icon:'course_shouye',
        child:[]
    },
    {
        path:'/component',
        title:'自定义组件',
        icon:'course_guanli1',
        child:[
            {
                path:'/tableShow',
                title:'扩展表格',    
            }   
        ]   
    }

]



export default {
    menu
}
