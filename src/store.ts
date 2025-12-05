import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './reduxSlice/countSlice';

export default configureStore({
  reducer: {
    counter: counterReducer
  },
});