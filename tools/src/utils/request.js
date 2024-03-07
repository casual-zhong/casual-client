import axios from "axios";
// console.log("import.meta.env", import.meta.env.VITE_API_URL);

//创建一个新的请求实例instance,instance.的用法和axios.的用法一致，可以使用instance({})、instance.get（）、instance.post()
const instace = axios.create({
  baseURL: import.meta.env.VITE_API_URL, //默认配置(这里不要用process.env,个人百度这个在vite中被废弃掉了,属性名必须以VITE_API_开头,否则 import.meta.env检测不到)
  timeout: 5000, //超时时间
});

//配置请求拦截器,在请求之前的数据处理,比如在请求头添加token,所有的请求都会经过拦截器
instace.interceptors.request.use(
  //config:该参数表示当前请求的配置对象
  (config) => {
    //例如:
    //在请求头统一添加token
    //或者请求之前显示lodding图标(这里只演示这个)
    //这里是vant组件库的loadding,安装和配置请查看此文档的vant组件库的配置https://blog.csdn.net/weixin_68658847/article/details/129331162

    // Toast.loading({
    //   duration: 0,
    //   message: "正在努力加载",
    // });
    return config;
  },
  (err) => {
    // Toast.clear(); //请求失败关闭loadding
    return Promise.reject(err); //将错误消息挂到promise的失败函数上
  }
);

//配置响应拦截器
// 响应拦截器:在请求响应之后对数据处理，比如:登录失败、请求数据失败的处理
// instance.interceptors.response.use(response=>{l}, err=>{});
// 响应成功:执行回调函数1;响应失败，执行回调函数2
instace.interceptors.response.use(
  (response) => {
    // Toast.clear(); //响应成功关闭loadding
    return response; //这里的response就是请求成功后的res , response.data即是请求成功后回调函数内的参数res.data
  },
  (err) => {
    // Toast.clear(); //响应失败关闭loadding
    return Promise.reject(err); //将错误消息挂到promise的失败函数上
  }
);

//封装请求的api
const callapi = (method = "GET", url, data = {}) => {
  return instace({
    method,
    url,
    params: method === "GET" ? data : {},
    data: method === "POST" ? data : {},
  });
};
//封装GET请求函数
export const httpGet = (url, data) => callapi("GET", url, data);
export const httpPost = (url, data) => callapi("POST", url, data);
