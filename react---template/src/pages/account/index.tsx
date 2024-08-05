import {useNavigate } from 'react-router-dom'
import { Button } from 'antd'

import './account.scss'
import { useTranslation } from "react-i18next";

function Account() {
    const { t } = useTranslation();
    //创建路由钩子
    const navigate =useNavigate()
    
    return (
        <div className="P-account at-item">
            {/* <h1>{t("about.content")}</h1>
            <div className="ipt-con">
                <Button type="primary">返回登录</Button>
            </div> */}
        </div>
    )
}

export default Account