import { useEffect } from 'react'
import './index.css'

function About() {

  useEffect(() => {
    // 两个大数相加
    // function add(first: string, second: string) {
      
    //   // 判断a、b是否是负数
    //   const isA: boolean = first.startsWith('-')
    //   const isB: boolean = second.startsWith('-')
      
    //   // 两数相加
    //   const positive = (first: string, second: string) => {
    //     const length: number = Math.max(first.length, second.length)
    //     const firstFill: string = first.padStart(length, '0')
    //     const secondFill: string = second.padStart(length, '0')

    //     // 逐位相加
    //     let carry: number = 0;
    //     let result: string = '';
    //     for (let i = length - 1; i >= 0; i--) {
    //       const sum: number = Number(firstFill[i]) + Number(secondFill[i]) + carry;
    //       // 计算新的结果位和进位
    //       carry = Math.floor(sum / 10);
    //       const currentDigit = sum % 10;

    //       result = currentDigit + result
    //     }

    //     if (carry > 0) {
    //       result = carry + result;
    //     }
    //     return result;
    //   }

    //   function compareBigNumbers(a: string, b: string) {
    //     if (a.length !== b.length) {
    //       return a.length - b.length;
    //     }
        
    //     for (let i = 0; i < a.length; i++) {
    //       if (a[i] !== b[i]) {
    //         return parseInt(a[i]) - parseInt(b[i]);
    //       }
    //     }
        
    //     return 0;
    //   }

    //   // 两数相减
    //   const minus = (first: string, second: string) => {
    //     const length: number = Math.max(first.length, second.length)
        
    //     // 比较大小, 判断结果的正负
    //     const isAGreater = compareBigNumbers(first, second) >= 0;

    //     if (!isAGreater) {
    //       return '-' + minus(second, first);
    //     }

    //     first = first.padStart(length, '0')
    //     second = second.padStart(length, '0')

    //     let borrow = 0;
    //     let result = '';

    //     for (let i = length - 1; i >= 0; i--) {
    //       let numberA = Number(first[i]);
    //       const numberB = Number(second[i]);

    //       // 处理借位
    //       numberA -= borrow;
    //       borrow = 0;

    //       console.log('numberA', numberA, borrow)
    //       if (numberA < numberB) {
    //         numberA += 10;
    //         borrow = 1;
    //       }

    //       result = numberA - numberB + result;
    //       console.log('result', result)
    //     }
    //     // 去除前0
    //     result = result.replace(/^0+/, '');

    //     return result;
    //   }

    //   // 两个正数
    //   if (!isA && !isB) {
    //     return positive(first, second)
    //   } else if (isA && isB) {
    //     // 两个负数 
    //     return '-' + positive(first.slice(1), second.slice(1))
    //   } else {
    //     // 一正一负
    //     if (isA) {
    //       // b是负数
    //       return minus(first, second)
    //     } else {
    //       return minus(first, second.slice(1))
    //     }
    //   }
    // }

    // console.log(add('123456789', '3457'))
    // console.log(add('-300', '-400'))
    // console.log(add('305', '-404'))
    // console.log(add('300', '-400'))
  }, [])


  return (
    <div className="about-contain">
      <div ></div>
      About
    </div>
  )
}

export default About
