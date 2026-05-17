import React from 'react';
import './MusicPlayer.css';

const MusicPlayer = ({ isPlaying }) => {
    // YouTube playlist ID
    const playlistId = 'PLim7UVED5wuvc5CKu1KwrFfhunbpYjWM3';

    return (
        <>
            {/* Hidden Iframe for background music */}
            {isPlaying && (
                <div style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden', pointerEvents: 'none' }}>
                    <iframe
                        width="100%"
                        height="100"
                        src={`https://www.youtube.com/embed/videoseries?list=${playlistId}&autoplay=1&loop=1`}
                        title="Music Engine"
                        allow="autoplay; encrypted-media"
                        style={{ border: 'none' }}
                    ></iframe>
                </div>
            )}
        </>
    );
};

export default MusicPlayer;
