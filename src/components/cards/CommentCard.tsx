import React, {FC} from 'react';

import {Rating} from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import {UserComment} from "@custom-types/menu";
import styles from "./styles/CommentCard.module.css"

interface Props {
    comment: UserComment
}
const CommentCard: FC<Props> = ({comment}) => {
    return (
        <article className={styles.root}>
            <p className={styles.user}>
                <AccountCircleIcon className="text-base"/>
                {comment.user}
            </p>
            <p className="h-2/3 text-sm">{comment.text}</p>
            <Rating
            size="small" name="read-only"
            value={comment.score}
            readOnly
            sx={{
                "& .MuiRating-iconEmpty": {
                    color: "secondary.light",
                },
                '& .MuiRating-iconFilled': {
                    color: 'secondary.main',
                },
            }}/>

        </article>
    );
};

export default CommentCard;