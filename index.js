import SeeImageComponent from './SeeImage'
const SeeImage = {}

SeeImage.install = Vue => {
    const SeeImageConstructor = Vue.extend(SeeImageComponent);

    const instance = new SeeImageConstructor();

    instance.$mount(document.createElement('div'))
    document.body.appendChild(instance.$el)

    //自定义拖动
    Vue.directive('drag',
        function (el, binding) {
            instance.isShowImageDialog = true;
            let oDiv = el;   //当前元素
            oDiv.onmousedown = function (e) {
                e.preventDefault();
                //鼠标按下，计算当前元素距离可视区的距离
                let disX = e.clientX - oDiv.offsetLeft;
                let disY = e.clientY - oDiv.offsetTop;

                document.onmousemove = function (e) {
                    //通过事件委托，计算移动的距离
                    let l = e.clientX - disX;
                    let t = e.clientY - disY;
                    //移动当前元素
                    oDiv.style.left = l + 'px';
                    oDiv.style.top = t + 'px';
                    //将此时的位置传出去
                    binding.value({x: e.pageX, y: e.pageY})
                };
                document.onmouseup = function (e) {
                    document.onmousemove = null;
                    document.onmouseup = null;
                };
            };
        }
    );

    // 挂载自定义方法
    Vue.prototype.$seeImage = (e) => {
        instance.currentImg = e.currentTarget.currentSrc;
        instance.visible = true;
    }

}

export default SeeImage