// import { useState, useCallback, useEffect } from 'react'
// import { Menu, Dropdown, message, Space } from 'antd'
// import { MenuUnfoldOutlined, MenuFoldOutlined, MenuOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react'
import { Button, Progress, Spin } from 'antd'
import './index.css'

function App() {
  const [loading, setLoading] = useState(true);
  const [tip, setTip] = useState('');
  // const [action, setAction] = useState(''); // 当前实现的功能
  const [result, setResult] = useState('');
  const [detectorDownloadable, setDetectorDownloadable] = useState(false);
  const [translateDownloadable, setTranslateDownloadable] = useState(false);
  const [summarizerDownloadable, setSummarizerDownloadable] = useState(false);

  useEffect(() => {

    const translate = async (message: string) => {

      try {
        // 先判断当前语言，在输出（输出默认中文）
        const detector = await window.LanguageDetector.create({})
        const results: Array<{ detectedLanguage: string, confidence: number }> = await detector.detect(message);

        console.log('result', results);
        // 中 <-> 英
        let sourceLanguage = 'en'
        let targetLanguage = 'zh'

        if (results?.[0].detectedLanguage === 'zh') {
          sourceLanguage = 'zh'
          targetLanguage = 'en'
        }

        const translator = await window.Translator.create({
          sourceLanguage: sourceLanguage,
          targetLanguage: targetLanguage,
        });

        // const result = await translator.translate(message);
        // 大量翻译，流式返回
        const stream = translator.translateStreaming(message);
        let result = '';
        const node = document.getElementById('popup-result')!;
        for await (const chunk of stream) {
          setLoading(false);
          result = result + chunk;
          node.innerText = result;
        }
      } catch (error) {
        console.error('Translation error:', error);
      }
    }

    const summarizer = async (message: string) => {
      try {
        const summarizer = await window.Summarizer.create({
          type: 'key-points',
          Format: 'plain-text',
          expectedInputLanguages: ['en', 'es', 'ja'],
          outputLanguage: 'en',
          // expectedContextLanguages: ['en', 'ja', 'es', 'zh'],
          // sharedContext: '',
        });

        // const summary = await summarizer.summarize(message, { context: '' });
        const summary = await summarizer.summarizeStreaming(message, { context: '' });
        let result = ''
        const node = document.getElementById('popup-result')!;
        for await (const chunk of summary) {
          result = result + chunk;

          setLoading(false);
          node.innerText = result
        }
      } catch (error) {
        console.error('Summarizer error:', error);
      }
    }

    const prompt = async (message: string) => {
      const availability = await window.LanguageModel.availability();

      if (availability === 'unavailable') {
        setResult('当前模型不可用');
        return;
      }

      const params = await window.LanguageModel.params();
      const session = await window.LanguageModel.create({
        temperature: Math.max(params.defaultTemperature * 1.2, 2.0),
        topK: params.defaultTopK,
      });

      // const prompt = await session.prompt(message);
      const stream = session.promptStreaming(message);
      let result = ''
      const node = document.getElementById('popup-result')!;
      for await (const chunk of stream) {
        result = result + chunk;

        setLoading(false);
        node.innerText = result
      }
    }

    // 监听来自background的消息
    window?.chrome.runtime.onMessage.addListener(async (message: { action: string, message: string }) => {
      console.log('onMessage', message);
      // 判断Chrome AI模型是否下载，模型的下载需要用户主动触发
      // 语言检测模型
      const detectorDownloadable: string = await window.LanguageDetector.availability()
      // 翻译模型
      const translateDownloadable = await window.Translator.availability({
        sourceLanguage: 'en',
        targetLanguage: 'zh',
      });
      // 摘要模型
      const summarizerDownloadable = await window.Summarizer.availability({});
      
      if (detectorDownloadable === 'downloadable') {
        setDetectorDownloadable(true);
      }

      if (translateDownloadable === 'downloadable') {
        setTranslateDownloadable(true);
      }

      if (summarizerDownloadable === 'downloadable') {
        setSummarizerDownloadable(true);
      }

      if (detectorDownloadable === 'downloadable' || translateDownloadable === 'downloadable' || summarizerDownloadable === 'downloadable') {
        setLoading(false);
        return;
      }

      switch (message.action) {
        case 'Translate':
          setTip('翻译中，请稍候...');
          translate(message.message)
          break;
        case 'Summarizer':
          setTip('摘要生成中，请稍候...');
          summarizer(message.message)
          break;
        case 'Prompt':
          setTip('提示生成中，请稍候...');
          prompt(message.message)
      }

      // sendResponse({ success: true });
    });

  }, [])

  const [languageDetectorPercent, setLanguageDetectorPercent] = useState(0);
  const downloadLanguageDetectorModal = async () => {
    await window.LanguageDetector.create({
      monitor(m: { addEventListener: (type: string, callback: (e: { loaded: number }) => void) => void }) {
        m.addEventListener('downloadprogress', (e) => {
          setLanguageDetectorPercent(e.loaded * 100)
          console.log(`Downloaded ${e.loaded * 100}%`);
        });
      },
    });
  }

  const [translatePercent, setTranslatePercent] = useState(0);
  const downloadTranslateModal = () => {
    window.Translator.create({
      sourceLanguage: 'en',
      targetLanguage: 'zh',
      monitor(m: { addEventListener: (type: string, callback: (e: { loaded: number }) => void) => void }) {
        m.addEventListener('downloadprogress', (e) => {
          setTranslatePercent(e.loaded * 100)
          console.log(`Downloaded ${e.loaded * 100}%`);
        });
      },
    });
  }

  const [summarizerPercent, setSummarizerPercent] = useState(0);
  const downloadSummarizerModal = () => {
    window.Summarizer.create({
      monitor(m: { addEventListener: (type: string, callback: (e: { loaded: number }) => void) => void }) {
        m.addEventListener('downloadprogress', (e) => {
          setSummarizerPercent(e.loaded * 100)
          console.log(`Downloaded ${e.loaded * 100}%`);
        });
      },
    });
  }

  return (
    <Spin tip={tip} spinning={loading}>
      <div className="pt-4 pb-4 pl-2 pr-2 w-96 min-h-80 text-sm">
        {
          (detectorDownloadable || translateDownloadable || summarizerDownloadable) ? (
            <div className="font-bold mb-4">请先下载Chrome AI模型重试</div>
          ) : null
        }
        <div>
          {detectorDownloadable && (
            <>
              <Button type="primary" onClick={() => downloadLanguageDetectorModal()}>下载语言识别模型</Button>
              <Progress percent={languageDetectorPercent} status="active" />
            </>
          )}
          {translateDownloadable && (
            <>
              <Button type="primary" onClick={() => downloadTranslateModal()}>下载翻译模型</Button>
              <Progress percent={translatePercent} status="active" />
            </>
          )}
          {summarizerDownloadable && (
            <>
              <Button type="primary" onClick={() => downloadSummarizerModal()}>下载摘要模型</Button>
              <Progress percent={summarizerPercent} status="active" />
            </>
          )}
        </div>

        <div className="h-full min-h-80 bg-zinc-200 rounded-xl p-4" id="popup-result">{result}</div>
      </div>
    </Spin>
  )
}

export default App
