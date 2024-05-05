'use client'

import { Toaster } from 'react-hot-toast';

const ToasterProvider = () => {
    return (  
        <Toaster 
            toastOptions={{
                success: {
                    style: {
                        background: '#4FA480',
                        color: 'white'
                    },
                },
                error: {
                    style: {
                        background: 'red',
                        color: 'white'
                    },
                },
            }}
        />
    );
}
 
export default ToasterProvider;