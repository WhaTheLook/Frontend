import { useEffect } from "react";
import { useSelector } from "react-redux";

import { OptionIcon } from "@/components/Icons/OptionIcon";

import { CommentsType } from "@/types";
import { calculateDaysAgo } from "@/utils";
import { TOAST_MESSAGE, toastType } from "@/constants";
import { ICON_SIZE } from "@/constants/style";

import { useDetailContext } from "@/hooks/contexts/useDetailContext";
import { useToastContext } from "@/hooks/contexts/useToastContex";
import { useMenuToggle } from "@/hooks/useMenuToggle";

import { useAcceptCommentMutation } from "@/mutations/useAcceptCommentMutation";

import { selectCurrentUser } from "@/store/slice/authSlice";

import * as S from "./style";

interface Props {
  data: CommentsType;
}

export function AcceptComment({ data }: Props) {
  const {
    author: { name, profileImage },
  } = data;
  const signInUser = useSelector(selectCurrentUser);

  const { handleToastOpen } = useToastContext();
  const { data: postData, resetAcceptComment } = useDetailContext();
  const { menuVisible, handleToggle, triggerRef, menuRef } =
    useMenuToggle<HTMLButtonElement>();

  const isPostWritter = () => {
    return signInUser?.kakaoId === postData.author.kakaoId;
  };

  const { mutate } = useAcceptCommentMutation({
    commentId: data.id,
    postId: postData.id,
  });

  const handleCancleAccept = () => {
    mutate(undefined, {
      onSuccess: (acceptedComment) => {
        resetAcceptComment(acceptedComment!);
        handleToastOpen({
          type: toastType.SUCCESS,
          content: TOAST_MESSAGE.successCancleAcceptComment(),
        });
      },
      onError: () => {
        handleToastOpen({
          type: toastType.ERROR,
          content: TOAST_MESSAGE.failCancleAcceptComment(),
        });
      },
      onSettled: () => {
        handleToggle();
      },
    });
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
      <S.AcceptText>💡 채택된 댓글입니다</S.AcceptText>
      <S.Wrapper>
        <S.Main>
          <S.ProfileImage src={profileImage} />
          <S.ContentWrapper>
            <S.NameBox>
              <S.Name>{name}</S.Name>
              <S.Date title={data.date}>{calculateDaysAgo(data.date)}</S.Date>
            </S.NameBox>
            <S.Content>{data.text}</S.Content>
          </S.ContentWrapper>
        </S.Main>
        <S.IconWrapper>
          {isPostWritter() && (
            <S.IconButton ref={triggerRef} onClick={handleToggle}>
              <OptionIcon size={ICON_SIZE.TINY} color="#000" />
            </S.IconButton>
          )}
          {menuVisible && (
            <S.Menu ref={menuRef}>
              <S.MenuButton onClick={handleCancleAccept} $isRedText={true}>
                채택 취소
              </S.MenuButton>
            </S.Menu>
          )}
        </S.IconWrapper>
      </S.Wrapper>
    </S.Container>
  );
}
