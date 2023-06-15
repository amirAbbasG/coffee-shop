import {FC, useState} from "react";
import {motion} from "framer-motion";

import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    OutlinedInput, SelectChangeEvent,
} from "@mui/material";
import {ulVariants} from "@components/modals/styles/motion-variants";


const sortTypes = [
    {
        title: "ارزان ترین",
        type: "Sort_By_Cheap_Price",
        id: "1"
    },
    {
        title: "گران ترین",
        type: "Sort_By_Expensive_Price",
        id: "2"
    },
    {
        title: "بیشترین تخفیف",
        type: "Sort_By_Best_Discount",
        id: "3"
    },
    {
        title: "پرفروش ترین",
        type: "Sort_By_Most_Sales",
        id: "4"
    },
    {
        title: "پربازدید ترین",
        type: "Sort_By_Most_View",
        id: "4"
    },
];

interface Props {
    handleChangeSort: (val: string) => void,
    activeValue: string
}

const SortProductsSelect: FC<Props> = ({handleChangeSort, activeValue}) => {

    const [sortType, setSortType] = useState("پیش فرض");
    const [open, setOpen] = useState(false);

    const variants = {
        open: {
            opacity: 1, scale: 1, filter: "blur(0px)",
            transition: {
                duration: 0.15,
            }
        },
        closed: {
            opacity: 0, scale: 0.3, filter: "blur(20px)"
        }
    }

    const handleChange = (event: SelectChangeEvent<string>) => {
        const {value} = event.target

        handleChangeSort(value)
        setSortType(sortTypes.find(t => t.id === value)?.title || "پیش فرض");
        setOpen(false);
    };

    return (
        <FormControl sx={{width: 150}}>
            <InputLabel focused shrink>به ترتیب</InputLabel>
            <Select
                classes={{select: "flex justify-evenly py-3", icon: "border-l border-primary"}}
                open={open}
                onOpen={() => setOpen(true)}
                onClose={() => setOpen(false)}
                value={activeValue}
                onChange={handleChange}
                renderValue={() =>
                    activeValue === "0" ? <em>پیش فرض</em> : sortType
                }
                input={<OutlinedInput label="به ترتیب"/>}

            >
                <motion.ul initial="closed" animate="open" variants={ulVariants}>
                    <MenuItem disabled value="0">
                        <em>پیش فرض</em>
                    </MenuItem>
                    {sortTypes.map((item) => (
                        <motion.li variants={variants} key={item.id}>
                            <MenuItem value={item.id}>
                                {item.title}
                            </MenuItem>
                        </motion.li>
                    ))}
                </motion.ul>
            </Select>
        </FormControl>
    )
        ;
};

export default SortProductsSelect;

