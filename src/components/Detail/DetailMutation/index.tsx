import { Fragment, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

import { ModalPortal } from "@/components/common/ModalPortal";
import { PopupModal } from "@/components/common/PopupModal";
import { ToastContainer } from "@/components/common/ToastContainer";
import { OptionModal } from "../OptionModal";

import {
  API_PATH,
  modalLocationType,
  modalType,
  QUERY_KEY,
  TOAST_MESSAGE,
  toastType,
} from "@/constants";
import { ListFetchType, PostListContentType } from "@/types";

import { useToastContext } from "@/hooks/contexts/useToastContex";
import { useDetailModalContext } from "@/hooks/contexts/useDetailModalContext";
import { useModalContext } from "@/hooks/contexts/useModalContext";
import { useDetailContext } from "@/hooks/contexts/useDetailContext";

import { useAuthMutation } from "@/hooks/mutation/useAuthMutation";

interface InfiniteData {
  pages: ListFetchType<PostListContentType>[];
  pageParams: [];
}

export function DetailMutation() {
  const [modal, setModal] = useState<modalType | null>(null);
  const { postId } = useParams(); // URL를 통한 렌더링 시

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { modalLocation, handleClose } = useModalContext();
  const { data } = useDetailContext();

  const { handleDetailClose } = useDetailModalContext();
  const { handleToastOpen } = useToastContext();

  const { mutate: deletePostMutation } = useAuthMutation({
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

  const deleteContentQueryData = (queryKey: string[], idToRemove: number) => {
    queryClient.setQueryData<InfiniteData | undefined>(queryKey, (oldData) => {
      if (!oldData) return undefined;

      return {
        ...oldData,
        pages: oldData.pages.map((page) => ({
          ...page,
          content: page.content.filter(({ id }) => id !== idToRemove),
        })),
      };
    });
  };

  const deletePost = () => {
    deletePostMutation(undefined, {
      onSuccess: () => {
        deleteContentQueryData(QUERY_KEY.myPosts(), data.id);
        deleteContentQueryData(
          QUERY_KEY.home({ category: data.category, sort: "latest" }),
          data.id
        );

        postId ? navigate("/profile") : handleDetailClose("/");
      },
      onError: () => {
        handleToastOpen({
          type: toastType.ERROR,
          content: TOAST_MESSAGE.failDeletePost(),
        });
      },
    });
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
