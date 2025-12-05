import { createSlice, createAsyncThunk, type WritableDraft } from '@reduxjs/toolkit';

const fetchUserDataRequest = () => {
  return new Promise((resolve) => {
    setTimeout(() => { resolve({ data: '用户信息' }) }, 2000)
  })
}


// 创建thunk
export const fetchUserData = createAsyncThunk(
  'users/fetchByIdStatus',
  async () => {
    const res = await fetchUserDataRequest()
    return res;
  }
)

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
    userData: {}
  },
  reducers: {
    increment: (state, action) => {
      // Redux Toolkit 允许我们在 reducers 中编写 mutating 逻辑。
      // 它实际上并没有 mutate state 因为它使用了 Immer 库，
      // 它检测到草稿 state 的变化并产生一个全新的基于这些更改的不可变 state
      state.value += 1;
      console.log('increment-action', state, state.value, action)
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      console.log('extraReducers', state, action)
      state.userData = action.payload as WritableDraft<object>
    })
  },
});

// 为每个 case reducer 函数生成 Action creators
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;