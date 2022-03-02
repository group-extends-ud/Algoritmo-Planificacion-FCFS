import { useState } from 'react';

export const useSolver = ():void => {
    const [state,setState] = useState(true);

    if(state){
        alert('Hola Mundo');
        setState(false);
    }

}