import Taro, { Component } from '@tarojs/taro'
import { View, Text, ScrollView, Image, Input } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import { connect } from '@tarojs/redux'
import { AtTabs, AtTabsPane } from 'taro-ui'
import './index.scss'
import { func } from 'prop-types'

@connect(({ index, common, loading }) => ({

}))
export default class Index extends Component {
  config = {
    navigationBarTitleText: '首页',

  }

  state = {
    img: ''
  }

  componentDidShow() {

  }
  imgPreview(file) {
    let self = this
    let Orientation
    // 去获取拍照时的信息，解决拍出来的照片旋转问题

    // 看支持不支持FileReader
    if (!file || !window.FileReader) return
    if (/^image/.test(file.type)) {
      // 创建一个reader
      let reader = new FileReader()
      // 将图片2将转成 base64 格式
      reader.readAsDataURL(file)
      // 读取成功后的回调
      reader.onloadend = function () {
        let result = this.result
        let img = new Image()
        img.src = result

        self.setState({
          img: img.src
        }, () => {
          self.upload1()
        })
        //  判断图片是否大于100K,是就直接上传，反之压缩图片
        if (this.result.length <= (100 * 1024)) {
          self.headerImage = this.result
        } else {
          img.onload = function () {
            let data = self.compress(img, Orientation)
            self.headerImage = data
          }
        }
      }
    }
  }

  upload = (e) => {
    let files = e.target.files || e.dataTransfer.files
    if (!files.length) return
    this.picValue = files[0]
    this.imgPreview(this.picValue)
    const url = 'https://finance.rong-mi.cn/file/upload'; // 此处替换为你的远程服务器上传地址
    const formData = new FormData()
    var timestamp = Date.parse(new Date())
    formData.append('image', this.picValue, `${timestamp}.png`)
    // Taro.request({
    //   url,
    //   method: 'post',
    //   data: formData,
    //   success: (res) => {
    //     const { code, result } = res.data
    //     if (code == '10000') {
    //       this.imgUrl = result
    //       console.log(res)
    //     }
    //   }
    // })
  }
  inputDom = () => {
    return (
      <Input type="file" className='input' id='image' accept="image/*" capture='camera' onChange={this.upload} />
    )
  }

  upload1 = () => {
    const parent = document.getElementById('upload-box')
    const inputDom = document.getElementById('image')
    parent.removeChild(inputDom)

    var accept = document.createAttribute("accept");
    accept.nodeValue='image/*'

    var capture = document.createAttribute('capture')
    capture.nodeValue = 'camera'

    var input = document.createElement("Input")
    input.setAttribute('type', 'file')
    input.setAttribute('class', 'input')
    input.setAttribute('accept', 'image/*')
    input.setAttribute('capture', 'capture')
    input.setAttribute('id', 'image')
    // input.setAttribute('onChange', `${this.upload}`)
    console.log('input', input.addEventListener)
    input.addEventListener('change', (e) => {
      this.upload(e)
    })

    // var node = document.createTextNode()
    parent.appendChild(input)
  }

  render() {
    const {

    } = this.props
    const { img } = this.state
    return (
      <View className='index-page'>
        <div className='upload-box' id='upload-box'>
          {
            this.inputDom()
          }
          身份证上传
        </div>
        <Image className='img' mode='widthFix' src={img}></Image>
      </View>
    )
  }
}
