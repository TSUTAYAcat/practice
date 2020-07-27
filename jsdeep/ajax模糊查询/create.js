/*
 * @Author: your name
 * @Date: 2020-06-07 13:49:36
 * @LastEditTime: 2020-06-07 13:54:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /study/jsdeep/ajax模糊查询/create.js
 */

// wrapperId：输入框父元素id ，父元素需要固定宽高，
// hotWords：热词
// inputStyle：输入框样式
// relativeWordsStyle：关联词栏样式
// liStyle：关联词栏子元素样式
// needJquery：函数使用ajax 需要jquery，如果项目已经引入jquery，则该参数不需要传，否则传入true
function myinput(wrapperId, hotWords, inputStyle, relativeWordsStyle, liStyle, needJquery) {
    if (needJquery) {
        let myScript = document.createElement('script')
        myScript.src = "https://code.jquery.com/jquery-3.1.1.min.js"
        document.getElementsByTagName('head')[0].appendChild(myScript)
    }

    // 使用前确保CSS设置了 body, html { width: 100 %; height: 100 %; }
    document.getElementsByTagName('body')[0].setAttribute('style', 'width: 100%; height: 100%; ');
    document.getElementsByTagName('html')[0].setAttribute('style', 'width: 100%; height: 100%; ');

    // 输入框父容器
    let inputWrapper = document.getElementById(wrapperId)

    // 输入框
    let input = document.createElement('input')
    let inputStyleTemp = `width: 100%;height: 100%;padding: 0;border:'none';margin: 0;`
    inputStyleTemp = inputStyle ? inputStyleTemp + inputStyle : inputStyleTemp
    input.setAttribute('style', inputStyleTemp);

    // 关联词语栏目
    let relativeWords = document.createElement('ul')
    let relativeWordsStyleTemp = `width: ${parseInt(inputWrapper.style.width) + 2}px;height:auto;border: solid 1px #f0f;display: none;margin: 0;padding: 0;`
    relativeWordsStyleTemp = relativeWordsStyle ? relativeWordsStyleTemp + relativeWordsStyle : relativeWordsStyleTemp
    relativeWords.setAttribute('style', relativeWordsStyleTemp);

    // 放入输入框与关联词语栏目
    inputWrapper.appendChild(input)
    inputWrapper.appendChild(relativeWords)

    // 获取body
    let body = document.getElementsByTagName('body')
    // 点击空白处关闭关联词栏
    body[0].onclick = () => {
        relativeWords.style['display'] = 'none'
    }
    // 阻止inputWrapper.onclick冒泡
    inputWrapper.onclick = (e) => {
        e.stopPropagation()
    }
    // 关联词栏子元素生成函数
    function createLi(liArray) {
        relativeWords.style['display'] = 'block'
        liArray.forEach((el, i) => {
            let li = document.createElement('li')

            let liStyleTemp = `list-style-type:none;`
            liStyleTemp = liStyle ? liStyleTemp + liStyle : liStyleTemp
            li.setAttribute('style', liStyleTemp);

            li.innerText = el
            li.onclick = () => {
                input.value = el
                relativeWords.style['display'] = 'none'
            }
            relativeWords.appendChild(li)
        })
    }

    function myInput(e, inputValue) {
        let value = inputValue || e.target.value
        $.ajax({
            url: `http://localhost:8091/?keywords=${value}`, success: (data) => {
                // 清除所有关联词
                relativeWords.innerHTML = ''
                // 获取接口返回关联词JSON字符串并将其转为对象
                data = JSON.parse(data) || []
                if (data.length) {
                    createLi(data)
                } else {
                    relativeWords.style['display'] = 'none'
                }
            }
        });

    }

    // 输入框oninput事件
    input.oninput = myInput
    // 输入框onfocus事件
    input.onfocus = () => {
        relativeWords.innerHTML = ''
        if (input.value) {
            myInput(null, input.value)
        } else if (hotWords.length) {
            createLi(hotWords)
        }
    }
}

