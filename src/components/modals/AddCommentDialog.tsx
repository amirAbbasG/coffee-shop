import {FC, useState} from "react";

import {Rating, Typography, Dialog, DialogContent, IconButton} from "@mui/material";
import {Form, Formik, FormikHelpers} from "formik";
import {AxiosError} from "axios";
import CloseIcon from "@mui/icons-material/Close";

import {FormTextField, SubmitButton} from "../index";
import {successMessage, showError} from "@libs/toast";
import {useUiContext} from "@contexts/UiContext";

// import { commentValidator } from "@validators/UserValidator";

interface CommentBody {
    text: string,
    score?: number | null
}

const AddCommentDialog: FC= () => {
    const [score, setScore] = useState(0);
    const {addComment: {isOpen}, closeAddComment} = useUiContext()

    const handleRating = (rate: number) => {
        if (score === 1 && rate === 1) {
            setScore(0);
        } else {
            setScore(rate);
        }
    };


    const handleAddComment = async (comment: CommentBody, actions: FormikHelpers<CommentBody>) => {
        actions.setSubmitting(true);
        try {
            const commentBody: CommentBody = {
                ...comment,
                score: score > 0 ? score : null,
            };
            console.log(commentBody)
            // await addComment(commentBody);
            successMessage(
                "نظر شما ثبت شد و پس از تایید مدیر سایت قابل مشاهده خواهد بود"
            );
            setScore(0);
            closeAddComment();
            actions.resetForm();
        } catch (error) {
            actions.setFieldError("cpError", "reset");
            showError(error as AxiosError);
        } finally {
            actions.setSubmitting(false);
        }
    };

    return (
        <Dialog
            aria-labelledby="comment-modal"
            aria-describedby="add-comment"
            open={isOpen}
            onClose={closeAddComment}
            PaperProps={{
                className: "w-full max-w-3xl rounded-lg mx-auto overflow-hidden relative",
            }}
        >
            {/*<MyDialogTitle handleClose={handleClose} title="افزودن نظر" />*/}

            <IconButton onClick={closeAddComment} className="absolute right-2 top-2">
                <CloseIcon/>
            </IconButton>

            <DialogContent className="p-5 pt-12">
                <Formik
                    initialValues={{text: ""}}
                    btnTitle="افزودن نظر"
                    onSubmit={handleAddComment}
                    // validationSchema={commentValidator}
                >
                    <Form>
                        <FormTextField
                            multiline
                            rows={6}
                            placeholder="نظر خود را بنویسید ..."
                            name="text"
                            title="متن نظر"
                            InputLabelProps={{shrink: true}}
                            required
                        />

                        <div className="flex flex-col items-center my-8">
                            <Typography mb=".5rem" variant="h6" color="secondary.main">
                                به این کالا چه امتیازی میدهید ؟
                            </Typography>

                            <Rating
                                size="large"
                                value={score}
                                onChange={(event, newValue) => {
                                    handleRating(newValue as number);
                                }}
                                sx={{
                                    '& .MuiRating-iconFilled': {
                                        color: 'secondary.main',
                                    }
                                }}
                            />
                        </div>

                        <SubmitButton/>
                    </Form>
                </Formik>
            </DialogContent>
        </Dialog>
    );
};

export default AddCommentDialog;

