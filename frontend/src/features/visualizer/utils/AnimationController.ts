export function triggerTravelAnimation(sourceEl: HTMLElement, destEl: HTMLElement, value: any) {
    const srcRect = sourceEl.getBoundingClientRect();
    const destRect = destEl.getBoundingClientRect();

    // Create particle element
    const particle = document.createElement('div');
    particle.className = 'av-flying-particle';
    particle.innerText = String(value);

    // Style particle
    Object.assign(particle.style, {
        position: 'fixed',
        top: `${srcRect.top}px`,
        left: `${srcRect.left}px`,
        width: `${srcRect.width}px`,
        height: `${srcRect.height}px`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(6, 182, 212, 0.3)',
        border: '2px solid rgb(6, 182, 212)',
        borderRadius: '12px',
        color: '#fff',
        fontFamily: 'monospace',
        fontSize: '15px',
        fontWeight: 'bold',
        zIndex: '9999',
        pointerEvents: 'none',
        boxShadow: '0 0 12px rgba(6, 182, 212, 0.6)',
        transition: 'all 0.55s cubic-bezier(0.25, 1, 0.5, 1)'
    });

    document.body.appendChild(particle);

    // Trigger animation frame to transition
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            Object.assign(particle.style, {
                top: `${destRect.top}px`,
                left: `${destRect.left}px`,
                width: `${destRect.width}px`,
                height: `${destRect.height}px`,
                background: 'rgba(251, 146, 60, 0.35)',
                borderColor: 'rgb(251, 146, 60)',
                boxShadow: '0 0 15px rgba(251, 146, 60, 0.7)',
                transform: 'scale(1.05)'
            });
        });
    });

    // Cleanup after animation completes
    setTimeout(() => {
        try {
            destEl.animate([
                { transform: 'scale(1)', boxShadow: '0 0 0 rgba(251, 146, 60, 0)' },
                { transform: 'scale(1.08)', boxShadow: '0 0 16px rgba(251, 146, 60, 0.8)', borderColor: 'rgb(251, 146, 60)' },
                { transform: 'scale(1)', boxShadow: '0 0 0 rgba(251, 146, 60, 0)' }
            ], {
                duration: 400,
                easing: 'ease-out'
            });
        } catch (e) {
            console.error('Error playing landing pulse animation:', e);
        }

        particle.remove();
    }, 550);
}

export function handleStepTravelAnimation(currentTraceStep: any, traceMode: boolean) {
    if (!currentTraceStep || !traceMode) return;
    const detail = currentTraceStep.assignmentDetail;
    if (!detail || !detail.dest) return;

    const dest = detail.dest;
    let destEl: HTMLElement | null = null;
    if (dest.row !== undefined && dest.col !== undefined) {
        destEl = document.querySelector(`[data-array-name="${dest.name}"][data-row-index="${dest.row}"][data-col-index="${dest.col}"]`);
    } else if (dest.index !== undefined) {
        destEl = document.querySelector(`[data-array-name="${dest.name}"][data-cell-index="${dest.index}"]`);
    } else {
        destEl = document.querySelector(`[data-var-name="${dest.name}"]`);
    }

    if (!destEl) return;

    const sources = detail.sources || [];
    sources.forEach((src: any) => {
        let srcEl: HTMLElement | null = null;
        if (src.row !== undefined && src.col !== undefined) {
            srcEl = document.querySelector(`[data-array-name="${src.name}"][data-row-index="${src.row}"][data-col-index="${src.col}"]`);
        } else if (src.index !== undefined) {
            srcEl = document.querySelector(`[data-array-name="${src.name}"][data-cell-index="${src.index}"]`);
        } else {
            srcEl = document.querySelector(`[data-var-name="${src.name}"]`);
        }

        if (srcEl && destEl) {
            triggerTravelAnimation(srcEl, destEl, src.value);
        }
    });
}
