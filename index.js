// 手写Promise
class MyPromise {
  // 三种状态
  static PENDING = 'pending';
  static FULFILLED = 'fulfilled';
  static REJECT = 'reject';

  constructor(executor) {
    this.state = MyPromise.PENDING;
    this.value = undefined; // resolve的值
    this.reason = undefined; // reject的原因
    this.onFulfilledCbs = [] // 成功回调队列
    this.onRejectedCbs = [] // 失败回调队列

    // 调用resolve方法将状态变为已完成
    const resolve = (val) => {
      if (this.PENDING === MyPromise.PENDING) {
        this.state = MyPromise.FULFILLED;
        this.value = val;

        console.log('resolve', val)
        // 异步触发回调
        queueMicrotask(() => {
          this.onFulfilledCbs.forEach((fn) => fn(val))
        })
      }
    }

    const reject = (reason) => {
      if (this.PENDING === MyPromise.PENDING) {
        this.state = MyPromise.REJECT;
        this.reason = reason;
        // 异步触发回调
        queueMicrotask(() => {
          this.onRejectedCbs.forEach((fn) => fn(reason))
        })
      }
    }
  }

  // then方法
  then(onFulfilled, onRejected) {
    // 值穿透
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (val) => val;
    onRejected = typeof onRejected === 'function' ? onRejected : (reason) => { throw reason };
    // 这里可以继续实现then的逻辑
    return new Promise((resolve, reject) => {
      const handleFulfilled = () => {
        try {
          const x = onFulfilled(this.value)
          resolvePromise(x, resolve, reject)
        } catch(err) {
          reject(err);
        }
      }

      const handleRejected = () => {
        try {
          const x = onRejected(this.reason)
          resolvePromise(x, resolve, reject)
        } catch(err) {
          reject(err);
        }
      }

      if (this.state === MyPromise.FULFILLED) {
        // 成功
        queueMicrotask(handleFulfilled)
      } else if (this.state === MyPromise.REJECT) {
        // 失败
        queueMicrotask(handleRejected)
      } else {
        // pending时收集回调
        this.onFulfilledCbs.push(() => queueMicrotask(handleFulfilled));
        this.onRejectedCbs.push(() => queueMicrotask(handleRejected));
      }
    })
  }

  catch(onRejected) {
    return this.then(null, onRejected)
  }

  // 静态方法
  resolve(val) {
    return val instanceof MyPromise
      ? val
      : new MyPromise(resolve => resolve(val));
  }

  reject(reason) {
    return new MyPromise((_, reject) => reject(reason));
  }
}

function resolvePromise(x, resolve, reject) {
  if (x instanceof MyPromise) {
    x.then(resolve, reject);
  } else {
    resolve(x);
  }
}

// console.log('123', new MyPromise())

// new Promise((resolve) => { resolve('1') })
//   .then((val) => { console.log('v1', val); return val + 1 })
//   .then((val) => { 
//     console.log('v2', val) 
//     return new Promise((resolve, reject) => reject('出错啦'))
//   })
//   .catch(err => console.error('err', err));
// new MyPromise().resolve(1)
//   .then((v1) => {
//     console.log('v1', v1)
//     return v1 + 1
//   })
//   .then((v2) => {
//     console.log('v2', v2)
//   })

/**
 * 
 * @param {*} arr 
 * @returns 
 */
function myAll(arr) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(arr)) {
      throw TypeError('参数错误')
    }
    const result = [];
    let count = 0;

    // 遍历拿到每一条数据
    arr.forEach((promise, index) => {
      console.log(promise instanceof Promise);
      Promise.resolve(promise)
        .then((val) => {
          result[index] = val;
          count++;
          if (count === arr.length) {
            resolve(result);
          }
        })
        .catch((err) => reject('err'))
    })
  })
}

const p1 = new Promise((resolve) => { setTimeout(() => { resolve('p1-result') }, 100) })
const p2 = new Promise((resolve) => { setTimeout(() => { resolve('p2-result') }, 300) })
const p3 = new Promise((resolve) => { setTimeout(() => { resolve('p3-result') }, 200) })
const p4 = Promise.reject('错误的')

myAll([p1, p2, p3, p4])
  .then((result) => { console.log('myAll-resolve', result) })
  .catch((err) => { console.log('myAll-err', err) })


function myRace(arr) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(arr)) {
      throw TypeError('')
    }

    arr.forEach((promise, index) => {
      Promise.resolve(promise).then((val) => {
        resolve(val)
      }, (err) => reject('err'))
    })
  })
}

// myRace([p1, p2, p3]).then((result) => { console.log('all', result) });

function myAllSellted(arr) {
  if (!Array.isArray(arr)) {
    throw TypeError('')
  }

  return new Promise((resolve, eject) => {
    let result = [];
    let count = 0;

    arr.forEach((promise, index) => {
      Promise.resolve(promise).then((val) => {
        result[index] = { state: 'fulfilled', value: val }
        if (++count === arr.length) resolve(result)
      }, (err) => {
        result[index] = { state: 'rejected', value: err }
        if (++count === arr.length) resolve(result)
      })
    })
  })
}

// myAllSellted([p1, p2, p3, p4]).then((val) => { console.log('allSettled', val) })

// function withResolvers() {
//   let resolve, reject
//   const promise = new Promise((res, rej) => { resolve = res; reject = rej;  })

