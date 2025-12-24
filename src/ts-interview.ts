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

function identity<T>(arg: T): T {
  return arg;
}

// 泛型函数的类型相较于普通函数的类型多了一个类型参数在前面，其余没什么不同
const myIdentity: <T>(arg: T) => T = identity;

function fn() {
  return 42;
}

type MyReturnType<T> = T extends (...args: any) => infer R ? R : any;

// typeof 在类型上下文中使用它来引用变量或属性的类型
type T0 = MyReturnType<typeof fn>;
type T1 = ReturnType<() => string>;

type Mapish = { [k: string]: boolean };
type M = keyof Mapish;

// keyof 接受一个对象类型，生成一个联合类型

type Getters<Type> = {
    [Property in keyof Type as `get${Capitalize<string & Property>}`]: () => Type[Property]
};

interface Person {
  name: string;
  age: number;
  location: string;
}

type LazyPerson = Getters<Person>;

window.console.log('123')

console.log('dev-test 分支提交')
console.log('dev-test 分支提交2')