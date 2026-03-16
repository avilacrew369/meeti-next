import { create } from 'zustand'
import { SelectCommunity } from '../types/community.types'
import { community } from '@/src/db/schema'

type Store = {
    open: boolean
    setOpen: (open: boolean) => void
    community: SelectCommunity | null
    setCommunity: (community: SelectCommunity | null) => void
}

export const useCommunityStore = create<Store>( (set) => ({
    open: false,
    setOpen: (open) => {
        set({open})
    },
    community: null,
    setCommunity: (community) => {
        set({community})
    }
}))