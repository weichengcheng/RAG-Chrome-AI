import axios from 'axios'

export function get<T>(url: string, headers: { [key: string]: string }, params: { [key: string]: T }): Promise<T> {
  return new Promise((resolve, reject) => {
    axios.get(url, { headers, params })
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err)
        // 统一的错误处理
        throw err;
      })
  })
}

function A() {
  return 'Hello World';
}

function identity<T>(arg: T): T {
  return arg;
}

// 泛型函数的类型相较于普通函数的类型多了一个类型参数在前面，其余没什么不同
const myIdentity: <T>(arg: T) => T = identity;

