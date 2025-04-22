import { IUser } from '../models/user.model';

class UserDto {
  email: string;
  id: string;
  username: string;

  constructor(user: Partial<UserDto>) {
    this.email = user.email || '';
    this.id = user.id || '';
    this.username = user.username || '';
  }
}

export default UserDto;
