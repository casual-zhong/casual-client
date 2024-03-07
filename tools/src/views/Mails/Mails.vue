<template>
  <div>
    <Form
      ref="formVal"
      :model="formValidate"
      :rules="ruleValidate"
      :label-width="100"
    >

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
                <FormItem label="邮箱授权码" prop="authName">
                    <Input v-model="formValidate.authVal" placeholder="邮箱授权码"></Input>
                </FormItem>
            </Col>
        </Row>

        <FormItem label="接收人邮件" prop="type">
            <Upload 
            action="*"
            accept=".txt"
            :before-upload="onProgress"
            :show-upload-list="false">
                <Button icon="ios-cloud-upload-outline">选择文件</Button>
            </Upload>
        </FormItem>
        <FormItem label="Checkbox" v-show="mailList.length">
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
                <FormItem label="subject" prop="subject">
                    <Input v-model="formValidate.subject" placeholder="请输入标题"></Input>
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
                        :on-exceeded-size="imgFn.handleMaxSize"
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

const formValidate = reactive({
    type: "gmail",
    authName:"",
    authVal:"",
    mailList: "",
    subject:"",
    img:""
});

const ruleValidate = reactive({
  authName: [
    { required: true, message: "请输入发送人邮箱", trigger: "blur" },
    { type: "email", message: "请输入正确的邮箱", trigger: "blur" },
  ],
});

const formVal = ref(null);

const handleSubmit = (val) => {
  val.validate((valid) => {
    if (valid) {
      Message.success("Success!");
    } else {
      Message.error("Fail!");
    }
  });
};

const handleReset = (val) => {
  val.resetFields();
};

const indeterminate = ref(true)
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
    handleView (name) {
        // this.imgName = name;
        // this.visible = true;
    },
    handleRemove (file) {
        const fileList = uploadImg.value.fileList;
        uploadImg.value.fileList.splice(fileList.indexOf(file), 1);
    },
    handleMaxSize (file) {
        Notice.warning({
            title: 'Exceeding file size limit',
            desc: 'File  ' + file.name + ' is too large, no more than 2M.'
        });
    },
    handleBeforeUpload (file) {
        imgFn.photoCompress(file,(e)=>{
            imgUrl.value = e
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

const send = () => {
  api
    .mail({
      mail: "tansyjane9@gmail.com",
    })
    .then((res) => {});
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