import { configureStore } from '@reduxjs/toolkit';

import userReducer from '../features/userSlice';
import tenantReducer from '../features/tenantSlice';
import paymentReducer from '../features/paymentSlice';
import requestReducer from '../features/requestSlice';
import propertyReducer from '../features/propertySlice';
import workerReducer from '../features/workerSlice';
import profileReducer from '../features/profileSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    tenant: tenantReducer,
    payment: paymentReducer,
    request: requestReducer,
    property: propertyReducer,
    worker: workerReducer,
    profile: profileReducer,
  },
});
