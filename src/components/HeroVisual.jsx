import React from 'react';
import './HeroVisual.css';

// Plasma Core — two counter-rotating energy arcs + breathing glow.
const HeroVisual = () => (
    <div className="pc" aria-hidden="true">
        <div className="pc-glow" />
        <div className="pc-arc pc-arc-1" />
        <div className="pc-arc pc-arc-2" />
    </div>
);

export default HeroVisual;
