import { useState, useEffect, useCallback, useRef, useId, memo } from 'react'
import { ArrowUpOutlined, BorderOutlined } from '@ant-design/icons'
import { Tooltip, Select } from 'antd'
import { fetchEventSource } from '@microsoft/fetch-event-source';
import './index.css'

function DiaLogue(props: { 
  reset: number, 
  createHistoryQuestion: ({ key, label }: { key: string; label: string }) => void,
}) {
  const { reset, createHistoryQuestion } = props;
  const [ans, setAns] = useState(false);
  const [question, setQuestion] = useState('');
  const [resLoading, setResLoading] = useState(false);
  const [select, setSelect] = useState('1');
  const ctrl = useRef<null | AbortController>(null);
  const session_id = useId();

  // const [history, setHistory] = useState<Array<{ content: string, type: string }>>([])

  const sendQuestion = useCallback(() => {
    // 问题节点
    const nodeQuestion = document?.createElement('h2')
    nodeQuestion.innerText = question;
    nodeQuestion.classList = 'float-right pt-2.5 pb-2.5 pl-3 pr-3 bg-gray-200 rounded-xl'
    document.getElementById('dialogue-content')?.appendChild(nodeQuestion)
    
    // 答案节点
    const nodeAns = document?.createElement('div')
    nodeAns.innerText = '';
    nodeAns.classList = 'float-left overflow-hidden w-full'
    document.getElementById('dialogue-content')?.appendChild(nodeAns)

    setAns(true)
    setQuestion('')
    setResLoading(true)

    // RAG请求
    ctrl.current = new AbortController();
    // RAG deepseek 'https://rag-app.zeabur.app/chat/stream'
    // deepseek https://api.deepseek.com/chat/completions sk-710b9424b7d843ac880e35a1f08efe60
    fetchEventSource('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer sk-710b9424b7d843ac880e35a1f08efe60'
      },
      body: JSON.stringify({
        "model": select === '2' ? "deepseek-chat" : "deepseek-reasoner",
        "stream": true,
        // "thinking": {
        //   "type": 'disabled'
        // },
        "max_tokens": 4096,
        "messages": [{
          "content": question,
          "role": 'user'
        }]
      }),
      signal: ctrl.current.signal,
      onmessage(msg) {
        if (msg.data === '[DONE]') {
          setResLoading(false);
          return 
        }

        const data = JSON.parse(msg.data)
        console.log('data', data)
        // select === '2' || select === '3'
        // if (true) {
        if (data.choices?.[0]?.delta?.content) {
          nodeAns.innerText = nodeAns.innerText + data.choices?.[0]?.delta?.content
        }
        // } 
        
        
        // else {
        //   if (data.type === 'token') {
        //     nodeAns.innerText = nodeAns.innerText + data.data
        //   } else if (data.type === 'done') {
        //     // 判断是首次提问
        //     if (!ans) {
        //       // 创建历史会话记录
        //       createHistoryQuestion({ key: session_id, label: question })
        //     }
        //     setResLoading(false);
        //   }
        // }
      },
      onerror(err) {
        throw err; // rethrow to stop the operation
      }
    });
  }, [ans, createHistoryQuestion, question, session_id])

  const stopOutput = useCallback(() => {
    ctrl.current?.abort()
    setResLoading(false);
  }, [])

  useEffect(() => {
    // 创建新对象，初始化
    setQuestion('');
    setAns(false);
  }, [reset])

  return (
    <>
      <div className={"relative flex flex-col justify-center items-center w-full h-full overflow-y-auto"} style={{ maxHeight: "calc(100vh - 64px)" }}>
        <div className={`md:w-3xl pd-4 ${ans ? "flex-1" : ""}`}  >
          <div id="dialogue-content" className="overflow-hidden"></div>
        </div>
        {
          !ans && (
            <div className='mb-8 flex'>
              <img src="/extensions.png" alt="Vite logo" width="24" className="mr-1 object-contain" />
              <div className="text-2xl font-bold">今天想问些什么呢？</div>
            </div>
          )
        }

        <div className="w-full flex flex-col items-center sticky bg-white bottom-0">
          <div className="w-4/5 md:w-3xl h-31.5 rounded-[20px] border border-solid border-gray-300 hover:border-gray-400 relative">
            <div>
              <textarea value={question} placeholder='发送消息获得精准答案' className="border-none w-full h-25 p-4 outline-0 resize-none" onChange={(event) => { setQuestion(event.target?.value) }} />
            </div>
            <div>
              <Tooltip title={resLoading ? "停止输出" : question ? '' : "请输入你的问题"}>
                <div
                  className="absolute right-4 bottom-2 w-7 h-7 flex justify-center items-center bg-sky-300 rounded-xl text-white cursor-pointer hover:bg-sky-200"
                  onClick={() => {
                    if (resLoading) {
                      stopOutput()
                    } else {
                      sendQuestion()
                    }
                  }}
                >
                  {resLoading ? <BorderOutlined className="text-xs" /> : <ArrowUpOutlined />}
                </div>
              </Tooltip>
            </div>
            <Select
              defaultValue="RAG DeepSeek"
              className='rag-deepseek-select absolute bottom-5 left-2 border-none outline-0 resize-none'
              style={{ width: 160, border: 'none' }}
              options={[{ value: '1', label: 'RAG DeepSeek' }, { value: '2', label: 'DeepSeek' }, { value: '3', label: 'DeepSeek 深度思考' }]}
              onChange={(value) => { setSelect(value) }}
            />
          </div>
          
          {ans && <div className="text-xs text-gray-300 h-6 leading-[24px]">内容由AI生成, 请仔细甄别</div>}
        </div>


      </div>

    </>
  )
}

export default memo(DiaLogue);
