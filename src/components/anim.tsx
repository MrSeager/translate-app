import { useSpring } from '@react-spring/web';

//Hover scale effect
export const useHover = ( hover: boolean, scl: number ) => 
    useSpring({
        scale: hover ? scl : 1,
        config: { tension: 110, friction: 10 },
    });

//Scale effect
export const useScale = ( del: number ) =>
    useSpring({
        from: { transform: 'scale(0)' },
        to: { transform: 'scale(1)' },
        config: { tension: 180, friction: 15 },
        delay: del,
    });