export const ulVariants = {
    open: {
        transition: {
            when: "beforeChildren",
            staggerChildren: 0.1,
            delayChildren: 0.02
        }
    },
    closed: {
        transition: {staggerChildren: 0.05, staggerDirection: -1}
    }
};

export const liVariants = {
    open: {
        y: 0,
        opacity: 1,
        transition: {
            y: {stiffness: 1000, velocity: -100}
        }
    },
    closed: {
        y: 50,
        opacity: 0,
        transition: {
            y: {stiffness: 1000}
        }
    }
};