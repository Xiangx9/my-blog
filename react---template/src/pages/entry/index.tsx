// 这里的<Outlet>就是为二级路由页面挖好的“坑”，Entry下的路由页面会放到<Outlet>位置，
// 而Header组件则是一次性引入，非常方便。
import {
  Outlet,
  useLocation,
  useParams,
  useSearchParams,
} from "react-router-dom";
import Header from "@/components/Header";

import { useSelector } from "react-redux";
import { ConfigProvider, theme } from "antd";

import "./entry.scss";

// darkAlgorithm为暗色主题，defaultAlgorithm为亮色（默认）主题
// 注意这里的theme是来自于Ant Design的，而不是store
const { darkAlgorithm, defaultAlgorithm } = theme;

function Entry() {
  // 获取store中的主题配置
  const globalTheme = useSelector((state: any) => state.theme);

  // Ant Design主题变量
  let antdTheme = {
    // 亮色/暗色配置
    algorithm: globalTheme.dark ? darkAlgorithm : defaultAlgorithm,
  };

  // 应用自定义主题色
  if (globalTheme.colorPrimary) {
    antdTheme.token = {
      colorPrimary: globalTheme.colorPrimary,
    };
  }

  /* 第一种params方法传递参数：用useParams来获取 */
  const getParams = useParams();
  //  console.log(getParams.title,getParams.info);

  /* 第二种search方法传递参数：用useSearchParams来获取*/
  //  const [getSearchArr] = useSearchParams();
  //  console.log(getSearchArr.get('title'))
  //  console.log(getSearchArr.get('info'))

  /* 第三种state属性携带参数：用useLocation来获取 */
  const currentLocation = useLocation();
  //  console.log(currentLocation);

  return (
    <ConfigProvider theme={antdTheme}>
      <div className="M-entry">
        <Header />
        <div className="main-container">
          <Outlet />
        </div>
      </div>
    </ConfigProvider>
  );
}

export default Entry;
