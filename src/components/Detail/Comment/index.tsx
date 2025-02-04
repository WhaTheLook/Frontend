import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { CommentSubForm } from "@/components/Detail/CommentSubForm";
import { OptionIcon } from "@/components/Icons/OptionIcon";

import { CommentsType } from "@/types";
import { calculateDaysAgo, getLocalStorageItem } from "@/utils";
import { ACCESS_TOKEN, TOAST_MESSAGE, toastType } from "@/constants";
import { ICON_SIZE } from "@/constants/style";

import { useToastContext } from "@/hooks/contexts/useToastContex";
import { useDetailContext } from "@/hooks/contexts/useDetailContext";
import { useMenuToggle } from "@/hooks/useMenuToggle";

import { selectCurrentUser } from "@/store/slice/authSlice";

import { useDeleteCommentMutation } from "@/mutations/useDeleteCommentMutation";
import { useAcceptCommentMutation } from "@/mutations/useAcceptCommentMutation";

import * as S from "./style";

interface Props {
  data: CommentsType;
  type: "PARENT" | "CHILDREN";
  toggleReplyShow?: (commentId: number) => void;
  isShowReply?: boolean;
}

export function Comment({ data, toggleReplyShow, type, isShowReply }: Props) {
  const {
    author: { kakaoId, name, profileImage },
  } = data;
  const [isEdit, setIsEdit] = useState(false);
  const [isReply, setIsReply] = useState(false);

  const signInUser = useSelector(selectCurrentUser);

  const {
    deleteComment,
    setAcceptComment,
    resetAcceptComment,
    data: postData,
  } = useDetailContext();
  const { handleToastOpen } = useToastContext();

  const { mutate: deleteMutate } = useDeleteCommentMutation({
    commentId: data.id,
  });
  const { mutate: acceptMutate } = useAcceptCommentMutation({
    commentId: data.id,
    postId: postData.id,
  });

  const { menuVisible, handleToggle, menuRef, triggerRef } =
    useMenuToggle<HTMLButtonElement>();

  const isLoginUser = () => {
    return kakaoId === signInUser?.kakaoId;
  };

  const isPostWritter = () => {
    return signInUser?.kakaoId === postData.author.kakaoId;
  };

  const handleCloseEdit = () => {
    setIsEdit(false);
  };

  const handleCloseReply = () => {
    setIsReply(false);
  };

  const handleEdit = () => {
    setIsEdit(true);
    handleToggle();
  };

  const handleDelete = () => {
    deleteMutate(undefined, {
      onSuccess: () => {
        deleteComment(data.id);
        handleToastOpen({
          type: toastType.SUCCESS,
          content: TOAST_MESSAGE.successDeleteComment(),
        });
      },
      onError: () => {
        handleToastOpen({
          type: toastType.ERROR,
          content: TOAST_MESSAGE.failDeleteComment(),
        });
      },
      onSettled: () => {
        handleToggle();
      },
    });
  };

  const handleAccept = (isCancle: boolean) => {
    if (postData.accept && !isCancle) {
      alert("이미 채택된 댓글이 있습니다. 변경하려면 기존 채택을 취소하세요.");
      return;
    }
    const toastContent = isCancle
      ? {
          success: TOAST_MESSAGE.successCancleAcceptComment(),
          error: TOAST_MESSAGE.failCancleAcceptComment(),
        }
      : {
          success: TOAST_MESSAGE.successAcceptComment(),
          error: TOAST_MESSAGE.failAcceptComment(),
        };

    acceptMutate(undefined, {
      onSuccess: (acceptedComment) => {
        if (isCancle) {
          resetAcceptComment(acceptedComment!);
        } else {
          setAcceptComment(acceptedComment!);
        }
        handleToastOpen({
          type: toastType.SUCCESS,
          content: toastContent.success,
        });
      },
      onError: () => {
        handleToastOpen({
          type: toastType.ERROR,
          content: toastContent.error,
        });
      },
      onSettled: () => {
        handleToggle();
      },
    });
  };

  const handleViewReply = () => {
    if (!toggleReplyShow) return;
    toggleReplyShow(data.id);
  };

  const handleReplyBtnClick = () => {
    const accessToken = getLocalStorageItem(ACCESS_TOKEN);
    if (!accessToken) {
      alert("로그인 후 이용하세요.");
      return;
    }
    setIsReply(true);
  };

  useEffect(() => {
    const scrollView = document.getElementById("detail-scrollView");
    if (!scrollView || !menuVisible) return;

    scrollView.addEventListener("scroll", handleToggle);
    return () => {
      scrollView.removeEventListener("scroll", handleToggle);
    };
  }, [menuVisible, handleToggle]);

  return (
    <S.Container>
      <S.Wrapper>
        <S.Main>
          <S.ProfileImage src={profileImage} />
          <S.ContentWrapper>
            <S.NameBox>
              <S.Name>{name}</S.Name>
              <S.Date title={data.date}>{calculateDaysAgo(data.date)}</S.Date>
            </S.NameBox>
            {!isEdit ? (
              <S.Content>
                {type === "CHILDREN" && (
                  <S.TargetUser>{`@${data.targetUser.name}`}</S.TargetUser>
                )}
                {data.text}
              </S.Content>
            ) : (
              <CommentSubForm
                type="EDIT"
                data={data}
                handleClose={handleCloseEdit}
              />
            )}
            <S.ContentButtonBox>
              {type === "PARENT" && data.childrenCount >= 1 && (
                <S.ContentButton onClick={handleViewReply}>
                  {isShowReply
                    ? "대댓글 접기"
                    : `대댓글 (${data.childrenCount}개)`}
                </S.ContentButton>
              )}
              <S.ContentButton onClick={handleReplyBtnClick}>
                댓글 달기
              </S.ContentButton>
            </S.ContentButtonBox>
          </S.ContentWrapper>
        </S.Main>
        <S.IconWrapper>
          {(isLoginUser() || isPostWritter()) && (
            <S.IconButton ref={triggerRef} onClick={handleToggle}>
              <OptionIcon size={ICON_SIZE.TINY} color="#000" />
            </S.IconButton>
          )}
          {menuVisible && (
            <S.Menu ref={menuRef}>
              {isLoginUser() && (
                <Fragment>
                  <S.MenuButton onClick={handleEdit} $isRedText={false}>
                    수정
                  </S.MenuButton>
                  <S.MenuButton onClick={handleDelete} $isRedText={true}>
                    삭제
                  </S.MenuButton>
                </Fragment>
              )}
              {isPostWritter() && (
                <S.MenuButton
                  onClick={() => handleAccept(data.accept)}
                  $isRedText={data.accept}
                >
                  {data.accept ? "채택 취소" : "댓글 채택"}
                </S.MenuButton>
              )}
            </S.Menu>
          )}
        </S.IconWrapper>
      </S.Wrapper>
      {isReply && (
        <CommentSubForm
          type="REPLY"
          data={data}
          handleClose={handleCloseReply}
        />
      )}
    </S.Container>
  );
}
