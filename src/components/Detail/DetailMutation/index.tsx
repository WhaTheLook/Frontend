import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { ModalPortal } from "@/components/common/ModalPortal";
import { PopupModal } from "@/components/common/PopupModal";
import { ToastContainer } from "@/components/common/ToastContainer";
import { OptionModal } from "../OptionModal";

import { API_PATH, modalType, TOAST_MESSAGE, toastType } from "@/constants";

import { useAuthMutation } from "@/hooks/useAuthMutation";
import { useToastContext } from "@/hooks/useToastContex";
import { useDetailModalContext } from "@/hooks/useDetailModalContext";

import { setDeletePost } from "@/store/slice/myPageSlice";

interface Props {
  postId: number;
}

export function DetailMutation({ postId }: Props) {
  const [modal, setModal] = useState<modalType | null>(null);
  const {
    state: { modalPostId },
  } = history; // 모달를 통한 렌더링 시

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { handleDetailClose } = useDetailModalContext();
  const { handleToastOpen } = useToastContext();
  const { fetcher } = useAuthMutation({
    url: API_PATH.deletePost({ postId }),
    method: "DELETE",
  });

  const handleEditClick = () => {};

  const handleDeleteClick = () => {
    setModal(modalType.DELETE_POST);
  };

  const deletePost = async () => {
    try {
      await fetcher();
      if (modalPostId) {
        handleDetailClose("/");
      }
      dispatch(setDeletePost({ postId }));
      navigate("/profile");
    } catch {
      handleToastOpen({
        type: toastType.ERROR,
        content: TOAST_MESSAGE.failDeletePost(),
      });
    }
  };

  return (
    <Fragment>
      <ModalPortal>
        {!modal ? (
          <OptionModal
            onEditClick={handleEditClick}
            onDeleteClick={handleDeleteClick}
          />
        ) : (
          <PopupModal
            type={modal}
            onClick={deletePost}
            handleUnmount={() => setModal(null)}
          />
        )}
      </ModalPortal>
      <ToastContainer />
    </Fragment>
  );
}
