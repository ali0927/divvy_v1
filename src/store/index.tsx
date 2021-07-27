import { configureStore } from '@reduxjs/toolkit'
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from '@reduxjs/toolkit/query'
import { Sports } from '../constants/Sports'
import { betsApi } from './getBets'
import { seasonsApi } from './seasons'
import { sportsApi } from './sports'
import { storeBetsApi } from './storeBets'
import { poolApi } from './getPool'

export const store = configureStore({
    reducer: {
        // Add the generated reducer as a specific top-level slice
        [sportsApi.reducerPath]: sportsApi.reducer,
        [seasonsApi.reducerPath]: seasonsApi.reducer,
        [betsApi.reducerPath]: betsApi.reducer,
        [storeBetsApi.reducerPath]: storeBetsApi.reducer,
        [poolApi.reducerPath]: poolApi.reducer
    },
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(sportsApi.middleware, seasonsApi.middleware, betsApi.middleware, storeBetsApi.middleware),
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
// setupListeners(store.dispatch)