//   return {
//     promise,
//     reolve,
//     reject,
//   }
// }

// const { promise, resolve, reject } = withResolvers();

// function getSingle() {
//   const act = new AbortController();
//   const promise = fetch('', { signal: act.signal })

//   return { promise, cancel: () => act.abort() }
// }

// const { promise, cancel } = getSingle();

// promise
//   .then((val) => {
//     console.log('val', val)
//   })
//   .catch((err) => {
//     console.log('err', err)
//   })

// setTimeout(() => { cancel }, 0)

function cancellableDelay(time) {
  let abort = null;
  const promise = new Promise((resolve, reject) => {
    const t = setTimeout(() => resolve('成功'), time, 'done');
    abort = () => {
      clearTimeout(t);
      reject(new Error('CANCELLED'));
    }
  })

  return {
    promise,
    cancel: abort
  }
}

// const { promise, cancel } = cancellableDelay(5000);

// promise
//   .then((val) => { console.log('val', val) })
//   .catch(e => console.log(e.message));

// setTimeout(cancel, 2000);
/**
 * @param add 添加异步请求
 */
class Scheduler {
  static pool = new Set();
  constructor(maxConcurrency) {
    this.pool = new Set(); // 并发队列
    this.queue = []; // 等待队列
    this.maxConcurrency = maxConcurrency; // 最大并发数量
  }

  // task 要执行的异步任务
  add(task) {
    return new Promise((resolve, reject) => {
      const runner = () => {
        return task()
          .then(resolve, reject) // 把结果抛给外部
          .finally(() => {
            // 无论成功还是失败都释放槽位,释放槽位后，从任务队列中取一条
            this.pool.delete(p);
            this.schedule();
          })
      }

      const p = runner();
      this.pool.add(p);

      // 并发队列 > N
      if (this.pool.size > this.maxConcurrency) {
        // 占位作废，放到等待队列
        this.pool.delete(p);
        this.queue.push(runner);
      }
    })
  }

  // 从等待队列里拿出来一个跑
  schedule() {
    if (this.queue.length && this.pool.size < this.maxConcurrency) {
      this.pool.add(this.queue.shift());
    }
  }
}

const scheduler = new Scheduler(3)

// scheduler.add('1')
// scheduler.add('2')
// scheduler.add('3')

// scheduler.add(() => {})
// scheduler.add(() => {})
// scheduler.add(() => {})

for (let i = 0; i < 10; i++) {
  scheduler.add(() => {
    return new Promise(res => setTimeout(() => {
      res(i);
    }, Math.random() * 800 + 200))
  });
}

// 宏任务
// setTimeout(() => { console.log('1') }, 0)

// // 微任务
// Promise.resolve('2').then((val) => { console.log('2', val) })

// queueMicrotask(() => { console.log('3') })

// 扁平数据
const flat = [{
  name: '文本1',
  parent: null,
  id: 1,
}, {
  name: '文本2',
  id: 2,
  parent: 1
}, {
  name: '文本3',
  parent: 2,
  id: 3,
}, {
  name: '文本4',
  parent: 2,
  id: 4,
}]

// 树状数据
// [{
//   name: '文本1',
//   id: 1,
//   children: [{
//     name: '文本2',
//     id: 2,
//     children: [{
//       name: '文本3',
//       id: 3
//     }]
//   }]
// }]

// 数组转树
function flatTree(data = []) {
  const map = new Map();
  const res = [];

  // 先全部丢进map
  data.forEach((item, index) => { 
    map.set(item.id, { ...item, children: [] })
  })

  data.forEach((item, index) => {
    const node = map.get(item.id);
    const parent = map.get(item.parent);
    parent ? parent.children.push(node) : res.push(node)

    // console.log('node', node, parent, res)
  })

  // console.log('res', res, map)

  return res
}

flatTree(flat)
// console.log()

const template = '嗨，{{ info.name.value }}您好，今天是星期 {{ day.value }}';
 
const data = {
  info: {
    name: {
      value: '张三'
    }
  },
  day: {
    value: '三'
  }
};
 
// render(template, data); // 嗨，张三您好，今天是星期三

// 实现一个简单的模板引擎{{ a.b.c }}
function render(template, data) {
  let out = '';
  let i = 0; // 指针

  // 难点 找到 {{ info.name.value }}
  while (i < template.length) {
    const open = template.indexOf('{{', i);
    if (open === '-1') {
      // 纯文本
      out += template.slice(i)
      break;
    }

    const close = template.indexOf('}}', open + 2);
    if (close === -1) {
      // 语法不完整，视为纯文本
      out += template.slice(i)
      break;
    }

    // 输出前面的文本
    out += template.slice(i, open)
    // 取表达式并trim
    const path = template.slice(open + 2, close).trim();
    // 按点拆分，逐级取值
    const val = path.split('.').reduce((obj, key) => obj[key], data)
    out += val == null ? '' : String(val)
    i = close + 2;
  }

  console.log('out', out)
  return out;
}
// render(template, data);


// async function async1() {
//   console.log('async1->1')
//   await async2()
//   console.log('async1->2')
// }

// async function async2() {
//   console.log('async2->1')
// }

// async1()

// console.log('script->1')

// new Promise((resolve) => {
//   console.log('promise1')
//   resolve('2')
// })
//   .then(() => {
//     console.log('promise2')
//   })

// console.log('script->end')