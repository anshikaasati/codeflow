import ArrayRenderer from './renderers/ArrayRenderer';
import MatrixRenderer from './renderers/MatrixRenderer';
import PriorityQueueRenderer from './renderers/PriorityQueueRenderer';
import CallStackRenderer from './renderers/CallStackRenderer';
import TreeRenderer from './renderers/TreeRenderer';
import GraphRenderer from './renderers/GraphRenderer';
import StackRenderer from './renderers/StackRenderer';
import QueueRenderer from './renderers/QueueRenderer';
import HashMapRenderer from './renderers/HashMapRenderer';
import LinkedListRenderer from './renderers/LinkedListRenderer';
import TrieRenderer from './renderers/TrieRenderer';
import StringRenderer from './renderers/StringRenderer';
import type { ArrayVisual, CallStackVisual, TreeVisual, GraphVisual, StackQueueVisual, HashMapVisual, LinkedListVisual } from '../../../types';

interface RendererRegistryProps {
    visual: any;
    compact?: boolean;
    arrayStepType?: any;
    className?: string;
}

export function RendererRegistry({ visual, compact = false, arrayStepType, className = '' }: RendererRegistryProps) {
    if (!visual) return null;
    
    switch (visual.type) {
        case 'array_1d':
            return <ArrayRenderer visual={visual as ArrayVisual} stepType={arrayStepType} className={className} />;
        case 'matrix':
            return <MatrixRenderer visual={visual} className={className} />;
        case 'priority_queue':
            return <PriorityQueueRenderer visual={visual} className={className} />;
        case 'call_stack':
            return <CallStackRenderer visual={visual as CallStackVisual} className={className} />;
        case 'tree':
            return <TreeRenderer visual={visual as TreeVisual} className={className} />;
        case 'graph':
            return <GraphRenderer visual={visual as GraphVisual} className={className} />;
        case 'stack':
            return <StackRenderer visual={visual as StackQueueVisual} className={className} />;
        case 'queue':
        case 'deque':
            return <QueueRenderer visual={visual as StackQueueVisual} className={className} />;
        case 'hash_map':
            return <HashMapRenderer visual={visual as HashMapVisual} compact={compact} className={className} />;
        case 'linked_list':
            return <LinkedListRenderer visual={visual as LinkedListVisual} compact={compact} className={className} />;
        case 'trie':
            return <TrieRenderer visual={visual} className={className} />;
        case 'string':
            return <StringRenderer visual={visual} stepType={arrayStepType} className={className} />;
        default:
            return null;
    }
}
