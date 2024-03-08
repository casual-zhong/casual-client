<template>
  <div>
    <Form
      ref="formVal"
      :model="formValidate"
      :rules="ruleValidate"
      :label-width="100"
    >
        <FormItem label="内置发件人" prop="type">
            <RadioGroup v-model="builtIn" @on-change="changeBuiltIn">
                <Radio v-for="item in builtInList" :label="item.name">{{item.name}}</Radio>
                <!-- <Radio label="tansyjane9@gmail.com">tansyjane9@gmail.com</Radio> -->
            </RadioGroup>
        </FormItem>
        <FormItem label="邮箱类型" prop="type">
            <RadioGroup v-model="formValidate.type">
                <Radio label="gmail">Gmail</Radio>
                <!-- <Radio label="qq">QQ</Radio> -->
            </RadioGroup>
        </FormItem>
        <Row>
            <Col span="12">
                <FormItem label="发送人邮箱" prop="authName">
                    <Input
                    v-model="formValidate.authName"
                    placeholder="请输入发送人邮箱"
                    ></Input>
                </FormItem>
            </Col>
            <Col span="12">
                <FormItem label="邮箱授权码" prop="authVal">
                    <Input v-model="formValidate.authVal" placeholder="邮箱授权码"></Input>
                </FormItem>
            </Col>
        </Row>

        <FormItem label="接收人邮件" prop="type">

            <RadioGroup v-model="checkType">
                <Radio label="input">手动输入</Radio>
                <Radio label="upload">文件上传</Radio>
            </RadioGroup>

            <Upload 
            style="margin-top:10px;"
            v-if="checkType=='upload'"
            action="*"
            accept=".txt"
            :before-upload="onProgress"
            :show-upload-list="false">
                <Button icon="ios-cloud-upload-outline">选择文件</Button>
            </Upload>
        </FormItem>
        
        <FormItem label="收件人邮箱" v-show="checkType=='input'">
            <Input v-model="mailTextList" type="textarea" :rows="4" placeholder="请输入接收人邮箱，多个用逗号(',')隔开" />   
        </FormItem>

        <FormItem label="收件人邮箱" v-show="checkType=='upload'&&mailList.length">
            <Checkbox
            :indeterminate="indeterminate"
            :model-value="checkAll"
            @click.prevent="handleCheckAll">全选</Checkbox>

            总数：{{mailList.length}}
            已选：{{checkAllGroup.length}}
            <Divider size="small" class="ivu-m-0" />
            <CheckboxGroup v-model="checkAllGroup" @on-change="checkAllGroupChange">
                <Checkbox 
                v-for="item in mailList"
                :label="item"></Checkbox>
            </CheckboxGroup>
        </FormItem>

        <Row>
            <Col span="12">
                <FormItem label="主题" prop="subject">
                    <Input v-model="formValidate.subject" placeholder="请输入主题"></Input>
                </FormItem>
            </Col>
            <Col span="12">
                <FormItem label="图片附件" prop="imgUrl">
                    <div class="demo-upload-list" v-show="imgUrl">
                        <Image :src="imgUrl" fit="cover" width="100%" height="100%" />
                    </div>
                    <Upload
                        ref="uploadImg"
                        :show-upload-list="false"
                        :format="['jpg','jpeg','png']"
                        :max-size="2048"
                        :before-upload="imgFn.handleBeforeUpload"
                        multiple
                        type="drag"
                        action="*"
                        style="display: inline-block;width:58px;">
                        <div style="width: 58px;height:58px;line-height: 58px;">
                            <Icon type="ios-camera" size="20"></Icon>
                        </div>
                    </Upload>
                </FormItem>
            </Col>
        </Row>
      
      <FormItem label="内容">
        <TEditor style="width:100%;height:500px;" ref="editor" v-model="formValidate.content" />
      </FormItem>
      
      <FormItem>
        <Button type="primary" @click="handleSubmit(formVal)">发送</Button>
        <Button @click="handleReset(formVal)" style="margin-left: 8px"
          >重置</Button
        >
      </FormItem>
    </Form>
  </div>
</template>

<script setup>
// const { ref,reactive,getCurrentInstance,onMounted,watch,computed,onBeforeUnmount } = Vue;
// const { proxy } = getCurrentInstance();
import api from "@/api/index.js";
import { ref, reactive } from "vue";

import TEditor from '@/components/TEditor.vue';

const checkType = ref('input');
const mailTextList = ref("");

const formValidate = reactive({
    type: "gmail",
    authName:"",
    authVal:"",
    mailList: "",
    subject:"",
    imgUrl:"",
    content:""
});

