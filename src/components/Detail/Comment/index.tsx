import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { CommentEditForm } from "@/components/Detail/CommentEditForm";
import { OptionIcon } from "@/components/Icons/OptionIcon";

import { CommentsType } from "@/types";
import { calculateDaysAgo } from "@/utils";
import { API_PATH, TOAST_MESSAGE, toastType } from "@/constants";
import { ICON_SIZE } from "@/constants/style";

import { useAuthMutation } from "@/hooks/useAuthMutation";
import { useToastContext } from "@/hooks/useToastContex";
import { useDetailContext } from "@/hooks/useDetailContext";
import { useMenuToggle } from "@/hooks/useMenuToggle";

import { selectCurrentUser } from "@/store/slice/authSlice";

import * as S from "./style";

interface Props {
  data: CommentsType;
}

export function Comment({ data }: Props) {
  const {
    author: { kakaoId, name, profileImage },
  } = data;
  const [isEdit, setIsEdit] = useState(false);
  const signInUser = useSelector(selectCurrentUser);

  const { deleteComment } = useDetailContext();
  const { handleToastOpen } = useToastContext();
  const { fetcher } = useAuthMutation({
    url: API_PATH.deleteComment({ commentId: data.id }),
    method: "DELETE",
    hasReturnType: false,
  });

  const { menuVisible, handleToggle, menuRef, triggerRef } =
    useMenuToggle<HTMLButtonElement>();

  const isLoginUser = () => {
    return kakaoId === signInUser?.kakaoId;
  };

  const handleCloseEdit = () => {
    setIsEdit(false);
  };

  const handleEdit = () => {
    setIsEdit(true);
    handleToggle();
  };

  const handleDelete = async () => {
    try {
      await fetcher();
      deleteComment(data.id);
      handleToastOpen({
        type: toastType.SUCCESS,
        content: TOAST_MESSAGE.successDeleteComment(),
      });
    } catch {
      handleToastOpen({
        type: toastType.ERROR,
        content: TOAST_MESSAGE.failDeleteComment(),
      });
    } finally {
      handleToggle();
    }
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
      <S.Main>
        <S.ProfileImage src={profileImage} />
        <S.ContentWrapper>
          <S.NameBox>
            <S.Name>{name}</S.Name>
            <S.Date title={data.date}>{calculateDaysAgo(data.date)}</S.Date>
          </S.NameBox>
          {!isEdit ? (
            <S.Content>{data.text}</S.Content>
          ) : (
            <CommentEditForm data={data} handleCloseEdit={handleCloseEdit} />
          )}
          <S.ContentButtonBox>
            {data.children.length >= 1 && (
              <S.ContentButton>{`대댓글 (${data.children.length}개)`}</S.ContentButton>
            )}
            <S.ContentButton>댓글 달기</S.ContentButton>
          </S.ContentButtonBox>
        </S.ContentWrapper>
      </S.Main>
      <S.IconWrapper>
        {isLoginUser() && (
          <S.IconButton ref={triggerRef} onClick={handleToggle}>
            <OptionIcon size={ICON_SIZE.TINY} color="#000" />
          </S.IconButton>
        )}
        {menuVisible && (
          <S.Menu ref={menuRef}>
            <S.MenuButton onClick={handleEdit}>수정</S.MenuButton>
            <S.MenuButton onClick={handleDelete}>삭제</S.MenuButton>
          </S.Menu>
        )}
      </S.IconWrapper>
    </S.Container>
  );
}
