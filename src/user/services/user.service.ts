import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { UserRepositoryService } from "../../repository/services";
import { User, UserEntity } from "../entities/user.entity";

@Injectable()
export class UserService {
  constructor(
    @Inject(UserRepositoryService)
    private userRepository: UserRepositoryService,
    @Inject(UserEntity) private userEntity: UserEntity,
  ) {}

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.getAllUsers();
  }

  async findUser(uuid: string): Promise<User> {
    const results = await this.userRepository.findUser([uuid]);
    if (results.length !== 1) {
      throw Error(`Could not find user with uuid ${uuid}`);
    }
    return results[0];
  }

  async createUser(inputUser: Partial<User>): Promise<User> {
    const user = await this.userRepository.createUser({
      uuid: this.userEntity.getID(),
      email: this.userEntity.validateEmail(inputUser.email),
      ...inputUser,
    });
    return user;
  }

  async deleteUser(uuid: string): Promise<boolean> {
    try {
      await this.userRepository.deleteUser(uuid);

      return true;
    } catch (error) {
      // we should log the error and throw a generic error message
      // did not have time to implement a logger
      console.log("@@@deleteUser error", error);

      throw new InternalServerErrorException(`Not able to delete ${uuid}`);
    }
  }

  async updateUser(uuid: string, update: Partial<User>): Promise<User> {
    try {
      const result = await this.userRepository.updateUser(uuid, update);

      return result;
    } catch (error) {
      // we should log the error and throw a generic error message
      // did not have time to implement a logger
      console.log("@@@updateUser error", error);
      throw new InternalServerErrorException(`Not able to update ${uuid}`);
    }
  }
}
