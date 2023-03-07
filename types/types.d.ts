import {Post, User, Comment} from "@prisma/client";
import {UseFormRegisterReturn} from "react-hook-form";

export interface IRegisterRequest {
  email: string;
  password: string;
  name: string;
  introduce: string;
}

export interface IRegisterForm extends IRegisterRequest {
  password2: string;
}

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface User {
  email: string;
  name: string;
  introduce: string;
  imageUrl: string;
}

export interface IEditProfile {
  name: string;
  introduce: string;
  profileImage: FileList;
}

export interface IAddPostRequest {
  title: string;
  content: string;
  hashtags: string;
  media: FileList;
}

export interface IUpdatePostRequest {
  title?: string;
  content?: string;
  hashtags?: string[];
}

export interface Post {
  id: string;
  titie: string;
  content: string;
  mediaUrl: string;
  hashtag: string[];
  isLike: boolean;
  likes: number;
  user: User;
  comments: Comment[];
}

export interface Comment {
  content: string;
  user: User;
}

export interface ICount {
  comments: number;
  likes: number;
}

export interface PostWithLikeAndComment extends Post {
  _count: ICount;
  user: User;
  isLike: boolean;
  isBookmark: boolean;
}

export interface IAddChatModalProps {
  isOpen: boolean;
  readonly: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  sendUserList: any;
  receiveUserList: any;
}

export interface IChatItem {
  userId: string;
  chatroomId: number;
  lastChat: string;
  lastTimeStamp: string;
}

export interface IMessage {
  timeStamp: string;
  msg: string;
  userId: string;
  isMine: boolean;
}

export interface ICommentWithUser extends Comment {
  user: User;
}

export interface IButtonProps {
  large?: boolean;
  text: string;
  [key: string]: any;
}

export interface IInputProps {
  register: UseFormRegisterReturn;
  type: string;
  placeholder?: string;
  textAlign?: "right" | "center" | "left";
}

export interface ITextAreaProps {
  label?: string;
  name?: string;
  placeholder?: string;
  register: UseFormRegisterReturn;
  [key: string]: any;
}

export interface ILayoutProps {
  canGoBack?: boolean;
  hasTabBar?: boolean;
  children: React.ReactNode;
  seoTitle?: string;
  title?: string;
}

export interface IEditMenu {
  onDelete: () => void;
  onBookmark: () => void;
  isMine: boolean;
}

export interface IPostProps extends Post {
  isLike: boolean;
  isBookmark: boolean;
  user: User;
  _count: ICount;
}

export interface IFeedProps {
  post: IPostProps;
  isModal?: boolean;
}

export interface IModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export interface IPostModalProps extends IModalProps {
  postId: number;
}

export interface IAddImageData {
  title: string;
  content: string;
  media: string;
  author: string;
  hashtags: string;
  mediaType?: string;
  thumbnail?: string;
}

export interface IUpdateProfileRequest {
  image?: string;
  introduce: string;
  name: string;
}

export interface IPostCardProps {
  postId: number;
  media: string;
  mediaType: string;
  thumbnail?: string;
}

export interface IProfileCardProps {
  image: string;
  name: string;
  introduce: string;
  id: string;
  isFollow: boolean;
}

export interface ISvgProps {
  activated: boolean;
}
