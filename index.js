import ImageViewerComponent from './ImageViewer'

const ImageViewer = {}

ImageViewer.install = Vue => {
    const ImageViewerConstructor = Vue.extend(ImageViewerComponent);

    const instance = new ImageViewerConstructor();

    instance.$mount(document.createElement('div'))
    document.body.appendChild(instance.$el)

    //自定义拖动
    Vue.directive('drag',
        function (el, binding) {
            instance.isShowImageDialog = true;
            let oDiv = el;   //当前元素
            oDiv.onmousedown = function (e) {
                if (e.button === 2) return;

                e.preventDefault();

                let bw = document.body.clientWidth;
                let bh = document.body.clientHeight;
                //鼠标按下，计算当前元素距离可视区的距离
                let disX = e.clientX - oDiv.offsetLeft;
                let disY = e.clientY - oDiv.offsetTop;

                document.onmousemove = function (e) {
                    //通过事件委托，计算移动的距离
                    let l = 0, t = 0;

                    // 拖动边界
                    if (e.clientX >= bw) {
                        l = bw - disX;
                    } else if (e.clientX <= 0) {
                        {
                            l =0- disX;
                        }
                    } else {
                        l = e.clientX - disX;
                    }
                    if (e.clientY >= bh) {
                        t = bh - disY;
                    }else if(e.clientY <= 0) {
                        t =0- disY;
                    }
                    else {
                        t = e.clientY - disY;
                    }

                    //移动当前元素
                    oDiv.style.left = l + 'px';
                    oDiv.style.top = t + 'px';
                    //将此时的位置传出去
                    binding.value({x: e.pageX, y: e.pageY})
                };
                // 事件移除
                document.onmouseup = function (e) {
                    document.onmousemove = null;
                    document.onmouseup = null;
                };
            };
        }
    );

    // 挂载触发方法
    Vue.prototype.$imageViewer = (e) => {
        instance.currentImg = e.currentTarget.currentSrc;
        instance.visible = true;
    }

}

export default ImageViewer;