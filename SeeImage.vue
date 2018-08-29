<template>
    <el-dialog
            :visible.sync="isShowImageDialog"
            @closed="clearImg"
            center
            :show-close="false"
            custom-class="imageBox"
            @open="hideImage"

    >
        <div style="width: 100%;display: flex;justify-content: center;position: relative">
            <img v-drag="greet" id="drag" :src="currentImg" @mousewheel="wheel" ref="user_image"
                 style="max-width: 850px;position: absolute"/>
        </div>
        <div
                style="width: 100%;display: flex;justify-content:center;position: absolute;bottom:1vh;left: 0;z-index: 999">
            <el-button icon="el-icon-refresh" circle @click.stop="rotateImage"
                       size="small"></el-button>
        </div>
    </el-dialog>
</template>
<script>
    export default {
        data() {
            return {
                currentImg: '',
                isShowImageDialog: false,

            }
        },

        methods: {
            //接受传来的位置数据，并将数据绑定给data下的val
            greet(val) {
                this.val = val;
            },

            //旋转图片
            rotateImage(e) {
                // console.log(this.$refs.user_image.style.transform);
                let toRotateDeg = '';
                let fromRotateDeg = this.$refs.user_image.style.transform.split(' ');

                switch (fromRotateDeg[0]) {
                    case 'rotate(0deg)':
                        fromRotateDeg[0] = 'rotate(90deg)';
                        break;
                    case 'rotate(90deg)':
                        fromRotateDeg[0] = 'rotate(180deg)';
                        break;
                    case 'rotate(180deg)':
                        fromRotateDeg[0] = 'rotate(270deg)';
                        break;
                    case 'rotate(270deg)':
                        fromRotateDeg[0] = 'rotate(360deg)';
                        break;
                    default:
                        fromRotateDeg[0] = 'rotate(90deg)';
                        break;
                }
                this.$refs.user_image.style.transform = fromRotateDeg.join(' ');

            },
            //点击图片之外区域隐藏图片
            hideImage(e) {
                document.addEventListener('click', (e) => {
                    if (e.target.nodeName !== 'IMG' && e.target.nodeName !== 'BUTTON') {
                        this.clearImg();
                    }
                });
            },

            //查看图片
            seeImage(e) {
                this.currentImg = e.target.currentSrc;
                this.isShowImageDialog = true;
                this.$nextTick(() => {
                    this.$refs.user_image.style.transform = 'rotate(0deg)';
                })
            },

            //滚轮
            wheel(e) {
                if (e.wheelDelta) {  //判断浏览器IE，谷歌滑轮事件
                    if (e.wheelDelta > 0) { //当滑轮向上滚动时
                        this.$refs.user_image.style.transform = this.$refs.user_image.style.transform + ' scale(0.9)';
                    }
                    if (e.wheelDelta < 0) { //当滑轮向下滚动时
                        this.$refs.user_image.style.transform = this.$refs.user_image.style.transform + ' scale(1.1)';
                    }
                } else if (e.detail) {  //Firefox滑轮事件
                    if (e.detail > 0) { //当滑轮向上滚动时
                        this.$refs.user_image.style.transform = this.$refs.user_image.style.transform + ' scale(0.9)';
                    }
                    if (e.detail < 0) { //当滑轮向下滚动时
                        this.$refs.user_image.style.transform = this.$refs.user_image.style.transform + ' scale(1.1)';
                    }
                }
            },

            //当图片隐藏时候的回调
            clearImg() {
                this.isShowImageDialog = false;
                document.removeEventListener('click', null);
                setTimeout(() => {
                    if (this.$refs.user_image) {
                        this.$refs.user_image.style.transform = 'rotate(0deg)';
                        this.$refs.user_image.style.left = '';
                        this.$refs.user_image.style.top = '';
                    }
                }, 300)
            },

        }
    }
</script>
<style>
    .imageBox {
        background: transparent !important;
        position: relative;
        box-shadow: none !important;
        height: 80vh;
    }
</style>
