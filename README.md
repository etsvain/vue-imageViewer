# image-viewer #

## 使用步骤/How to use ##
	1.将插件包下载
	2.将imageViewer文件夹放到工程里
	3.在main中引入  //import imageViewer from 'path/imageViewer'
	4.Vue.use(imageViewer) //注意要在vue实例化执之前引入
	4.在需要点击查看的图片上加 @click="$imageViewer"  //  <img src="/static/img/img.jpg" @click="$imageViewer"/>
    5.在config里进行相应配置
***
	1. Download the plugin package
	2. Put the imageViewer folder into the project
	3. Introduce //import imageViewer from 'path/imageViewer' in main
	4.Vue.use (imageViewer) / / Note that to be introduced before the vue instantiation
	4. Add @click="$imageViewer" // <img src="/static/img/img.jpg" @click="$imageViewer"/> to the image you need to click to view.
	5. Configure it in config
	
## 效果图/Rendering ##

![Image text](icon/screenshot.png)