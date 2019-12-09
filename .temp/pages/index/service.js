import Request from "../../utils/request";

export const goods_web_search = data => Request({
  api: 'goods.web.search',
  data
});