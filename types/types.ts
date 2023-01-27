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
