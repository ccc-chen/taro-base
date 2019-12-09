import Nerv from "nervjs";
import Taro, { Component } from "@tarojs/taro-h5";
import { View, ScrollView, Block } from '@tarojs/components';

import { connect } from "@tarojs/redux-h5";
import './index.scss';

export default @connect(({ CardNum, common, loading }) => ({
  ...CardNum,
  ...common,
  loading
}))
class Index extends Component {
  config = {
    navigationBarTitleText: '首页'
  };

  state = {
    is_mask: false,
    fade: 'fadeInUp',
    is_mask_center: true,
    bounceOut: ''
  };

  componentDidShow() {
    // ex
    // this.props.dispatch({
    //   type: 'CardNum/cloudPay_cardCount',
    //   payload: {},
    //   callback: (res) => {
    //     if (res) {
    //       console.log(res);// 请求完成后返回的结果
    //     }
    //   }
    // })
  }

  maskHide = () => {
    this.setState({
      fade: 'fadeOutDown'
    }, () => {
      setTimeout(() => {
        this.setState({
          is_mask: false
        });
      }, 500);
    });
  };

  openMask = () => {
    this.setState({
      is_mask: true
    }, () => {
      this.setState({
        fade: 'fadeInUp'
      });
    });
    // this.setState({

    // }, () => {
    //   setTimeout(() => {

    //   }, 500);
    // })
  };

  is_mask_center = () => {
    this.setState({
      bounceOut: 'zoomOut'
    });
  };

  render() {
    const { is_mask, fade, is_mask_center, bounceOut } = this.state;
    const {} = this.props;

    return <Block>
        <View onClick={this.openMask}>hello</View>
        {is_mask && <Block>
            <View className="mask" onClick={this.maskHide}></View>
            <View className={`mask-bottom-box animated ${fade}`}>
              <View className="mask-header-box">
                <View className="header-cancel" onClick={this.maskHide}>取消</View>
                <View className="header-select-text">选择银行卡</View>
              </View>
              
              <ScrollView className="scrollView" scrollY>


              </ScrollView>
            </View>
          </Block>}
        {is_mask_center && <View className={`mask-center animated ${bounceOut}`} onClick={this.is_mask_center}>

          </View>}
      </Block>;
  }

  componentDidMount() {
    super.componentDidMount && super.componentDidMount();
  }

  componentDidHide() {
    super.componentDidHide && super.componentDidHide();
  }

}