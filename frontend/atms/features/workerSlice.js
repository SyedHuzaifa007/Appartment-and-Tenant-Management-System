// features/worker/workerSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchWorkers = createAsyncThunk('worker/fetchWorkers', async () => {
  const res = await axios.get('/api/workers');
  return res.data;
});

const workerSlice = createSlice({
  name: 'worker',
  initialState: { list: [], loading: false, error: null },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchWorkers.pending, state => { state.loading = true; })
      .addCase(fetchWorkers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchWorkers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default workerSlice.reducer;
