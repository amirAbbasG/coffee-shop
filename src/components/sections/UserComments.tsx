import React, {FC} from 'react';

import { EffectCards } from "swiper";
import {Swiper, SwiperSlide} from "swiper/react";
import AddCommentIcon from '@mui/icons-material/AddComment';

import {UserComment} from "@custom-types/menu";
import {CommentCard} from "@components";
import {Button} from "@mui/material";
import {useUiContext} from "@contexts/UiContext";

interface Props {
    comments: UserComment[],
    addId?: string
}

const UserComments: FC<Props> = ({comments, addId= null}) => {
    const {openAddComment} = useUiContext()


    return (
        <section className="mb-8 mt-14 flex flex-col items-center gap-y-4">
            <h1 className="font-bold text-lg">
                نظرهای کاربران
            </h1>

            <Swiper
                effect={"cards"}
                grabCursor={true}
                modules={[EffectCards]}
                className="w-52 h-56"
            >
                {
                    comments?.map(comment => (
                        <SwiperSlide key={comment.id} className="rounded-lg">
                            <CommentCard comment={comment}/>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
            <Button
                variant="contained"
                className="button w-52"
                startIcon={<AddCommentIcon className="text-2xl ml-2"/>}
                onClick={() => openAddComment(addId)}
            >
                افزودن نظر
            </Button>
        </section>
    );
};

export default UserComments;