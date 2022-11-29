"use client";
//import '../styles/globals.css'
import React from 'react';
import { Layout, Menu } from 'antd';
import Link from 'next/link';
const { Header, Content, Footer, Sider } = Layout;

export default function RootLayout({children,}: {children: React.ReactNode}) {
  return (
    <html>
      <head />
      <body>
        <Layout hasSider>
          <Sider
            style={{
              overflow: 'auto',
              height: '100vh',
              position: 'fixed',
              left: 0,
              top: 0,
              bottom: 0,
              right: 0,
            }}
          >
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} >
              <Menu.Item><Link href={"/"}>HOME</Link></Menu.Item>
              <Menu.Item><Link href={"/pokemon"}>POKEMON</Link></Menu.Item>
            </Menu>
          </Sider>
          <Layout className="site-layout" style={{ marginLeft: 200 }}>
          <Header><label style={{color:'whitesmoke'}}>POKEMON LEDGER</label></Header>
            <Content style={{padding: '10px'}}>
              {children}
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
          </Layout>
        </Layout>
      </body>
    </html>
  )
}
