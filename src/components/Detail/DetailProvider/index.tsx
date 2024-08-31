import { createContext, ReactNode, useCallback, useReducer } from "react";

import { CommentsType, DetailAction, PostDetailInfoType } from "@/types";
import { DetailActionType } from "@/constants";

const initState: PostDetailInfoType = {
  id: 0,
  author: {
    name: "",
    profileImage: "",
    kakaoId: "",
  },
  title: "",
  content: "",
  category: "질문하기",
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

interface DetailContextProps {
  data: PostDetailInfoType;
  setPostDetail: (newData: PostDetailInfoType) => void;
  addComment: (newComment: CommentsType) => void;
  deleteComment: (commentId: CommentsType["id"]) => void;
  updateComment: ({ commentId, newText }: UpdateCommentType) => void;
}

export const DetailContext = createContext<DetailContextProps>({
  data: initState,
  setPostDetail: () => {},
  addComment: () => {},
  deleteComment: () => {},
  updateComment: () => {},
});

function reducer(
  state: PostDetailInfoType,
  action: DetailAction
): PostDetailInfoType {
  const { type, payload } = action;

  switch (type) {
    case DetailActionType.SET_POST:
      return payload;
    case DetailActionType.ADD_COMMENTS:
      return {
        ...state,
        comments: [payload, ...state.comments],
      };
    case DetailActionType.DELETE_COMMENT: {
      const filteredComments = [...state.comments].filter(
        ({ id }) => id !== payload
      );
      return {
        ...state,
        comments: [...filteredComments],
      };
    }
    case DetailActionType.UPDATE_COMMENT: {
      const { commentId, newText } = payload;
      const copyedComments = [...state.comments].map((comment) =>
        comment.id === commentId ? { ...comment, text: newText } : comment
      );

      return {
        ...state,
        comments: [...copyedComments],
      };
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

  const setPostDetail = useCallback((newPost: PostDetailInfoType) => {
    dispatch({ type: DetailActionType.SET_POST, payload: newPost });
  }, []);

  const addComment = (newComment: CommentsType) => {
    dispatch({ type: DetailActionType.ADD_COMMENTS, payload: newComment });
  };

  const deleteComment = (commentId: CommentsType["id"]) => {
    dispatch({ type: DetailActionType.DELETE_COMMENT, payload: commentId });
  };

  const updateComment = ({ commentId, newText }: UpdateCommentType) => {
    dispatch({
      type: DetailActionType.UPDATE_COMMENT,
      payload: { commentId, newText },
    });
  };

  return (
    <DetailContext.Provider
      value={{ data, setPostDetail, addComment, deleteComment, updateComment }}
    >
      {children}
    </DetailContext.Provider>
  );
}
