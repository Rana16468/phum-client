import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/Auth/AuthSlice'
import { baseApi } from './api/baseApi'
import {  persistReducer ,persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,} from 'redux-persist';
import storage from 'redux-persist/lib/storage'

//https://www.npmjs.com/package/redux-persist
const persistConfig = {
  key: 'auth',
  storage,
}

const persistedAuthReducer=persistReducer(persistConfig,authReducer);

export const store = configureStore({
  reducer: {
    auth:persistedAuthReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      //https://redux-toolkit.js.org/usage/usage-guide#use-with-redux-persist
      serializableCheck:{
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      }
    }).concat(baseApi.middleware)
  
})


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export const persistor=persistStore(store);