# React + TypeScript + Vite + Antd Chrome浏览器插件开发

### 本地启动 pnpm run dev

### 打包项目 pnpm run build

### Chrome AI硬件要求
开发者和在 Chrome 中使用这些 API 运行功能的用户必须满足以下要求。其他浏览器可能有不同的运行要求。

Language Detector API 和 Translator API 可在桌面版 Chrome 中使用。这些 API 不适用于移动设备。在 Chrome 中，当满足以下条件时，Prompt API、Summarizer API、Writer API、Rewriter API 和 Proofreader API 可正常运行：

  - 操作系统：Windows 10 或 11；macOS 13 及更高版本（Ventura 及更高版本）；Linux；或 ChromeOS（从平台 16389.0.0 及更高版本开始）Chromebook Plus 设备。 非 Chromebook Plus 设备上的 Android 版 Chrome、iOS 版 Chrome 和 ChromeOS 版 Chrome 尚不支持使用 Gemini Nano 的 API。
  - 存储空间：包含 Chrome 个人资料的卷上至少有 22 GB 的可用空间。
  内置模型应明显更小。确切大小可能会因更新而略有不同。
  - GPU 或 CPU：内置模型可以使用 GPU 或 CPU 运行。
    -  GPU：VRAM 严格大于 4 GB。
    - CPU：16 GB 或更多 RAM，以及 4 个或更多 CPU 核心。
  - 网络：无限流量或不按流量计费的网络连接。

### 在Chrome浏览器调试扩展程序

- 执行pnpm run build命令打包/dist/
- Chrome浏览器右上角一次打开扩展程序 -> 管理扩展程序
- 开启开发者模式
- 加载未打包的扩展程序，选择/dist/目录
- 开始使用


