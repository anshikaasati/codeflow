import type { ArrayVisual } from '../../../../types';
import ArrayRenderer from './ArrayRenderer';
import './renderers.css';

interface StringRendererProps {
    visual: ArrayVisual;
    className?: string;
    stepType?: any;
}

export default function StringRenderer({ visual, className = '', stepType }: StringRendererProps) {
    return (
        <div className={`string-visual-wrapper w-full flex flex-col items-center ${className}`}>
            <ArrayRenderer 
                visual={{
                    ...visual,
                    target: visual.target.toLowerCase().includes('str') || visual.target.toLowerCase().includes('s') 
                        ? visual.target 
                        : `${visual.target} (string)`
                }}
                stepType={stepType}
            />
        </div>
    );
}
