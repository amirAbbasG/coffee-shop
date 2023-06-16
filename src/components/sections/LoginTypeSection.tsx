import Image from "next/image";

import {motion} from "framer-motion";
import {Button} from "@mui/material";
import {signIn} from "next-auth/react";
import GoogleIcon from "@mui/icons-material/Google";


const LoginTypeSection = () => {
    const handleLoginGoogle = async () => {
        await signIn("google")
    }

    return (
        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: .8}}
        >
            <motion.div
                animate={{
                    scale: [1, 1.5, 1.5, 1, 1],
                    rotate: [0, 0, 270, 270, 0],
                }}
                transition={{duration: 1.5}}
            >
                <Image src="/images/logos/logo.png" alt="logo" width={100} height={100} className="mx-auto my-5"/>
            </motion.div>
            <Button
                fullWidth
                className="py-2"
                onClick={handleLoginGoogle}
                startIcon={<GoogleIcon sx={{color: "primary.dark"}}/>}
                variant="outlined">

                ورود با گوگل
            </Button>
        </motion.div>
    );
};

export default LoginTypeSection;