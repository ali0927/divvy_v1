import { configureStore } from '@reduxjs/toolkit'
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from '@reduxjs/toolkit/query'
import { Sports } from '../constants/Sports'
import { seasonsApi } from './seasons'
import { sportsApi } from './sports'

export const store = configureStore({
    reducer: {
        // Add the generated reducer as a specific top-level slice
        [sportsApi.reducerPath]: sportsApi.reducer,
        [seasonsApi.reducerPath]: seasonsApi.reducer,
    },
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(sportsApi.middleware, seasonsApi.middleware),
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
// setupListeners(store.dispatch)