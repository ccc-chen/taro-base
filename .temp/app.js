import '@tarojs/async-await';
import { Provider } from "@tarojs/redux-h5";
import Taro, { Component } from "@tarojs/taro-h5";

import dva from "./utils/dva";
import models from "./models/index";

import './styles/base.scss';

import Nerv from "nervjs";
import { Router, createHistory, mountApis } from '@tarojs/router';
Taro.initPxTransform({
  "designWidth": 750
});

const _taroHistory = createHistory({
  mode: "hash",
  basename: "/",
  customRoutes: {},
  firstPagePath: "/pages/index/index"
});

mountApis(_taroHistory);
const dvaApp = dva.createApp({
  initialState: {},
  models: models
});
const store = dvaApp.getStore();

class App extends Component {

  config = {
    pages: ["/pages/index/index", "/pages/slide/index", "/pages/mescroll/index", "/pages/camera/index"],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#ffffff',
      navigationBarTitleText: '',
      navigationBarTextStyle: 'black'
    }
  };

  componentDidMount() {
    let ENV = "h5";
    switch (ENV) {
      case 'weapp':
        this.weappLogin();
        Taro.setStorageSync('clientType', '3');
        Taro.setStorageSync('platform', '0');
        break;
      case 'web':
        this.weappLogin();
        Taro.setStorageSync('clientType', '3');
        Taro.setStorageSync('platform', '0');
        break;
    }
    this.componentDidShow();
  }

  componentDidShow() {}

  //微信小程序登录
  weappLogin = () => {
    Taro.login().then(res => {
      if (res.code) {
        dvaApp.dispatch({
          type: 'common/account_customer_mini_autologin',
          payload: {
            code: res.code
          }
        });
        // dvaApp.dispatch({
        //   type: 'common/sms_send',
        //   payload: {
        //       mobile: '15527377390',
        //       type: '4'
        //   }
        // })
      }
    });
  };

  render() {
    return <Provider store={store}>
                  
              <Router history={_taroHistory} routes={[{
        path: '/pages/index/index',
        componentLoader: () => import( /* webpackChunkName: "index_index" */'./pages/index/index'),
        isIndex: true
      }, {
        path: '/pages/slide/index',
        componentLoader: () => import( /* webpackChunkName: "slide_index" */'./pages/slide/index'),
        isIndex: false
      }, {
        path: '/pages/mescroll/index',
        componentLoader: () => import( /* webpackChunkName: "mescroll_index" */'./pages/mescroll/index'),
        isIndex: false
      }, {
        path: '/pages/camera/index',
        componentLoader: () => import( /* webpackChunkName: "camera_index" */'./pages/camera/index'),
        isIndex: false
      }]} customRoutes={{}} />
              
                </Provider>;
  }

  constructor(props, context) {
    super(props, context);
    Taro._$app = this;
  }

}

Nerv.render(<App />, document.getElementById('app'));