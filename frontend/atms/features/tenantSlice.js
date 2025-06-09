// features/tenant/tenantSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchTenants = createAsyncThunk('tenant/fetchTenants', async () => {
  const res = await axios.get('/api/tenants');
  return res.data;
});

const tenantSlice = createSlice({
  name: 'tenant',
  initialState: { list: [], loading: false, error: null },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchTenants.pending, state => { state.loading = true; })
      .addCase(fetchTenants.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchTenants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default tenantSlice.reducer;
