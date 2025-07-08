import {Layout} from "antd";
import React from "react";


const {Header,Content} = Layout
export const ErrorPage: React.FC = () => {
    const back = () =>{
        window.history.back()
    }
  return (
    <div>
        <Layout>
            <Header className={"header"} onClick={back}> 返回</Header>
            <Content className={"content"} onClick={back}>
                <iframe src={"/404.html"} style={{width:"100%",height:"100vh"}}></iframe>
            </Content>
        </Layout>
    </div>
  );
};