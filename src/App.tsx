// import { useRef, useEffect, useCallback } from 'react'
// import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState, useCallback, useEffect } from 'react'
// import About from './pages/about'
import DiaLogue from './pages/diaLogue'
// import Pofile from './pages/profile'
// import NotFound from './pages/notFound'
import { Menu, Dropdown, Space, Tooltip } from 'antd'
import type { MenuProps } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined, MenuOutlined, PlusCircleOutlined } from '@ant-design/icons';
import './App.css'

interface MenuItemC {
  key: string;
  label: string;
  type: string;
  children: Array<{ key: string; label: string; }>
}

function App() {
  const [collapsed, setCollapsed] = useState(true);
  const [reset, setReset] = useState<number>(0);
  
  // 最多存十条
  const [items, setItems] = useState<MenuItemC[]>([])

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
    // 侧边栏显示默认隐藏历史记录
    if (window.innerWidth < 768) {
      setCollapsed(false)
    };
  }, [])

  useEffect(() => {
    // 获取历史会话
    
  }, [])

  const openDialogue = useCallback(() => {
    setReset((prev) => prev++);
  }, []);

  const createHistoryQuestion = useCallback((data: { key: string; label: string }) => {
    console.log('createHistoryQuestion', data)
    setItems((prev) => {
      const children = prev?.[0]?.children || [];
      // TODO: 历史记录仅保存10条 Schedule
      children.push(data);
      return [{
        key: 'nowday',
        label: '历史会话',
        type: 'group',
        children: children
      }]
    })
  }, [])

  // 测试
  // const [count, setCount] = useState(0);
  // useEffect(() => {

  //   const sync1 = async () => {
  //     console.log('sync->1');
  //     setCount(prev => {
  //       return prev + 1
  //     })
  //   }
  
  //   const sync2 = async () => {
  //     await sync1()
  //     setCount(prev => prev + 1)
  //   }
  //   // sync1()
  //   sync2();
  // }, [])

  // console.log('count', count)

  useEffect(() => {
    
  }, [])
  
  return (
    <>
      <div className={`${collapsed ? "history-record" : "history-record-none"} flex flex-col justify-center h-screen bg-gray-100`}>
        <div className="flex items-center justify-between p-3">
          <div className="flex items-center">
            <img src="/extensions.png" alt="Vite logo" width="24" className="mr-1" />
            <div>RAG Application</div>
          </div>

          <div className="flex justify-center w-7 h-7 rounded-sm cursor-pointer hover:bg-gray-200" onClick={toggleCollapsed}>
            <Tooltip title="收起边栏">
              <MenuFoldOutlined />
            </Tooltip>
          </div>
        </div>
        <div className='flex-1 overflow-y-auto p-4'>
          <div className="flex justify-center items-center text-sm rounded-3xl cursor-pointer h-10 bg-white text-black hover:shadow-sm shadow-gray-200" onClick={openDialogue}>
            <PlusCircleOutlined className="mr-1"/>
            开启新对话
          </div>
          <Menu
            className="bg-gray-50"
            style={{ width: 224, background: 'transparent', border: 'none' }}
            defaultSelectedKeys={['1']}
            mode="inline"
            items={items as MenuProps['items']}
          />
        </div>
      </div>
      {
        !collapsed && (
          <div className="fixed flex top-4 left-4">
            <div className="flex justify-center w-7 h-7 mr-2 rounded-sm cursor-pointer hover:bg-gray-200" onClick={() => setCollapsed(true)}>
              <Tooltip title="打开边栏">
                <MenuUnfoldOutlined />
              </Tooltip>
            </div>
            <div className="flex justify-center w-7 h-7 mr-2 rounded-sm cursor-pointer hover:bg-gray-200">
              <Tooltip title="开启新对话">
                <PlusCircleOutlined />
              </Tooltip>
            </div>
            
          </div>
        )
      }

      <div className="flex-1 h-screen">
        <header className="flex h-12 justify-end">
          <Dropdown menu={{ items: items2 }}>
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                更多
                <MenuOutlined />
              </Space>
            </a>
          </Dropdown>
        </header>

        <DiaLogue reset={reset} createHistoryQuestion={createHistoryQuestion}/>
      </div>

      {/* <BrowserRouter>
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/profile/:id?" element={<Pofile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter> */}
    </>
  )
}

export default App
