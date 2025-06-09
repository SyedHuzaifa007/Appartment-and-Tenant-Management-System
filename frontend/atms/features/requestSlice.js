// features/request/requestSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchRequests = createAsyncThunk('request/fetchRequests', async () => {
  const res = await axios.get('/api/requests');
  return res.data;
});

const requestSlice = createSlice({
  name: 'request',
  initialState: { list: [], loading: false, error: null },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchRequests.pending, state => { state.loading = true; })
      .addCase(fetchRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default requestSlice.reducer;
