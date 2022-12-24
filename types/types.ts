export interface IRegisterRequest {
  email: string;
  password: string;
  nickname: string;
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
  nickname: string;
  introduce: string;
  imageUrl: string;
}

export interface IEditProfile {
  nickname: string;
  introduce: string;
  profileImage: FileList;
}

export interface IAddPostRequest {
  title: string;
  content: string;
  hashtag: string[];
  media: FileList;
}

export interface IUpdatePostRequest {
  title?: string;
  content?: string;
  hashtag?: string[];
}

export interface Post {
  titie: string;
  content: string;
  mediaUrl: string;
  hashtag: string[];
  isLike: boolean;
  likes: number;
  user: User;
}

export interface Comment {
  content: string;
}
