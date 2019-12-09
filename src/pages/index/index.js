import Taro, { Component } from '@tarojs/taro'
import { View, Text, ScrollView, Image, Input } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import { connect } from '@tarojs/redux'
import { AtTabs, AtTabsPane } from 'taro-ui'
import './index.scss'
import '../../utils/tools/refresh/index.css'
import MeScroll from '../../utils/tools/refresh/index'
import bg from '../../assets/common/images/cloudAccount/261573011067_.pic_hd.jpg'
import Mask from '../../Components/Mask'
import topImg from './mescroll-totop.png'

@connect(({ index, common, loading }) => ({
	...index,
	...common,
	loading
}))
export default class Index extends Component {
	config = {
		navigationBarTitleText: '首页',
		enablePullDownRefresh: true
	}

	state = {
		list: ['', '', '', '', ''],
		current: 0
	}

	componentDidShow() {
		this.initMeScroll()
	}

	randomRgb() {
		var R = Math.floor(Math.random() * 255);
		var G = Math.floor(Math.random() * 255);
		var B = Math.floor(Math.random() * 255);
		return { background: 'rgb(' + R + ',' + G + ',' + B + ')' };
	}

	initMeScroll = () => {
		var that = this
		var mescroll = new MeScroll("mescroll", {
			down: {
				auto: false, //是否在初始化完毕之后自动执行下拉回调callback; 默认true
				callback: downCallback //下拉刷新的回调
			},
			up: {
				auto: false, //是否在初始化时以上拉加载的方式自动加载第一页数据; 默认false
				isBounce: false, //此处禁止ios回弹,解析(务必认真阅读,特别是最后一点): http://www.mescroll.com/qa.html#q10
				callback: upCallback, //上拉回调,此处可简写; 相当于 callback: function (page) { upCallback(page); }
				toTop: { //配置回到顶部按钮
					src: topImg, //默认滚动到1000px显示,可配置offset修改
					offset: 10
				}
			}
		});

		/*下拉刷新的回调 */
		const downCallback = () => {
			//联网加载数据
			getListDataFromNet(0, 1, function (data) {
				//联网成功的回调,隐藏下拉刷新的状态
				mescroll.endSuccess();
				//设置列表数据
				setListData(data, false);
			}, function () {
				//联网失败的回调,隐藏下拉刷新的状态
				mescroll.endErr();
			});
		}

		/*上拉加载的回调 page = {num:1, size:10}; num:当前页 从1开始, size:每页数据条数 */
		function upCallback(page) {
			//联网加载数据
			getListDataFromNet(page.num, page.size, function (curPageData) {
				//联网成功的回调,隐藏下拉刷新和上拉加载的状态;
				//mescroll会根据传的参数,自动判断列表如果无任何数据,则提示空;列表无下一页数据,则提示无更多数据;
				console.log("page.num=" + page.num + ", page.size=" + page.size + ", curPageData.length=" + curPageData.length);

				//方法一(推荐): 后台接口有返回列表的总页数 totalPage
				//mescroll.endByPage(curPageData.length, totalPage); //必传参数(当前页的数据个数, 总页数)

				//方法二(推荐): 后台接口有返回列表的总数据量 totalSize
				//mescroll.endBySize(curPageData.length, totalSize); //必传参数(当前页的数据个数, 总数据量)

				//方法三(推荐): 您有其他方式知道是否有下一页 hasNext
				//mescroll.endSuccess(curPageData.length, hasNext); //必传参数(当前页的数据个数, 是否有下一页true/false)

				//方法四 (不推荐),会存在一个小问题:比如列表共有20条数据,每页加载10条,共2页.如果只根据当前页的数据个数判断,则需翻到第三页才会知道无更多数据,如果传了hasNext,则翻到第二页即可显示无更多数据.
				mescroll.endSuccess(curPageData.length);

				//提示:curPageData.length必传的原因:
				// 1.判断是否有下一页的首要依据: 当传的值小于page.size时,则一定会认为无更多数据.
				// 2.比传入的totalPage, totalSize, hasNext具有更高的判断优先级
				// 3.使配置的noMoreSize生效

				//设置列表数据
				setListData(curPageData, true);
			}, function () {
				//联网失败的回调,隐藏下拉刷新和上拉加载的状态;
				mescroll.endErr();
			});
		}

		/*设置列表数据*/
		function setListData(curPageData, isAppend) {
			const { list } = that.state
			list.push('1')
			that.setState({
				list
			})
		}


		/*联网加载列表数据
		 在您的实际项目中,请参考官方写法: http://www.mescroll.com/api.html#tagUpCallback
		 请忽略getListDataFromNet的逻辑,这里仅仅是在本地模拟分页数据,本地演示用
		 实际项目以您服务器接口返回的数据为准,无需本地处理分页.
		 * */
		var downIndex = 0;
		function getListDataFromNet(pageNum, pageSize, successCallback, errorCallback) {
			//延时一秒,模拟联网
			setTimeout(function () {
				try {
					var newArr = [];
					if (pageNum == 0) {
						//此处模拟下拉刷新返回的数据
						// downIndex++;
						// var newObj = { title: "【新增新闻" + downIndex + "】 新增新闻的标题", content: "新增新闻的内容" };
						// newArr.push(newObj);
					} else {
						//此处模拟上拉加载返回的数据
						for (var i = 0; i < pageSize; i++) {
							var upIndex = (pageNum - 1) * pageSize + i + 1;
							var newObj = { title: "【新闻" + upIndex + "】 标题标题标题标题标题标题", content: "内容内容内容内容内容内容内容内容内容内容" };
							newArr.push(newObj);
						}
					}
					//联网成功的回调
					successCallback && successCallback(newArr);
				} catch (e) {
					//联网失败的回调
					errorCallback && errorCallback();
				}
			}, 1000)
		}

	}


	handleClick(value) {
		this.setState({
			current: value
		})
	}

	render() {
		const {

		} = this.props
		const { list } = this.state
		const tabList = [{ title: '标签页1' }, { title: '标签页2' }, { title: '标签页3' }]
		return (
			<View className='index-page'>
				{/* <Mask></Mask> */}
				<Image className='index-bg' src={bg}></Image>
				<AtTabs current={this.state.current} tabList={tabList} onClick={this.handleClick.bind(this)}>
					<AtTabsPane current={this.state.current} index={0} >
						<View>
							<View
								id="mescroll"
								className='scrollView mescroll news-list'
								scrollY
								scrollWithAnimation
								scrollTop='0'
								lowerThreshold='10'
								upperThreshold='10'
							>
								<View>
									{
										list.map(() => {
											return (
												<View
													className='scrollView-item'
													style={{
														...this.randomRgb()
													}}
												></View>
											)
										})
									}
								</View>
							</View>
						</View>
					</AtTabsPane>
					<AtTabsPane current={this.state.current} index={1}>
						<View style='padding: 100px 50px;background-color: #FAFBFC;text-align: center;'>标签页二的内容</View>
					</AtTabsPane>
					<AtTabsPane current={this.state.current} index={2}>
						<View style='padding: 100px 50px;background-color: #FAFBFC;text-align: center;'>标签页三的内容</View>
					</AtTabsPane>
				</AtTabs>
			</View>
		)
	}
}