import { PricingModal } from "@/components/modals/pricing-modal"
import { ShareModal } from "@/components/modals/share-modal"

interface ModalProviderProps{
    currentUser: any;
}

export const ModalProvider = ({
    currentUser,
} : ModalProviderProps) => {
    return(
        <>
            <PricingModal/>
            <ShareModal currentUser={currentUser}/>
        </>
    )
}