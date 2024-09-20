import { createContext, ReactNode, useCallback, useReducer } from "react";

import {
  CommentsType,
  CommentsViewType,
  DetailAction,
  PostDetailInfoType,
} from "@/types";
import { DetailActionType } from "@/constants";

const initState: PostDetailInfoType = {
  accept: null,
  id: 0,
  author: {
    name: "",
    profileImage: "",
    kakaoId: "",
  },
  title: "",
  content: "",
  category: "질문하기",
  commentCount: 0,
  date: "",
  likeCount: 0,
  likeYN: false,
  hashtags: [],
  photoUrls: [],
  deleteYN: false,
  comments: [],
};

interface UpdateCommentType {
  commentId: CommentsType["id"];
  newText: CommentsType["text"];
}

interface ReplyCommentType {
  newComment: CommentsType;
  parentId: CommentsType["id"];
}

interface DetailContextProps {
  data: PostDetailInfoType;
  setPostDetail: (newData: PostDetailInfoType) => void;
  addComment: (comment: CommentsType) => void;
  deleteComment: (commentId: CommentsType["id"]) => void;
  updateComment: ({ commentId, newText }: UpdateCommentType) => void;
  setComment: (comments: CommentsType[]) => void;
  addReplyComment: ({ newComment, parentId }: ReplyCommentType) => void;
  setReplyComment: (comments: CommentsType[], parentId: number) => void;
  setAcceptComment: (comment: CommentsType) => void;
  resetAcceptComment: (comment: CommentsType) => void;
}

export const DetailContext = createContext<DetailContextProps>({
  data: initState,
  setPostDetail: () => {},
  addComment: () => {},
  deleteComment: () => {},
  updateComment: () => {},
  setComment: () => {},
  addReplyComment: () => {},
  setReplyComment: () => {},
  setAcceptComment: () => {},
  resetAcceptComment: () => {},
});

function reducer(
  state: PostDetailInfoType,
  action: DetailAction
): PostDetailInfoType {
  const { type, payload } = action;

  switch (type) {
    case DetailActionType.SET_POST:
      return {
        ...payload,
        comments: [],
      };
    case DetailActionType.ADD_COMMENTS:
      return {
        ...state,
        comments: [payload, ...state.comments],
      };
    case DetailActionType.DELETE_COMMENT: {
      const commentId = payload;
      const deleteCommentById = (
        comments: CommentsViewType[],
        id: number
      ): CommentsViewType[] => {
        if (!comments) return [];
        return comments
          .filter((comment) => comment.id !== id)
          .map((comment) => ({
            ...comment,
            children: deleteCommentById(comment.children, id),
          }));
      };

      const deletedComments = deleteCommentById([...state.comments], commentId);

      return {
        ...state,
        comments: [...deletedComments],
      };
    }
    case DetailActionType.UPDATE_COMMENT: {
      const { commentId, newText } = payload;

      const updateCommentText = (
        comments: CommentsViewType[],
        id: number,
        newText: string
      ): CommentsViewType[] => {
        return comments.map((comment) => {
          if (comment.id === id) {
            return { ...comment, text: newText };
          }

          if (comment.children && comment.children.length > 0) {
            return {
              ...comment,
              children: updateCommentText(comment.children, id, newText),
            };
          }

          return comment;
        });
      };

      const updatedComments = updateCommentText(
        [...state.comments],
        commentId,
        newText
      );

      return {
        ...state,
        comments: [...updatedComments],
      };
    }
    case DetailActionType.SET_COMMENT: {
      return {
        ...state,
        comments: [...payload],
      };
    }
    case DetailActionType.ADD_REPLY_COMMENT: {
      const { newComment, parentId } = payload;
      const addComments = state.comments.map((comment) => {
        if (comment.id === parentId) {
          return { ...comment, children: [...comment.children, newComment] };
        }
        return comment;
      }) as CommentsViewType[];

      return {
        ...state,
        comments: [...addComments],
      };
    }
    case DetailActionType.SET_REPLY_COMMENT: {
      const { newComments, parentId } = payload;

      const newRepyComments = state.comments.map((comment) => {
        if (comment.id === parentId) {
          return { ...comment, children: [...newComments] };
        }
        return comment;
      }) as CommentsViewType[];
      return {
        ...state,
        comments: [...newRepyComments],
      };
    }
    case DetailActionType.SET_ACCEPT_COMMENT: {
      const { id: acceptId } = payload;

      const acceptComment = (
        comments: CommentsViewType[],
        id: number
      ): CommentsViewType[] => {
        return comments.map((comment) => {
          if (comment.id === id) {
            return { ...comment, accept: true };
          }

          if (comment.children && comment.children.length > 0) {
            return {
              ...comment,
              children: acceptComment(comment.children, id),
            };
          }

          return comment;
        });
      };

      const acceptComments = acceptComment([...state.comments], acceptId);

      return {
        ...state,
        accept: { ...payload },
        comments: [...acceptComments],
      };
    }
    case DetailActionType.RESET_ACCEPT_COMMENT: {
      const { id: acceptId } = payload;

      const acceptComment = (
        comments: CommentsViewType[],
        id: number
      ): CommentsViewType[] => {
        return comments.map((comment) => {
          if (comment.id === id) {
            return { ...comment, accept: false };
          }

          if (comment.children && comment.children.length > 0) {
            return {
              ...comment,
              children: acceptComment(comment.children, id),
            };
          }

          return comment;
        });
      };

      const acceptComments = acceptComment([...state.comments], acceptId);

      return { ...state, accept: null, comments: [...acceptComments] };
    }
    default:
      return state;
  }
}

