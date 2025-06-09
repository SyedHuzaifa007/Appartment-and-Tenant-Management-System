// features/profile/profileSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProfiles = createAsyncThunk('profile/fetchProfiles', async () => {
  const res = await axios.get('/api/profiles');
  return res.data;
});

const profileSlice = createSlice({
  name: 'profile',
  initialState: { list: [], loading: false, error: null },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchProfiles.pending, state => { state.loading = true; })
      .addCase(fetchProfiles.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchProfiles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default profileSlice.reducer;
