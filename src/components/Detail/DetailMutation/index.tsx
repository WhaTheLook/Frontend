import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { ModalPortal } from "@/components/common/ModalPortal";
import { PopupModal } from "@/components/common/PopupModal";
import { ToastContainer } from "@/components/common/ToastContainer";
import { OptionModal } from "../OptionModal";

import {
  API_PATH,
  modalLocationType,
  modalType,
  TOAST_MESSAGE,
  toastType,
} from "@/constants";

import { useAuthMutation } from "@/hooks/useAuthMutation";
import { useToastContext } from "@/hooks/contexts/useToastContex";
import { useDetailModalContext } from "@/hooks/contexts/useDetailModalContext";
import { useModalContext } from "@/hooks/contexts/useModalContext";
import { useDetailContext } from "@/hooks/contexts/useDetailContext";

import { setDeletePost } from "@/store/slice/myPageSlice";

export function DetailMutation() {
  const [modal, setModal] = useState<modalType | null>(null);
  const {
    state: { modalPostId },
  } = history; // 모달를 통한 렌더링 시

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { modalLocation, handleClose } = useModalContext();
  const { data } = useDetailContext();

  const { handleDetailClose } = useDetailModalContext();
  const { handleToastOpen } = useToastContext();
  const { fetcher } = useAuthMutation({
    url: API_PATH.deletePost({ postId: data.id }),
    method: "DELETE",
    hasReturnType: false,
  });

  const isDetailMutationModalOpen = () => {
    return modalLocation === modalLocationType.DETAIL;
  };

  const handleEditClick = () => {
    handleClose();
    handleDetailClose("/");
    navigate("/post/edit", { state: data });
  };

  const handleDeleteClick = () => {
    setModal(modalType.DELETE_POST);
  };

  const deletePost = async () => {
    try {
      await fetcher();
      if (modalPostId) {
        handleDetailClose("/");
      }
      dispatch(setDeletePost({ postId: data.id }));
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
      {isDetailMutationModalOpen() && (
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
      )}
      <ToastContainer />
    </Fragment>
  );
}
