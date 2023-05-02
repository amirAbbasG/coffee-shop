import React, {FC} from 'react';
import Link from "next/link";
import {Button} from "@mui/material";



const Fallback: FC = () => (
    <div className="h-screen w-screen col center text-2xl space-y-4 bg-secondary-light">
        <h1 className="text-5xl mb-10">OFFLINE</h1>
        <h4>Please check your internet connection</h4>

        <Link href="/">
            <Button variant="contained" className="px-10 py-3 bg-primary mx-auto">
                Go Home
            </Button>
        </Link>
    </div>
);

export default Fallback;