interface Props {
  children: ReactNode;
}

export function DetailProvider({ children }: Props) {
  const [data, dispatch] = useReducer(reducer, initState);

  // 게시글 정보 출력
  const setPostDetail = useCallback((newPost: PostDetailInfoType) => {
    dispatch({ type: DetailActionType.SET_POST, payload: newPost });
  }, []);

  // 댓글 생성
  const addComment = useCallback((comments: CommentsType) => {
    const newComment: CommentsViewType = { ...comments, children: [] };
    dispatch({ type: DetailActionType.ADD_COMMENTS, payload: newComment });
  }, []);

  // 댓글 삭제
  const deleteComment = useCallback((commentId: CommentsType["id"]) => {
    dispatch({ type: DetailActionType.DELETE_COMMENT, payload: commentId });
  }, []);

  // 댓글 수정
  const updateComment = useCallback(
    ({ commentId, newText }: UpdateCommentType) => {
      dispatch({
        type: DetailActionType.UPDATE_COMMENT,
        payload: { commentId, newText },
      });
    },
    []
  );

  // 댓글 출력
  const setComment = useCallback((comments: CommentsType[]) => {
    const newComments: CommentsViewType[] = comments.map((comment) => {
      return { ...comment, children: [] };
    });
    dispatch({ type: DetailActionType.SET_COMMENT, payload: newComments });
  }, []);

  // 대댓글 출력
  const setReplyComment = useCallback(
    (comments: CommentsType[], parentId: number) => {
      dispatch({
        type: DetailActionType.SET_REPLY_COMMENT,
        payload: { newComments: comments, parentId },
      });
    },
    []
  );

  // 대댓글 작성
  const addReplyComment = useCallback(
    ({ newComment, parentId }: ReplyCommentType) => {
      dispatch({
        type: DetailActionType.ADD_REPLY_COMMENT,
        payload: { newComment, parentId },
      });
    },
    []
  );

  // 채택 설정
  const setAcceptComment = useCallback((newComment: CommentsType) => {
    dispatch({
      type: DetailActionType.SET_ACCEPT_COMMENT,
      payload: newComment,
    });
  }, []);

  // 채택 해제
  const resetAcceptComment = useCallback((newComment: CommentsType) => {
    dispatch({
      type: DetailActionType.RESET_ACCEPT_COMMENT,
      payload: newComment,
    });
  }, []);

  return (
    <DetailContext.Provider
      value={{
        data,
        setPostDetail,
        addComment,
        deleteComment,
        updateComment,
        setComment,
        addReplyComment,
        setReplyComment,
        setAcceptComment,
        resetAcceptComment,
      }}
    >
      {children}
    </DetailContext.Provider>
  );
}
