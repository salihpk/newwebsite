import React from 'react';
import { motion } from 'framer-motion';

const pageVariants = {
    initial: {
        opacity: 0,
    },
    animate: {
        opacity: 1,
        transition: {
            duration: 0.28,
            ease: [0.16, 1, 0.3, 1],
        },
    },
    exit: {
        opacity: 0,
        transition: {
            duration: 0.15,
            ease: [0.4, 0, 1, 1],
        },
    },
};

const PageTransition = ({ children, className }) => {
    return (
        <motion.div
            className={className}
            style={{ willChange: 'opacity' }}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            {children}
        </motion.div>
    );
};

export default PageTransition;
