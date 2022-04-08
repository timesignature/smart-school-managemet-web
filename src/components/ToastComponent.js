import {toast} from "react-hot-toast";

export const success=(text='Wow, great. We have a success!!!')=>toast(text, {
    duration: 4000,
    position: 'top-right',
    // Styling
    style: {
        background:'#00C853',
        padding:'10px',
        color:'white',
        fontSize:'18px',
        lineHeight:'30px'

    },
    icon:'',
    className: '',
    ariaProps: {
        role: 'status',
        'aria-live': 'polite',
    },
});


export const warning=(text='you need to make sure all your (required) fields are field or have correct information')=>toast(text, {
    duration: 4000,
    position: 'top-right',
    // Styling
    style: {
        background:'#FF6D00',
        padding:'10px',
        color:'white',
        fontSize:'18px',
        lineHeight:'30px'
    },
    className: '',
    ariaProps: {
        role: 'status',
        'aria-live': 'polite',
    },
});
