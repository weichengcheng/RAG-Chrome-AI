// import { useRef, useEffect, useCallback } from 'react'
// import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState, useCallback, useEffect } from 'react'
// import About from './pages/about'
// import Pofile from './pages/profile'
// import NotFound from './pages/notFound'
import { Menu, Dropdown, Space } from 'antd'
import type { MenuProps } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined, MenuOutlined } from '@ant-design/icons';
import './App.css'

function App() {
  const [collapsed, setCollapsed] = useState(false);

  const items: MenuProps['items'] = [{
    key: 'nowday',
    label: '今日',
    type: 'group',
    children: [
      { key: '1', label: '问题1' },
      { key: '2', label: '问题2' },
      { key: '3', label: '问题3' },
      { key: '4', label: '问题4' },
      { key: '5', label: '问题5' },
      { key: '6', label: '问题6' },
      { key: '7', label: '问题7' },
      { key: '8', label: '问题8' },
    ],
  },
  {
    key: 'yesterday',
    label: '昨日',
    type: 'group',
    children: [
      { key: '11', label: '问题1' },
      { key: '22', label: '问题2' },
      { key: '33', label: '问题3' },
      { key: '44', label: '问题4' },
      { key: '55', label: '问题5' },
      { key: '66', label: '问题6' },
      { key: '77', label: '问题7' },
      { key: '88', label: '问题8' },
    ],
  }]

  const items2: MenuProps['items'] = [
    {
      key: 'hello',
      label: 'AI on Chrome',
      onClick: () => {
        // 打开侧边栏

      }
    },
    {
      key: 'world',
      label: 'AI on Chrome',
    },
  ];

  const toggleCollapsed = useCallback(() => {
    setCollapsed(!collapsed);
  }, [collapsed]);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setCollapsed(true)
    };
  }, [])

  useEffect(() => { }, [])

  return (
    <>
      <div>
        <div className="flex items-center justify-between p-3">
          {
            !collapsed && (
              <div className="flex items-center">
                <img src="/extensions.png" alt="Vite logo" width="24" className="mr-1" />
                <div>RAS Application</div>
              </div>
            )
          }

          <div className="cursor-pointer" onClick={toggleCollapsed}>{collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}</div>
        </div>

        {
          !collapsed && (
            <Menu
              style={{ width: 256, minHeight: '80vh' }}
              inlineCollapsed={collapsed}
              defaultSelectedKeys={['1']}
              mode="inline"
              items={items}
            />
          )
        }
      </div>

      <div className="flex-1 p-3">
        <header className="flex justify-between">
          <div>Main Content Area</div>
          <Dropdown menu={{ items: items2 }}>
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                更多
                <MenuOutlined />
              </Space>
            </a>
          </Dropdown>
        </header>
      </div>
    </>
  )
}

export default App
