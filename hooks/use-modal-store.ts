import { create } from "zustand";

export type ModalType = "pricingModal" | "shareModal";


interface ShareModalProps {
    conversationId: string;
}

interface ModalStore {
    type: ModalType | null;
    isOpen: boolean;
    shareModalProps: ShareModalProps | null;
    onOpen: (type: ModalType, props?: ShareModalProps) => void;
    onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
    type: null,
    isOpen: false,
    shareModalProps: null,
    onOpen: (type, props) => set({ type, isOpen: true, shareModalProps: props }),
    onClose: () => set({ type: null, isOpen: false, shareModalProps: null }),
}))