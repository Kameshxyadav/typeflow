import { motion } from 'framer-motion';

const Caret = ({ top, left }) => {
    return (
        <motion.div
            className="absolute w-[2px] h-6 bg-primary rounded-full"
            initial={{ opacity: 1 }}
            animate={{ opacity: [1, 0, 1], top, left }}
            transition={{
                opacity: { duration: 1, repeat: Infinity, ease: "linear" },
                top: { type: "spring", stiffness: 500, damping: 30 },
                left: { type: "spring", stiffness: 500, damping: 30 }
            }}
        />
    );
};

export default Caret;
