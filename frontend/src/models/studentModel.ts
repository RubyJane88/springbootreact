export type StudentModel = {
  id: string;
  avatar?: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  createdAt?: Date;
  isActive?: boolean;
  isFetching?: boolean;
};