const ruleValidate = reactive({
  authName: [
    { required: true, message: "请输入发送人邮箱", trigger: "blur" },
    { type: "email", message: "请输入正确的邮箱", trigger: "blur" },
  ],
});

// 内置发件人
const builtInList = [{
    name:"tansyqin9@gmail.com",
    value:"lwcjqpvkyiqhrqvr"
},{
    name:"tansyjane9@gmail.com",
    value:"weglvmaplckugcrk"
}]
const builtIn = ref("");
const changeBuiltIn = (e)=>{
    let item = builtInList.find(v=>v.name==e);
    formValidate.authName = item.name; 
    formValidate.authVal = item.value;
}



const indeterminate = ref(false)
const checkAll = ref(false)
const checkAllGroup = ref([])
const mailList = ref([])
const onProgress = (file)=>{
    console.log('file',file)
    let reader = new FileReader();
    reader.readAsText(file, 'UTF-8');
    reader.onload = (event) => {
        let data = event.target.result;
        let reg = (/\r\n/g);
        let arr = data.split(reg).filter(item => item !== '');
        let list = arr.filter(e=>{
            // let regx = /^([a-zA-Z0-9_\-])+@([a-zA-Z0-9_\-])+(\.[a-zA-Z0-9_\-])+$/;
            let regx = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
            return regx.test(e);
        });
        mailList.value = list;
    }
}
const handleCheckAll = ()=> {
    if (indeterminate.value) {
        checkAll.value = false;
    } else {
        checkAll.value = !checkAll.value;
    }
    indeterminate.value = false;

    if (checkAll.value) {
        checkAllGroup.value = mailList.value;
    } else {
        checkAllGroup.value = [];
    }
}
const checkAllGroupChange = (data)=> {
    if (data.length === 3) {
        indeterminate.value = false;
        checkAll.value = true;
    } else if (data.length > 0) {
        indeterminate.value = true;
        checkAll.value = false;
    } else {
        indeterminate.value = false;
        checkAll.value = false;
    }
}


const imgUrl = ref("");
const uploadImg = ref(null);

const imgFn = {
    handleRemove (file) {
        const fileList = uploadImg.value.fileList;
        uploadImg.value.fileList.splice(fileList.indexOf(file), 1);
    },
    handleBeforeUpload (file) {
        // 获取文件路径
        // formValidate.imgUrl = URL.createObjectURL(file);
        imgFn.photoCompress(file,(e)=>{
            imgUrl.value = e;
            formValidate.imgUrl = e;
        })
    },
    photoCompress(file, callback) {
        let ready = new FileReader();
        ready.readAsDataURL(file);
        ready.onload = function () {
            let fileResult = this.result;
            let img = new Image();
            img.src = fileResult;
            img.onload = function () {
                let that = this;
                //默认压缩后图片规格
                let quality = 0.7;
                let w = that.width;
                let h = that.height;
                //生成canvas
                let canvas = document.createElement("canvas");
                let ctx = canvas.getContext("2d");
                // 创建属性节点
                let anw = document.createAttribute("width");
                anw.nodeValue = w;
                let anh = document.createAttribute("height");
                anh.nodeValue = h;
                canvas.setAttributeNode(anw);
                canvas.setAttributeNode(anh);
                ctx.drawImage(that, 0, 0, w, h);
                let base64 = canvas.toDataURL("image/jpeg", quality);
                // 回调函数返回base64的值
                callback(base64);
            };
        }
    }
}

const formVal = ref(null);

const handleSubmit = async (val) => {
  val.validate((valid) => {
    if (valid) {
        if(checkType.value == 'input'){
            formValidate.mailList = mailTextList.value;
        }else{
            formValidate.mailList = checkAllGroup.value.join(',');
        }
        send();
      Message.success("Success!");
    } else {
      Message.error("Fail!");
    }
  });

    // for (let i = 0; i < checkAllGroup.value.length; i++) {
    //     const element = checkAllGroup.value[i];
    //     console.log(element);
    //     await sleep(1000);  
    // }
};

const handleReset = (val) => {
  val.resetFields();
};

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

const send = () => {
    api.mail(formValidate)
    .then((res) => {
        console.log(1321321,res)
    });
};
</script>

<style lang="scss" scoped>

.demo-upload-list{
    display: inline-block;
    width: 60px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0,0,0,.2);
    margin-right: 4px;
}
.demo-upload-list img{
    width: 100%;
    height: 100%;
}
</style>