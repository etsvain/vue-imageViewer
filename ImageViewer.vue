<template>
    <div v-if="visible" @click="hideImage">
        <div class="see-image" :style="{ backgroundColor:background }">
            <img v-drag="greet" id="drag" class="image" :src="currentImg" @mousewheel="wheel"
                 ref="user_image"/>
        </div>
        <div class="close" @click="close" v-show="closeButtonVisible"><img src="./icon/close.png"/></div>
        <div class="rotate" @click.stop="rotateImage" v-show="rotateButtonVisible"><img src="./icon/rotate.png"/></div>

    </div>
</template>

<script>
    import config from './config'

    const {modalOpacity, canClickModalHide, rotateButtonVisible, closeButtonVisible} = config;
    export default {
        data() {
            return {
                currentImg: '',
                visible: false,
                background: modalOpacity > 1 || modalOpacity <= 0 || typeof modalOpacity !== "number" ? null : 'rgba(0,0,0,' + modalOpacity + ')',
                rotateButtonVisible,
                closeButtonVisible,
            }
        },
        watch: {},
        methods: {
            close() {
                this.clearImg();
            },
            //接受传来的位置数据，并将数据绑定给data下的val
            greet(val) {
                this.val = val;
            },

            //点击图片之外区域隐藏图片
            hideImage(e) {
                if (!this.visible || (!canClickModalHide && closeButtonVisible)) return;
                document.addEventListener('click', (e) => {
                    if (e.target.nodeName !== 'IMG' && e.target.nodeName !== 'BUTTON') {
                        this.clearImg();
                    }
                });
            },

            //旋转图片
            rotateImage(e) {
                // console.log(this.$refs.user_image.style.transform);
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
                this.visible = false;
                document.removeEventListener('click', null);
                setTimeout(() => {
                    if (this.$refs.user_image) {
                        this.$refs.user_image.style.transform = 'rotate(0deg)';
                        this.$refs.user_image.style.left = '';
                        this.$refs.user_image.style.top = '';
                    }
                }, 100)
            },
        }
    }
</script>

<style scoped>
    .see-image {
        width: 100%;
        z-index: 9999;
        background: rgba(0, 0, 0, .3);
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        animation: .25s showAimation ease;
    }

    @keyframes showAimation {
        from {
            opacity: .3;
        }
        to {
            opacity: 1;
        }
    }

    .image {
        max-width: 400px;
        min-width: 150px;
        position: absolute;
    }

    .rotate {
        width: 30px;
        height: 30px;
        background: #fff;
        border-radius: 50%;
        position: absolute;
        bottom: 50px;
        left: 50%;
        margin-left: -15px;
        color: #000;
        border: 1px solid rgba(0, 0, 0, .4);
        font-size: 12px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        z-index: 10000;
    }

    .rotate img {
        width: 10px;
    }

    .rotate:hover {
        background: #409EFF;
        border: 1px solid #409EFF;
    }

    .close {
        position: absolute;
        right: 140px;
        top: 140px;
        height: 40px;
        width: 40px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: .3s;
        cursor: pointer;
        z-index: 10000;
    }

    .close:hover {
        transform: rotate(90deg);
    }

    .close img {
        width: 40px;
        height: 40px;

    }

</style>