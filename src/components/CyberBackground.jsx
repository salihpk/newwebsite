import React from 'react';
import './CyberBackground.css';

// Aurora Glow background — pure CSS, theme-aware via --primary-color-rgb.
const CyberBackground = () => (
    <div className="aurora" aria-hidden="true">
        <div className="aurora-blob aurora-blob-1" />
        <div className="aurora-blob aurora-blob-2" />
        <div className="aurora-blob aurora-blob-3" />
    </div>
);

export default CyberBackground;
