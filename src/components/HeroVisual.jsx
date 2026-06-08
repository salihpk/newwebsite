import React from 'react';
import './HeroVisual.css';

const HeroVisual = () => (
    <div className="hv" aria-hidden="true">
        <div className="hv-ring hv-ring-1" />
        <div className="hv-ring hv-ring-2" />
        <div className="hv-ring hv-ring-3" />
        <div className="hv-ring hv-ring-4" />
        <div className="hv-glow" />
        <div className="hv-orbit hv-orbit-1"><span className="hv-dot" /></div>
        <div className="hv-orbit hv-orbit-2"><span className="hv-dot" /></div>
        <div className="hv-orbit hv-orbit-3"><span className="hv-dot" /></div>
    </div>
);

export default HeroVisual;
