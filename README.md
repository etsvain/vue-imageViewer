#plugin-seeImage #
## 使用步骤 ##
	1.将插件包下载
	2.将seeImage文件夹放到工程里
	3.在main中引入  // import seeImage from 'youpath/plugin/seeImage' 
	4.Vue.use(seeImage) //注意要在vue实例化执之前引入
	4.在需要点击查看的图片上加 @click="$seeImage"  //  <img src="/static/img/img.jpg" @click="$seeImage"/>
    5.在config里进行相应配置

## 效果图 ##

![Image text](icon/screenshot.png)